"use client";

import { motion } from "framer-motion";
import { ArrowDown, ArrowUpRight, Github, Linkedin, Mail } from "lucide-react";

const RESUME_URL = "https://1drv.ms/b/c/17a0e8e57ec0559b/IQBzXkKgN731TI6FVjefkaSqAQ73ET6JOSFyhAfLJDDdKK0?e=eSVbcv";

export function SignalHero() {
  return (
    <section id="top" className="signal-hero relative min-h-[100svh] overflow-hidden px-5 pb-10 pt-24 sm:px-8 lg:px-12">
      <div className="signal-dot-field signal-dot-field-left" aria-hidden="true" />
      <div className="signal-dot-field signal-dot-field-right" aria-hidden="true" />

      <div className="relative z-10 mx-auto flex min-h-[calc(100svh-8.5rem)] max-w-7xl flex-col">
        <div className="signal-rail">
          <span className="signal-node">Noida / IN</span>
          <span className="signal-rail-dot" />
          <span className="signal-line" />
          <span className="signal-node">ML / AI</span>
          <span className="signal-line" />
          <span className="signal-rail-dot" />
          <span className="signal-node">Available</span>
        </div>

        <div className="grid flex-1 items-center gap-10 py-12 lg:grid-cols-[1fr_17rem] lg:gap-20">
          <div>
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }} className="signal-kicker mb-5">PORTFOLIO SYSTEM / VERSION 03</motion.p>
            <motion.h1 initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.18, duration: 0.7 }} className="signal-title" aria-label="Dipesh Kumar">
              <span>DIPESH</span>
              <span>KUMAR</span>
            </motion.h1>
            <div className="signal-title-rule" aria-hidden="true"><span /><span /><span /></div>
            <motion.p initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45 }} className="mt-7 max-w-2xl text-[clamp(1.35rem,3vw,2.6rem)] font-light leading-[1.08] tracking-[-0.035em] text-[var(--site-text)]">
              Engineering intelligent systems that turn complex data into dependable products.
            </motion.p>
          </div>

          <motion.aside initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.55 }} className="signal-terminal">
            <div className="signal-terminal-head"><span>PROFILE.NODE</span><span>LIVE</span></div>
            <div className="signal-avatar-mark" aria-hidden="true"><span>DK</span></div>
            <dl className="signal-specs">
              <div><dt>Role</dt><dd>ML Engineer</dd></div>
              <div><dt>Focus</dt><dd>GenAI / Data</dd></div>
              <div><dt>Mode</dt><dd>Build / Learn</dd></div>
            </dl>
          </motion.aside>
        </div>

        <div className="signal-hero-footer">
          <div className="flex items-center gap-2">
            <a href="https://github.com/dipesh4000" target="_blank" rel="noopener noreferrer" className="signal-icon-link" aria-label="GitHub"><Github className="h-4 w-4" /></a>
            <a href="https://linkedin.com/in/dipesh4000" target="_blank" rel="noopener noreferrer" className="signal-icon-link" aria-label="LinkedIn"><Linkedin className="h-4 w-4" /></a>
            <a href="mailto:dipeshkumar0853822@gmail.com" className="signal-icon-link" aria-label="Email"><Mail className="h-4 w-4" /></a>
          </div>
          <div className="flex flex-wrap items-center justify-end gap-4">
            <a href={RESUME_URL} target="_blank" rel="noopener noreferrer" className="signal-text-link">Résumé <ArrowUpRight className="h-3.5 w-3.5" /></a>
            <a href="#about" className="signal-scroll-link">Explore <ArrowDown className="h-3.5 w-3.5" /></a>
          </div>
        </div>
      </div>
    </section>
  );
}
