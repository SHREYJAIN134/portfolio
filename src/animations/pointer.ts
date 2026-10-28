import { EASE_OUT, gsap } from './gsap';
import { tag, type Cleanup } from './utils';

const listen = (el: HTMLElement, handlers: Record<string, EventListener>): Cleanup => {
  Object.entries(handlers).forEach(([type, fn]) => el.addEventListener(type, fn));
  return () => Object.entries(handlers).forEach(([type, fn]) => el.removeEventListener(type, fn));
};

/** Cards rise slightly under the pointer. */
export const cardHover = (): Cleanup => {
  const cards = gsap.utils.toArray<HTMLElement>('#projects article, #academics .grid > div, #hobbies .grid > div');
  tag(cards);
  const offs = cards.map((card) =>
    listen(card, {
      pointerenter: () => gsap.to(card, { y: -6, duration: 0.35, ease: EASE_OUT, overwrite: 'auto' }),
      pointerleave: () => gsap.to(card, { y: 0, duration: 0.5, ease: EASE_OUT, overwrite: 'auto' }),
    }),
  );
  return () => offs.forEach((off) => off());
};

/** Buttons lean toward the pointer. */
export const magnetic = (): Cleanup => {
  const els = gsap.utils.toArray<HTMLElement>('header a[href="#contact"], #hero a, footer button');
  tag(els);
  const offs = els.map((el) => {
    const xTo = gsap.quickTo(el, 'x', { duration: 0.4, ease: EASE_OUT });
    const yTo = gsap.quickTo(el, 'y', { duration: 0.4, ease: EASE_OUT });
    return listen(el, {
      pointermove: (e) => {
        const { clientX, clientY } = e as PointerEvent;
        const r = el.getBoundingClientRect();
        xTo((clientX - (r.left + r.width / 2)) * 0.25);
        yTo((clientY - (r.top + r.height / 2)) * 0.25);
      },
      pointerleave: () => {
        xTo(0);
        yTo(0);
      },
    });
  });
  return () => offs.forEach((off) => off());
};
