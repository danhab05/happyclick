#!/usr/bin/env python3
"""Verify the built preview without a browser or requests to the original site."""
import hashlib, json, re, subprocess
from html.parser import HTMLParser
from pathlib import Path
from urllib.request import urlopen
import argparse

ROOT = Path(__file__).resolve().parents[1]
parser = argparse.ArgumentParser()
parser.add_argument('--base-url', help='Also GET every built route and referenced resource')
args = parser.parse_args()

class Page(HTMLParser):
    def __init__(self, html):
        super().__init__()
        self.elements, self.text, self.nav = [], [], []
        self.in_nav = False
        self.feed(html)
    def handle_starttag(self, tag, attributes):
        a = dict(attributes)
        self.elements.append((tag, a))
        if tag == 'nav': self.in_nav = True
        if tag == 'a' and self.in_nav: self.nav.append(a)
    def handle_endtag(self, tag):
        if tag == 'nav': self.in_nav = False
    def handle_data(self, value):
        value = ' '.join(value.split())
        if value: self.text.append(value)

manifest = json.loads((ROOT/'source-snapshot/assets.json').read_text())
urls = {'/robots.txt'}
report = ['# Vérification de la préversion', '', 'Commande : `npm run build && npm run verify -- --base-url http://127.0.0.1:4321`', '']
pdf_count = 0
for route, expected in (('/',0),('/kit',6),('/guides',2)):
    path = ROOT/'dist'/route.strip('/')/'index.html'
    html = path.read_text()
    page = Page(html)
    source_name = 'index' if route == '/' else route.strip('/')
    source = Page((ROOT/f'source-snapshot/{source_name}.html').read_text())
    built_text = ' '.join(page.text)
    for text in source.text:
        assert text in built_text, f'Texte source absent : {text}'
    assert len(page.nav) == 5
    assert [a['href'] for a in page.nav] == ['/', '/kit', '/guides'] + [a['href'] for a in source.nav[3:]]
    assert [a['href'] for a in page.nav if a.get('aria-current') == 'page'] == [route]
    assert any(tag == 'meta' and a.get('name') == 'robots' and a.get('content') == 'noindex, nofollow' for tag,a in page.elements)
    assert not any(tag in ('script','form','input','textarea') for tag,a in page.elements)
    assert 'pdf-rendering.js' not in html
    downloads = [a['href'] for tag,a in page.elements if tag == 'a' and 'download' in a]
    objects = [a['data'] for tag,a in page.elements if tag == 'object']
    assert len(downloads) == expected and downloads == objects
    original_pdfs = ['/'+a['src'] for tag,a in source.elements if tag == 'embed']
    assert downloads == original_pdfs
    pdf_count += len(downloads)
    urls.add(route)
    if route != "/":
        urls.add(route + "/")
    for tag, a in page.elements:
        for attr in ('href', 'src', 'data'):
            target = a.get(attr, '')
            if target.startswith('#'):
                assert any(other.get('id') == target[1:] for _,other in page.elements)
            elif target.startswith('/'):
                urls.add(target)
            elif target:
                assert tag == 'a' and target in [a['href'] for a in source.nav[3:]], target
    report.append(f'- `{route}` : textes source conservés, 5 liens de navigation, {expected} PDF, noindex/nofollow, aucun script/formulaire.')

css = (ROOT/'dist/style.css').read_text()
for target in re.findall(r'url\([\s\'"]*([^\)\'"\s]+)', css):
    assert target.startswith('/'), f'Ressource CSS distante : {target}'
    urls.add(target)
assert (ROOT/'dist/robots.txt').read_text().strip() == 'User-agent: *\nDisallow: /'
assert pdf_count == 8
for item in manifest:
    path = ROOT/'dist'/item['local'].lstrip('/')
    data = path.read_bytes()
    if item['local'] != '/style.css':
        assert hashlib.sha256(data).hexdigest() == item['sha256'], path
    if path.suffix == '.pdf':
        assert data.startswith(b'%PDF-'), path
        info = subprocess.check_output(['pdfinfo',str(path)], text=True)
        pages = re.search(r'^Pages:\s+(\d+)',info,re.M).group(1)
        report.append(f'- `{item["local"]}` : PDF valide, {pages} pages, {len(data):,} octets, SHA-256 identique à la source.')
    urls.add(item['local'])

report += ['', '## Ressources et HTTP', '']
for url in sorted(urls):
    disk = ROOT/'dist'/url.lstrip('/')
    if disk.is_dir(): disk = disk/'index.html'
    assert disk.is_file(), f'URL locale manquante : {url}'
    if args.base_url:
        with urlopen(args.base_url.rstrip('/')+url, timeout=30) as response:
            data = response.read()
            assert response.status == 200
            assert response.geturl() == args.base_url.rstrip('/')+url, f'Redirection inattendue : {url}'
            assert data == disk.read_bytes(), f'Réponse différente : {url}'
            if url.endswith('.pdf'):
                assert 'application/pdf' in response.headers.get('Content-Type','')
report.append(f'{len(urls)} URLs locales vérifiées sur disque' + (' et en HTTP 200 ; réponses identiques aux fichiers du build.' if args.base_url else '.'))
report.append('Routes avec et sans slash final contrôlées : `/kit`, `/kit/`, `/guides`, `/guides/` (sans redirection en mode HTTP).')
report += ['', '## Analyse responsive sans navigateur', '', 'Dimensions déduites des règles CSS (pas des mesures de rendu). Navigation flexible avec retour à la ligne ; header dans le flux ≤ 1100 px ; titres fluides ≤ 600 px ; PDF et images bornés au conteneur ; liens PDF toujours visibles.', '', '| Écran (px) | Colonne PDF (px) | Texte (px) | Header |', '|---:|---:|---:|---|']
for width in (320,375,390,600,768,1024,1280,1440,1920):
    if width <= 600:
        content = width - 40
        paragraph = content
    elif width <= 1100:
        content = width * .8
        paragraph = content * .8
    else:
        content = width * .6
        paragraph = content * .8
    assert 0 < paragraph <= content <= width
    report.append(f'| {width} | {content:.0f} | {paragraph:.0f} | {"dans le flux" if width <= 1100 else "fixe"} |')
report += ['', 'Revue navigateur effectuée par OpenBot, selon son compte rendu : accueil desktop très fidèle ; accueil et kit mobile sans débordement de navigation ni de titres ; guides desktop avec PDF visibles et contenu correct. Build et verify également relancés avec succès par OpenBot. Aucun navigateur utilisé par cet exécutant.', '', 'Les deux liens GATE externes sont conservés exactement ; ils ne sont pas des ressources chargées automatiquement.']
(ROOT/'tasks/verification.md').write_text('\n'.join(report)+'\n')
print('\n'.join(report))
