"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring } from "framer-motion";
import { ChevronDown, Github, Linkedin, Mail, ExternalLink } from "lucide-react";

const greetings = [
  { text: "Hi", lang: "en" },
  { text: "नमस्ते", lang: "hi" },
  { text: "こんにちは", lang: "ja" },
  { text: "안녕", lang: "ko" },
  { text: "你好", lang: "zh" },
];

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
  const containerRef = useRef<HTMLDivElement>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 50, damping: 20 });

  useEffect(() => {
    setMounted(true);
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mq.matches);
    const onChange = () => setPrefersReducedMotion(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    if (prefersReducedMotion) return;
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        mouseX.set((e.clientX - centerX) / 50);
        mouseY.set((e.clientY - centerY) / 50);
      }
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY, prefersReducedMotion]);

  useEffect(() => {
    // Same phase timing as before when motion is preferred
    const timers = [
      setTimeout(() => setPhase(2), 2000),
      setTimeout(() => setPhase(3), 5000),
      setTimeout(() => setPhase(4), 7000),
      setTimeout(() => setPhase(5), 9000),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <section
      id="top"
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ backgroundColor: "#0a0a0a" }}
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {mounted && !prefersReducedMotion &&
          [...Array(30)].map((_, i) => {
            const { left, top, duration, delay } = particleLayout(i);
            return (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-white/20 rounded-full"
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

      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)`,
          backgroundSize: "100px 100px",
        }}
      />

      <motion.div
        className="relative z-10 text-center px-6 max-w-5xl"
        style={prefersReducedMotion ? undefined : { x: springX, y: springY }}
      >
        <AnimatePresence mode="wait">
          {phase === 1 && (
            <motion.div
              key="hi-single"
              initial={{ opacity: 0, scale: 0.5, filter: "blur(20px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, scale: 1.2, filter: "blur(10px)" }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="text-[10rem] md:text-[14rem] font-black text-white leading-none tracking-tighter"
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
                  className="text-5xl md:text-7xl lg:text-8xl font-bold text-white"
                  style={{ textShadow: "0 0 60px rgba(255,255,255,0.3)" }}
                >
                  {g.text}
                </motion.span>
              ))}
            </motion.div>
          )}

          {phase >= 3 && (
            <motion.div key="main" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="text-4xl md:text-6xl font-light text-white/40"
                style={{ fontFamily: "Georgia, 'Times New Roman', serif", fontStyle: "italic" }}
              >

                               Hi! there
              </motion.p>

              {phase >= 4 && (
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                >
                  <h1 className="text-6xl md:text-9xl font-black tracking-tight">
                    <span className="text-white/60">I&apos;m </span>
                    <span className="text-white relative inline-block">
                      Dipesh Kumar
                      <motion.span
                        className="absolute -bottom-2 left-0 h-1 bg-white"
                        initial={{ width: 0 }}
                        animate={{ width: "100%" }}
                        transition={{ delay: 0.5, duration: prefersReducedMotion ? 0 : 0.8, ease: "easeOut" }}
                      />
                    </span>
                  </h1>
                </motion.div>
              )}

              {phase >= 5 && (
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  className="space-y-10"
                >
                  <p className="text-xl md:text-3xl text-white/50 font-light tracking-wide">
                    ML Engineer <span className="text-white/20 mx-3">|</span>
                    Data Science <span className="text-white/20 mx-3">|</span>
                    Backend
                  </p>

                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="flex items-center justify-center gap-12"
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
                                        className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-white text-black font-semibold text-sm hover:bg-white/90 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0a] mr-8"
                  >
                    <Mail className="w-4 h-4" />
                    Hire Me
                  </motion.a>

                  <motion.a
                    href="https://1drv.ms/b/c/17a0e8e57ec0559b/IQBzXkKgN731TI6FVjefkaSqAQ73ET6JOSFyhAfLJDDdKK0?e=ATvEHa"
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
            className="absolute left-1/2 -translate-x-1/2 bottom-[-140px] flex flex-col items-center gap-2 text-white/20 hover:text-teal-300/70 transition-colors cursor-pointer group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-400/40 rounded-md focus-visible:py-1"
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
