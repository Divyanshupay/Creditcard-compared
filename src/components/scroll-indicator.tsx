"use client";

import { motion, useScroll, useTransform } from "framer-motion";

export default function ScrollIndicator() {
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.12], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.12], [1, 0.5]);

  return (
    <motion.div
      style={{ opacity, scale }}
      className="absolute bottom-10 left-10 z-20"
    >
      <svg width="80" height="80" viewBox="0 0 80 80" className="animate-[spin_12s_linear_infinite]">
        <defs>
          <path id="scroll-text-path" d="M 40 10 A 30 30 0 1 1 39.99 10" fill="none" />
        </defs>
        <text fill="rgba(255,253,249,0.35)" fontSize="7" fontWeight="400" letterSpacing="3">
          <textPath href="#scroll-text-path" startOffset="0%">
            SCROLL TO EXPLORE • SCROLL TO EXPLORE • 
          </textPath>
        </text>
      </svg>

      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        animate={{ y: [0, 4, 0] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
      >
        <svg width="16" height="24" viewBox="0 0 16 24" fill="none" stroke="rgba(255,253,249,0.35)" strokeWidth="1.2">
          <rect x="1.5" y="1.5" width="13" height="21" rx="6.5" />
          <motion.circle
            cx="8" cy="8" r="2" fill="rgba(255,253,249,0.5)" stroke="none"
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          />
        </svg>
      </motion.div>
    </motion.div>
  );
}
