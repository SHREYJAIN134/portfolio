import React, { lazy, Suspense, useLayoutEffect, useRef, useState } from 'react';
import { gsap } from '../animations/gsap';
import { markIntroDone } from '../animations/intro';
import { GithubIcon, InstagramIcon, LinkedinIcon } from './SocialIcons';

// The 3D object is a separate chunk, fetched only when the intro is shown.
const IntroScene = lazy(() => import('./IntroScene'));

// Icons use each app's brand colour. GitHub's own black would vanish on the dark intro, so it
// uses white; Instagram uses its gradient (defined once in the <svg> inside the component).
const socials = [
  {
    name: 'LinkedIn',
    handle: 'in/shrey-jain-7b717436a',
    href: 'https://www.linkedin.com/in/shrey-jain-7b717436a/',
    Icon: LinkedinIcon,
    iconClass: 'text-[#0A66C2]',
  },
  {
    name: 'Instagram',
    handle: '@shrey_jain767',
    href: 'https://www.instagram.com/shrey_jain767?stkn=d2JvOHZiam0wOGx1',
    Icon: InstagramIcon,
    iconClass: '[stroke:url(#pre-instagram)]',
  },
  {
    name: 'GitHub',
    handle: '@SHREYJAIN134',
    href: 'https://github.com/SHREYJAIN134',
    Icon: GithubIcon,
    iconClass: 'text-white',
  },
];

// Full-screen intro: an interactive 3D object, the name, a 0-100 counter and the social links.
// It stays until the visitor scrolls (wheel, swipe, arrow/page keys or the button), then two
// halves of the screen part like curtains to reveal the page. Skipped for prefers-reduced-motion.
export const Preloader: React.FC = () => {
  const [done, setDone] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  );
  const root = useRef<HTMLDivElement>(null);
  const counter = useRef<HTMLSpanElement>(null);
  const enter = useRef<() => void>(() => undefined);

  useLayoutEffect(() => {
    if (done || !root.current) return;
    const html = document.documentElement;
    html.style.overflow = 'hidden'; // the page does not scroll behind the intro
    // Always start from the top: no browser scroll restoration under the intro.
    history.scrollRestoration = 'manual';
    window.scrollTo(0, 0);

    let entered = false;
    const ctx = gsap.context(() => {
      const count = { value: 0 };
      // Opening sequence. It ends on a hint and then waits for the visitor.
      gsap
        .timeline()
        .from('[data-pre="word"]', { yPercent: 110, duration: 0.9, ease: 'power4.out', stagger: 0.12 })
        .from('[data-pre="social"]', { y: 24, opacity: 0, duration: 0.7, ease: 'power3.out', stagger: 0.15 }, 0.5)
        .to(
          count,
          {
            value: 100,
            duration: 1.1,
            ease: 'power2.inOut',
            onUpdate: () => {
              if (counter.current) counter.current.textContent = String(Math.round(count.value)).padStart(2, '0');
            },
          },
          0.2,
        )
        .from('[data-pre="hint"]', { opacity: 0, y: 12, duration: 0.6, ease: 'power2.out' }, 1.4)
        .to('[data-pre="arrow"]', { y: 6, duration: 0.7, ease: 'sine.inOut', repeat: -1, yoyo: true }, 1.4);

      enter.current = () => {
        if (entered) return;
        entered = true;
        markIntroDone(); // the hero and nav entrances start as the curtains part
        gsap.killTweensOf('[data-pre="arrow"]');
        gsap
          .timeline({ onComplete: () => setDone(true) })
          .to('[data-pre="content"]', { opacity: 0, y: -30, duration: 0.4, ease: 'power2.in' })
          .to('[data-pre="top"]', { yPercent: -100, duration: 0.9, ease: 'power4.inOut' }, 0.15)
          .to('[data-pre="bottom"]', { yPercent: 100, duration: 0.9, ease: 'power4.inOut' }, 0.15);
      };
    }, root);

    const onWheel = (e: WheelEvent) => {
      if (e.deltaY > 0) enter.current();
    };
    const onKey = (e: KeyboardEvent) => {
      if (['ArrowDown', 'PageDown', 'End', ' '].includes(e.key)) enter.current();
    };
    let touchStartY = 0;
    const onTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
    };
    const onTouchMove = (e: TouchEvent) => {
      if (touchStartY - e.touches[0].clientY > 24) enter.current(); // swipe up
    };

    window.addEventListener('wheel', onWheel, { passive: true });
    window.addEventListener('keydown', onKey);
    window.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: true });
    return () => {
      window.removeEventListener('wheel', onWheel);
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove', onTouchMove);
      ctx.revert();
      html.style.overflow = '';
    };
  }, [done]);

  if (done) return null;

  return (
    <div ref={root} role="dialog" aria-label="Welcome" className="fixed inset-0 z-[9990]">
      {/* Instagram brand gradient, in the icons' 24x24 coordinate space */}
      <svg width="0" height="0" className="absolute" aria-hidden="true" focusable="false">
        <defs>
          <linearGradient id="pre-instagram" gradientUnits="userSpaceOnUse" x1="2" y1="22" x2="22" y2="2">
            <stop offset="0" stopColor="#FEDA75" />
            <stop offset="0.25" stopColor="#FA7E1E" />
            <stop offset="0.5" stopColor="#D62976" />
            <stop offset="0.75" stopColor="#962FBF" />
            <stop offset="1" stopColor="#4F5BD5" />
          </linearGradient>
        </defs>
      </svg>
      <div data-pre="top" className="absolute inset-x-0 top-0 h-1/2 bg-background" />
      <div data-pre="bottom" className="absolute inset-x-0 bottom-0 h-1/2 bg-background" />

      <div data-pre="content" className="absolute inset-0">
        {/* 3D object behind the text; it follows the pointer through window listeners */}
        <div className="pointer-events-none absolute inset-0 z-0" aria-hidden="true">
          <Suspense fallback={null}>
            <IntroScene />
          </Suspense>
        </div>

        <div className="relative z-10 flex h-full flex-col items-center justify-center gap-6 px-6">
          {/* The name and links sit in one framed card so the 3D object never competes with them */}
          <div className="w-full max-w-2xl rounded-3xl border border-accent-cyan/30 bg-background/85 px-6 py-8 text-center shadow-[0_0_60px_rgba(0,240,255,0.15)] backdrop-blur-md sm:px-12 sm:py-10">
            <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.3em] text-accent-cyan">Portfolio</p>

            <div className="flex justify-center gap-4 font-serif font-black text-5xl sm:text-7xl uppercase tracking-tight text-ink">
              <span className="overflow-hidden block">
                <span data-pre="word" className="block">Shrey</span>
              </span>
              <span className="overflow-hidden block">
                <span data-pre="word" className="block text-accent-cyan">Jain</span>
              </span>
            </div>

            <ul className="mt-8 flex flex-wrap items-center justify-center gap-3 font-mono text-xs">
              {socials.map(({ name, handle, href, Icon, iconClass }) => (
                <li key={name} data-pre="social">
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${name}: ${handle}`}
                    className="flex items-center gap-2.5 rounded-xl border border-rule bg-card px-4 py-2.5 text-ink transition-colors hover:border-accent-cyan hover:text-accent-cyan"
                  >
                    <Icon className={`h-5 w-5 ${iconClass}`} />
                    <span>{handle}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <span ref={counter} className="font-mono text-sm text-muted tabular-nums">00</span>

          <button
            type="button"
            data-pre="hint"
            onClick={() => enter.current()}
            className="mt-4 flex flex-col items-center gap-1 font-mono text-xs uppercase tracking-widest text-muted hover:text-ink transition-colors"
          >
            Scroll to enter
            <span data-pre="arrow" aria-hidden="true">↓</span>
          </button>
        </div>
      </div>
    </div>
  );
};
