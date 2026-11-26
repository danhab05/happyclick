const motion = matchMedia('screen and (prefers-reduced-motion: no-preference)');
let burst;

function clearBurst() {
  burst?.remove();
  burst = undefined;
}

document.addEventListener('click', event => {
  if (!motion.matches || event.button !== 0 || !(event.target instanceof Element)) return;
  const control = event.target.closest('a[href], button:enabled, summary, input:is([type=radio], [type=checkbox]):enabled');
  if (!control || control.getAttribute('aria-disabled') === 'true') return;

  // Labels forward activation to the input, including when tapped on its text.
  const box = (control.labels?.[0] || control).getBoundingClientRect();
  const fromPointer = event.detail > 0 && (event.clientX !== 0 || event.clientY !== 0);
  const x = fromPointer ? event.clientX : box.left + box.width / 2;
  const y = fromPointer ? event.clientY : box.top + box.height / 2;

  clearBurst();
  burst = document.createElement('span');
  burst.className = 'click-deal';
  burst.setAttribute('aria-hidden', 'true');
  burst.style.left = x + 'px';
  burst.style.top = y + 'px';
  burst.style.setProperty('--fan-y', y < 110 ? '1' : '-1');
  burst.style.setProperty('--fan-shift', (Math.max(0, 74 - x) - Math.max(0, x + 74 - document.documentElement.clientWidth)) + 'px');
  for (let i = 0; i < 3; i++) burst.append(document.createElement('i'));
  burst.addEventListener('animationend', e => {
    if (e.animationName === 'deal-burst-lifetime') e.currentTarget.remove();
  });
  document.body.append(burst);
}, true);

motion.addEventListener('change', clearBurst);
window.addEventListener('pagehide', clearBurst);
