"use client";

import { motion } from "framer-motion";

export default function Logo() {
  return (
    <a href="#" className="flex items-center gap-3 group">
      <div className="relative size-9 shrink-0">
        <svg width="36" height="36" viewBox="0 0 36 36" fill="none" className="absolute inset-0">
          <rect x="1" y="1" width="34" height="34" rx="8" stroke="var(--color-gunmetal-blue)" strokeWidth="1.5" className="group-hover:opacity-60 transition-opacity" />
        </svg>
        <svg width="36" height="36" viewBox="0 0 36 36" fill="none" className="absolute inset-0">
          <motion.path
            d="M12 10 L24 10 L24 18 L12 18 Z"
            stroke="var(--color-gunmetal-blue)"
            strokeWidth="2"
            strokeLinejoin="round"
            fill="none"
            className="group-hover:opacity-80 transition-opacity"
          />
          <motion.path
            d="M14 10 L14 26"
            stroke="var(--color-gunmetal-blue)"
            strokeWidth="2"
            strokeLinecap="round"
            className="group-hover:opacity-80 transition-opacity"
          />
          <motion.path
            d="M18 18 L18 26"
            stroke="var(--color-gunmetal-blue)"
            strokeWidth="2"
            strokeLinecap="round"
            className="group-hover:opacity-80 transition-opacity"
          />
          <motion.circle
            cx="18" cy="14" r="3"
            fill="var(--color-gunmetal-blue)"
            className="group-hover:opacity-80 transition-opacity"
          />
        </svg>
      </div>
      <span className="text-[17px] font-[400] text-bone-white tracking-[-0.01em] group-hover:text-gunmetal-blue transition-colors duration-300">
        Divyanshu
      </span>
    </a>
  );
}
