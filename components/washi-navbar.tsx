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

type WashiNavbarProps = {
  onPortfolioThemeToggle: () => void;
  nextPortfolioThemeLabel: string;
};

export function WashiNavbar({ onPortfolioThemeToggle, nextPortfolioThemeLabel }: WashiNavbarProps) {
  const [mounted, setMounted] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSweeping, setIsSweeping] = useState(false);
  const timers = useRef<number[]>([]);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const { resolvedTheme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => setIsScrolled(window.scrollY > 40);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      timers.current.forEach(window.clearTimeout);
    };
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

  const currentColorMode = mounted && resolvedTheme === "dark" ? "dark" : "light";
  const nextColorMode = currentColorMode === "dark" ? "light" : "dark";

  const toggleTheme = () => {
    if (isSweeping) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setTheme(nextColorMode);
      return;
    }
    setIsSweeping(true);
    timers.current.push(window.setTimeout(() => setTheme(nextColorMode), 260));
    timers.current.push(window.setTimeout(() => setIsSweeping(false), 660));
  };

  const navigate = (href: string) => {
    setIsMobileMenuOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  const colorModeToggle = (
    <button
      type="button"
      onClick={toggleTheme}
      disabled={isSweeping}
      className="theme-seal-toggle"
      aria-label={`Switch to ${nextColorMode} mode`}
      title={`Switch to ${nextColorMode} mode`}
    >
      <span className="theme-seal-dot" aria-hidden="true">
        {currentColorMode === "dark" ? <Sun className="h-3.5 w-3.5" /> : <Moon className="h-3.5 w-3.5" />}
      </span>
      <span className="hidden lg:inline">{nextColorMode}</span>
    </button>
  );

  const portfolioThemeToggle = (
    <button
      type="button"
      onClick={onPortfolioThemeToggle}
      className="theme-seal-toggle"
      aria-label={`Switch portfolio theme to ${nextPortfolioThemeLabel}`}
      title={`Switch to ${nextPortfolioThemeLabel} theme`}
    >
      <span className="theme-seal-dot" aria-hidden="true"><Palette className="h-3.5 w-3.5" /></span>
      <span className="hidden lg:inline">{nextPortfolioThemeLabel}</span>
    </button>
  );

  return (
    <>
      <div className={`theme-ink-sweep ${isSweeping ? "is-active" : ""}`} aria-hidden="true" />
      <motion.nav
        initial={{ y: -70, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        className={`washi-nav fixed inset-x-0 top-0 z-50 ${isScrolled ? "is-scrolled" : ""}`}
      >
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-8 lg:px-12">
          <a href="#top" onClick={(event) => { event.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }} className="wordmark">
            <span className="wordmark-seal">DK</span>
            <span>Dipesh Kumar</span>
          </a>

          <div className="hidden items-center gap-1 md:flex">
            {navLinks.map((link) => (
              <button key={link.href} type="button" onClick={() => navigate(link.href)} className="washi-nav-link">
                {link.label}
              </button>
            ))}
            <span className="mx-2 h-5 w-px bg-[var(--site-border)]" aria-hidden="true" />
            {portfolioThemeToggle}
            {colorModeToggle}
          </div>

          <div className="flex items-center gap-2 md:hidden">
            {portfolioThemeToggle}
            {colorModeToggle}
            <button type="button" onClick={() => setIsMobileMenuOpen((open) => !open)} className="menu-seal" aria-expanded={isMobileMenuOpen} aria-controls="mobile-nav" aria-label="Toggle navigation">
              {isMobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </div>
      </motion.nav>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            ref={mobileMenuRef}
            id="mobile-nav"
            role="dialog"
            aria-modal="true"
            aria-label="Site navigation"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="mobile-washi-menu fixed inset-0 z-40 grid place-items-center px-6 pt-16 md:hidden"
          >
            <div className="paper-grain absolute inset-0" aria-hidden="true" />
            <div className="relative z-10 flex w-full max-w-sm flex-col">
              <p className="mb-6 border-b border-[var(--site-border)] pb-3 text-[0.65rem] uppercase tracking-[0.3em] text-[var(--site-muted)]">Navigation</p>
              {navLinks.map((link, index) => (
                <motion.button key={link.href} type="button" initial={{ opacity: 0, x: -18 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: index * 0.05 }} onClick={() => navigate(link.href)} className="mobile-washi-link">
                  <span>0{index + 1}</span>{link.label}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
