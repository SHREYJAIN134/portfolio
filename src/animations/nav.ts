import { EASE_OUT, gsap, ScrollTrigger } from './gsap';
import { whenIntroDone } from './intro';
import { tag } from './utils';

/** Header slides in and its links follow, once the intro screen is dismissed. */
export const navIntro = () => {
  tag('header, header nav a');
  const tl = gsap
    .timeline({ paused: true, delay: 0.35, defaults: { ease: EASE_OUT } })
    .from('header', { yPercent: -100, opacity: 0, duration: 0.8 })
    .from('header nav a', { y: -14, opacity: 0, duration: 0.6, stagger: 0.06 }, 0.35);
  return whenIntroDone(() => tl.play());
};

/** Highlights the nav link of the section in view. State, not motion, so it always runs. */
export const navActive = () => {
  gsap.utils.toArray<HTMLAnchorElement>('header nav a[href^="#"]').forEach((link) => {
    const section = document.querySelector(link.getAttribute('href') ?? '');
    if (!section) return;
    ScrollTrigger.create({
      trigger: section,
      start: 'top 45%',
      end: 'bottom 45%',
      onToggle: (self) => {
        link.dataset.active = String(self.isActive);
      },
    });
  });
};
