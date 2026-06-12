"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import PrismDecoration from "@/components/prism-decoration";

const testimonials = [
  {
    quote: "I compared 6 cards side by side and picked the Axis ACE for utility bills. Saving ₹800/month on cashback alone.",
    author: "Rahul Sharma",
    role: "Software Engineer, Bengaluru",
  },
  {
    quote: "The comparison table made it easy to see which card had the best lounge access. Went with Regalia Gold — 14 visits a year.",
    author: "Ananya Patel",
    role: "Consultant, Mumbai",
  },
  {
    quote: "Got the Amazon Pay ICICI card through this site. Lifetime free, 5% back on Amazon — pays for my Prime membership.",
    author: "Vikram Singh",
    role: "Product Manager, Delhi",
  },
];

export default function Testimonials() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end end"],
  });

  const headingOpacity = useTransform(scrollYProgress, [0, 0.15], [0, 1]);
  const headingY = useTransform(scrollYProgress, [0, 0.15], [30, 0]);

  return (
    <section ref={ref} className="relative bg-slate-veil/60 px-8 py-[108px] overflow-hidden">
      <PrismDecoration count={2} variant="subtle" />
      <div className="relative z-10 max-w-[1400px]">
        <motion.div style={{ opacity: headingOpacity, y: headingY }}>
          <div className="section-number mb-6">
            <span className="text-[14px] font-[400] text-bone-white/50 tracking-[0.02em]">
              / 04
            </span>
          </div>
          <h2 className="mt-4 text-[56px] sm:text-[105px] font-[400] text-bone-white leading-[1.0] tracking-[-0.02em] max-w-[1100px]">
            Trusted by
            <br />
            <span className="font-[700]">thousands.</span>
          </h2>
        </motion.div>

        <div className="mt-20 grid md:grid-cols-3 gap-16">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.author}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.25, 0.1, 0.25, 1] }}
            >
              <div className="flex gap-1 mb-6">
                {Array.from({ length: 5 }).map((_, j) => (
                  <svg
                    key={j}
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#6f879c"
                    strokeWidth="1.5"
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                ))}
              </div>
              <blockquote className="text-[22px] font-[400] text-bone-white/70 leading-[1.3] mb-8">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <div className="pt-4 border-t border-bone-white/10">
                <p className="text-[15px] font-[400] text-bone-white">{t.author}</p>
                <p className="text-[14px] font-[400] text-bone-white/40 mt-1">{t.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
