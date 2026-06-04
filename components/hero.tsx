"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Github, Linkedin, Mail, ExternalLink } from "lucide-react";

const greetings = [
  { text: "Hi", lang: "en" },
  { text: "नमस्ते", lang: "hi" },
  { text: "こんにちは", lang: "ja" },
  { text: "안녕", lang: "ko" },
  { text: "你好", lang: "zh" },
];

const RESUME_URL = "https://presio.me/dipesh4000/resume";

/** Deterministic layout so SSR/CSR match (avoids random() per render). */
function particleLayout(i: number) {
  const left = ((i * 17 + 13) % 100).toFixed(2);
  const top = ((i * 23 + 7) % 100).toFixed(2);
  const duration = 3 + (i % 5) * 0.75;
  const delay = ((i * 11) % 10) * 0.35;
  return { left: `${left}%`, top: `${top}%`, duration, delay };
}

export function Hero() {
  const [phase, setPhase] = useState(1);
  const [mounted, setMounted] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    setMounted(true);
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mq.matches);
    const onChange = () => setPrefersReducedMotion(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    // Same phase timing as before when motion is preferred
    const timers = [
      setTimeout(() => setPhase(2), 2000),
      setTimeout(() => setPhase(4), 5000),
      setTimeout(() => setPhase(5), 7000),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <section
      id="top"
      className="relative min-h-[100svh] flex items-center justify-center overflow-hidden px-4"
      style={{ backgroundColor: "#0a0a0a" }}
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {mounted && !prefersReducedMotion &&
          [...Array(30)].map((_, i) => {
            const { left, top, duration, delay } = particleLayout(i);
            return (
              <motion.div
                key={i}
                className="hero-particle absolute h-1 w-1 rounded-full"
                style={{ left, top }}
                animate={{
                  y: [0, -100, 0],
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration,
                  repeat: Infinity,
                  delay,
                  ease: "easeInOut",
                }}
              />
            );
          })}
      </div>

      <div className="hero-grid absolute inset-0" />

      <motion.div className="relative z-10 w-full max-w-5xl px-2 text-center sm:px-6">
        <AnimatePresence mode="wait">
          {phase === 1 && (
            <motion.div
              key="hi-single"
              initial={{ opacity: 0, scale: 0.5, filter: "blur(20px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, scale: 1.2, filter: "blur(10px)" }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="text-[clamp(5.5rem,28vw,14rem)] font-black text-white leading-none tracking-tighter"
            >
              Hi
            </motion.div>
          )}

          {phase === 2 && (
            <motion.div
              key="greetings"
              className="flex flex-wrap items-center justify-center gap-6 md:gap-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, y: -30, filter: "blur(10px)" }}
              transition={{ duration: 0.6 }}
            >
              {greetings.map((g, i) => (
                <motion.span
                  key={g.lang}
                  initial={{ opacity: 0, y: 60, rotateX: -90 }}
                  animate={{ opacity: 0.9, y: 0, rotateX: 0 }}
                  transition={{
                    delay: i * 0.12,
                    type: "spring",
                    stiffness: 100,
                    damping: 15,
                  }}
                  className="text-[clamp(2.5rem,12vw,5.5rem)] font-bold text-white"
                  style={{ textShadow: "0 0 60px rgba(255,255,255,0.3)" }}
                >
                  {g.text}
                </motion.span>
              ))}
            </motion.div>
          )}

          {phase >= 4 && (
            <motion.div key="main" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-7 sm:space-y-8">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                <h1 className="text-[clamp(3rem,13vw,8rem)] font-black tracking-tight">
                  <span className="text-white/60">I&apos;m </span>
                  <span className="text-white relative inline-block">
                    Dipesh Kumar
                    <motion.span
                      className="hero-name-underline absolute -bottom-2 left-0 h-1"
                      initial={{ width: 0 }}
                      animate={{ width: "100%" }}
                      transition={{ delay: 0.5, duration: prefersReducedMotion ? 0 : 0.8, ease: "easeOut" }}
                    />
                  </span>
                </h1>
              </motion.div>

              {phase >= 5 && (
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  className="space-y-10"
                >
                  <p className="mx-auto flex max-w-2xl flex-wrap justify-center gap-x-3 gap-y-2 text-lg font-light text-white/50 sm:text-2xl md:text-3xl">
                    <span>ML Engineer</span>
                    <span className="text-white/20">|</span>
                    <span>Data Science</span>
                    <span className="text-white/20">|</span>
                    <span>Backend</span>
                  </p>

                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="flex items-center justify-center gap-5 sm:gap-8 md:gap-12"
                  >
                    {[
                      { icon: Github, href: "https://github.com/dipesh4000", label: "GitHub" },
                      { icon: Linkedin, href: "https://linkedin.com/in/dipesh4000", label: "LinkedIn" },
                      { icon: Mail, href: "mailto:dipeshkumar0853822@gmail.com", label: "Email" },
                    ].map(({ icon: Icon, href, label }) => (
                      <motion.a
                        key={label}
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={prefersReducedMotion ? undefined : { scale: 1.1, backgroundColor: "rgba(255,255,255,0.1)" }}
                        whileTap={prefersReducedMotion ? undefined : { scale: 0.95 }}
                        className="p-4 rounded-full border border-white/10 bg-transparent transition-all duration-300 hover:border-teal-400/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-400/50"
                        aria-label={label}
                      >
                        <Icon className="w-5 h-5 text-white/60 hover:text-teal-300/90 transition-colors" />
                      </motion.a>
                    ))}
                  </motion.div>

                  <motion.a
                    href="mailto:dipeshkumar0853822@gmail.com"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    whileHover={prefersReducedMotion ? undefined : { scale: 1.03 }}
                    whileTap={prefersReducedMotion ? undefined : { scale: 0.97 }}
                    className="mb-4 inline-flex items-center gap-2 rounded-full bg-white px-8 py-3.5 text-sm font-semibold text-black transition-colors hover:bg-white/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0a] sm:mb-0 sm:mr-8"
                  >
                    <Mail className="w-4 h-4" />
                    Hire Me
                  </motion.a>

                  <motion.a
                    href={RESUME_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.7 }}
                    className="inline-flex items-center gap-2 text-sm text-white/40 hover:text-teal-300/90 transition-colors border-b border-white/20 hover:border-teal-400/50 pb-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-400/40 rounded-sm"
                  >
                    View Resume
                    <ExternalLink className="w-3 h-3" />
                  </motion.a>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {phase >= 5 && (
          <motion.a
            href="#about"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="absolute bottom-[-112px] left-1/2 flex -translate-x-1/2 cursor-pointer flex-col items-center gap-2 rounded-md text-white/20 transition-colors hover:text-teal-300/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-400/40 focus-visible:py-1 sm:bottom-[-140px]"
          >
            <span className="text-[10px] tracking-[0.3em] uppercase font-medium">Scroll</span>
            <motion.div
              animate={prefersReducedMotion ? { y: 0 } : { y: [0, 8, 0] }}
              transition={
                prefersReducedMotion
                  ? { duration: 0 }
                  : { duration: 2, repeat: Infinity, ease: "easeInOut" }
              }
            >
              <ChevronDown className="w-4 h-4" />
            </motion.div>
          </motion.a>
        )}
      </motion.div>
    </section>
  );
}
