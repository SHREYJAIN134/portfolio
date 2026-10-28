import { useEffect } from 'react';

// The mouse pointer is replaced by an emoji hand. Change this one constant to use another emoji.
const CURSOR_EMOJI = '👌';
const SIZE = 40;
const STYLE_ID = 'emoji-cursor';

// Draws the emoji on a canvas and uses it as the CSS cursor image. A real CSS cursor has no
// lag, never blocks clicks or text selection, and costs no per-frame work. Text fields keep the
// normal caret so typing stays usable. Touch screens have no pointer, and the browser falls
// back to its normal cursor if the image fails to load.
export const Cursor: React.FC = () => {
  useEffect(() => {
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;

    const canvas = document.createElement('canvas');
    canvas.width = SIZE;
    canvas.height = SIZE;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.font = `${SIZE - 8}px "Segoe UI Emoji", "Apple Color Emoji", "Noto Color Emoji", sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(CURSOR_EMOJI, SIZE / 2, SIZE / 2 + 2);

    const style = document.createElement('style');
    style.id = STYLE_ID;
    // Hotspot at the centre of the emoji.
    style.textContent = `*:not(input):not(textarea):not(select) { cursor: url(${canvas.toDataURL()}) ${SIZE / 2} ${SIZE / 2}, auto !important; }`;
    document.head.appendChild(style);
    return () => style.remove();
  }, []);

  return null;
};
