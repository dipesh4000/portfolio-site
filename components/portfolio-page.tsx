"use client";

import { useEffect, useState } from "react";
import { Hero } from "@/components/hero";
import { Navbar } from "@/components/navbar";
import { WashiHero } from "@/components/washi-hero";
import { WashiNavbar } from "@/components/washi-navbar";
import { SignalHero } from "@/components/signal-hero";
import { SignalNavbar } from "@/components/signal-navbar";
import { DottedHummingbird } from "@/components/dotted-hummingbird";
import { Footer } from "@/components/footer";
import { CodingStats } from "@/components/stats";
import { BentoGrid } from "@/components/bento-grid";
import { ContactSection, ExperienceSection } from "@/components/sections";

const portfolioThemes = [
  { id: "classic", label: "Classic" },
  { id: "washi", label: "Washi" },
  { id: "signal", label: "Signal" },
] as const;

type PortfolioTheme = (typeof portfolioThemes)[number]["id"];
const THEME_STORAGE_KEY = "portfolio-theme-v1";

export function PortfolioPage() {
  const [portfolioTheme, setPortfolioTheme] = useState<PortfolioTheme>("classic");
  const [themePreferenceLoaded, setThemePreferenceLoaded] = useState(false);

  useEffect(() => {
    const savedTheme = window.localStorage.getItem(THEME_STORAGE_KEY);
    if (portfolioThemes.some(({ id }) => id === savedTheme)) {
      setPortfolioTheme(savedTheme as PortfolioTheme);
    }
    setThemePreferenceLoaded(true);
  }, []);

  useEffect(() => {
    document.documentElement.dataset.siteTheme = portfolioTheme;
    if (themePreferenceLoaded) {
      window.localStorage.setItem(THEME_STORAGE_KEY, portfolioTheme);
    }
  }, [portfolioTheme, themePreferenceLoaded]);

  const currentIndex = portfolioThemes.findIndex(({ id }) => id === portfolioTheme);
  const nextTheme = portfolioThemes[(currentIndex + 1) % portfolioThemes.length];
  const cyclePortfolioTheme = () => setPortfolioTheme(nextTheme.id);
  const themeControlProps = {
    onPortfolioThemeToggle: cyclePortfolioTheme,
    nextPortfolioThemeLabel: nextTheme.label,
  };

  return (
    <main
      id="main-content"
      className={`${portfolioTheme === "washi" ? "site-shell" : ""} ${portfolioTheme === "signal" ? "signal-shell" : ""} relative min-h-screen overflow-hidden`}
      style={portfolioTheme === "classic" ? { backgroundColor: "#0a0a0a" } : undefined}
    >
      {portfolioTheme === "signal" ? (
        <>
          <SignalNavbar {...themeControlProps} />
          <SignalHero />
          <DottedHummingbird />
        </>
      ) : portfolioTheme === "washi" ? (
        <>
          <WashiNavbar {...themeControlProps} />
          <WashiHero />
        </>
      ) : (
        <>
          <Navbar {...themeControlProps} />
          <Hero />
        </>
      )}
      <BentoGrid />
      <CodingStats />
      <ExperienceSection />
      <ContactSection />
      <Footer />
    </main>
  );
}
