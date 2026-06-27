import { useEffect, useRef } from "react";

type Cell = {
  char: string;
  energy: number;
  last: number;
  seed: number;
};

const GLYPHS = "{}[]<>/\\01$_#ABCDEFGHIJKLMNOPQRSTUVWXYZ";

function pickGlyph(seed: number, time: number) {
  const index = Math.abs(Math.floor(seed * 997 + time * 0.018)) % GLYPHS.length;
  return GLYPHS[index];
}

export default function CodeTrailCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const coarsePointer = window.matchMedia("(pointer: coarse)").matches;
    if (reduceMotion || coarsePointer) return;

    const context = canvas.getContext("2d", { alpha: true });
    if (!context) return;

    let width = 0;
    let height = 0;
    let dpr = 1;
    let cols = 0;
    let rows = 0;
    let raf = 0;
    let lastMove = 0;
    let lastPointer = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    let pointer = { x: lastPointer.x, y: lastPointer.y };
    let accentTrail = false;
    let signalTrail = false;
    let cells: Cell[] = [];

    const cellSize = 14;

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      cols = Math.ceil(width / cellSize);
      rows = Math.ceil(height / cellSize);
      canvas.width = Math.ceil(width * dpr);
      canvas.height = Math.ceil(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
      context.font = "10px var(--font-mono), ui-monospace, SFMono-Regular, monospace";
      context.textAlign = "center";
      context.textBaseline = "middle";
      cells = Array.from({ length: cols * rows }, (_, index) => ({
        char: GLYPHS[index % GLYPHS.length],
        energy: 0,
        last: 0,
        seed: (index * 9301 + 49297) % 233280,
      }));
    };

    const excite = (x: number, y: number, time: number) => {
      const radius = signalTrail ? 58 : 92;
      const cx = Math.floor(x / cellSize);
      const cy = Math.floor(y / cellSize);
      const spread = Math.ceil(radius / cellSize);

      for (let yy = cy - spread; yy <= cy + spread; yy += 1) {
        if (yy < 0 || yy >= rows) continue;
        for (let xx = cx - spread; xx <= cx + spread; xx += 1) {
          if (xx < 0 || xx >= cols) continue;

          const px = xx * cellSize + cellSize / 2;
          const py = yy * cellSize + cellSize / 2;
          const distance = Math.hypot(px - x, py - y);
          if (distance > radius) continue;

          const cell = cells[yy * cols + xx];
          const force = Math.pow(1 - distance / radius, signalTrail ? 2.15 : 1.65);
          cell.energy = Math.max(cell.energy, force);
          cell.last = time;
          if (!signalTrail && force > 0.44) cell.char = pickGlyph(cell.seed, time);
        }
      }
    };

    const handleMove = (event: PointerEvent) => {
      const now = performance.now();
      pointer = { x: event.clientX, y: event.clientY };
      const target = event.target as Element | null;
      signalTrail = Boolean(target?.closest?.(".signal-routes-section"));
      accentTrail = !signalTrail && Boolean(target?.closest?.(".about-portrait"));

      const distance = Math.hypot(pointer.x - lastPointer.x, pointer.y - lastPointer.y);
      const steps = Math.max(1, Math.ceil(distance / (signalTrail ? 24 : 34)));
      for (let i = 0; i <= steps; i += 1) {
        const t = i / steps;
        excite(
          lastPointer.x + (pointer.x - lastPointer.x) * t,
          lastPointer.y + (pointer.y - lastPointer.y) * t,
          now
        );
      }

      lastPointer = pointer;
      lastMove = now;
    };

    const draw = (time: number) => {
      context.clearRect(0, 0, width, height);
      context.globalCompositeOperation = "source-over";

      const idle = Math.min(1, Math.max(0, (time - lastMove) / 900));
      const baseAlpha = 1 - idle * 0.55;
      const glyphColor = signalTrail ? "255,235,174" : accentTrail ? "255,90,18" : "245,245,245";
      const blockColor = signalTrail ? "255,226,145" : accentTrail ? "255,90,18" : "255,255,255";

      for (let y = 0; y < rows; y += 1) {
        for (let x = 0; x < cols; x += 1) {
          const cell = cells[y * cols + x];
          if (cell.energy < 0.015) continue;

          const px = x * cellSize + cellSize / 2;
          const py = y * cellSize + cellSize / 2;
          const age = Math.max(0, time - cell.last);
          const flicker = 0.78 + Math.sin(time * 0.026 + cell.seed) * 0.22;
          const alpha = Math.min(0.84, cell.energy * flicker * baseAlpha);

          if (signalTrail && alpha > 0.04) {
            context.beginPath();
            context.fillStyle = `rgba(${glyphColor},${alpha * 0.42})`;
            context.arc(px, py, 2.1 + alpha * 4.2, 0, Math.PI * 2);
            context.fill();
          } else if (alpha > 0.055) {
            context.fillStyle = `rgba(${glyphColor},${alpha})`;
            context.fillText(cell.char, px, py);
          }

          if (!signalTrail && alpha > 0.38 && (x + y + Math.floor(time / 90)) % 5 === 0) {
            context.fillStyle = `rgba(${blockColor},${accentTrail ? alpha * 0.68 : alpha * 0.22})`;
            context.fillRect(px - 4, py - 4, 8, 8);
          }

          cell.energy *= age > 120 ? 0.9 : 0.955;
        }
      }

      raf = requestAnimationFrame(draw);
    };

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", handleMove, { passive: true });
    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", handleMove);
    };
  }, []);

  return <canvas ref={canvasRef} className="code-trail-canvas" aria-hidden="true" />;
}
