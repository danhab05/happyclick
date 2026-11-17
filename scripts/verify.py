#!/usr/bin/env python3
"""Audit the static build, sources and optional local HTTP, without a browser."""
import argparse
import hashlib
import json
import re
import subprocess
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import unquote, urlsplit
from urllib.request import urlopen

ROOT = Path(__file__).resolve().parents[1]
DIST = ROOT / 'dist'
parser = argparse.ArgumentParser()
parser.add_argument('--base-url', help='GET every built file and route, including trailing-slash variants')
args = parser.parse_args()


def normalize(value):
    return ' '.join(value.split())


class Page(HTMLParser):
    def __init__(self, html):
        super().__init__()
        self.elements, self.text, self.nav, self.source_blocks = [], [], [], []
        self.nav_groups = []
        self.in_nav = False
        self.capture = None
        self.feed(html)

    def handle_starttag(self, tag, attributes):
        attrs = dict(attributes)
        self.elements.append((tag, attrs))
        if tag == 'nav':
            self.in_nav = True
            self.nav_groups.append([])
        if tag == 'a' and self.in_nav:
            self.nav.append(attrs)
            self.nav_groups[-1].append(attrs)
        if tag in ('p', 'h3', 'h4', 'h5'):
            self.capture = (tag, [])

    def handle_endtag(self, tag):
        if tag == 'nav':
            self.in_nav = False
        if self.capture and self.capture[0] == tag:
            text = normalize(' '.join(self.capture[1]))
            if text:
                self.source_blocks.append(text)
            self.capture = None

    def handle_data(self, value):
        if normalize(value):
            self.text.append(normalize(value))
            if self.capture:
                self.capture[1].append(value)


def disk_for(url):
    path = DIST / unquote(url).lstrip('/')
    return path / 'index.html' if path.is_dir() else path


expected_routes = {'/', '/kit', '/guides', '/quiz', '/quiz/comportements', '/quiz/sante',
                   '/quiz/ecologie', '/quiz/tout', '/mes-usages', '/kit/reflexion',
                   '/kit/roles/addiction', '/kit/roles/cyberharcelement', '/kit/roles/desinformation', '/projet-2027', '/faq'}
pages = {}
for file in DIST.rglob('index.html'):
    relative = file.parent.relative_to(DIST).as_posix()
    route = '/' if relative == '.' else '/' + relative
    pages[route] = Page(file.read_text())
assert set(pages) == expected_routes, f'Routes manquantes/inattendues : {set(pages) ^ expected_routes}'
manifest = json.loads((ROOT / 'source-snapshot/assets.json').read_text())
gate_assets = json.loads((ROOT / 'tasks/gate-2027-assets.json').read_text())
new_pdfs = [item for item in gate_assets['originals'] if item['file'].endswith('.pdf')]
manifest += new_pdfs + gate_assets['derivatives']
source_home = Page((ROOT / 'source-snapshot/index.html').read_text())
gate_links = [a['href'] for a in source_home.nav if a['href'].startswith('https://')]
assert len(gate_links) == 2
urls, fragments = {'/robots.txt'}, []
active_stylesheets = set()
report = ['# Vérification de la nouvelle interface et des activités', '',
          'Commande : `npm run build && npm test && npm run verify -- --base-url http://127.0.0.1:4321`', '',
          'Édition 2026–2027 : contrôles ci-dessous exécutés sur le build local. Le périmètre exact de la revue navigateur rapportée par OpenBot est consigné dans `tasks/browser-review.md` ; les observations sur l’ancienne interface ne sont pas transposées.', '',
          '## Pages, contenu et interactions', '']
source_block_count = 0
for route, page in sorted(pages.items()):
    html = disk_for(route).read_text()
    text = normalize(' '.join(page.text))
    expected_active = '/projet-2027' if route in ('/projet-2027', '/faq') else '/quiz' if route.startswith('/quiz') or route == '/mes-usages' else '/kit' if route.startswith('/kit') else route
    assert len(page.nav_groups) == 2, f'Navigation desktop/mobile absente : {route}'
    for navigation in page.nav_groups:
        assert [a['href'] for a in navigation] == ['/', '/projet-2027', '/kit', '/guides', '/quiz'], route
        assert [a['href'] for a in navigation if a.get('aria-current') == 'page'] == [expected_active], route
    assert any(tag == 'html' and a.get('lang') == 'fr' for tag, a in page.elements), route
    assert any(tag == 'meta' and a.get('name') == 'robots' and a.get('content') == 'noindex, nofollow' for tag, a in page.elements), route
    assert any(tag == 'meta' and a.get('name') == 'viewport' for tag, a in page.elements), route
    assert sum(tag == 'h1' for tag, _ in page.elements) == 1, route
    assert 'Happy Click' in re.search(r'<title>(.*?)</title>', html).group(1), route
    assert not any(tag in ('form', 'iframe') for tag, _ in page.elements), route
    assert 'pdf-rendering.js' not in html, route
    assert not re.search(r'drive\.google\.com|docs\.google\.com|mailto:|tel:', html), f'Lien privé/contact hors périmètre : {route}'
    ids = [a['id'] for _, a in page.elements if 'id' in a]
    assert len(ids) == len(set(ids)), f'ID dupliqué : {route}'
    assert 'contenu' in ids
    for gate in gate_links:
        assert any(tag == 'a' and a.get('href') == gate for tag, a in page.elements), f'Lien GATE absent : {route}'
    if route in ('/', '/kit', '/guides'):
        name = 'index' if route == '/' else route[1:]
        source = Page((ROOT / f'source-snapshot/{name}.html').read_text())
        for block in source.source_blocks:
            assert block in text, f'Texte source absent sur {route} : {block}'
            source_block_count += 1
        downloads = [a['href'] for tag, a in page.elements if tag == 'a' and 'download' in a]
        originals = ['/' + a['src'].lstrip('/') for tag, a in source.elements if tag == 'embed']
        expected_documents = originals + ([item['local'] for item in new_pdfs] if route == '/kit' else [])
        assert len(downloads) == len(expected_documents) and set(downloads) == set(expected_documents), f'Documents source modifiés : {route}'
        objects = [a['data'] for tag, a in page.elements if tag == 'object']
        assert len(objects) == len(expected_documents) and set(objects) == set(expected_documents)
    styles = [a.get('href', '') for tag, a in page.elements if tag == 'link' and a.get('rel') == 'stylesheet']
    assert styles, f'CSS actif absent : {route}'
    assert not any(tag == 'style' for tag, _ in page.elements), f'CSS inline non audité : {route}'
    for stylesheet in styles:
        assert re.fullmatch(r'/_astro/[^/]+\.[A-Za-z0-9_-]{8,}\.css', stylesheet), f'CSS sans hash de contenu : {route} {stylesheet}'
        active_stylesheets.add(stylesheet)
    scripts = [a for tag, a in page.elements if tag == 'script']
    interactive = route.startswith('/quiz/') or route in ('/mes-usages', '/kit/reflexion')
    assert len(scripts) == int(interactive), f'JavaScript hors périmètre : {route}'
    for script in scripts:
        assert script.get('type') == 'module' and script.get('src', '').startswith('/_astro/'), route
    assert not any(name.startswith('on') for _, a in page.elements for name in a), route
    if not interactive:
        assert not any(tag in ('input', 'textarea') for tag, _ in page.elements), route
    for tag, attrs in page.elements:
        for attr in ('href', 'src', 'data'):
            target = attrs.get(attr, '')
            if not target:
                continue
            parsed = urlsplit(target)
            if parsed.scheme or parsed.netloc:
                assert tag == 'a' and parsed.scheme == 'https', f'Chargement distant : {target}'
                continue
            assert target.startswith(('/', '#')), f'Lien relatif non contrôlé : {route} : {target}'
            assert not parsed.query, target
            url = parsed.path or route
            urls.add(url)
            if parsed.fragment:
                fragments.append((url, parsed.fragment))
    urls.add(route)
    if route != '/':
        urls.add(route + '/')
    report.append(f'- `{route}` : navigation, langue, titre, noindex, liens et identifiants contrôlés ; {len(scripts)} module JS ciblé.')

# Question text/options and page references must actually reach the server-rendered HTML.
quiz = json.loads((ROOT / 'src/data/quiz.json').read_text())
assert len(quiz) == 29
for question in quiz:
    for route in ('/quiz/tout', '/quiz/' + question['theme']):
        text = normalize(' '.join(pages[route].text))
        for value in [question['question'], *question['options'], question['feedback'], question['discussion'], question['nuance']]:
            assert normalize(value) in text, f'Carte incomplète : {route} {question["id"]}'
for filename, route, expected in [('usage', '/mes-usages', 11), ('teachers', '/kit/reflexion', 14)]:
    questions = json.loads((ROOT / f'src/data/{filename}.json').read_text())
    assert len(questions) == expected
    text = normalize(' '.join(pages[route].text))
    for question in questions:
        assert normalize(question['question']) in text, f'{filename} : question absente'
        for option in question.get('options', []):
            assert normalize(option) in text
report.append(f'- {source_block_count} blocs de textes originaux contrôlés ; 29 cartes intégrales dans leur thème et dans le parcours complet ; 11 questions d’usage et 14 questions enseignants.')

report += ['', '## CSS actifs versionnés', '']
for stylesheet in sorted(active_stylesheets):
    css = disk_for(stylesheet).read_text()
    assert '@import' not in css, f'Import CSS non audité : {stylesheet}'
    for target in re.findall(r'url\([\s\'\"]*([^\)\'\"\s]+)', css):
        parsed = urlsplit(target)
        assert target.startswith('/') and not parsed.netloc and not parsed.query and not parsed.fragment, f'Ressource CSS non locale : {target}'
        urls.add(target)
    report.append(f'- `{stylesheet}` : feuille active avec hash, références locales contrôlées ; contenu comparé par HTTP si demandé.')
assert not (DIST / 'style.css').exists(), 'Ancienne URL CSS stable encore émise'
assert (DIST / 'robots.txt').read_text().strip() == 'User-agent: *\nDisallow: /'
# Client modules must stay local and ephemeral; DOM tests separately exercise their behavior.
for script in list((ROOT / 'src/scripts').glob('*.mjs')) + list((ROOT / 'src/lib').glob('*.mjs')) + list((DIST / '_astro').glob('*.js')):
    assert not re.search(r'\b(fetch|XMLHttpRequest|sendBeacon|WebSocket|localStorage|sessionStorage|indexedDB)\b|document\.cookie', script.read_text()), f'API réseau/persistance interdite : {script}'

report += ['', '## Documents et empreintes source', '']
expected_pages = {'activite_cartes_a_imprimer.pdf': 16, 'rp_addiction.pdf': 28,
                  'rp_cyberharcelement.pdf': 24, 'rp_desinformation.pdf': 21,
                  'test_numerico_dependance.pdf': 2, 'questionnaire_enseignants.pdf': 4,
                  'guide_parents.pdf': 9, 'guide_jeune_et_numerique.pdf': 52,
                  'addiction-v1.pdf': 24, 'addiction-v2.pdf': 24}
pdf_pages = {}
for item in manifest:
    if item['local'] == '/style.css':
        # Historical source is preserved for provenance, never used as a runtime stylesheet.
        original = (ROOT / 'source-snapshot/style.css').read_bytes()
        assert hashlib.sha256(original).hexdigest() == item['sha256'], 'CSS source historique altérée'
        continue
    path = DIST / item['local'].lstrip('/')
    data = path.read_bytes()
    assert hashlib.sha256(data).hexdigest() == item['sha256'], f'Source binaire altérée : {path}'
    if path.suffix == '.pdf':
        assert data.startswith(b'%PDF-'), path
        info = subprocess.check_output(['pdfinfo', str(path)], text=True)
        count = int(re.search(r'^Pages:\s+(\d+)', info, re.M).group(1))
        assert count == expected_pages[path.name], path
        pdf_pages[item['local']] = count
        report.append(f'- `{path.name}` : {count} pages, {len(data):,} octets ; SHA-256 `{item["sha256"]}` identique à la source.')
    urls.add(item['local'])
assert len(pdf_pages) == 10 and sum(pdf_pages.values()) == 204
for url, fragment in fragments:
    if url.endswith('.pdf'):
        match = re.fullmatch(r'page=(\d+)', fragment)
        assert match and 1 <= int(match[1]) <= pdf_pages[url], f'Page PDF invalide : {url}#{fragment}'
    else:
        target = pages.get(url.rstrip('/') or '/')
        assert target and any(a.get('id') == unquote(fragment) for _, a in target.elements), f'Ancre absente : {url}#{fragment}'

# Include every emitted asset, even font variants not selected by the current CSS.
for path in DIST.rglob('*'):
    if path.is_file() and path.suffix != '.html':
        urls.add('/' + path.relative_to(DIST).as_posix())
for url in sorted(urls):
    disk = disk_for(url)
    assert disk.is_file(), f'URL locale manquante : {url}'
    if args.base_url:
        expected_url = args.base_url.rstrip('/') + url
        with urlopen(expected_url, timeout=30) as response:
            assert response.status == 200 and response.geturl() == expected_url, f'Statut/redirection : {url}'
            assert response.read() == disk.read_bytes(), f'HTTP différent du build : {url}'
            if url in active_stylesheets:
                assert 'text/css' in response.headers.get('Content-Type', ''), url
            if url.endswith('.pdf'):
                assert 'application/pdf' in response.headers.get('Content-Type', ''), url
report += ['', '## Ressources et HTTP', '',
           f'{len(urls)} URLs contrôlées sur disque' + (' et par HTTP 200 sans redirection, réponses identiques au build.' if args.base_url else ' ; contrôle HTTP non demandé.'),
           f'{len(fragments)} références à des ancres HTML/pages PDF vérifiées. Les {len(pages)-1} routes hors accueil sont testées avec et sans slash final. Tous les assets émis sont inclus, dont les modules JS et leurs chunks.', '',
           '## Responsive et limites de cette vérification', '',
           'Analyse des règles CSS seulement : conteneur borné à 1180 px, paquets en une colonne sous 800 px, menu mobile natif et sommaires repliables, images/PDF bornés, cibles d’au moins 44 px, focus visibles et reduced-motion (retournement de carte désactivé). Aucun navigateur lancé : ces contrôles ne mesurent pas le rendu. Refonte « table de jeu » (52115d2) approuvée par OpenBot après mesures réelles à 320/390/1000/1920 px ; périmètre exact dans `tasks/browser-review.md` et `tasks/redesign-enfants.md`. Les mesures de `tasks/mobile-review.md` concernent la version précédente.', '',
           'Les tests Node/DOM de `npm test` couvrent la transcription et les clés des 29 cartes, la progression des quatre parcours, validation/retour/rejouer, les choix exclusifs du questionnaire, l’absence de score lié à la durée, les notes comme texte et leur effacement. Ce script ne remplace pas leur exécution.', '',
           'Base publique e8bf224 confirmée par OpenBot : `tasks/public-verification.md`. La CSS reste importée par Astro avec un hash de contenu, contrôlé ici.', '',
           'Aucun push, déploiement, contrôle HTTPS ni changement d’infrastructure effectué par cette vérification.']
(ROOT / 'tasks/verification.md').write_text('\n'.join(report) + '\n')
print('\n'.join(report))
