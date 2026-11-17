#!/usr/bin/env python3
"""Compare all archived PDF pages with the existing public copies at 1200 px.
Requires the supplied archive files in /tmp/happyclick-gate-2027.
"""
from pathlib import Path
from PIL import Image,ImageChops,ImageStat
import subprocess,concurrent.futures,json,hashlib
root=Path(__file__).resolve().parents[1]; tmp=Path('/tmp/happyclick-gate-analysis/archive-renders'); tmp.mkdir(exist_ok=True)
rows=json.loads((root/'tasks/gate-2027-archives.json').read_text())
def compare(row):
    key=Path(row['archive']).stem; archive=Path('/tmp/happyclick-gate-2027')/row['archive']; existing=root/row['existing']
    for label,pdf in [('drive',archive),('site',existing)]:
        subprocess.run(['pdftoppm','-scale-to','1200','-png',str(pdf),str(tmp/f'{key}-{label}')],check=True,stdout=subprocess.DEVNULL,stderr=subprocess.PIPE)
    out=[]
    for i in range(1,row['pages']+1):
        def path(label): return next(tmp.glob(f'{key}-{label}-{i:02}.png'),tmp/f'{key}-{label}-{i}.png')
        a=Image.open(path('drive')).convert('RGB');b=Image.open(path('site')).convert('RGB');same=a.size==b.size and a.tobytes()==b.tobytes()
        diff=ImageChops.difference(a,b)
        out.append({'page':i,'pixelEqualAt1200':same,'size':a.size,'diffBBox':diff.getbbox(),'meanAbsDifference':ImageStat.Stat(diff).mean})
    row['renderComparison']=out
    print(key,'pixels identiques',sum(x['pixelEqualAt1200'] for x in out),'/',len(out),flush=True)
    return row
with concurrent.futures.ThreadPoolExecutor(max_workers=2) as pool: rows=list(pool.map(compare,rows))
card_dir=tmp/'embedded-cards';card_dir.mkdir(exist_ok=True)
for label,pdf in [('drive',Path('/tmp/happyclick-gate-2027/archive-cartes.pdf')),('site',root/'public/resources/kit/activite_cartes_a_imprimer.pdf')]:
    subprocess.run(['pdfimages','-j',str(pdf),str(card_dir/label)],check=True)
a=sorted(card_dir.glob('drive-*'));b=sorted(card_dir.glob('site-*'));assert len(a)==len(b)==16
cards=next(row for row in rows if row['archive']=='archive-cartes.pdf')
cards['embeddedImages']=[{'page':i+1,'sha256':hashlib.sha256(x.read_bytes()).hexdigest(),'bytesEqual':x.read_bytes()==y.read_bytes()} for i,(x,y) in enumerate(zip(a,b))]
(root/'tasks/gate-2027-archives.json').write_text(json.dumps(rows,ensure_ascii=False,indent=2)+'\n')
