"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import Logo from "@/components/logo";

const navLinks = [
  { label: "CARDS", href: "#cards" },
  { label: "COMPARE", href: "#compare" },
  { label: "BENEFITS", href: "#benefits" },
  { label: "APPLY", href: "#apply" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const lastScroll = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const current = window.scrollY;
      setScrolled(current > 40);
      setHidden(current > 200 && current > lastScroll.current);
      lastScroll.current = current;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
        hidden ? "-translate-y-full" : "translate-y-0"
      } ${scrolled ? "bg-slate-veil/85 backdrop-blur-xl" : "bg-transparent"}`}
    >
      <div className="flex items-center justify-between px-8 py-5 max-w-[1400px] mx-auto">
        <Logo />

        <nav className="hidden md:flex items-center gap-[15px]">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-[14px] font-[400] text-bone-white/80 hover:text-bone-white transition-colors duration-300 tracking-[0.02em] hover-link"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#apply"
            className="inline-flex items-center justify-center text-[14px] font-[400] text-bone-white border border-bone-white px-[15px] py-[9px] rounded-none tracking-[0.02em] hover:border-gunmetal-blue hover:text-gunmetal-blue transition-all duration-300"
          >
            CONTACT
          </a>
        </nav>

        <button
          className="md:hidden text-bone-white p-2"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Menu"
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-carbon/95 backdrop-blur-xl overflow-hidden"
          >
            <div className="flex flex-col gap-4 px-8 py-6">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="text-[14px] font-[400] text-bone-white/80 hover:text-bone-white transition-colors tracking-[0.02em]"
                >
                  {link.label}
                </a>
              ))}
              <a
                href="#apply"
                className="inline-flex items-center justify-center text-[14px] font-[400] text-bone-white border border-bone-white px-[15px] py-[9px] rounded-none tracking-[0.02em] w-fit"
              >
                CONTACT
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
