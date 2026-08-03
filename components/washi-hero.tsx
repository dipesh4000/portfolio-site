"use client";

import { motion } from "framer-motion";
import { ArrowDown, ArrowUpRight, Github, Linkedin, Mail } from "lucide-react";

const RESUME_URL = "https://1drv.ms/b/c/17a0e8e57ec0559b/IQBzXkKgN731TI6FVjefkaSqAQ73ET6JOSFyhAfLJDDdKK0?e=eSVbcv";
const SOCIAL_LINKS = [
  { icon: Github, href: "https://github.com/dipesh4000", label: "GitHub" },
  { icon: Linkedin, href: "https://linkedin.com/in/dipesh4000", label: "LinkedIn" },
  { icon: Mail, href: "mailto:dipeshkumar0853822@gmail.com", label: "Email" },
];

export function WashiHero() {
  return (
    <section id="top" className="washi-hero relative min-h-[100svh] overflow-hidden px-5 pb-10 pt-24 sm:px-8 lg:px-12">
      <div className="paper-grain absolute inset-0" aria-hidden="true" />
      <div className="hero-sun absolute" aria-hidden="true" />
      <div className="hero-ink-stroke absolute" aria-hidden="true" />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 mx-auto grid min-h-[calc(100svh-8.5rem)] max-w-7xl grid-rows-[auto_1fr_auto]"
      >
        <div className="flex items-center justify-between border-b border-[var(--site-border)] pb-3 text-[0.65rem] font-medium uppercase tracking-[0.28em] text-[var(--site-muted)]">
          <span>Portfolio · MMXXVI</span>
          <span className="hidden sm:block">Patna, India · Available worldwide</span>
          <span className="sm:hidden">India</span>
        </div>

        <div className="grid items-center gap-10 py-12 lg:grid-cols-[1fr_19rem] lg:gap-20">
          <div>
            <motion.p
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.15, duration: 0.6 }}
              className="hero-script mb-2 text-xl text-[var(--site-muted)] sm:text-2xl"
            >
              Hello, I build with purpose.
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 26 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.22, duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
              className="hero-title relative max-w-5xl text-[clamp(4.4rem,14vw,11.5rem)] font-black uppercase leading-[0.73] tracking-[-0.075em] text-[var(--site-text)]"
            >
              <span className="block">Dipesh</span>
              <span className="ml-[0.14em] block font-normal italic">Kumar</span>
              <span className="hero-seal" aria-label="Dipesh Kumar monogram">DK</span>
            </motion.h1>

            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.55, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="hero-brush-rule mt-8 h-2 max-w-3xl origin-left"
              aria-hidden="true"
            />
          </div>

          <motion.aside
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.65, duration: 0.6 }}
            className="border-l border-[var(--site-border)] pl-6 lg:mt-28"
          >
            <p className="hero-editorial text-2xl leading-tight text-[var(--site-text)]">
              A quiet mind.<br />A precise build.
            </p>
            <p className="mt-5 text-sm leading-6 text-[var(--site-muted)]">
              Machine-learning engineer creating reliable systems across data, computer vision, and backend infrastructure.
            </p>
            <div className="mt-6 flex gap-3">
              {SOCIAL_LINKS.map(({ icon: Icon, href, label }) => (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer" className="ink-icon-button" aria-label={label}>
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </motion.aside>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.85, duration: 0.6 }}
          className="grid gap-5 border-t border-[var(--site-border)] pt-5 sm:grid-cols-[1fr_auto] sm:items-end"
        >
          <div className="flex flex-wrap gap-x-7 gap-y-2 text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-[var(--site-muted)]">
            <span>ML Engineer</span><span>Data Science</span><span>Backend</span>
          </div>
          <div className="flex flex-wrap items-center gap-5 sm:gap-6">
            <a href="mailto:dipeshkumar0853822@gmail.com" className="seal-cta">
              Start a conversation <ArrowUpRight className="h-4 w-4" />
            </a>
            <a href={RESUME_URL} target="_blank" rel="noopener noreferrer" className="ink-text-link">
              Résumé
            </a>
            <a href="#about" className="ink-scroll-link" aria-label="Scroll to about section">
              <ArrowDown className="h-4 w-4" />
            </a>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
