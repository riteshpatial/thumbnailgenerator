import React, { useEffect, useRef } from "react";

const PARTICLE_COUNT = 42;
const SPARK_EVERY = 9;

export default function Background({ isDarkMode }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const paperColor = isDarkMode ? "#14161a" : "#edeff0";
    const dustColor = isDarkMode ? "236, 237, 231" : "23, 24, 26";
    const sparkColor = isDarkMode ? "226, 163, 61" : "217, 83, 30";

    let width = 0;
    let height = 0;
    let dpr = window.devicePixelRatio || 1;
    let particles = [];
    let raf = null;
    let t = 0;

    const seed = () => {
      particles = Array.from({ length: PARTICLE_COUNT }, (_, i) => ({
        x: Math.random() * width,
        y: Math.random() * height,
        r: 0.6 + Math.random() * 1.6,
        vx: (Math.random() - 0.5) * 0.08,
        vy: (Math.random() - 0.5) * 0.08,
        phase: Math.random() * Math.PI * 2,
        isSpark: i % SPARK_EVERY === 0,
      }));
    };

    const resize = () => {
      dpr = window.devicePixelRatio || 1;
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      seed();
    };

    const drawFrame = () => {
      ctx.fillStyle = paperColor;
      ctx.fillRect(0, 0, width, height);

      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < -5) p.x = width + 5;
        if (p.x > width + 5) p.x = -5;
        if (p.y < -5) p.y = height + 5;
        if (p.y > height + 5) p.y = -5;

        const flicker = Math.sin(p.phase + t) * 0.5 + 0.5;
        const alpha = p.isSpark ? 0.18 + flicker * 0.32 : 0.025 + flicker * 0.045;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.isSpark ? sparkColor : dustColor}, ${alpha})`;
        ctx.fill();
      });
    };

    const loop = () => {
      t += 0.012;
      drawFrame();
      raf = requestAnimationFrame(loop);
    };

    resize();
    drawFrame();
    if (!prefersReducedMotion) {
      raf = requestAnimationFrame(loop);
    }

    window.addEventListener("resize", resize);
    return () => {
      window.removeEventListener("resize", resize);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [isDarkMode]);

  return <canvas ref={canvasRef} className="ambient-background" aria-hidden="true" />;
}
