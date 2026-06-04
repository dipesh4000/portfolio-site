"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, Moon, Sun, X } from "lucide-react";
import Image from "next/image";
import { useTheme } from "next-themes";

const navLinks = [
  { href: "#about", label: "About" },
  { href: "#coding-stats", label: "Stats" },
  { href: "#projects", label: "Projects" },
  { href: "#experience", label: "Experience" },
  { href: "#contact", label: "Contact" },
];

const navBtnClass =
  "px-4 py-2 text-sm text-white/50 hover:text-teal-300/90 transition-colors cursor-pointer rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-400/45 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0a]";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const { resolvedTheme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!isMobileMenuOpen) return;

    const menu = mobileMenuRef.current;
    const focusables = menu?.querySelectorAll<HTMLElement>('button, a[href]');
    const list = focusables ? Array.from(focusables) : [];
    const first = list[0];
    const last = list[list.length - 1];
    requestAnimationFrame(() => first?.focus());

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsMobileMenuOpen(false);
        return;
      }
      if (e.key !== "Tab" || list.length === 0) return;
      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last?.focus();
        }
      } else if (document.activeElement === last) {
        e.preventDefault();
        first?.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [isMobileMenuOpen]);

  const handleNavClick = (href: string) => {
    setIsMobileMenuOpen(false);
    const element = document.querySelector(href);
    element?.scrollIntoView({ behavior: "smooth" });
  };

  const isDarkTheme = mounted && resolvedTheme === "dark";
  const nextTheme = isDarkTheme ? "light" : "dark";
  const ThemeIcon = isDarkTheme ? Sun : Moon;

  const handleThemeToggle = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  };

  const themeToggle = (
    <button
      type="button"
      onClick={handleThemeToggle}
      className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-white/55 transition-colors hover:border-teal-400/35 hover:text-teal-300/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-400/45"
      aria-label="Toggle color mode"
    >
      {mounted && <ThemeIcon className="h-4 w-4" />}
    </button>
  );

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, delay: 5.5 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? "bg-[#0a0a0a]/90 backdrop-blur-md border-b border-white/5" : "bg-transparent"
        }`}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <a
              href="#top"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className="group flex items-center gap-3 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-400/45 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0a]"
            >
              <div className="relative w-8 h-8 rounded-full overflow-hidden border border-white/20 group-hover:border-teal-400/35 transition-colors">
                <Image
                  src="/dipesh.jpg"
                  alt="Dipesh Kumar"
                  fill
                  sizes="32px"
                  className="object-cover"
                  style={{ objectPosition: "center 20%" }}
                />
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-lg font-bold text-white group-hover:text-teal-200/90 transition-colors tracking-tight">
                  dipesh
                </span>
                <span className="text-lg font-light text-white/40 group-hover:text-white/50 transition-colors">
                  kumar
                </span>
              </div>
            </a>

            <div className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <button key={link.href} type="button" onClick={() => handleNavClick(link.href)} className={navBtnClass}>
                  {link.label}
                </button>
              ))}
              {themeToggle}
              <a
                href="https://github.com/dipesh4000"
                target="_blank"
                rel="noopener noreferrer"
                className="ml-2 px-4 py-2 rounded-full bg-white text-black text-sm font-medium hover:bg-teal-100 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0a]"
              >
                GitHub
              </a>
            </div>

            <div className="flex items-center gap-2 md:hidden">
              {themeToggle}
              <button
                type="button"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 text-white cursor-pointer rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-400/45"
                aria-expanded={isMobileMenuOpen}
                aria-controls="mobile-nav-menu"
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            ref={mobileMenuRef}
            id="mobile-nav-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Site navigation"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 md:hidden"
            style={{ backgroundColor: "#0a0a0a" }}
          >
            <div className="pt-20 px-6 flex flex-col items-center gap-2">
              {navLinks.map((link, index) => (
                <motion.button
                  key={link.href}
                  type="button"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  onClick={() => handleNavClick(link.href)}
                  className="w-full py-4 text-lg text-white/70 hover:text-teal-300/90 transition-colors cursor-pointer rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-400/45"
                >
                  {link.label}
                </motion.button>
              ))}
              <motion.a
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: navLinks.length * 0.05 }}
                href="https://github.com/dipesh4000"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-4 mt-4 text-lg font-medium text-black text-center bg-white rounded-full hover:bg-teal-100 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0a]"
              >
                GitHub
              </motion.a>
              <motion.button
                type="button"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: (navLinks.length + 1) * 0.05 }}
                onClick={handleThemeToggle}
                className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/10 py-4 text-lg font-medium text-white/70 transition-colors hover:text-teal-300/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-400/45"
              >
                {mounted && <ThemeIcon className="h-5 w-5" />}
                {mounted ? (nextTheme === "light" ? "Light mode" : "Dark mode") : "Color mode"}
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
