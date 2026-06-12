"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function SectionDivider() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const scaleX = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 0]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);

  return (
    <div ref={ref} className="relative h-24 flex items-center justify-center overflow-hidden">
      <motion.div
        style={{ scaleX, opacity }}
        className="w-full h-px bg-gradient-to-r from-transparent via-gunmetal-blue to-transparent max-w-[600px]"
      />
    </div>
  );
}
