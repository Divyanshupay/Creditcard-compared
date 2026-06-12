"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";
import PrismDecoration from "@/components/prism-decoration";
import ScrollIndicator from "@/components/scroll-indicator";

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0.2]);
  const y = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.95]);

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      <div className="absolute inset-0 bg-slate-veil/60" />

      <PrismDecoration count={3} variant="hero" mouseParallax />

      <motion.div
        style={{ opacity, y: mounted ? y : 0, scale }}
        className="relative z-10 w-full px-8 pt-32 pb-24"
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
          className="max-w-[1400px]"
        >
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="section-number mb-6"
          >
            <span className="text-[14px] font-[400] text-bone-white/50 tracking-[0.02em]">
              / 00
            </span>
          </motion.div>

          <h1 className="text-[105px] sm:text-[136px] font-[400] text-bone-white leading-[1.0] tracking-[-0.02em] max-w-[1200px]">
            {mounted && (
              <>
                <motion.span
                  initial={{ clipPath: "inset(0 0 100% 0)", y: 40 }}
                  animate={{ clipPath: "inset(0 0 0% 0)", y: 0 }}
                  transition={{ duration: 0.9, delay: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
                  className="block"
                >
                  India&apos;s best
                </motion.span>
                <motion.span
                  initial={{ clipPath: "inset(0 0 100% 0)", y: 40 }}
                  animate={{ clipPath: "inset(0 0 0% 0)", y: 0 }}
                  transition={{ duration: 0.9, delay: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
                  className="block"
                >
                  credit cards.
                </motion.span>
                <motion.span
                  initial={{ clipPath: "inset(0 0 100% 0)", y: 40 }}
                  animate={{ clipPath: "inset(0 0 0% 0)", y: 0 }}
                  transition={{ duration: 0.9, delay: 1.0, ease: [0.25, 0.1, 0.25, 1] }}
                >
                  <span className="font-[700]"> Compared.</span>
                </motion.span>
              </>
            )}
          </h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.3 }}
          >
            <div className="w-16 h-px bg-gunmetal-blue my-8" />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.4 }}
            className="text-[18px] font-[400] text-bone-white/60 leading-[1.5] max-w-[540px]"
          >
            Rewards, fees, lounge access, and benefits across Axis, HDFC, ICICI, SBI,
            YES Bank, IDFC FIRST, and AU Bank. Find your perfect card in minutes.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.6 }}
            className="mt-12 flex gap-4"
          >
            <a
              href="#cards"
              className="group inline-flex items-center gap-2 text-[14px] font-[400] text-bone-white border border-bone-white px-[15px] py-[9px] tracking-[0.02em] hover:border-gunmetal-blue hover:text-gunmetal-blue transition-all duration-500"
            >
              EXPLORE CARDS
              <ArrowRight size={14} className="transition-transform duration-500 group-hover:translate-x-1" />
            </a>
            <a
              href="#compare"
              className="group inline-flex items-center gap-2 text-[14px] font-[400] text-gunmetal-blue border border-gunmetal-blue px-[15px] py-[9px] tracking-[0.02em] hover:border-bone-white hover:text-bone-white transition-all duration-500"
            >
              COMPARE ALL
            </a>
          </motion.div>
        </motion.div>
      </motion.div>

      <ScrollIndicator />
    </section>
  );
}
