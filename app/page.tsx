'use client';

import { FloatingNav } from "@/components/ui/floating-nav";
import { Navbar } from "@/components/ui/navbar";
import { HeroSection } from "@/components/sections/hero-section";
import { FeatureSection } from "@/components/sections/features-section";
import { GameplaySection } from "@/components/sections/gameplay-section";
import { RoadmapSection } from "@/components/sections/roadmap-section";
import { StatsSection } from "@/components/sections/stats-section";

import { useMediaQuery } from "@/hooks/use-media-query";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function Home() {
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      {/* Show regular navbar on mobile and desktop (when not scrolled) */}
      <div className={isDesktop ? (scrolled ? "hidden" : "block") : "block"}>
        <Navbar onNavigate={scrollToSection} />
      </div>

      {/* Show floating nav only on desktop when scrolled */}
      {isDesktop && scrolled && (
        <FloatingNav onNavigate={scrollToSection} />
      )}

      <motion.main
        className="min-h-screen bg-black relative"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Background gradients */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.05)_0%,rgba(0,0,0,0)_100%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_60%_50%,rgba(139,92,246,0.05)_0%,rgba(0,0,0,0)_100%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(234,88,12,0.05)_0%,rgba(0,0,0,0)_100%)]" />
        </div>

        {/* Content sections */}
        <HeroSection />
        <FeatureSection />
        <StatsSection />
        <GameplaySection />
        <RoadmapSection />

        {/* Footer */}
        <footer className="py-8 text-center text-sm text-white/60">
          <div className="container mx-auto px-4">
            <p>© 2025 Realm of Cards Adventure. All rights reserved.</p>
          </div>
        </footer>
      </motion.main>
    </>
  );
}