import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { parseHTML } from 'linkedom';
import { QuizSession } from '../src/lib/quiz-state.mjs';
import { usagePrompts } from '../src/lib/reflection.mjs';
import { initQuiz } from '../src/scripts/quiz.mjs';
import { initReflection } from '../src/scripts/reflection.mjs';
const json = name => JSON.parse(readFileSync(new URL(`../src/data/${name}.json`,import.meta.url),'utf8'));
const questions=json('quiz');
const load = route => parseHTML(readFileSync(new URL(`../dist/${route}/index.html`,import.meta.url),'utf8'));
const click = (window,node) => node.dispatchEvent(new window.Event('click',{bubbles:true}));
const change = (window,node) => node.dispatchEvent(new window.Event('change',{bubbles:true}));

test('29 source cards: all 16 pages, exact answer key manually checked on the images',()=>{
 assert.equal(questions.length,29);
 assert.equal(new Set(questions.map(q=>q.id)).size,29);
 assert.deepEqual(['comportements','sante','ecologie'].map(t=>questions.filter(q=>q.theme===t).length),[10,8,11]);
 const expected='B A AC AD A C BD A C AC A B BD A C AD BCD B AB D C A B C AC A B CD AB'.split(' ');
 assert.deepEqual(questions.map(q=>q.answers.map(a=>String.fromCharCode(65+a)).join('')),expected);
 questions.forEach((q,i)=>{
  assert.equal(q.options.length,4);
  assert.equal(q.source.page,2*Math.floor(i/4)+1);
  assert.equal(q.source.answerPage,q.source.page+1);
  assert.equal(q.source.position,['HG','HD','BG','BD'][i%4]);
  assert.equal(q.source.answerPosition,['BG','BD','HG','HD'][i%4]);
  assert.ok(q.feedback.length>90);assert.ok(q.discussion.endsWith('?'));
 });
 for(const id of ['q06','q09','q12','q16','q17','q19','q24','q25','q26','q27'])assert.ok(questions.find(q=>q.id===id).nuance.length>60);
 assert.equal(questions[5].options[2],'P@ssw0rd!84');
});

test('questionnaires and roleplays cover the source counts and page ranges',()=>{
 const usage=json('usage'),teachers=json('teachers'),games=json('roles');
 assert.equal(usage.length,11);assert.deepEqual(usage.map(q=>q.options.length),[5,6,5,5,6,3,4,8,5,2,7]);
 assert.equal(teachers.length,14);assert.deepEqual(teachers.map(q=>q.page),[1,1,1,2,2,2,2,2,3,3,3,3,3,4]);
 assert.equal(games.length,3);
 assert.deepEqual(games.map(g=>g.rounds.flatMap(r=>r.questions).length),[12,12,7]);
 for(const g of games){assert.equal(g.roles.length,6);assert.equal(g.rounds.length,4);for(const r of g.rounds){assert.ok(r.context.length>100);assert.ok(r.help.length>100);assert.ok(r.page<g.pages);}}
 assert.equal(games[2].rounds[1].debriefPage,null);assert.equal(games[2].rounds[3].answerPage,null);
});

test('session requires a choice and validation, locks validated answers, supports previous/reset',()=>{
 const session=new QuizSession(questions);
 assert.equal(session.validate(),false);assert.equal(session.next(),false);
 assert.throws(()=>session.select([4]));
 session.select([1,1]);assert.deepEqual(session.selections[0],[1]);
 session.validate();assert.equal(session.matches(),true);assert.equal(session.select([0]),false);
 session.next();session.previous();assert.deepEqual(session.selections[0],[1]);
 session.reset();assert.equal(session.validated.size,0);assert.equal(session.finished,false);
 assert.ok(session.selections.every(values=>values.length===0));
});

for(const theme of ['comportements','sante','ecologie','tout']){
 test(`DOM discussion flow: ${theme}, all cards, multiple answers, previous, summary and replay`,()=>{
  const {document,window}=load(`quiz/${theme}`);const root=document.querySelector('[data-quiz]');
  const session=initQuiz(root);const cards=[...root.querySelectorAll('[data-question]')];
  assert.equal(cards.filter(card=>!card.hidden).length,1);
  click(window,cards[0].querySelector('[data-validate]'));
  assert.match(cards[0].querySelector('[data-error]').textContent,/Cochez au moins une réponse/);
  cards.forEach((card,index)=>{
   assert.equal(card.hidden,false);
   const expected=card.dataset.answers.split(',').map(Number);
   // A partial answer to a multi-answer card must also count as incorrect.
   const wrong = index === 0 || expected.length > 1;
   const values = !wrong ? expected : expected.length > 1 ? expected.slice(1) : [(expected[0]+1)%4];
   values.forEach(value=>{const input=card.querySelectorAll('input')[value];input.checked=true;change(window,input);});
   assert.deepEqual(session.selections[index],values);
   click(window,card.querySelector('[data-validate]'));
   assert.equal(card.querySelector('[data-feedback]').hidden,false);
   assert.equal(card.querySelector('fieldset').disabled,true);
   assert.equal(card.querySelector('[data-next]').hidden,false);
   assert.equal(card.querySelector('[data-feedback-title]').textContent,wrong ? 'Pas tout à fait' : 'Bonne réponse !');
   assert.equal(root.querySelector('progress').value,index+1);
   if(index===1){
    click(window,card.querySelector('[data-previous]'));
    assert.equal(cards[0].hidden,false);assert.equal(cards[0].querySelector('[data-feedback]').hidden,false);
    click(window,cards[0].querySelector('[data-next]'));assert.equal(card.hidden,false);
   }
   click(window,card.querySelector('[data-next]'));
  });
  assert.equal(session.finished,true);assert.equal(root.querySelector('[data-end]').hidden,false);
  assert.equal(root.querySelectorAll('[data-review]>details').length,cards.length);
  assert.match(root.querySelector('[data-counter]').textContent,/explorées/);
  const correct = cards.filter((c,i)=>i>0 && c.dataset.answers.split(',').length===1).length;
  assert.equal(root.querySelector('[data-score]').textContent,`${correct} / ${cards.length}`);
  click(window,root.querySelector('[data-action=reset]'));
  assert.equal(session.finished,false);assert.equal(session.validated.size,0);
  assert.equal(root.querySelector('[data-score]').textContent,'');
  assert.equal(root.querySelector('progress').value,0);
  assert.equal(cards[0].hidden,false);assert.equal(root.querySelectorAll('[data-review]>details').length,0);
  assert.ok([...root.querySelectorAll('input')].every(input=>!input.checked));
 });
}

test('usage questionnaire: non-exclusive/exclusive choices, descriptive recap, no diagnosis, clearing',()=>{
 const {document,window}=load('mes-usages');const root=document.querySelector('[data-reflection]');initReflection(root);
 const equipment=root.querySelector('[data-field=usage-5]');const inputs=equipment.querySelectorAll('input');
 inputs[0].checked=true;change(window,inputs[0]);inputs[5].checked=true;change(window,inputs[5]);
 assert.equal(inputs[0].checked,false);assert.equal(inputs[5].checked,true);
 inputs[1].checked=true;change(window,inputs[1]);assert.equal(inputs[5].checked,false);
 click(window,root.querySelector('[data-action=reflect]'));
 assert.equal(root.querySelector('[data-output]').hidden,false);assert.equal(root.querySelectorAll('[data-notes] dt').length,11);
 assert.match(root.querySelector('[data-notes]').textContent,/Oui, une tablette/);
 assert.doesNotMatch(root.querySelector('[data-output]').textContent,/dépendant|addict|risque élevé|score de/);
 click(window,root.querySelector('[data-action=clear]'));assert.equal(root.querySelector('[data-output]').hidden,true);
 assert.ok([...root.querySelectorAll('input')].every(input=>!input.checked));assert.equal(root.querySelector('[data-notes]').textContent,'');
});

test('reflection prompts do not classify duration or infer diagnosis',()=>{
 const baseline=usagePrompts({});
 for(let i=0;i<7;i++)assert.deepEqual(usagePrompts({'usage-11':[i]}),baseline);
 assert.ok(usagePrompts({'usage-3':[3],'usage-9':[0],'usage-10':[0]}).length>=3);
});

test('teacher notes are rendered as text, not HTML, and fully cleared',()=>{
 const {document,window}=load('kit/reflexion');const root=document.querySelector('[data-reflection]');initReflection(root);
 root.querySelector('textarea').value='<img src=x onerror=alert(1)> Une réflexion personnelle';
 click(window,root.querySelector('[data-action=reflect]'));
 assert.equal(root.querySelectorAll('[data-notes] dt').length,14);
 assert.equal(root.querySelector('[data-notes] img'),null);
 assert.match(root.querySelector('[data-notes]').textContent,/<img/);
 window.dispatchEvent(new window.Event('pagehide'));
 assert.equal(root.querySelector('textarea').value,'');assert.equal(root.querySelector('[data-notes]').textContent,'');
});
