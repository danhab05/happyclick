import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { parseHTML } from 'linkedom';
import { createHash } from 'node:crypto';
const read = file => readFileSync(new URL(`../${file}`,import.meta.url));
const games=JSON.parse(read('src/data/roles.json'));
const html=route=>parseHTML(read(`dist/${route}/index.html`).toString()).document;

test('2027 addiction retains six roles and twelve source questions with correct V2 pages',()=>{
 const g=games.find(g=>g.slug==='addiction');
 assert.equal(g.file,'/resources/kit/2027/addiction-v2.pdf');assert.equal(g.pages,24);
 assert.equal(g.roles.length,6);assert.equal(g.rounds.length,4);
 assert.deepEqual(g.rounds.map(r=>[r.page,r.helpPage,r.debriefPage,r.answerPage]),[[8,9,10,11],[12,13,14,15],[16,17,18,19],[20,21,22,23]]);
 assert.equal(g.rounds.flatMap(r=>r.questions).length,12);
 const doc=html('kit/roles/addiction');
 for(const r of g.rounds){
  for(const q of r.questions)assert.ok(doc.body.textContent.includes(q));
  for(const page of [r.page,r.helpPage,r.debriefPage,r.answerPage])assert.ok(doc.querySelector(`a[href="${g.file}#page=${page}"]`));
 }
 assert.match(doc.body.textContent,/pas des prescriptions ni un diagnostic/);
});

test('V2, photographic V1 and historical archive are available on kit and game, with no loss of old resources',()=>{
 for(const route of ['kit','kit/roles/addiction']){
  const doc=html(route);
  const expected=['/resources/kit/2027/addiction-v2.pdf','/resources/kit/2027/addiction-v1.pdf','/resources/kit/rp_addiction.pdf'];
  for(const file of expected){assert.ok(doc.querySelector(`a[download][href="${file}"]`));assert.ok(doc.querySelector(`object[data="${file}"]`));}
  assert.ok(doc.body.textContent.indexOf('V2 ·')<doc.body.textContent.indexOf('V1 ·'));
  assert.match(doc.body.textContent,/Archive.*2025–2026/);
 }
 assert.equal(html('kit').querySelectorAll('a[download]').length,8);
 assert.equal(games.length,3);
});

test('new PDFs and real PNG derivatives match the provenance manifest, favicon has transparent padding',()=>{
 const manifest=JSON.parse(read('tasks/gate-2027-assets.json'));
 const assets=[...manifest.originals.filter(a=>a.local),...manifest.derivatives];
 for(const a of assets)assert.equal(createHash('sha256').update(read('public'+a.local)).digest('hex'),a.sha256);
 const source=manifest.originals.find(a=>a.file==='logo-sans-fond.png');assert.deepEqual(source.alphaRange,[0,255]);
 assert.deepEqual(manifest.originals.find(a=>a.file==='logo-transparent.png').alphaRange,[255,255]);
 for(const route of ['projet-2027','faq','kit']){
  const doc=html(route);
  assert.equal(doc.querySelector('link[rel=icon]').getAttribute('href'),'/assets/2027/favicon-96.png');
  assert.equal(doc.querySelector('header .brand img').getAttribute('src'),'/assets/2027/logo-128.png');
  assert.equal(doc.querySelector('footer .brand img').getAttribute('src'),'/assets/2027/logo-128.png');
  assert.equal(doc.querySelector('meta[name=robots]').getAttribute('content'),'noindex, nofollow');
  assert.equal(doc.querySelectorAll('script,form').length,0);
 }
 const png=read('public/assets/2027/favicon-96.png');assert.equal(png.readUInt32BE(16),96);assert.equal(png.readUInt32BE(20),96);assert.equal(png[25],6);
});

test('project and FAQ distinguish editions and point readers to usable activities without private links',()=>{
 const doc=html('projet-2027');
 for(const value of ['2026–2027','2025–2026','2024–2025','Évry-Courcouronnes','Joséphine Journé','Souleïman Allouchi','Ouziel Ohnona'])assert.ok(doc.body.textContent.includes(value));
 assert.ok(doc.querySelector('a[href="/faq"]'));
 const faq=html('faq');assert.ok(faq.querySelectorAll('details').length>=6);
 for(const route of ['/kit','/quiz','/guides','/mes-usages','/kit/reflexion'])assert.ok(faq.querySelector(`a[href="${route}"]`));
 for(const page of [doc,faq])assert.doesNotMatch(page.toString(),/drive\.google\.com|docs\.google\.com|mailto:|tel:/);
});
