#!/usr/bin/env python3
"""Collect only public assets actively referenced by the three source pages/CSS."""
import hashlib, json, re, subprocess
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import urljoin, urlparse

ROOT = Path(__file__).resolve().parents[1]
BASE = 'https://happy-click.fr/'
refs = {'style.css'}
class References(HTMLParser):
    def handle_starttag(self, tag, attrs):
        a = dict(attrs)
        for key in ('src', 'href'):
            value = a.get(key, '')
            if value and (tag in ('img', 'embed', 'link') or value.endswith('.pdf')):
                refs.add(value)
for page in ('index', 'kit', 'guides'):
    References().feed((ROOT / f'source-snapshot/{page}.html').read_text())
css = (ROOT / 'source-snapshot/style.css').read_text()
refs.update(re.findall(r'url\([\s\'"]*([^\)\'"\s]+)', css))
manifest = []
for ref in sorted(refs):
    url = urljoin(BASE, ref)
    if urlparse(url).netloc == 'happy-click.fr':
        local = urlparse(url).path.lstrip('/')
    else:
        family = 'josefin-sans' if 'josefin-sans' in url else 'ubuntu'
        local = 'assets/fonts/' + family + '-' + urlparse(url).path.rsplit('/', 1)[1]
    destination = ROOT / 'public' / local
    if local == 'style.css':
        destination = ROOT / 'source-snapshot/style.css'
    destination.parent.mkdir(parents=True, exist_ok=True)
    result = subprocess.run(['curl', '--fail', '--silent', '--show-error', '--location', '--retry', '2', url, '-o', str(destination)], check=True)
    data = destination.read_bytes()
    manifest.append({'source':url, 'local':'/' + local, 'bytes':len(data), 'sha256':hashlib.sha256(data).hexdigest()})
    print(local, len(data))
(ROOT / 'source-snapshot/assets.json').write_text(json.dumps(manifest, ensure_ascii=False, indent=2) + '\n')
