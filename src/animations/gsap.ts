import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';

// Single registration point so every module shares one GSAP instance.
gsap.registerPlugin(ScrollTrigger, SplitText);

// Phone browsers resize the viewport as the address bar hides; don't recompute every trigger for it.
ScrollTrigger.config({ ignoreMobileResize: true });

export { gsap, ScrollTrigger, SplitText };

export const EASE_OUT = 'power3.out';
