"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Github, Linkedin, Mail } from "lucide-react";
import Image from "next/image";

const greetings = [
  { text: "Hi", lang: "en" },
  { text: "नमस्ते", lang: "hi" },
  { text: "こんにちは", lang: "ja" },
  { text: "안녕", lang: "ko" },
  { text: "你好", lang: "zh" },
];

const RESUME_URL = "https://presio.me/dipesh4000/resume";

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
      className="relative min-h-[100svh] flex items-center overflow-hidden"
      style={{ backgroundColor: "#000000" }}
    >
      {/* Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {mounted && !prefersReducedMotion &&
          [...Array(30)].map((_, i) => {
            const { left, top, duration, delay } = particleLayout(i);
            return (
              <motion.div
                key={i}
                className="hero-particle absolute h-1 w-1 rounded-full"
                style={{ left, top }}
                animate={{ y: [0, -100, 0], opacity: [0, 1, 0] }}
                transition={{ duration, repeat: Infinity, delay, ease: "easeInOut" }}
              />
            );
          })}
      </div>
      <div className="hero-grid absolute inset-0" />

      <div className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatePresence mode="wait">
          {/* Phase 1: Hi */}
          {phase === 1 && (
            <motion.div
              key="hi"
              initial={{ opacity: 0, scale: 0.5, filter: "blur(20px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, scale: 1.2, filter: "blur(10px)" }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="flex justify-center"
            >
              <span className="text-[clamp(5.5rem,28vw,14rem)] font-black text-white leading-none tracking-tighter">
                Hi
              </span>
            </motion.div>
          )}

          {/* Phase 2: Multilingual greetings */}
          {phase === 2 && (
            <motion.div
              key="greetings"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, y: -30, filter: "blur(10px)" }}
              transition={{ duration: 0.6 }}
              className="flex flex-wrap items-center justify-center gap-6 md:gap-12"
            >
              {greetings.map((g, i) => (
                <motion.span
                  key={g.lang}
                  initial={{ opacity: 0, y: 60, rotateX: -90 }}
                  animate={{ opacity: 0.9, y: 0, rotateX: 0 }}
                  transition={{ delay: i * 0.12, type: "spring", stiffness: 100, damping: 15 }}
                  className="text-[clamp(2.5rem,12vw,5.5rem)] font-bold text-white"
                  style={{ textShadow: "0 0 60px rgba(255,255,255,0.3)" }}
                >
                  {g.text}
                </motion.span>
              ))}
            </motion.div>
          )}

          {/* Phase 4+: Split layout */}
          {phase >= 4 && (
            <motion.div
              key="main"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center min-h-[85vh] py-24"
            >
              {/* Left: text */}
              <div className="space-y-7">
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="text-white/50 text-sm tracking-wide"
                >
                  I am Dipesh Kumar
                </motion.p>

                <motion.h1
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.1 }}
                  className="text-[clamp(2.4rem,5.5vw,4rem)] font-black tracking-tight text-white leading-[1.1]"
                >
                  ML Engineer<br />& Data Scientist
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.2 }}
                  className="text-white/55 text-base leading-relaxed max-w-md"
                >
                  Building production-ready AI systems with expertise in computer vision, model training, and data engineering. Passionate about turning data into impactful solutions.
                </motion.p>

                {phase >= 5 && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="space-y-5"
                  >
                    <a
                      href={RESUME_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-6 py-2.5 border border-white/25 text-white text-sm font-medium hover:bg-white/5 hover:border-white/45 transition-all rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/25"
                    >
                      Download CV
                    </a>

                    <div className="flex items-center gap-3 pt-1">
                      {[
                        { icon: Linkedin, href: "https://linkedin.com/in/dipesh4000", label: "LinkedIn" },
                        { icon: Github, href: "https://github.com/dipesh4000", label: "GitHub" },
                        { icon: Mail, href: "mailto:dipeshkumar0853822@gmail.com", label: "Email" },
                      ].map(({ icon: Icon, href, label }) => (
                        <motion.a
                          key={label}
                          href={href}
                          target={label !== "Email" ? "_blank" : undefined}
                          rel={label !== "Email" ? "noopener noreferrer" : undefined}
                          whileHover={prefersReducedMotion ? undefined : { scale: 1.1 }}
                          whileTap={prefersReducedMotion ? undefined : { scale: 0.95 }}
                          className="p-2.5 rounded-full border border-white/15 text-white/50 hover:text-white/90 hover:border-white/35 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/25"
                          aria-label={label}
                        >
                          <Icon className="w-5 h-5" />
                        </motion.a>
                      ))}
                    </div>
                  </motion.div>
                )}
              </div>

              {/* Right: profile photo */}
              <motion.div
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.9, delay: 0.15 }}
                className="hidden lg:flex justify-end items-center"
              >
                <div className="relative w-72 h-[22rem] xl:w-80 xl:h-96 overflow-hidden rounded-2xl border border-white/10">
                  <Image
                    src="/dipesh.jpg"
                    alt="Dipesh Kumar"
                    fill
                    sizes="320px"
                    className="object-cover grayscale"
                    style={{ objectPosition: "center 15%" }}
                    priority
                  />
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {phase >= 5 && (
          <motion.a
            href="#about"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/20 hover:text-white/60 transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/25 rounded-sm"
          >
            <span className="text-[10px] tracking-[0.3em] uppercase font-medium">Scroll</span>
            <motion.div
              animate={prefersReducedMotion ? { y: 0 } : { y: [0, 8, 0] }}
              transition={prefersReducedMotion ? { duration: 0 } : { duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <ChevronDown className="w-4 h-4" />
            </motion.div>
          </motion.a>
        )}
      </div>
    </section>
  );
}
