"use client";

import { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Cpu, TrendingUp } from "lucide-react";

export default function CreditCard3D() {
  const ref = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springX = useSpring(x, { stiffness: 200, damping: 20 });
  const springY = useSpring(y, { stiffness: 200, damping: 20 });

  const rotateX = useTransform(springY, [-0.5, 0.5], [8, -8]);
  const rotateY = useTransform(springX, [-0.5, 0.5], [-8, 8]);

  const glareX = useTransform(springX, [-0.5, 0.5], [0, 100]);
  const glareY = useTransform(springY, [-0.5, 0.5], [0, 100]);

  function handleMouse(e: React.MouseEvent) {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    x.set(px);
    y.set(py);
  }

  function handleLeave() {
    x.set(0);
    y.set(0);
    setHovered(false);
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={handleLeave}
      whileHover={{ scale: 1.05 }}
      style={{ rotateX, rotateY, transformPerspective: 1200 }}
      className="relative w-[340px] h-[220px] sm:w-[400px] sm:h-[260px] rounded-[20px] cursor-pointer select-none"
    >
      <div className="absolute inset-0 rounded-[20px] bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#0f3460] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-amber-400/10 via-transparent to-amber-400/5" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-400/40 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-400/20 to-transparent" />
        <div className="absolute -top-20 -right-20 w-40 h-40 bg-amber-400/10 rounded-full blur-[40px]" />
        <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-amber-400/5 rounded-full blur-[40px]" />
      </div>

      <motion.div
        className="absolute inset-0 rounded-[20px] pointer-events-none mix-blend-soft-light"
        style={{
          background: `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255,255,255,0.15) 0%, transparent 60%)`,
        }}
      />

      <div className="relative z-10 flex flex-col justify-between h-full p-6 sm:p-8">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-[10px] font-[400] text-silver/60 tracking-[0.15em] uppercase">
              DivyanshuOP Infinite
            </p>
            <p className="text-[9px] font-[400] text-silver/40 tracking-[0.1em] mt-1">
              Powered by DivyanshuOP Financial
            </p>
          </div>
          <Cpu size={28} className="text-ghost-blue/60" />
        </div>

        <div>
          <p className="text-lg sm:text-xl font-[420] text-starlight tracking-[0.05em] font-mono">
            •••• •••• •••• 4829
          </p>
          <div className="flex items-center gap-8 mt-4">
            <div>
              <p className="text-[9px] font-[400] text-silver/50 tracking-[0.1em] uppercase">
                Valid Thru
              </p>
              <p className="text-sm font-[400] text-starlight tracking-[0.05em]">
                12/28
              </p>
            </div>
            <div>
              <p className="text-[9px] font-[400] text-silver/50 tracking-[0.1em] uppercase">
                Cardholder
              </p>
              <p className="text-sm font-[400] text-starlight tracking-[0.03em]">
                D. O. PRAKASH
              </p>
            </div>
          </div>
        </div>

        <div className="absolute bottom-6 right-8">
          <motion.div
            animate={hovered ? { rotate: [0, -10, 0] } : {}}
            transition={{ duration: 0.5 }}
          >
            <TrendingUp size={24} className="text-amber-400/60" />
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
