import { gsap, ScrollTrigger, SplitText } from './gsap';
import { batchIn, countUp, headingWipe, tag, type Cleanup } from './utils';

/*
 * One entrance per section, each with its own direction and rhythm, so the page does not
 * read as one repeated fade. Selectors match the current markup of each component.
 */

/*
 * Full-screen section transitions. Each section is revealed across the whole viewport in its
 * own way, tied to the scroll position (scrubbed), so it plays forwards and backwards as you
 * scroll. The area not yet revealed shows the page background, so it stays seamless.
 */
const FULL = 'polygon(0 0, 100% 0, 100% 100%, 0 100%)';

const transition = (selector: string, from: gsap.TweenVars, to: gsap.TweenVars) => {
  const el = document.querySelector<HTMLElement>(selector);
  if (!el) return;
  tag(el);
  gsap.fromTo(el, from, {
    ...to,
    ease: 'none',
    scrollTrigger: { trigger: el, start: 'top 95%', end: 'top 10%', scrub: 0.8 },
  });
};

export const sectionTransitions = () => {
  // The hero steps back and dims while the next section covers it.
  const heroContent = '#hero > div[class*="z-10"]';
  tag(heroContent);
  gsap.to(heroContent, {
    scale: 0.92,
    opacity: 0.25,
    ease: 'none',
    scrollTrigger: { trigger: '#hero', start: 'top top', end: 'bottom top', scrub: true },
  });

  // About: an iris opens from the top centre. Radius is in px, not %, because sections are
  // much taller than the screen and a % radius would be sized to the whole section.
  transition('#about', { clipPath: 'circle(0px at 50% 0%)' }, { clipPath: 'circle(1800px at 50% 0%)' });
  // Academics: two doors open from the centre line.
  transition('#academics', { clipPath: 'inset(0% 50% 0% 50%)' }, { clipPath: 'inset(0% 0% 0% 0%)' });
  // Projects: wiped in from the right edge while zooming out.
  transition(
    '#projects',
    { clipPath: 'inset(0% 0% 0% 100%)', scale: 1.12, transformOrigin: '50% 0%' },
    { clipPath: 'inset(0% 0% 0% 0%)', scale: 1 },
  );
  // Hobbies: a diagonal edge sweeps across from the left.
  transition('#hobbies', { clipPath: 'polygon(0 0, 0 0, -40% 100%, 0 100%)' }, { clipPath: FULL });
  // Contact: tips up like a page being turned.
  transition(
    '#contact',
    { rotateX: 35, y: 120, opacity: 0.2, transformPerspective: 1100, transformOrigin: '50% 0%' },
    { rotateX: 0, y: 0, opacity: 1 },
  );
};

/** About: text arrives from the left, the facet cards from the right, the quote is read by scrolling. */
export const about = (): Cleanup => {
  headingWipe('#about h2');
  batchIn('#about [class*="col-span-6"]:first-child > :not(h2)', { x: -60 });
  batchIn('#about [class*="col-span-6"]:last-child > *', { x: 60 }, { stagger: 0.18 });

  // The quote lights up word by word as you scroll through it.
  const quote = document.querySelector<HTMLElement>('#about blockquote');
  if (!quote) return () => undefined;
  const split = SplitText.create(quote, { type: 'words' });
  gsap.fromTo(
    split.words,
    { opacity: 0.15 },
    {
      opacity: 1,
      stagger: 0.1,
      ease: 'none',
      scrollTrigger: { trigger: quote, start: 'top 80%', end: 'bottom 50%', scrub: true },
    },
  );
  return () => split.revert();
};

/** Academics: cards slide in from opposite sides, details cascade, and the scores count up. */
export const academics = (): Cleanup => {
  headingWipe('#academics h2');
  batchIn('#academics .grid > div:nth-child(odd)', { x: -80, rotation: -1.5 }, { duration: 1 });
  batchIn('#academics .grid > div:nth-child(even)', { x: 80, rotation: 1.5 }, { duration: 1 });

  // Bullet lines inside each card follow their card.
  gsap.utils.toArray<HTMLElement>('#academics .grid > div').forEach((card) => {
    const items = card.querySelectorAll('li');
    tag(items);
    gsap.from(items, {
      x: -16,
      opacity: 0,
      stagger: 0.12,
      duration: 0.7,
      ease: 'power2.out',
      scrollTrigger: { trigger: card, start: 'top 75%', once: true },
    });
  });

  const counters = gsap.utils
    .toArray<HTMLElement>('#academics .grid > div span[class*="text-3xl"]')
    .map((el) => countUp(el));
  return () => counters.forEach((fn) => fn());
};

/** Projects: cards tip up out of the page, then their technology badges pop in one by one. */
export const projects = () => {
  headingWipe('#projects h2');
  tag('#projects article');
  batchIn('#projects a[href="https://github.com/SHREYJAIN134"]', { x: 40 });
  batchIn('#projects article', { y: 90, rotateX: 14, transformPerspective: 900 }, { duration: 1, stagger: 0.15 });

  gsap.utils.toArray<HTMLElement>('#projects article').forEach((card) => {
    const badges = card.querySelectorAll('span[class*="rounded-md"]');
    tag(badges);
    gsap.from(badges, {
      scale: 0.6,
      opacity: 0,
      stagger: 0.06,
      duration: 0.5,
      ease: 'back.out(2)',
      scrollTrigger: { trigger: card, start: 'top 70%', once: true },
    });
  });
};

/** Hobbies: the two cards come from opposite sides, then their icons spin into place. */
export const hobbies = () => {
  headingWipe('#hobbies h2');
  batchIn('#hobbies h2 + p', { y: 30 });
  batchIn('#hobbies .grid > div:first-child', { x: -90 }, { duration: 1 });
  batchIn('#hobbies .grid > div:last-child', { x: 90 }, { duration: 1 });

  gsap.utils.toArray<HTMLElement>('#hobbies .grid > div').forEach((card) => {
    const icon = card.querySelector('svg');
    if (!icon) return;
    tag(icon);
    gsap.from(icon, {
      rotation: -180,
      scale: 0,
      duration: 0.9,
      ease: 'back.out(1.8)',
      scrollTrigger: { trigger: card, start: 'top 75%', once: true },
    });
  });
};

/** Contact: the intro text rises, the contact links slide in one by one, the form scales up. */
export const contact = () => {
  headingWipe('#contact h2');
  batchIn('#contact [class*="col-span-6"]:first-child > :not(h2):not([class*="space-y-3"])', { y: 40 });
  batchIn('#contact [class*="space-y-3"] > a', { x: -50 }, { stagger: 0.1, duration: 0.8 });
  batchIn('#contact [class*="col-span-6"]:last-child > div', { y: 60, scale: 0.94 }, { duration: 1 });
};

export const footer = () => {
  batchIn('footer > div', { y: 30 });
};

/** Re-measure trigger positions once fonts/images have settled the layout. */
export const refreshOnSettle = (): Cleanup => {
  const refresh = () => ScrollTrigger.refresh();
  document.fonts?.ready.then(refresh);
  window.addEventListener('load', refresh);
  return () => window.removeEventListener('load', refresh);
};
