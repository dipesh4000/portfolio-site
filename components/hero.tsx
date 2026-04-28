"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const greetings = [
  { text: "HI", lang: "English" },
  { text: "नमस्ते", lang: "Hindi" },
  { text: "こんにちは", lang: "Japanese" },
  { text: "안녕", lang: "Korean" },
  { text: "你好", lang: "Chinese" },
];

type AnimationPhase = "initial" | "fanout" | "dissolve" | "welcome" | "name" | "complete";

export function Hero() {
  const [phase, setPhase] = useState<AnimationPhase>("initial");

  useEffect(() => {
    const timeline = [
      { phase: "fanout" as const, delay: 1200 },
      { phase: "dissolve" as const, delay: 3200 },
      { phase: "welcome" as const, delay: 4000 },
      { phase: "name" as const, delay: 5200 },
      { phase: "complete" as const, delay: 6500 },
    ];

    const timeouts = timeline.map(({ phase, delay }) =>
      setTimeout(() => setPhase(phase), delay)
    );

    return () => timeouts.forEach(clearTimeout);
  }, []);

  const handleScrollDown = () => {
    const aboutSection = document.getElementById("about");
    aboutSection?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-background">
      {/* Dark border frame effect */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 right-0 h-8 bg-foreground/90" />
        <div className="absolute bottom-0 left-0 right-0 h-8 bg-foreground/90" />
        <div className="absolute top-0 left-0 bottom-0 w-8 bg-foreground/90" />
        <div className="absolute top-0 right-0 bottom-0 w-8 bg-foreground/90" />
      </div>
      
      {/* Animated content container */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center px-4">
        <AnimatePresence mode="wait">
          {/* Phase 1: Initial "Hi" - centered, bold */}
          {phase === "initial" && (
            <motion.div
              key="initial-hi"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="text-7xl md:text-9xl font-black text-foreground tracking-tight"
              style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}
            >
              Hi
            </motion.div>
          )}

          {/* Phase 2: Fan-out greetings in horizontal line */}
          {phase === "fanout" && (
            <motion.div
              key="fanout"
              className="flex flex-col items-center gap-8"
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              <div className="flex flex-wrap items-center justify-center gap-4 md:gap-8 lg:gap-12">
                {greetings.map((greeting, index) => (
                  <motion.span
                    key={greeting.lang}
                    initial={{ opacity: 0, y: 30, scale: 0.8 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{
                      duration: 0.5,
                      delay: index * 0.12,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className="text-3xl md:text-5xl lg:text-6xl font-bold text-foreground"
                    style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}
                  >
                    {greeting.text}
                  </motion.span>
                ))}
              </div>
              
              {/* Welcome appears below during fanout */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="text-4xl md:text-6xl lg:text-7xl font-medium italic text-foreground"
                style={{ fontFamily: "Georgia, serif" }}
              >
                Welcome
              </motion.div>
            </motion.div>
          )}

          {/* Phase 3-5: Welcome + Name + Subtitle */}
          {(phase === "welcome" || phase === "name" || phase === "complete") && (
            <motion.div
              key="welcome-section"
              className="flex flex-col items-center gap-6"
            >
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="text-5xl md:text-7xl lg:text-8xl font-medium italic text-foreground"
                style={{ fontFamily: "Georgia, serif" }}
              >
                Welcome
              </motion.h1>

              {/* Name and subtitle */}
              {(phase === "name" || phase === "complete") && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
                  className="flex flex-col items-center gap-4"
                >
                  <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-foreground">
                    {"I'm "}
                    <span className="text-foreground underline decoration-2 underline-offset-8">
                      Dipesh Kumar
                    </span>
                  </h2>
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="text-lg md:text-xl lg:text-2xl text-muted-foreground font-medium tracking-wide"
                  >
                    ML Engineer · Data Science · Backend
                  </motion.p>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Scroll CTA Arrow */}
        {phase === "complete" && (
          <motion.button
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            onClick={handleScrollDown}
            className="absolute bottom-16 left-1/2 -translate-x-1/2 cursor-pointer group"
            aria-label="Scroll down"
          >
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{
                duration: 1.8,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="flex flex-col items-center gap-2"
            >
              <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors font-medium">
                Scroll Down
              </span>
              <ChevronDown className="w-5 h-5 text-muted-foreground group-hover:text-foreground transition-colors" />
            </motion.div>
          </motion.button>
        )}
      </div>
    </section>
  );
}
