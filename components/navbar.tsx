"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const navLinks = [
  { href: "#about", label: "About" },
  { href: "#coding-stats", label: "Stats" },
  { href: "#projects", label: "Projects" },
  { href: "#experience", label: "Experience" },
  { href: "#contact", label: "Contact" },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setIsMobileMenuOpen(false);
    const element = document.querySelector(href);
    element?.scrollIntoView({ behavior: "smooth" });
  };

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
            {/* Logo with ASCII Avatar */}
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className="group flex items-center gap-3"
            >
              {/* ASCII Avatar */}
              <div className="hidden sm:flex flex-col items-center text-[6px] leading-[5px] font-mono text-white/60 group-hover:text-white/80 transition-colors select-none">
                <span>{`  .-"""-.`}</span>
                <span>{` /        \\`}</span>
                <span>{`|  O    O  |`}</span>
                <span>{`|    __    |`}</span>
                <span>{` \\  \\__/  /`}</span>
                <span>{`  '-.___.-'`}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-lg font-bold text-white group-hover:text-white/70 transition-colors tracking-tight">
                  dipesh
                </span>
                <span className="text-lg font-light text-white/40 group-hover:text-white/30 transition-colors">
                  kumar
                </span>
              </div>
            </a>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <button
                  key={link.href}
                  onClick={() => handleNavClick(link.href)}
                  className="px-4 py-2 text-sm text-white/50 hover:text-white transition-colors cursor-pointer"
                >
                  {link.label}
                </button>
              ))}
              <a
                href="https://github.com/dipesh4000"
                target="_blank"
                rel="noopener noreferrer"
                className="ml-2 px-4 py-2 rounded-full bg-white text-black text-sm font-medium hover:bg-white/90 transition-colors"
              >
                GitHub
              </a>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-white cursor-pointer"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
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
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  onClick={() => handleNavClick(link.href)}
                  className="w-full py-4 text-lg text-white/70 hover:text-white transition-colors cursor-pointer"
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
                className="w-full py-4 mt-4 text-lg font-medium text-black text-center bg-white rounded-full"
              >
                GitHub
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
