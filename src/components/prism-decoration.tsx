"use client";

import { useMemo, useId, useRef, useEffect } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

interface PrismDecorationProps {
  count?: number;
  variant?: "hero" | "subtle";
  mouseParallax?: boolean;
}

export default function PrismDecoration({ count = 2, variant = "subtle", mouseParallax = false }: PrismDecorationProps) {
  const uid = useId();
  const containerRef = useRef<HTMLDivElement>(null);

  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);
  const smoothX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const smoothY = useSpring(mouseY, { stiffness: 50, damping: 20 });

  useEffect(() => {
    if (!mouseParallax) return;
    const container = containerRef.current;
    if (!container) return;

    const onMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouseX.set((e.clientX - rect.left) / rect.width);
      mouseY.set((e.clientY - rect.top) / rect.height);
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMouseMove);
  }, [mouseParallax, mouseX, mouseY]);

  const prisms = useMemo(
    () =>
      Array.from({ length: count }).map((_, i) => {
        const sizes = variant === "hero" ? [400, 520, 620] : [220, 300, 360];
        return {
          size: sizes[i] ?? sizes[sizes.length - 1],
          x: 50 + i * 18 + (i % 2 === 0 ? -5 : 8),
          y: 8 + i * 22,
          delay: i * 0.5,
          duration: 18 + i * 6,
          scale: 0.6 + i * 0.2,
          rotation: i * 15,
          flipX: i % 2 === 0 ? 1 : -1,
          parallaxFactor: 8 + i * 4,
          opacity: variant === "hero" ? 1 : 0.6 + i * 0.1,
        };
      }),
    [count, variant]
  );

  const shapePaths = useMemo(() => [
    `M50,0 L93.3,25 L93.3,75 L50,100 L6.7,75 L6.7,25 Z`,
    `M50,0 L87.5,15 L100,50 L87.5,85 L50,100 L12.5,85 L0,50 Z`,
    `M50,0 L95,30 L82,100 L18,100 L5,30 Z`,
    `M50,5 L90,30 L80,95 L20,95 L10,30 Z`,
  ], []);

  return (
    <div ref={containerRef} className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden>
      <svg className="absolute inset-0 w-full h-full">
        <defs>
          <filter id={`chromatic-${uid}`}>
            <feGaussianBlur in="SourceGraphic" stdDeviation="0.8" result="blur" />
            <feOffset in="blur" dx="2" dy="0" result="red-shift" />
            <feColorMatrix in="red-shift" type="matrix" values="1.4 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.3 0" result="red" />
            <feOffset in="blur" dx="-2" dy="0.5" result="blue-shift" />
            <feColorMatrix in="blue-shift" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 1.4 0 0  0 0 0 0.3 0" result="blue" />
            <feOffset in="blur" dx="0.5" dy="-0.5" result="green-shift" />
            <feColorMatrix in="green-shift" type="matrix" values="0 0 0 0 0  0 0.8 0 0 0  0 0 0 0 0  0 0 0 0.2 0" result="green" />
            <feMerge>
              <feMergeNode in="red" />
              <feMergeNode in="blue" />
              <feMergeNode in="green" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          <linearGradient id={`fill-${uid}`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="rgba(var(--prism-r),0.05)" />
            <stop offset="30%" stopColor="rgba(var(--prism-a),0.07)" />
            <stop offset="60%" stopColor="rgba(var(--prism-r),0.03)" />
            <stop offset="100%" stopColor="rgba(var(--prism-a),0.02)" />
          </linearGradient>

          <linearGradient id={`sheen-${uid}`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="rgba(var(--prism-r),0.12)" />
            <stop offset="40%" stopColor="rgba(var(--prism-a),0.04)" />
            <stop offset="70%" stopColor="rgba(var(--prism-glow-r),0.08)" />
            <stop offset="100%" stopColor="rgba(var(--prism-glow-b),0.06)" />
          </linearGradient>

          <radialGradient id={`vignette-${uid}`} cx="50%" cy="50%" r="70%">
            <stop offset="0%" stopColor="rgba(0,0,0,0)" />
            <stop offset="60%" stopColor="rgba(0,0,0,0)" />
            <stop offset="100%" stopColor="rgba(0,0,0,0.6)" />
          </radialGradient>
        </defs>
      </svg>

      {prisms.map((prism, i) => {
        const pathIdx = i % shapePaths.length;
        const shapePath = shapePaths[pathIdx];

        return (
          <motion.div
            key={i}
            className="absolute"
            style={{
              width: prism.size,
              height: prism.size,
              left: `${prism.x}%`,
              top: `${prism.y}%`,
              scale: prism.scale,
              opacity: prism.opacity,
              transformStyle: "preserve-3d",
            }}
            animate={mouseParallax ? {
              x: smoothX.get() * prism.parallaxFactor,
              y: smoothY.get() * prism.parallaxFactor * 0.6,
              rotate: [prism.rotation, prism.rotation + 10, prism.rotation - 6, prism.rotation + 5, prism.rotation],
            } : {
              x: [0, 35, -18, 25, 0],
              y: [0, -40, 18, -25, 0],
              rotate: [prism.rotation, prism.rotation + 10, prism.rotation - 6, prism.rotation + 5, prism.rotation],
            }}
            transition={mouseParallax ? {
              rotate: { duration: prism.duration, repeat: Infinity, ease: "easeInOut", delay: prism.delay },
            } : {
              duration: prism.duration,
              repeat: Infinity,
              ease: "easeInOut",
              delay: prism.delay,
            }}
          >
            <svg
              width="100%"
              height="100%"
              viewBox="0 0 100 100"
              style={{ transform: `scaleX(${prism.flipX})` }}
              filter={`url(#chromatic-${uid})`}
            >
              <defs>
                <clipPath id={`shape-${uid}-${i}`}>
                  <path d={shapePath} />
                </clipPath>
              </defs>

              <path d={shapePath} fill={`url(#fill-${uid})`} stroke="rgba(var(--prism-r),0.1)" strokeWidth="0.5" />

              <g clipPath={`url(#shape-${uid}-${i})`}>
                <rect x="0" y="0" width="100" height="100" fill={`url(#sheen-${uid})`} style={{ mixBlendMode: "screen" } as React.CSSProperties} />

                <motion.rect x="-80" y="-80" width="80" height="80" fill="rgba(var(--prism-r),0.06)" style={{ mixBlendMode: "screen" } as React.CSSProperties}
                  animate={{ x: [0, 120, 200, 0], y: [0, 80, 160, 0] }}
                  transition={{ duration: 10 + i * 3, repeat: Infinity, ease: "linear" }}
                />
                <motion.rect x="-80" y="-80" width="60" height="60" fill="rgba(var(--prism-glow-r),0.04)" style={{ mixBlendMode: "screen" } as React.CSSProperties}
                  animate={{ x: [30, 150, 230, 30], y: [20, 100, 180, 20] }}
                  transition={{ duration: 12 + i * 4, repeat: Infinity, ease: "linear" }}
                />
                <motion.rect x="-80" y="-80" width="70" height="70" fill="rgba(var(--prism-glow-b),0.04)" style={{ mixBlendMode: "screen" } as React.CSSProperties}
                  animate={{ x: [60, 180, 260, 60], y: [50, 130, 210, 50] }}
                  transition={{ duration: 14 + i * 5, repeat: Infinity, ease: "linear" }}
                />

                <rect x="0" y="0" width="100" height="100" fill={`url(#vignette-${uid})`} />
              </g>

              <path d={shapePath} fill="none" stroke="rgba(var(--prism-r),0.2)" strokeWidth="0.5" />
            </svg>
          </motion.div>
        );
      })}
    </div>
  );
}
