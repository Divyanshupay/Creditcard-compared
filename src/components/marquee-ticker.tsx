"use client";

import { motion } from "framer-motion";

const tickerItems = [
  "₹0 joining fee on ICICI Amazon Pay",
  "5% cashback on Axis ACE utilities",
  "Unlimited lounge with HDFC Infinia",
  "10X rewards on Axis Magnus",
  "5% cashback on SBI Cashback online",
  "Lifetime free AU ixigo card",
  "25% cashback on Airtel Axis bills",
  "10% cashback on YES PROSPERITY utilities",
  "Lifetime free IDFC FIRST Select",
  "1% cashback on UPI with AU SPONT",
  "Metal card with HDFC Infinia",
  "Zero forex on AU ixigo",
  "B1G1 movie tickets with ICICI Coral",
];

export default function MarqueeTicker() {
  return (
    <div className="relative w-full overflow-hidden bg-carbon/40 py-3 border-y border-bone-white/5">
      <motion.div
        className="flex gap-16 whitespace-nowrap"
        animate={{ x: ["0%", "-50%"] }}
        transition={{
          duration: 40,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        {[...tickerItems, ...tickerItems].map((item, i) => (
          <span
            key={i}
            className="text-[14px] font-[400] text-bone-white/30 tracking-[0.02em] flex items-center gap-16"
          >
            <span className="size-1 rounded-full bg-gunmetal-blue/50 inline-block" />
            {item}
          </span>
        ))}
      </motion.div>
    </div>
  );
}
