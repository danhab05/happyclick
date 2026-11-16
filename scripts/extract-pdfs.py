#!/usr/bin/env python3
"""Full PDF extraction and OCR of low-text pages; no source document is changed."""
from pathlib import Path
import subprocess,json,concurrent.futures
root=Path(__file__).resolve().parents[1]
textdir=root/'tasks/pdf-text'; images=root/'tasks/pdf-images'
textdir.mkdir(exist_ok=True); images.mkdir(exist_ok=True)
entries=[]; jobs=[]
for pdf in sorted((root/'public/resources').rglob('*.pdf')):
 out=textdir/(pdf.stem+'.txt')
 subprocess.run(['pdftotext','-layout',str(pdf),str(out)],check=True)
 pages=out.read_text().split('\f')[:-1]
 entry={'file':str(pdf.relative_to(root)),'pages':len(pages),'characters_per_page':[len(p.strip()) for p in pages],'ocr_pages':[]}
 entries.append(entry)
 for n,p in enumerate(pages,1):
  if len(p.strip())<260:
   entry['ocr_pages'].append(n);jobs.append((pdf,n))
def ocr(job):
 pdf,n=job; stem=f'{pdf.stem}-{n:02}'
 subprocess.run(['pdftoppm','-f',str(n),'-l',str(n),'-singlefile','-r','180','-jpeg','-jpegopt','quality=90',str(pdf),str(images/stem)],check=True,stdout=subprocess.DEVNULL,stderr=subprocess.PIPE)
 subprocess.run(['tesseract',str(images/(stem+'.jpg')),str(textdir/stem),'-l','fra+eng','--psm','3'],check=True,stdout=subprocess.DEVNULL,stderr=subprocess.PIPE)
 return stem
with concurrent.futures.ThreadPoolExecutor(max_workers=4) as pool:
 for stem in pool.map(ocr,jobs): print(stem,flush=True)
(textdir/'inventory.json').write_text(json.dumps(entries,indent=2)+'\n')
