import { EASE_OUT, gsap, ScrollTrigger } from './gsap';
import { whenIntroDone } from './intro';
import { tag, type Cleanup } from './utils';

const LEFT = '#hero [class*="col-span-7"]';
const PORTRAIT = '#hero [class*="col-span-5"]';
const FRAME = '#hero [class*="backdrop-blur-xl"]';
const PHOTO_BOX = '#hero [class*="aspect-[3/4]"]';
const PHOTO = `${PHOTO_BOX} img`;

// The photo sits slightly enlarged so it can move inside its frame without exposing edges.
const PHOTO_SCALE = 1.1;

/** Page-load sequence: text, then the portrait, which is unveiled like a curtain lifting. */
export const heroIntro = () => {
  tag(`${LEFT} > *, ${LEFT} h1, ${PORTRAIT}, ${PHOTO_BOX}, ${PHOTO}, #hero .border-t`);

  // Paused until the intro screen is dismissed, so the hero plays as the curtains part.
  const tl = gsap.timeline({ paused: true, delay: 0.35, defaults: { ease: EASE_OUT, duration: 0.9 } });
  tl.from(`${LEFT} > *`, { y: 40, opacity: 0, stagger: 0.12 })
    .from(`${LEFT} h1`, { clipPath: 'inset(0 0 100% 0)', duration: 1.1, clearProps: 'clipPath' }, 0.1)
    .from('#hero .border-t', { opacity: 0, duration: 0.8 }, 1.0);

  return whenIntroDone(() => tl.play());
};

/**
 * The portrait stays hidden until the visitor scrolls. The first scroll movement past the intro
 * unveils it like a curtain lifting, with the photo settling from a zoom.
 */
export const heroPhotoReveal = (): Cleanup => {
  const box = document.querySelector<HTMLElement>(PHOTO_BOX);
  const img = box?.querySelector<HTMLImageElement>('img');
  if (!box || !img) return () => undefined;

  tag(`${PORTRAIT}, ${PHOTO}`);
  gsap.set(PORTRAIT, { opacity: 0, y: 60 });
  gsap.set(img, { opacity: 0 });

  // The pixelation is drawn on a canvas laid over the photo: the image is painted at a tiny
  // size and scaled back up without smoothing, which gives the blocky mosaic.
  const canvas = document.createElement('canvas');
  canvas.setAttribute('aria-hidden', 'true');
  canvas.className = 'absolute inset-0 h-full w-full';
  const small = document.createElement('canvas');

  const draw = (pixel: number) => {
    const w = box.clientWidth;
    const h = box.clientHeight;
    const sw = Math.max(1, Math.ceil(w / pixel));
    const sh = Math.max(1, Math.ceil(h / pixel));
    small.width = sw;
    small.height = sh;
    canvas.width = w;
    canvas.height = h;

    // Same framing as the <img>: object-fit cover, anchored to the top, enlarged by PHOTO_SCALE.
    const cover = Math.max(sw / img.naturalWidth, sh / img.naturalHeight);
    const dw0 = img.naturalWidth * cover;
    const dh0 = img.naturalHeight * cover;
    const dx = sw / 2 + ((sw - dw0) / 2 - sw / 2) * PHOTO_SCALE;
    const dy = sh / 2 + (0 - sh / 2) * PHOTO_SCALE;
    small.getContext('2d')?.drawImage(img, dx, dy, dw0 * PHOTO_SCALE, dh0 * PHOTO_SCALE);

    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.imageSmoothingEnabled = false;
    ctx.drawImage(small, 0, 0, sw, sh, 0, 0, w, h);
  };

  const showPlain = () => gsap.set(img, { opacity: 1 });
  const state = { p: 0 };
  const tl = gsap
    .timeline({ paused: true })
    .to(PORTRAIT, { opacity: 1, y: 0, duration: 0.9, ease: EASE_OUT })
    .to(
      state,
      {
        p: 1,
        duration: 1.6,
        ease: 'steps(9)', // nine visible stages, each sharper than the last
        onStart: () => {
          box.appendChild(canvas);
          draw(64);
        },
        onUpdate: () => draw(Math.max(1, Math.round(64 * (1 - state.p) ** 2))),
        onComplete: () => {
          showPlain();
          canvas.remove();
        },
      },
      0.2,
    );

  // Armed only once the intro screen is gone, so scrolling to dismiss the intro (or a restored
  // scroll position on reload) cannot reveal the photo early. start is a scroll position in px:
  // it fires once the page has moved 30px from the top.
  let trigger: ScrollTrigger | undefined;
  const disarm = whenIntroDone(() => {
    trigger = ScrollTrigger.create({
      // At least 30px of scroll, and on narrow screens (photo stacked below the text) not
      // before the photo is about to enter the viewport, so the effect is actually seen.
      start: () => Math.max(30, box.getBoundingClientRect().top + window.scrollY - window.innerHeight * 0.8),
      invalidateOnRefresh: true,
      once: true,
      onEnter: () => {
        if (img.complete && img.naturalWidth) tl.play();
        else {
          // Image not decoded yet: skip the mosaic rather than draw an empty canvas.
          tl.progress(1);
          showPlain();
        }
      },
    });
  });

  return () => {
    disarm();
    trigger?.kill();
    canvas.remove();
    showPlain();
  };
};

/** Scroll: the frame drifts up while the photo drifts the other way inside it. */
export const heroScroll = () => {
  tag(`${PORTRAIT} > div`);
  const scrollTrigger = { trigger: '#hero', start: 'top top', end: 'bottom top', scrub: 0.6 };
  gsap.to(`${PORTRAIT} > div`, { y: -50, ease: 'none', scrollTrigger });
  gsap.to(PHOTO, { yPercent: -6, ease: 'none', scrollTrigger });
};

/** Pointer: the frame tilts in 3D toward the pointer and the photo shifts and zooms inside. */
export const heroPhotoPointer = () => {
  const frame = document.querySelector<HTMLElement>(FRAME);
  const photo = document.querySelector<HTMLElement>(PHOTO);
  if (!frame || !photo) return () => undefined;

  tag(`${FRAME}, ${PHOTO}`);
  gsap.set(frame, { transformPerspective: 900 });
  const rotX = gsap.quickTo(frame, 'rotationX', { duration: 0.6, ease: EASE_OUT });
  const rotY = gsap.quickTo(frame, 'rotationY', { duration: 0.6, ease: EASE_OUT });
  const shiftX = gsap.quickTo(photo, 'x', { duration: 0.8, ease: EASE_OUT });
  const shiftY = gsap.quickTo(photo, 'y', { duration: 0.8, ease: EASE_OUT });

  const move = (e: PointerEvent) => {
    const r = frame.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    rotY(px * 8);
    rotX(-py * 8);
    shiftX(-px * 16);
    shiftY(-py * 16);
  };
  const enter = () => gsap.to(photo, { scale: PHOTO_SCALE + 0.06, duration: 0.7, ease: EASE_OUT, overwrite: 'auto' });
  const leave = () => {
    rotX(0);
    rotY(0);
    shiftX(0);
    shiftY(0);
    gsap.to(photo, { scale: PHOTO_SCALE, duration: 0.7, ease: EASE_OUT, overwrite: 'auto' });
  };

  frame.addEventListener('pointermove', move);
  frame.addEventListener('pointerenter', enter);
  frame.addEventListener('pointerleave', leave);
  return () => {
    frame.removeEventListener('pointermove', move);
    frame.removeEventListener('pointerenter', enter);
    frame.removeEventListener('pointerleave', leave);
  };
};
