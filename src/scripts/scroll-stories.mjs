// Only layout changes trigger measurement. Scrolling updates a cached timeline once per frame.
export function initScrollStories(doc) {
  const roots = [...doc.querySelectorAll('[data-scroll-story]')];
  if (!roots.length || !CSS.supports('width', '1cqw') || !CSS.supports('height', '100svh')) return;
  const motion = matchMedia('screen and (prefers-reduced-motion: no-preference) and (min-height: 530px)');
  const stories = roots.map(root => ({
    root,
    stage: root.querySelector('.story-stage'),
    origin: root.querySelector('.glass-origin'),
  }));
  const clamp = value => Math.min(1, Math.max(0, value));
  const tapAt = .24;
  let frame = 0;

  function paint() {
    frame = 0;
    for (const story of stories) {
      if (!story.active) continue;
      const progress = clamp((window.scrollY - story.start) / story.travel);
      if (progress === story.previous) continue;
      story.previous = progress;
      const style = story.root.style;
      // The opening camera starts at contact. The other chapters use their whole track.
      const scene = story.origin ? clamp((progress - tapAt) / (1 - tapAt)) : progress;
      style.setProperty('--p', progress.toFixed(5));
      style.setProperty('--out', clamp(scene / .7).toFixed(5));
      style.setProperty('--in', clamp((scene - .32) / .53).toFixed(5));
      story.root.dataset.face = scene < .55 ? 'first' : 'last';
      if (!story.origin) continue;
      const release = clamp((scene - .065) / .18);
      const gap = clamp(1 - progress / tapAt) + .75 * release;
      style.setProperty('--hand-gap', gap.toFixed(5));
      style.setProperty('--hand-opacity', (1 - release).toFixed(5));
      style.setProperty('--tap-flash', progress < tapAt ? '0' : (1 - clamp(scene / .18)).toFixed(5));
      style.setProperty('--through', scene.toFixed(5));
      const aim = clamp(scene / .58);
      const dx = (story.width / 2 - story.glassX) * aim;
      const dy = (story.height / 2 - story.glassY) * aim;
      style.setProperty('--dx', dx.toFixed(2) + 'px');
      style.setProperty('--dy', dy.toFixed(2) + 'px');
      style.setProperty('--cx', (story.glassX + dx).toFixed(2) + 'px');
      style.setProperty('--cy', (story.glassY + dy).toFixed(2) + 'px');
      const aperture = clamp(scene / .78);
      const radius = Math.hypot(story.width, story.height) * .74 * aperture ** 1.25;
      style.setProperty('--iris', radius.toFixed(2) + 'px');
      style.setProperty('--room-scale', Math.min(1, Math.max(.012, 1.94 * radius / story.width)).toFixed(4));
    }
  }

  function measure() {
    for (const story of stories) {
      const {root, stage} = story;
      root.toggleAttribute('data-running', motion.matches);
      // Staged props deliberately extend outside the frame. Measure the readable
      // blocks, not the transformed overflow of an entire animated face.
      const height = stage.clientHeight;
      const cover = root.querySelector('.poster-grid');
      const room = root.querySelector('.classroom');
      const intro = root.querySelector('.print-intro');
      const title = root.querySelector('.table-title');
      let fits;
      if (cover) fits = cover.offsetHeight + 50 <= height && room.offsetHeight <= height;
      else if (intro) fits = intro.offsetHeight < height * .45 && title.offsetHeight < height * .32;
      else fits = [...root.querySelectorAll('.year-layout')].every(page => page.offsetHeight + 20 <= height);
      story.active = motion.matches && fits && stage.clientWidth >= 300;
      root.toggleAttribute('data-running', story.active);
      story.previous = undefined;
    }
    for (const [index, story] of stories.entries()) {
      if (!story.active) continue;
      const {root, stage, origin} = story;
      const rect = root.getBoundingClientRect();
      const naturalStart = rect.top + window.scrollY;
      story.start = index === 0 && naturalStart < 140 ? 0 : naturalStart;
      story.travel = Math.max(1, naturalStart - story.start + root.offsetHeight - stage.offsetHeight);
      if (!origin) continue;
      const glass = origin.getBoundingClientRect();
      const pin = stage.getBoundingClientRect();
      story.glassX = glass.left - pin.left;
      story.glassY = glass.top - pin.top;
      story.width = pin.width;
      story.height = pin.height;
    }
    paint();
  }

  // Reveal the requested page when a keyboard user tabs ahead, or follows a chapter link.
  function reveal(target) {
    const face = target?.closest('[data-story-face]');
    if (!face) return;
    const story = stories.find(item => item.active && item.root.contains(face));
    if (!story) return;
    const last = face.dataset.storyFace === 'last';
    if ((last && story.previous < .86) || (!last && story.previous > .12)) {
      window.scrollTo({top: story.start + story.travel * (last ? .94 : 0), behavior: 'instant'});
      paint();
    }
  }
  function revealHash() {
    reveal(doc.getElementById(window.location.hash.slice(1)));
  }

  measure();
  doc.fonts?.ready.then(() => { measure(); revealHash(); });
  motion.addEventListener('change', measure);
  window.addEventListener('resize', measure);
  window.addEventListener('pageshow', measure);
  // Native disclosures above a later scene can change its starting position.
  doc.addEventListener('toggle', measure, true);
  window.addEventListener('scroll', () => {
    if (!frame && motion.matches) frame = requestAnimationFrame(paint);
  }, {passive: true});
  doc.addEventListener('focusin', event => {
    if (event.target.matches(':focus-visible')) reveal(event.target);
  });
  window.addEventListener('hashchange', revealHash);
}
