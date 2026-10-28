import { EASE_OUT, gsap, ScrollTrigger } from './gsap';

export type Cleanup = () => void;

const ID = 'data-gsap';

/**
 * Marks elements GSAP animates. index.css then stops Tailwind's `transition-all` from also
 * animating opacity/transform on them, which would make the motion lag and stutter.
 */
export const tag = (targets: gsap.TweenTarget) => {
  gsap.utils.toArray<HTMLElement>(targets).forEach((el) => el.setAttribute(ID, ''));
};

export const untagAll = () => {
  document.querySelectorAll(`[${ID}]`).forEach((el) => el.removeAttribute(ID));
};

const REST = { opacity: 1, x: 0, y: 0, scale: 1, rotation: 0, rotateX: 0, rotateY: 0 };

/**
 * Hides every match, then plays it in as soon as it scrolls into view. Matches that enter
 * together are staggered, so a row of cards arrives as one gesture.
 */
export const batchIn = (
  selector: string,
  from: gsap.TweenVars,
  opts: { duration?: number; stagger?: number; start?: string } = {},
) => {
  const { duration = 0.9, stagger = 0.12, start = 'top 88%' } = opts;
  tag(selector);
  gsap.set(selector, { opacity: 0, ...from });
  ScrollTrigger.batch(selector, {
    start,
    once: true,
    onEnter: (batch) => gsap.to(batch, { ...REST, duration, ease: EASE_OUT, stagger, overwrite: true }),
  });
};

/** Section headings are wiped in from the left edge. */
export const headingWipe = (selector: string) => {
  gsap.utils.toArray<HTMLElement>(selector).forEach((heading) => {
    tag(heading);
    gsap.from(heading, {
      clipPath: 'inset(0 100% 0 0)',
      x: -30,
      opacity: 0,
      duration: 1.1,
      ease: 'power4.out',
      clearProps: 'clipPath',
      scrollTrigger: { trigger: heading, start: 'top 88%', once: true },
    });
  });
};

/** Counts a number up from zero, keeping the surrounding text ("8.91 CGPA", "94%"). */
export const countUp = (el: HTMLElement): Cleanup => {
  // Remember the real text on first sight so a re-run (React Strict Mode, hot reload)
  // never mistakes the zeroed text for the original.
  const original = (el.dataset.countOriginal ??= el.textContent ?? '');
  const match = original.match(/\d+(\.\d+)?/);
  if (!match) return () => undefined;

  const target = parseFloat(match[0]);
  const decimals = match[1] ? match[1].length - 1 : 0;
  const counter = { value: 0 };
  el.textContent = original.replace(match[0], (0).toFixed(decimals));

  const tween = gsap.to(counter, {
    value: target,
    duration: 1.6,
    ease: 'power2.out',
    scrollTrigger: { trigger: el, start: 'top 90%', once: true },
    onUpdate: () => {
      el.textContent = original.replace(match[0], counter.value.toFixed(decimals));
    },
    onComplete: () => {
      el.textContent = original;
    },
  });
  return () => {
    tween.scrollTrigger?.kill();
    tween.kill();
    el.textContent = original;
  };
};
