/*
 * The full-screen intro (components/Preloader.tsx) stays until the visitor scrolls. The hero
 * and nav entrances wait for it through this tiny signal instead of a fixed timer.
 */
let done = false;
const listeners = new Set<() => void>();

export const markIntroDone = () => {
  done = true;
  listeners.forEach((fn) => fn());
  listeners.clear();
};

/** Runs fn once the intro has been dismissed (immediately if it already has). Returns an unsubscribe. */
export const whenIntroDone = (fn: () => void): (() => void) => {
  if (done) {
    fn();
    return () => undefined;
  }
  listeners.add(fn);
  return () => {
    listeners.delete(fn);
  };
};
