import { useLayoutEffect } from 'react';
import { gsap } from './gsap';
import { heroIntro, heroPhotoPointer, heroPhotoReveal, heroScroll } from './hero';
import { navActive, navIntro } from './nav';
import { cardHover, magnetic } from './pointer';
import * as section from './sections';
import { untagAll, type Cleanup } from './utils';

/*
 * Site-wide GSAP motion, split by area: hero.ts, nav.ts, sections.ts (one function per
 * section) and pointer.ts. Components stay untouched; targets are found by selector, so
 * if a section's markup changes, update the selectors in the matching file.
 *
 * Anything that hides or moves content runs inside gsap.matchMedia, so with
 * prefers-reduced-motion nothing is animated and nothing stays invisible.
 */
export const useSiteAnimations = () => {
  useLayoutEffect(() => {
    const cleanups: Cleanup[] = [];

    const state = gsap.context(() => navActive());

    const motion = gsap.matchMedia();
    motion.add('(prefers-reduced-motion: no-preference)', () => {
      cleanups.push(navIntro(), heroIntro());
      cleanups.push(heroPhotoReveal());
      cleanups.push(section.about(), section.academics());
      section.projects();
      section.hobbies();
      section.contact();
      section.footer();
      return untagAll;
    });

    // Full-screen scrubbed section transitions only on wide screens. When the layout stacks on a
    // phone each section is several screens tall, and scrubbing across it keeps content hidden or
    // dimmed for most of the scroll. Phones get just the per-element reveals above.
    const wide = gsap.matchMedia();
    wide.add('(prefers-reduced-motion: no-preference) and (min-width: 1024px)', () => {
      heroScroll();
      section.sectionTransitions();
    });

    const pointer = gsap.matchMedia();
    pointer.add('(prefers-reduced-motion: no-preference) and (hover: hover) and (pointer: fine)', () => {
      const offs = [cardHover(), magnetic(), heroPhotoPointer()];
      return () => offs.forEach((off) => off());
    });

    cleanups.push(section.refreshOnSettle());

    return () => {
      cleanups.forEach((fn) => fn());
      pointer.revert();
      wide.revert();
      motion.revert();
      state.revert();
    };
  }, []);
};
