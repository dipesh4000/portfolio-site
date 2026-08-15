"use client";

import { useEffect, useState } from "react";
import { Hero } from "@/components/hero";
import { Navbar } from "@/components/navbar";
import { SignalHero } from "@/components/signal-hero";
import { SignalNavbar } from "@/components/signal-navbar";
import { DottedHummingbird } from "@/components/dotted-hummingbird";
import { Footer } from "@/components/footer";
import { CodingStats } from "@/components/stats";
import { BentoGrid } from "@/components/bento-grid";
import { ContactSection, ExperienceSection } from "@/components/sections";

const portfolioThemes = [
  { id: "classic", label: "Classic" },
  { id: "signal", label: "Signal" },
] as const;

type PortfolioTheme = (typeof portfolioThemes)[number]["id"];
const THEME_COOKIE_KEY = "portfolio-theme-v1";
const THEME_COOKIE_MAX_AGE = 60 * 60 * 24 * 365;

type PortfolioPageProps = {
  initialPortfolioTheme: PortfolioTheme;
};

export function PortfolioPage({ initialPortfolioTheme }: PortfolioPageProps) {
  const [portfolioTheme, setPortfolioTheme] = useState<PortfolioTheme>(initialPortfolioTheme);

  useEffect(() => {
    document.documentElement.dataset.siteTheme = portfolioTheme;
    document.cookie = `${THEME_COOKIE_KEY}=${portfolioTheme}; Path=/; Max-Age=${THEME_COOKIE_MAX_AGE}; SameSite=Lax`;
  }, [portfolioTheme]);

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
      className={`${portfolioTheme === "signal" ? "signal-shell" : ""} relative min-h-screen overflow-hidden`}
    >
      {portfolioTheme === "signal" ? (
        <>
          <SignalNavbar {...themeControlProps} />
          <SignalHero />
          <DottedHummingbird />
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
