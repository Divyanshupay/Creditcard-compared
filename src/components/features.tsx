"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import PrismDecoration from "@/components/prism-decoration";

const benefits = [
  {
    stat: "0%",
    statLabel: "FOREIGN MARKUP",
    title: "Zero forex markup on premium cards — save 3.5% on every international swipe.",
  },
  {
    stat: "₹1.5L",
    statLabel: "UPI CREDIT LIMIT",
    title: "Link your RuPay credit card to any UPI app. Pay directly from credit limit.",
  },
  {
    stat: "600+",
    statLabel: "LOUNGES INDIA",
    title: "Complimentary domestic and international lounge access. Unlimited on premium tiers.",
  },
  {
    stat: "10X",
    statLabel: "REWARD POINTS",
    title: "SmartBuy, EDGE Rewards, iMobile portals — up to 10X rewards on flights & hotels.",
  },
];

function Counter({ value, suffix = "" }: { value: string; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <span ref={ref} className="text-[56px] font-[400] text-bone-white leading-[1.0] tracking-[-0.02em]">
      {value}
      {suffix}
    </span>
  );
}

export default function Features() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end end"],
  });

  const headingOpacity = useTransform(scrollYProgress, [0, 0.15], [0, 1]);
  const headingY = useTransform(scrollYProgress, [0, 0.15], [30, 0]);

  return (
    <section id="benefits" ref={ref} className="relative bg-slate-veil/60 px-8 py-[108px] overflow-hidden">
      <PrismDecoration count={2} variant="subtle" />
      <div className="relative z-10 max-w-[1400px]">
        <motion.div style={{ opacity: headingOpacity, y: headingY }}>
          <div className="section-number mb-6">
            <span className="text-[14px] font-[400] text-bone-white/50 tracking-[0.02em]">
              / 02
            </span>
          </div>
          <h2 className="mt-4 text-[56px] sm:text-[105px] font-[400] text-bone-white leading-[1.0] tracking-[-0.02em] max-w-[1100px]">
            Built for Indian
            <br />
            <span className="font-[700]">cardholders.</span>
          </h2>
        </motion.div>

        <div className="mt-20 grid md:grid-cols-2 gap-16">
          {benefits.map((b, i) => (
            <motion.div
              key={b.statLabel}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.25, 0.1, 0.25, 1] }}
            >
              <Counter value={b.stat} />
              <span className="block text-[14px] font-[400] text-gunmetal-blue tracking-[0.02em] mt-2 mb-4">
                {b.statLabel}
              </span>
              <div className="w-8 h-px bg-gunmetal-blue/40 mb-4" />
              <p className="text-[22px] font-[400] text-bone-white/60 leading-[1.3] max-w-[480px]">
                {b.title}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
