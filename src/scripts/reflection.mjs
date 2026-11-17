import { usagePrompts, enforceExclusive } from '../lib/reflection.mjs';
export function initReflection(root) {
  if (!root || root.dataset.ready) return;
  root.dataset.ready = 'true'; root.classList.add('enhanced');
  const output = root.querySelector('[data-output]');
  const list = root.querySelector('[data-notes]');
  const prompts = root.querySelector('[data-prompts]');
  const fields = [...root.querySelectorAll('[data-field]')];
  const isUsage = root.dataset.reflection === 'usage';
  function clear() {
    root.querySelectorAll('input').forEach(input=>{input.checked=false;});
    root.querySelectorAll('textarea').forEach(input=>{input.value='';});
    list.replaceChildren(); prompts?.replaceChildren(); output.hidden=true;
  }
  root.addEventListener('change', event=>{
    const field=event.target.closest('[data-field]');
    if (!field || !isUsage) return;
    const exclusive=field.dataset.exclusive === '' ? null : Number(field.dataset.exclusive);
    const selected=[...field.querySelectorAll('input')].filter(input=>input.checked).map(input=>Number(input.value));
    const valid=enforceExclusive(selected,Number(event.target.value),exclusive);
    field.querySelectorAll('input').forEach(input=>{input.checked=valid.includes(Number(input.value));});
    output.hidden=true;
  });
  root.addEventListener('input',()=>{output.hidden=true;});
  root.addEventListener('click',event=>{
    const action=event.target.closest('button')?.dataset.action;
    if(action==='clear') {
      clear(); root.querySelector('input,textarea')?.focus();
      root.querySelector('[data-reset-status]').textContent='Toutes les réponses de cette page ont été effacées.';
      return;
    }
    if(action!=='reflect')return;
    root.querySelector('[data-reset-status]').textContent='';
    list.replaceChildren();prompts?.replaceChildren();
    const answers={};
    fields.forEach(field=>{
      const title=field.querySelector('[data-label]').textContent;
      let response;
      if(isUsage){
        const checked=[...field.querySelectorAll('input')].filter(input=>input.checked);
        answers[field.dataset.field]=checked.map(input=>Number(input.value));
        response=checked.map(input=>input.closest('label').querySelector('span').textContent).join(' ; ');
      }else response=field.querySelector('textarea').value.trim();
      const dt=root.ownerDocument.createElement('dt');dt.textContent=title;
      const dd=root.ownerDocument.createElement('dd');dd.textContent=response || 'Pas de réponse : tu peux laisser cette question de côté.';
      list.append(dt,dd);
    });
    if(isUsage)usagePrompts(answers).forEach(prompt=>{
      const li=root.ownerDocument.createElement('li');li.textContent=prompt.text+' ';
      const source=root.ownerDocument.createElement('a');source.href=`/resources/kit/test_numerico_dependance.pdf#page=${prompt.page}`;source.textContent=`Support p.${prompt.page}`;li.append(source);prompts.append(li);
    });
    output.hidden=false;output.querySelector('h2').focus();
  });
  root.ownerDocument.defaultView?.addEventListener('pagehide',clear);
  clear();
}
