"use client";

import { useEffect, useState, useMemo } from "react";
import { motion } from "framer-motion";

const orbData = [
  { size: 600, x: 15, y: 10, delay: 0 },
  { size: 500, x: 75, y: 20, delay: 3 },
  { size: 400, x: 50, y: 70, delay: 6 },
  { size: 350, x: 85, y: 65, delay: 9 },
  { size: 450, x: 10, y: 80, delay: 12 },
];

export function AnimatedGradientOrbs() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  if (!mounted) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden>
      {orbData.map((orb, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: orb.size,
            height: orb.size,
            left: `${orb.x}%`,
            top: `${orb.y}%`,
            background: `radial-gradient(circle at center, var(--color-gunmetal-blue) 0%, transparent 70%)`,
            opacity: 0.4,
            willChange: "transform",
          }}
          animate={{
            x: [0, 80, -40, 60, 0],
            y: [0, -60, 40, -30, 0],
            scale: [1, 1.2, 0.9, 1.1, 1],
          }}
          transition={{
            duration: 25 + i * 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: orb.delay,
          }}
        />
      ))}
    </div>
  );
}

export function MercuryFlow() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  if (!mounted) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[1] overflow-hidden opacity-[0.08]" aria-hidden>
      <motion.div
        className="absolute -inset-[100%]"
        style={{
          background: `
            radial-gradient(ellipse at 30% 40%, rgba(160,224,171,0.3) 0%, transparent 50%),
            radial-gradient(ellipse at 70% 60%, rgba(255,172,46,0.25) 0%, transparent 50%),
            radial-gradient(ellipse at 50% 30%, rgba(165,45,37,0.2) 0%, transparent 50%)
          `,
          filter: "blur(80px)",
        }}
        animate={{
          x: [0, -200, 100, -100, 0],
          y: [0, 150, -200, 100, 0],
          rotate: [0, 5, -3, 2, 0],
          scale: [1, 1.1, 0.95, 1.05, 1],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute -inset-[100%]"
        style={{
          background: `
            radial-gradient(ellipse at 60% 70%, rgba(165,45,37,0.2) 0%, transparent 50%),
            radial-gradient(ellipse at 20% 80%, rgba(160,224,171,0.2) 0%, transparent 50%),
            radial-gradient(ellipse at 80% 20%, rgba(255,172,46,0.2) 0%, transparent 50%)
          `,
          filter: "blur(100px)",
        }}
        animate={{
          x: [0, 150, -100, 200, 0],
          y: [0, -120, 180, -80, 0],
          rotate: [0, -3, 5, -2, 0],
          scale: [1, 0.9, 1.1, 0.95, 1],
        }}
        transition={{
          duration: 35,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 5,
        }}
      />
    </div>
  );
}

export function NoiseOverlay() {
  const [mounted, setMounted] = useState(false);
  const uid = useMemo(() => Math.random().toString(36).slice(2, 8), []);
  useEffect(() => { setMounted(true); }, []);

  if (!mounted) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[3] opacity-[0.035] mix-blend-overlay" aria-hidden>
      <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <filter id={`noise-${uid}`}>
          <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter={`url(#noise-${uid})`} />
      </svg>
    </div>
  );
}

export function GridPattern() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 opacity-[0.04]" aria-hidden>
      <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="grid-pattern" width="60" height="60" patternUnits="userSpaceOnUse">
            <path d="M 60 0 L 0 0 0 60" fill="none" stroke="rgba(255,253,249,0.15)" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid-pattern)" />
      </svg>
    </div>
  );
}
