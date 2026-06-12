"use client";

import { useEffect, useState, useMemo } from "react";
import { motion } from "framer-motion";

function generateParticles(count: number) {
  return Array.from({ length: count }).map((_, i) => ({
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: 1.5 + Math.random() * 2.5,
    opacity: 0.15 + Math.random() * 0.25,
    duration: 20 + Math.random() * 30,
    delay: Math.random() * 20,
    driftX: (Math.random() - 0.5) * 60,
    driftY: (Math.random() - 0.5) * 40,
  }));
}

export default function ParticleField({ count = 30 }: { count?: number }) {
  const [mounted, setMounted] = useState(false);
  const [particles, setParticles] = useState<ReturnType<typeof generateParticles>>([]);

  useEffect(() => {
    setParticles(generateParticles(count));
    setMounted(true);
  }, [count]);

  if (!mounted || particles.length === 0) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[2] overflow-hidden" aria-hidden>
      {particles.map((p, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            opacity: p.opacity,
            background: "rgba(var(--prism-r),0.4)",
          }}
          animate={{
            x: [0, p.driftX * 0.3, p.driftX * 0.6, p.driftX * 0.3, 0],
            y: [0, p.driftY, p.driftY * 0.5, p.driftY * 0.7, 0],
            opacity: [p.opacity, p.opacity * 1.5, p.opacity * 0.5, p.opacity * 1.2, p.opacity],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: p.delay,
          }}
        />
      ))}
    </div>
  );
}
