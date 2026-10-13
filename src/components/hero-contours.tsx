"use client";

import { useEffect, useRef } from "react";

// A living contour map for the hero background: isolines of a slowly drifting noise field,
// traced with marching squares on a coarse grid each frame. The cursor raises a soft hill that
// the lines bend around. See DESIGN.md, "Hero background".

/** Grid spacing in CSS pixels: the field is sampled at each grid point. */
const STEP = 12;
/** Contour levels across the field's 0..1 range; the one at HIGHLIGHT is drawn in amber. */
const LEVELS = Array.from({ length: 13 }, (_, i) => 0.14 + i * 0.06);
const HIGHLIGHT = 6;
/** Noise scale (per pixel) and drift speed (per millisecond). */
const SCALE = 0.0026;
const DRIFT = 0.000045;
/** The cursor's hill: height in field units and radius in pixels. */
const HILL = 0.32;
const HILL_RADIUS = 150;
/** How long the terrain takes to rise on first paint. */
const RISE_MS = 1600;

const LINE = "rgba(245, 211, 155, 0.3)";
const ACCENT = "rgba(240, 168, 96, 0.95)";

// 3D simplex noise (after Stefan Gustavson), seeded with a fixed permutation so the map is
// the same on every visit.
const GRAD = [
  [1, 1, 0], [-1, 1, 0], [1, -1, 0], [-1, -1, 0], [1, 0, 1], [-1, 0, 1],
  [1, 0, -1], [-1, 0, -1], [0, 1, 1], [0, -1, 1], [0, 1, -1], [0, -1, -1],
];
const PERM = (() => {
  const p = Array.from({ length: 256 }, (_, i) => i);
  let seed = 20240901;
  for (let i = 255; i > 0; i--) {
    seed = (seed * 1664525 + 1013904223) >>> 0;
    const j = seed % (i + 1);
    [p[i], p[j]] = [p[j], p[i]];
  }
  return Uint8Array.from([...p, ...p]);
})();

function noise3(x: number, y: number, z: number) {
  const F3 = 1 / 3;
  const G3 = 1 / 6;
  const s = (x + y + z) * F3;
  const i = Math.floor(x + s);
  const j = Math.floor(y + s);
  const k = Math.floor(z + s);
  const t = (i + j + k) * G3;
  const x0 = x - (i - t);
  const y0 = y - (j - t);
  const z0 = z - (k - t);
  let i1, j1, k1, i2, j2, k2;
  if (x0 >= y0) {
    if (y0 >= z0) [i1, j1, k1, i2, j2, k2] = [1, 0, 0, 1, 1, 0];
    else if (x0 >= z0) [i1, j1, k1, i2, j2, k2] = [1, 0, 0, 1, 0, 1];
    else [i1, j1, k1, i2, j2, k2] = [0, 0, 1, 1, 0, 1];
  } else if (y0 < z0) [i1, j1, k1, i2, j2, k2] = [0, 0, 1, 0, 1, 1];
  else if (x0 < z0) [i1, j1, k1, i2, j2, k2] = [0, 1, 0, 0, 1, 1];
  else [i1, j1, k1, i2, j2, k2] = [0, 1, 0, 1, 1, 0];
  const corners = [
    [x0, y0, z0, 0, 0, 0],
    [x0 - i1 + G3, y0 - j1 + G3, z0 - k1 + G3, i1, j1, k1],
    [x0 - i2 + 2 * G3, y0 - j2 + 2 * G3, z0 - k2 + 2 * G3, i2, j2, k2],
    [x0 - 1 + 3 * G3, y0 - 1 + 3 * G3, z0 - 1 + 3 * G3, 1, 1, 1],
  ];
  const ii = i & 255;
  const jj = j & 255;
  const kk = k & 255;
  let n = 0;
  for (const [cx, cy, cz, di, dj, dk] of corners) {
    let r = 0.6 - cx * cx - cy * cy - cz * cz;
    if (r < 0) continue;
    const g = GRAD[PERM[ii + di + PERM[jj + dj + PERM[kk + dk]]] % 12];
    r *= r;
    n += r * r * (g[0] * cx + g[1] * cy + g[2] * cz);
  }
  return 32 * n; // roughly -1..1
}

export function HeroContours({ className }: { className: string }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const still = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const pointer = matchMedia("(hover: hover) and (pointer: fine)").matches;
    let width = 0;
    let height = 0;
    let cols = 0;
    let rows = 0;
    let field = new Float32Array(0);
    let frame = 0;
    let visible = true;
    let start = 0;
    // The hill eases towards the cursor; strength fades in when it enters and out when it leaves.
    const hill = { x: 0, y: 0, tx: 0, ty: 0, k: 0, tk: 0 };

    const resize = () => {
      const box = canvas.getBoundingClientRect();
      const dpr = Math.min(devicePixelRatio || 1, 2);
      width = box.width;
      height = box.height;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      cols = Math.ceil(width / STEP) + 1;
      rows = Math.ceil(height / STEP) + 1;
      field = new Float32Array(cols * rows);
    };

    const draw = (now: number) => {
      const t = now * DRIFT;
      const rise = still ? 1 : Math.min(1, (now - start) / RISE_MS);
      const amp = 1 - Math.pow(1 - rise, 3);
      hill.x += (hill.tx - hill.x) * 0.08;
      hill.y += (hill.ty - hill.y) * 0.08;
      hill.k += (hill.tk - hill.k) * 0.05;

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const x = c * STEP;
          const y = r * STEP;
          let v = 0.5 + 0.5 * amp * (0.75 * noise3(x * SCALE, y * SCALE, t) + 0.25 * noise3(x * SCALE * 2.3, y * SCALE * 2.3, t * 1.7));
          if (hill.k > 0.001) {
            const dx = x - hill.x;
            const dy = y - hill.y;
            v += HILL * hill.k * Math.exp(-(dx * dx + dy * dy) / (2 * HILL_RADIUS * HILL_RADIUS));
          }
          field[r * cols + c] = v;
        }
      }

      ctx.clearRect(0, 0, width, height);
      LEVELS.forEach((level, li) => {
        ctx.beginPath();
        for (let r = 0; r < rows - 1; r++) {
          for (let c = 0; c < cols - 1; c++) {
            const a = field[r * cols + c];
            const b = field[r * cols + c + 1];
            const d = field[(r + 1) * cols + c];
            const e = field[(r + 1) * cols + c + 1];
            const mask = (a > level ? 8 : 0) | (b > level ? 4 : 0) | (e > level ? 2 : 0) | (d > level ? 1 : 0);
            if (mask === 0 || mask === 15) continue;
            const x = c * STEP;
            const y = r * STEP;
            // Edge crossings, linearly interpolated: top, right, bottom, left.
            const top = [x + STEP * ((level - a) / (b - a)), y];
            const right = [x + STEP, y + STEP * ((level - b) / (e - b))];
            const bottom = [x + STEP * ((level - d) / (e - d)), y + STEP];
            const left = [x, y + STEP * ((level - a) / (d - a))];
            const seg = (p: number[], q: number[]) => {
              ctx.moveTo(p[0], p[1]);
              ctx.lineTo(q[0], q[1]);
            };
            switch (mask) {
              case 1: case 14: seg(left, bottom); break;
              case 2: case 13: seg(bottom, right); break;
              case 3: case 12: seg(left, right); break;
              case 4: case 11: seg(top, right); break;
              case 5: seg(left, top); seg(bottom, right); break;
              case 6: case 9: seg(top, bottom); break;
              case 7: case 8: seg(left, top); break;
              case 10: seg(left, bottom); seg(top, right); break;
            }
          }
        }
        const accent = li === HIGHLIGHT;
        ctx.strokeStyle = accent ? ACCENT : LINE;
        ctx.lineWidth = accent ? 1.8 : 1;
        ctx.stroke();
      });
    };

    const loop = (now: number) => {
      draw(now);
      frame = visible && !document.hidden ? requestAnimationFrame(loop) : 0;
    };
    const play = () => {
      if (!still && !frame && visible && !document.hidden) frame = requestAnimationFrame(loop);
    };

    resize();
    start = performance.now();
    if (still) draw(start);
    else play();

    const sizer = new ResizeObserver(() => {
      resize();
      if (still) draw(performance.now());
    });
    sizer.observe(canvas);
    const watcher = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      play();
    });
    watcher.observe(canvas);
    const onVisibility = () => play();
    document.addEventListener("visibilitychange", onVisibility);

    // The hero (the canvas's positioned ancestor) receives the pointer; the canvas itself ignores it.
    const host = canvas.closest("section") ?? canvas.parentElement;
    const move = (event: PointerEvent) => {
      const box = canvas.getBoundingClientRect();
      hill.tx = event.clientX - box.left;
      hill.ty = event.clientY - box.top;
      if (hill.tk === 0) {
        hill.x = hill.tx;
        hill.y = hill.ty;
      }
      hill.tk = 1;
    };
    const leave = () => {
      hill.tk = 0;
    };
    if (pointer && !still && host) {
      host.addEventListener("pointermove", move);
      host.addEventListener("pointerleave", leave);
    }

    return () => {
      cancelAnimationFrame(frame);
      sizer.disconnect();
      watcher.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      host?.removeEventListener("pointermove", move);
      host?.removeEventListener("pointerleave", leave);
    };
  }, []);

  return <canvas ref={ref} aria-hidden="true" className={className} />;
}
