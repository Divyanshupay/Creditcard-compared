"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function OrganicLiquid() {
  const [mounted, setMounted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);
  const smoothX = useSpring(mouseX, { stiffness: 30, damping: 15 });
  const smoothY = useSpring(mouseY, { stiffness: 30, damping: 15 });

  useEffect(() => {
    setMounted(true);
    const container = containerRef.current;
    if (!container) return;

    const onMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouseX.set((e.clientX - rect.left) / rect.width);
      mouseY.set((e.clientY - rect.top) / rect.height);
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMouseMove);
  }, [mouseX, mouseY]);

  useEffect(() => {
    if (!mounted) return;
    const svg = document.getElementById("organic-svg");
    if (!svg) return;

    const unsubscribeX = smoothX.on("change", (v) => {
      svg.style.setProperty("--disp-x", `${20 + v * 30}`);
    });
    const unsubscribeY = smoothY.on("change", (v) => {
      svg.style.setProperty("--disp-y", `${10 + v * 20}`);
    });

    return () => { unsubscribeX(); unsubscribeY(); };
  }, [mounted, smoothX, smoothY]);

  if (!mounted) return null;

  return (
    <div ref={containerRef} className="fixed inset-0 pointer-events-none z-[1] overflow-hidden" aria-hidden>
      <svg
        id="organic-svg"
        className="w-full h-full"
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMid slice"
        style={{ "--disp-x": "35", "--disp-y": "20" } as React.CSSProperties}
      >
        <defs>
          <filter id="liquid-morph" x="-50%" y="-50%" width="200%" height="200%">
            <feTurbulence type="fractalNoise" baseFrequency="0.008" numOctaves="4" seed="2" result="noise">
              <animate attributeName="baseFrequency" values="0.006;0.012;0.008;0.01;0.006" dur="20s" repeatCount="indefinite" />
            </feTurbulence>
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="var(--disp-x)" xChannelSelector="R" yChannelSelector="G" result="displaced" />
            <feGaussianBlur in="displaced" stdDeviation="30" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          <filter id="glow" x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur stdDeviation="60" result="glow" />
            <feMerge>
              <feMergeNode in="glow" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <g filter="url(#liquid-morph)">
          <motion.ellipse
            cx="500" cy="350" rx="400" ry="300"
            style={{ fill: "rgba(var(--prism-a),0.08)" }}
            animate={{ cx: [500, 600, 450, 550, 500], cy: [350, 300, 400, 320, 350], rx: [400, 350, 450, 380, 400], ry: [300, 350, 280, 320, 300] }}
            transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
          />

          <motion.ellipse
            cx="900" cy="500" rx="350" ry="250"
            style={{ fill: "rgba(var(--prism-glow-r),0.07)" }}
            animate={{ cx: [900, 800, 950, 850, 900], cy: [500, 550, 450, 520, 500], rx: [350, 400, 320, 370, 350], ry: [250, 200, 300, 260, 250] }}
            transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }}
          />

          <motion.ellipse
            cx="720" cy="420" rx="200" ry="180"
            style={{ fill: "rgba(var(--prism-glow-b),0.06)" }}
            animate={{ cx: [720, 680, 760, 700, 720], cy: [420, 380, 450, 400, 420], rx: [200, 230, 180, 210, 200], ry: [180, 150, 200, 170, 180] }}
            transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          />

          <motion.ellipse
            cx="300" cy="600" rx="250" ry="200"
            style={{ fill: "rgba(var(--prism-r),0.06)" }}
            animate={{ cx: [300, 350, 250, 320, 300], cy: [600, 550, 650, 580, 600], rx: [250, 200, 280, 230, 250], ry: [200, 250, 180, 220, 200] }}
            transition={{ duration: 35, repeat: Infinity, ease: "easeInOut" }}
          />

          <motion.ellipse
            cx="1100" cy="250" rx="180" ry="220"
            style={{ fill: "rgba(var(--prism-a),0.06)" }}
            animate={{ cx: [1100, 1050, 1150, 1080, 1100], cy: [250, 300, 200, 280, 250], rx: [180, 220, 160, 200, 180], ry: [220, 180, 240, 200, 220] }}
            transition={{ duration: 28, repeat: Infinity, ease: "easeInOut" }}
          />
        </g>
      </svg>
    </div>
  );
}
