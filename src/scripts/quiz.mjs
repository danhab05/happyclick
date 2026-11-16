import { QuizSession } from '../lib/quiz-state.mjs';

export function initQuiz(root) {
  if (!root || root.dataset.ready) return;
  const cards = [...root.querySelectorAll('[data-question]')];
  const questions = cards.map(card => ({
    options: [...card.querySelectorAll('input[type=checkbox]')].map(input => input.value),
    answers: card.dataset.answers.split(',').map(Number),
  }));
  const session = new QuizSession(questions);
  const end = root.querySelector('[data-end]');
  const counter = root.querySelector('[data-counter]');
  const progress = root.querySelector('progress');
  const summary = root.querySelector('[data-review]');
  root.classList.add('enhanced');
  root.dataset.ready = 'true';
  function focus(element) { element?.focus(); }
  function render() {
    cards.forEach((card,index) => {
      card.hidden = session.finished || index !== session.index;
      const validated = session.validated.has(index);
      card.querySelector('fieldset').disabled = validated;
      card.querySelectorAll('input').forEach(input => { input.checked = session.selections[index].includes(Number(input.value)); });
      const feedback = card.querySelector('[data-feedback]');
      feedback.hidden = !validated;
      feedback.open = validated;
      card.querySelector('[data-validate]').hidden = validated;
      card.querySelector('[data-next]').hidden = !validated;
      card.querySelector('[data-previous]').disabled = index === 0;
      card.querySelector('[data-comparison]').textContent = validated
        ? session.matches(index) ? 'Tes choix rejoignent le corrigé du support. Prenons le temps de l’examiner.' : 'Tes choix diffèrent du corrigé du support. Comparons les raisonnements.'
        : '';
    });
    end.hidden = !session.finished;
    progress.value = session.validated.size;
    counter.textContent = session.finished ? `${cards.length} cartes explorées` : `Carte ${session.index+1} sur ${cards.length}`;
    if (session.finished) {
      summary.replaceChildren();
      cards.forEach((card,index) => {
        const details = root.ownerDocument.createElement('details');
        const title = root.ownerDocument.createElement('summary');
        title.textContent = `${index+1}. ${card.querySelector('h2').textContent}`;
        const body = root.ownerDocument.createElement('div');
        body.className = 'details-body';
        const selection = root.ownerDocument.createElement('p');
        const labels = [...card.querySelectorAll('.choice-text')];
        selection.textContent = `Tes choix : ${session.selections[index].map(value => labels[value].textContent).join(' · ')}`;
        body.append(selection);
        const feedback = card.querySelector('[data-feedback-body]').cloneNode(true);
        feedback.querySelectorAll('[id]').forEach(node => node.removeAttribute('id'));
        feedback.querySelector('[data-comparison]')?.remove();
        body.append(feedback);
        details.append(title,body);
        summary.append(details);
      });
    }
  }
  root.addEventListener('change', event => {
    if (!event.target.matches('input[type=checkbox]')) return;
    const card = cards[session.index];
    session.select([...card.querySelectorAll('input')].filter(input=>input.checked).map(input=>Number(input.value)));
    card.querySelector('[data-error]').textContent = '';
  });
  root.addEventListener('click', event => {
    const action = event.target.closest('button')?.dataset.action;
    if (!action) return;
    const card = cards[session.index];
    if (action === 'validate') {
      if (!session.validate()) {
        card.querySelector('[data-error]').textContent = 'Choisis au moins une proposition avant de comparer au support.';
        focus(card.querySelector('input'));
        return;
      }
      render();
      focus(card.querySelector('[data-feedback-title]'));
    } else if (action === 'next' && session.next()) {
      render(); focus(session.finished ? end.querySelector('h2') : cards[session.index].querySelector('h2'));
    } else if (action === 'previous' && session.previous()) {
      render(); focus(cards[session.index].querySelector('h2'));
    } else if (action === 'reset') {
      session.reset();
      summary.replaceChildren();
      cards.forEach(c=>{c.querySelector('[data-error]').textContent='';});
      render(); focus(cards[0].querySelector('h2'));
    }
  });
  // Do not let back-forward cache restore a participant's previous session.
  root.ownerDocument.defaultView?.addEventListener('pagehide', () => {
    session.reset(); summary.replaceChildren(); render();
  });
  render();
  return session;
}
