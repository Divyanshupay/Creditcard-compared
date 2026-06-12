"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import PrismDecoration from "@/components/prism-decoration";

const tiers = [
  { key: "entry", label: "ENTRY LEVEL" },
  { key: "mid", label: "MID PREMIUM" },
  { key: "premium", label: "PREMIUM" },
];

const features = [
  { name: "Annual Fee", entry: "₹0–₹500", mid: "₹500–₹3,500", premium: "₹10,000+" },
  { name: "Fee Waiver", entry: "₹1L–₹2L", mid: "₹1.5L–₹3L", premium: "₹10L–₹15L" },
  { name: "Cashback Rate", entry: "5% on select", mid: "3–5%", premium: "5–25 pts/₹200" },
  { name: "UPI Payments", entry: true, mid: true, premium: true },
  { name: "Domestic Lounge", entry: "0–2/yr", mid: "4–8/yr", premium: "Unlimited" },
  { name: "International Lounge", entry: false, mid: "6/yr", premium: "Unlimited" },
  { name: "Railway Lounge", entry: "2–4/yr", mid: true, premium: true },
  { name: "Fuel Waiver", entry: "1% ≤₹250", mid: "1% ≤₹500", premium: "1% ≤₹500" },
  { name: "Movie Perks", entry: "25% BMS", mid: "B1G1 BMS", premium: "B1G1 BMS" },
  { name: "Zero Forex", entry: false, mid: "Select", premium: "All" },
  { name: "Concierge", entry: false, mid: "Standard", premium: "24/7" },
  { name: "Metal Card", entry: false, mid: false, premium: "Select" },
];

export default function ComparisonTable() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end end"],
  });

  const headingOpacity = useTransform(scrollYProgress, [0, 0.15], [0, 1]);
  const headingY = useTransform(scrollYProgress, [0, 0.15], [30, 0]);

  return (
    <section id="compare" ref={ref} className="relative bg-slate-veil/60 px-8 py-[108px] overflow-hidden">
      <PrismDecoration count={2} variant="subtle" />
      <div className="relative z-10 max-w-[1400px]">
        <motion.div style={{ opacity: headingOpacity, y: headingY }}>
          <div className="section-number mb-6">
            <span className="text-[14px] font-[400] text-bone-white/50 tracking-[0.02em]">
              / 03
            </span>
          </div>
          <h2 className="mt-4 text-[56px] sm:text-[105px] font-[400] text-bone-white leading-[1.0] tracking-[-0.02em] max-w-[1100px]">
            Side by side,
            <br />
            <span className="font-[700]">no surprises.</span>
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mt-16 overflow-x-auto"
        >
          <table className="w-full min-w-[640px]">
            <thead>
              <tr className="border-b border-bone-white/10">
                <th className="text-left py-5 pr-6 text-[14px] font-[400] text-bone-white/40 tracking-[0.02em]">
                  FEATURE
                </th>
                {tiers.map((tier) => (
                  <th key={tier.key} className="py-5 px-6 text-center">
                    <span className="text-[14px] font-[400] text-bone-white tracking-[0.02em]">
                      {tier.label}
                    </span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {features.map((feature, index) => (
                <motion.tr
                  key={feature.name}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.03 }}
                  className="border-b border-bone-white/5"
                >
                  <td className="py-4 pr-6 text-[15px] font-[400] text-bone-white/70">
                    {feature.name}
                  </td>
                  {(["entry", "mid", "premium"] as const).map((tier) => (
                    <td
                      key={tier}
                      className={cn(
                        "py-4 px-6 text-center text-[15px] font-[400]",
                        tier === "mid"
                          ? "text-gunmetal-blue"
                          : "text-bone-white/60",
                        typeof feature[tier] === "boolean"
                          ? feature[tier]
                            ? "text-gunmetal-blue"
                            : "text-bone-white/20"
                          : ""
                      )}
                    >
                      {typeof feature[tier] === "boolean"
                        ? feature[tier] ? "✓" : "—"
                        : feature[tier]}
                    </td>
                  ))}
                </motion.tr>
              ))}
            </tbody>
          </table>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="mt-12 flex gap-4"
        >
          <a
            href="#apply"
            className="inline-flex items-center gap-2 text-[14px] font-[400] text-bone-white border border-bone-white px-[15px] py-[9px] tracking-[0.02em] hover:border-gunmetal-blue hover:text-gunmetal-blue transition-colors duration-300"
          >
            FIND MY CARD
            <ArrowRight size={14} />
          </a>
          <a
            href="#cards"
            className="inline-flex items-center text-[14px] font-[400] text-gunmetal-blue border border-gunmetal-blue px-[15px] py-[9px] tracking-[0.02em] hover:border-bone-white hover:text-bone-white transition-colors duration-300"
          >
            VIEW ALL 50+
          </a>
        </motion.div>
      </div>
    </section>
  );
}
