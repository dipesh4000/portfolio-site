"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Github, Linkedin, Mail, Twitter } from "lucide-react";

const greetings = [
  { text: "Hi", lang: "en" },
  { text: "नमस्ते", lang: "hi" },
  { text: "こんにちは", lang: "ja" },
  { text: "안녕", lang: "ko" },
  { text: "你好", lang: "zh" },
];

export function Hero() {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 400),      // Show "Hi"
      setTimeout(() => setPhase(2), 1800),     // Fan out greetings
      setTimeout(() => setPhase(3), 4000),     // Dissolve, show Welcome
      setTimeout(() => setPhase(4), 5000),     // Show name
      setTimeout(() => setPhase(5), 6000),     // Show subtitle & socials
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <section
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ backgroundColor: "#0a0a0a" }}
    >
      {/* Subtle grid background */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: "80px 80px",
        }}
      />

      {/* Subtle gradient orbs - very minimal */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute w-[600px] h-[600px] rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(139,92,246,0.08) 0%, transparent 70%)",
            left: "-10%",
            top: "10%",
            filter: "blur(60px)",
          }}
          animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute w-[500px] h-[500px] rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(236,72,153,0.06) 0%, transparent 70%)",
            right: "-5%",
            bottom: "10%",
            filter: "blur(80px)",
          }}
          animate={{ x: [0, -20, 0], y: [0, 30, 0] }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="relative z-10 text-center px-6 max-w-5xl">
        <AnimatePresence mode="wait">
          {/* Phase 1: Single "Hi" centered */}
          {phase === 1 && (
            <motion.div
              key="hi-single"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.1 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="text-[8rem] md:text-[12rem] font-black text-white leading-none"
            >
              Hi
            </motion.div>
          )}

          {/* Phase 2: Fan out to 5 languages */}
          {phase === 2 && (
            <motion.div
              key="greetings"
              className="flex flex-wrap items-center justify-center gap-4 md:gap-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              {greetings.map((g, i) => (
                <motion.span
                  key={g.lang}
                  initial={{ opacity: 0, y: 40, scale: 0.5 }}
                  animate={{ opacity: 0.85, y: 0, scale: 1 }}
                  transition={{ 
                    delay: i * 0.15, 
                    type: "spring", 
                    stiffness: 120, 
                    damping: 12 
                  }}
                  className="text-4xl md:text-6xl lg:text-7xl font-bold text-white"
                >
                  {g.text}
                </motion.span>
              ))}
            </motion.div>
          )}

          {/* Phase 3+: Welcome and main content */}
          {phase >= 3 && (
            <motion.div 
              key="main" 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              className="space-y-6"
            >
              {/* Welcome */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-3xl md:text-5xl font-light italic text-white/50"
                style={{ fontFamily: "Georgia, serif" }}
              >
                Welcome
              </motion.p>

              {/* Name - Phase 4 */}
              {phase >= 4 && (
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="text-5xl md:text-8xl font-black"
                >
                  <span className="text-white">I&apos;m </span>
                  <span className="text-purple-500">Dipesh Kumar</span>
                </motion.h1>
              )}

              {/* Subtitle & socials - Phase 5 */}
              {phase >= 5 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="space-y-8"
                >
                  <p className="text-xl md:text-2xl text-white/60 font-medium">
                    ML Engineer · Data Science · Backend
                  </p>

                  {/* Social links */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="flex items-center justify-center gap-4"
                  >
                    {[
                      { icon: Github, href: "https://github.com/dipesh4036", label: "GitHub" },
                      { icon: Linkedin, href: "https://www.linkedin.com/in/dipeshkumar4000/", label: "LinkedIn" },
                      { icon: Mail, href: "mailto:dipeshkumar4036@gmail.com", label: "Email" },
                      { icon: Twitter, href: "https://x.com/dipesh400", label: "Twitter" },
                    ].map(({ icon: Icon, href, label }) => (
                      <motion.a
                        key={href}
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.1, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        className="p-3 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/20 transition-all"
                        aria-label={label}
                      >
                        <Icon className="w-5 h-5 text-white/70 hover:text-white transition-colors" />
                      </motion.a>
                    ))}
                  </motion.div>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Scroll CTA */}
        {phase >= 5 && (
          <motion.a
            href="#about"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="absolute left-1/2 -translate-x-1/2 bottom-[-120px] flex flex-col items-center gap-2 text-white/30 hover:text-white/60 transition-colors cursor-pointer"
          >
            <span className="text-xs tracking-[0.2em] uppercase font-medium">Scroll</span>
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <ChevronDown className="w-5 h-5" />
            </motion.div>
          </motion.a>
        )}
      </div>
    </section>
  );
}
