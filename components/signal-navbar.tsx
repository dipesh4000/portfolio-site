"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, Moon, Palette, Sun, X } from "lucide-react";
import { useTheme } from "next-themes";

const navLinks = [
  { href: "#about", label: "About" },
  { href: "#coding-stats", label: "Stats" },
  { href: "#projects", label: "Projects" },
  { href: "#experience", label: "Experience" },
  { href: "#contact", label: "Contact" },
];

type SignalNavbarProps = {
  onPortfolioThemeToggle: () => void;
  nextPortfolioThemeLabel: string;
};

export function SignalNavbar({ onPortfolioThemeToggle, nextPortfolioThemeLabel }: SignalNavbarProps) {
  const [mounted, setMounted] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const { resolvedTheme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => setIsScrolled(window.scrollY > 36);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!isMobileMenuOpen) return;
    const focusables = Array.from(mobileMenuRef.current?.querySelectorAll<HTMLElement>("button, a[href]") ?? []);
    const first = focusables[0];
    const last = focusables.at(-1);
    requestAnimationFrame(() => first?.focus());

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsMobileMenuOpen(false);
      if (event.key !== "Tab" || !first || !last) return;
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isMobileMenuOpen]);

  const isDark = mounted && resolvedTheme === "dark";
  const nextColorMode = isDark ? "light" : "dark";
  const ColorModeIcon = isDark ? Sun : Moon;

  const navigate = (href: string) => {
    setIsMobileMenuOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  const controls = (
    <div className="signal-controls">
      <button type="button" onClick={onPortfolioThemeToggle} className="signal-control" aria-label={`Switch portfolio theme to ${nextPortfolioThemeLabel}`} title={`Switch to ${nextPortfolioThemeLabel} theme`}>
        <Palette className="h-3.5 w-3.5" />
        <span className="hidden lg:inline">{nextPortfolioThemeLabel}</span>
      </button>
      <button type="button" onClick={() => setTheme(nextColorMode)} className="signal-control" aria-label={`Switch to ${nextColorMode} mode`} title={`Switch to ${nextColorMode} mode`}>
        {mounted && <ColorModeIcon className="h-3.5 w-3.5" />}
        <span className="hidden lg:inline">{nextColorMode}</span>
      </button>
    </div>
  );

  return (
    <>
      <motion.nav initial={{ y: -64 }} animate={{ y: 0 }} transition={{ duration: 0.5 }} className={`signal-nav fixed inset-x-0 top-0 z-50 ${isScrolled ? "is-scrolled" : ""}`}>
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-8 lg:px-12">
          <a href="#top" onClick={(event) => { event.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }} className="signal-wordmark" aria-label="Dipesh Kumar home">
            <span className="signal-mark" aria-hidden="true"><i /><i /><i /><i /><i /></span>
            <span>DK / 26</span>
          </a>

          <div className="hidden items-center gap-1 md:flex">
            {navLinks.map((link) => <button key={link.href} type="button" onClick={() => navigate(link.href)} className="signal-nav-link">{link.label}</button>)}
            <span className="mx-2 h-px w-8 bg-[var(--site-border)]" aria-hidden="true" />
            {controls}
          </div>

          <div className="flex items-center gap-2 md:hidden">
            {controls}
            <button type="button" onClick={() => setIsMobileMenuOpen((open) => !open)} className="signal-menu-button" aria-expanded={isMobileMenuOpen} aria-controls="signal-mobile-nav" aria-label="Toggle navigation">
              {isMobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </div>
      </motion.nav>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div ref={mobileMenuRef} id="signal-mobile-nav" role="dialog" aria-modal="true" aria-label="Site navigation" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="signal-mobile-menu fixed inset-0 z-40 grid place-items-center px-6 pt-16 md:hidden">
            <div className="relative z-10 w-full max-w-sm border border-[var(--site-border)] bg-[var(--site-bg)] p-5">
              <p className="signal-kicker mb-4">INDEX / 01-05</p>
              {navLinks.map((link, index) => (
                <button key={link.href} type="button" onClick={() => navigate(link.href)} className="signal-mobile-link"><span>0{index + 1}</span>{link.label}</button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
