"use client";

import { ArrowUp } from "lucide-react";

export default function Footer() {
  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  const bankLinks = [
    { label: "Axis Bank", href: "#cards", external: false },
    { label: "HDFC Bank", href: "#cards", external: false },
    { label: "ICICI Bank", href: "#cards", external: false },
    { label: "SBI", href: "#cards", external: false },
    { label: "YES Bank", href: "#cards", external: false },
    { label: "IDFC FIRST", href: "#cards", external: false },
    { label: "AU Bank", href: "#cards", external: false },
  ];

  const compareLinks = [
    { label: "By Rewards", href: "#compare", external: false },
    { label: "By Lounges", href: "#compare", external: false },
    { label: "By Fee", href: "#compare", external: false },
    { label: "By Cashback", href: "#compare", external: false },
  ];

  const resourceLinks = [
    { label: "Credit Score", href: "https://www.cibil.com/free-credit-score", external: true },
    { label: "Eligibility", href: "#apply", external: false },
    { label: "FAQs", href: "#", external: false },
    { label: "Blog", href: "#", external: false },
  ];

  const companyLinks = [
    { label: "About", href: "#", external: false },
    { label: "Privacy", href: "#", external: false },
    { label: "Terms", href: "#", external: false },
    { label: "Contact", href: "#apply", external: false },
  ];

  return (
    <footer className="bg-carbon px-8 py-16">
      <div className="max-w-[1400px]">
        <div className="flex flex-col lg:flex-row justify-between gap-16">
          <div className="max-w-[300px]">
            <span className="text-[18px] font-[400] text-bone-white tracking-[0.01em]">
              Divyanshu Mishra
            </span>
            <p className="mt-4 text-[15px] font-[400] text-bone-white/40 leading-[1.6]">
              India&apos;s smartest credit card comparison platform. Find your perfect card
              from Axis, HDFC, ICICI, SBI, YES Bank, IDFC FIRST & AU Bank.
            </p>
            <p className="mt-3 text-[15px] font-[400] text-bone-white/30">
              divyanshu@gmail.com
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
            <div>
              <h4 className="text-[14px] font-[400] text-bone-white/50 tracking-[0.02em] mb-4">BANKS</h4>
              <ul className="space-y-3">
                {bankLinks.map((link) => (
                  <li key={link.label}>
                    <a href={link.href} className="text-[15px] font-[400] text-bone-white/30 hover:text-bone-white/60 transition-colors">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-[14px] font-[400] text-bone-white/50 tracking-[0.02em] mb-4">COMPARE</h4>
              <ul className="space-y-3">
                {compareLinks.map((link) => (
                  <li key={link.label}>
                    <a href={link.href} className="text-[15px] font-[400] text-bone-white/30 hover:text-bone-white/60 transition-colors">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-[14px] font-[400] text-bone-white/50 tracking-[0.02em] mb-4">RESOURCES</h4>
              <ul className="space-y-3">
                {resourceLinks.map((link) => (
                  <li key={link.label}>
                    <a href={link.href} target={link.external ? "_blank" : undefined} rel={link.external ? "noopener noreferrer" : undefined} className="text-[15px] font-[400] text-bone-white/30 hover:text-bone-white/60 transition-colors">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-[14px] font-[400] text-bone-white/50 tracking-[0.02em] mb-4">COMPANY</h4>
              <ul className="space-y-3">
                {companyLinks.map((link) => (
                  <li key={link.label}>
                    <a href={link.href} className="text-[15px] font-[400] text-bone-white/30 hover:text-bone-white/60 transition-colors">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-bone-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[14px] font-[400] text-bone-white/20">
            &copy; {new Date().getFullYear()} Divyanshu Mishra. Made in India.
          </p>
          <button
            onClick={scrollToTop}
            className="text-bone-white/30 hover:text-bone-white transition-colors"
            aria-label="Scroll to top"
          >
            <ArrowUp size={16} />
          </button>
        </div>
      </div>
    </footer>
  );
}
