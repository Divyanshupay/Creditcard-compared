"use client";

import { useEffect, useRef } from "react";
import ThemeProvider from "@/components/theme-provider";
import { AnimatedGradientOrbs, NoiseOverlay, GridPattern } from "@/components/atmosphere";
import OrganicLiquid from "@/components/organic-liquid";
import ParticleField from "@/components/particle-field";
import Header from "@/components/header";
import Hero from "@/components/hero";
import MarqueeTicker from "@/components/marquee-ticker";
import CardsShowcase from "@/components/cards-showcase";
import Features from "@/components/features";
import ComparisonTable from "@/components/comparison-table";
import Testimonials from "@/components/testimonials";
import ApplicationForm from "@/components/application-form";
import Footer from "@/components/footer";
import SectionDivider from "@/components/section-divider";

function ScrollProgress() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement.scrollHeight - window.innerHeight;
      if (ref.current) ref.current.style.transform = `scaleX(${h > 0 ? window.scrollY / h : 0})`;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <div ref={ref} className="fixed top-0 left-0 right-0 h-[1px] z-[100] origin-left" style={{ background: "linear-gradient(90deg, var(--color-gunmetal-blue), var(--color-bone-white), var(--color-gunmetal-blue))", transform: "scaleX(0)" }} />
  );
}

export default function Home() {
  return (
    <ThemeProvider>
      <ScrollProgress />
      <AnimatedGradientOrbs />
      <OrganicLiquid />
      <GridPattern />
      <ParticleField count={40} />
      <NoiseOverlay />
      <div className="relative z-10">
        <Header />
        <Hero />
        <MarqueeTicker />
        <CardsShowcase />
        <SectionDivider />
        <Features />
        <SectionDivider />
        <ComparisonTable />
        <SectionDivider />
        <Testimonials />
        <SectionDivider />
        <ApplicationForm />
        <Footer />
      </div>
    </ThemeProvider>
  );
}
