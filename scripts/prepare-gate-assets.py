#!/usr/bin/env python3
"""Prepare only explicitly supplied public assets; never crawl the private Drive.
Usage: python3 scripts/prepare-gate-assets.py /tmp/happyclick-gate-2027
Pillow required for local asset preparation, not for the Astro build.
"""
from pathlib import Path
from PIL import Image
import hashlib, io, json, shutil, struct, sys
ROOT = Path(__file__).resolve().parents[1]
source = Path(sys.argv[1])
assets = ROOT / 'public/assets/2027'
docs = ROOT / 'public/resources/kit/2027'
assets.mkdir(parents=True, exist_ok=True)
docs.mkdir(parents=True, exist_ok=True)
sha = lambda p: hashlib.sha256(p.read_bytes()).hexdigest()

def pixels_without_metadata(path):
    # One supplied PNG has a broken eXIf CRC. Drop ancillary metadata only;
    # preserve all critical PNG chunks and their original image data.
    raw = path.read_bytes(); out = raw[:8]; offset = 8
    while offset < len(raw):
        size = struct.unpack('>I', raw[offset:offset+4])[0]
        kind = raw[offset+4:offset+8]
        chunk = raw[offset:offset+size+12]
        if kind in (b'IHDR', b'PLTE', b'IDAT', b'IEND', b'tRNS'):
            out += chunk
        offset += size + 12
    return Image.open(io.BytesIO(out)).convert('RGBA')

originals = []
for name in ['logo-final.png','logo-transparent.png','logo-sans-fond.png','logo-noir.png','logo-blanc.png','addiction-v1.pdf','addiction-v2.pdf']:
    path = source / name
    item = {'file':name, 'bytes':path.stat().st_size, 'sha256':sha(path)}
    if path.suffix == '.png':
        im = pixels_without_metadata(path)
        item.update(width=im.width,height=im.height,alphaRange=im.getchannel('A').getextrema())
    else:
        dest = docs / name; shutil.copyfile(path,dest)
        item.update(local='/'+str(dest.relative_to(ROOT/'public')),pages=24)
    originals.append(item)

im = pixels_without_metadata(source/'logo-sans-fond.png')
derivatives = []
for name,width,square in [('logo-128.png',128,False),('logo-512.png',512,False),('favicon-96.png',96,True),('apple-touch-180.png',180,True)]:
    resized=im.copy()
    if square:
        resized.thumbnail((width,width),Image.Resampling.LANCZOS)
        canvas=Image.new('RGBA',(width,width),(0,0,0,0))
        canvas.alpha_composite(resized,((width-resized.width)//2,(width-resized.height)//2))
        resized=canvas
    else:
        resized=im.resize((width,round(im.height*width/im.width)),Image.Resampling.LANCZOS)
    dest=assets/name;resized.save(dest,optimize=True)
    derivatives.append({'local':'/'+str(dest.relative_to(ROOT/'public')),'source':'logo-sans-fond.png','sha256':sha(dest),'bytes':dest.stat().st_size,'width':resized.width,'height':resized.height,'transformation':'Métadonnées retirées, redimensionnement Lanczos, proportions conservées'+(', centrage transparent sans recadrage' if square else '')})
(ROOT/'tasks/gate-2027-assets.json').write_text(json.dumps({'originals':originals,'derivatives':derivatives},ensure_ascii=False,indent=2)+'\n')
print('2 PDF originaux copiés, 4 PNG dérivés sans métadonnées, inventaire SHA-256 écrit.')
