"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const greetings = [
  { text: "नमस्ते", lang: "Hindi" },
  { text: "こんにちは", lang: "Japanese" },
  { text: "안녕", lang: "Korean" },
  { text: "你好", lang: "Chinese" },
  { text: "Hi", lang: "English" },
];

type AnimationPhase = "initial" | "fanout" | "dissolve" | "welcome" | "name" | "complete";

export function Hero() {
  const [phase, setPhase] = useState<AnimationPhase>("initial");

  useEffect(() => {
    const timeline = [
      { phase: "fanout" as const, delay: 1500 },
      { phase: "dissolve" as const, delay: 3500 },
      { phase: "welcome" as const, delay: 4500 },
      { phase: "name" as const, delay: 6000 },
      { phase: "complete" as const, delay: 7500 },
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
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* Subtle background gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent" />
      
      {/* Animated content container */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center px-4">
        <AnimatePresence mode="wait">
          {/* Phase 1: Initial "Hi" */}
          {phase === "initial" && (
            <motion.div
              key="initial-hi"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="text-6xl md:text-8xl font-bold text-foreground"
            >
              Hi
            </motion.div>
          )}

          {/* Phase 2: Fan-out greetings */}
          {phase === "fanout" && (
            <motion.div
              key="fanout"
              className="flex flex-wrap items-center justify-center gap-4 md:gap-8"
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              {greetings.map((greeting, index) => (
                <motion.span
                  key={greeting.lang}
                  initial={{ opacity: 0, y: 20, scale: 0.5 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{
                    duration: 0.6,
                    delay: index * 0.15,
                    ease: "easeOut",
                  }}
                  className="text-4xl md:text-6xl font-bold text-foreground"
                >
                  {greeting.text}
                </motion.span>
              ))}
            </motion.div>
          )}

          {/* Phase 3: Welcome */}
          {(phase === "welcome" || phase === "name" || phase === "complete") && (
            <motion.div
              key="welcome-section"
              className="flex flex-col items-center gap-4"
            >
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="text-5xl md:text-7xl font-bold text-foreground"
              >
                Welcome
              </motion.h1>

              {/* Name and subtitle */}
              {(phase === "name" || phase === "complete") && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                  className="flex flex-col items-center gap-3 mt-4"
                >
                  <h2 className="text-3xl md:text-5xl font-semibold text-foreground">
                    {"I'm "}
                    <span className="text-primary">Dipesh Kumar</span>
                  </h2>
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="text-lg md:text-xl text-muted-foreground font-medium tracking-wide"
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
            transition={{ duration: 0.6, delay: 0.5 }}
            onClick={handleScrollDown}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 cursor-pointer group"
            aria-label="Scroll down"
          >
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="flex flex-col items-center gap-2"
            >
              <span className="text-sm text-muted-foreground group-hover:text-primary transition-colors">
                Scroll Down
              </span>
              <ChevronDown className="w-6 h-6 text-muted-foreground group-hover:text-primary transition-colors" />
            </motion.div>
          </motion.button>
        )}
      </div>
    </section>
  );
}
