"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const greetings = [
  { text: "HI", lang: "English" },
  { text: "नमस्ते", lang: "Hindi" },
  { text: "こんにちは", lang: "Japanese" },
  { text: "안녕", lang: "Korean" },
  { text: "你好", lang: "Chinese" },
];

type AnimationPhase = "initial" | "fanout" | "welcome" | "name" | "complete";

// Floating particles component
function FloatingParticles() {
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; size: number; duration: number }>>([]);

  useEffect(() => {
    const newParticles = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 1,
      duration: Math.random() * 20 + 10,
    }));
    setParticles(newParticles);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full bg-foreground/10"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: particle.size,
            height: particle.size,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

// Animated grid background
function AnimatedGrid() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-[0.03]">
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(to right, currentColor 1px, transparent 1px),
            linear-gradient(to bottom, currentColor 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-transparent via-foreground/5 to-transparent"
        animate={{
          backgroundPosition: ["0% 0%", "100% 100%"],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      />
    </div>
  );
}

export function Hero() {
  const [phase, setPhase] = useState<AnimationPhase>("initial");
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const timeline = [
      { phase: "fanout" as const, delay: 1500 },
      { phase: "welcome" as const, delay: 4000 },
      { phase: "name" as const, delay: 5500 },
      { phase: "complete" as const, delay: 7000 },
    ];

    const timeouts = timeline.map(({ phase, delay }) =>
      setTimeout(() => setPhase(phase), delay)
    );

    return () => timeouts.forEach(clearTimeout);
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: (e.clientX - rect.left - rect.width / 2) / 50,
      y: (e.clientY - rect.top - rect.height / 2) / 50,
    });
  }, []);

  const handleScrollDown = () => {
    const aboutSection = document.getElementById("about");
    aboutSection?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-background"
      onMouseMove={handleMouseMove}
    >
      {/* Background effects */}
      <AnimatedGrid />
      <FloatingParticles />

      {/* Gradient orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-foreground/5 to-transparent rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
          }}
          transition={{ duration: 20, repeat: Infinity }}
        />
        <motion.div
          className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-tr from-foreground/5 to-transparent rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [0, -90, 0],
          }}
          transition={{ duration: 25, repeat: Infinity }}
        />
      </div>

      {/* Main content */}
      <motion.div
        className="relative z-10 flex flex-col items-center justify-center text-center px-4"
        style={{
          transform: `translate(${mousePosition.x}px, ${mousePosition.y}px)`,
        }}
      >
        <AnimatePresence mode="wait">
          {/* Phase 1: Initial "Hi" */}
          {phase === "initial" && (
            <motion.div
              key="initial-hi"
              initial={{ opacity: 0, scale: 0.5, filter: "blur(20px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="relative"
            >
              <motion.span
                className="text-8xl md:text-[12rem] lg:text-[16rem] font-black text-foreground tracking-tighter"
                style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}
                animate={{
                  textShadow: [
                    "0 0 0px rgba(0,0,0,0)",
                    "0 0 40px rgba(0,0,0,0.1)",
                    "0 0 0px rgba(0,0,0,0)",
                  ],
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                Hi
              </motion.span>
            </motion.div>
          )}

          {/* Phase 2: Fan-out greetings */}
          {phase === "fanout" && (
            <motion.div
              key="fanout"
              className="flex flex-col items-center gap-8"
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex flex-wrap items-center justify-center gap-3 md:gap-6 lg:gap-10">
                {greetings.map((greeting, index) => (
                  <motion.span
                    key={greeting.lang}
                    initial={{
                      opacity: 0,
                      x: 0,
                      y: 50,
                      scale: 0,
                      rotate: -10,
                    }}
                    animate={{
                      opacity: 1,
                      x: 0,
                      y: 0,
                      scale: 1,
                      rotate: 0,
                    }}
                    transition={{
                      duration: 0.6,
                      delay: index * 0.15,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className="text-4xl md:text-6xl lg:text-7xl font-bold text-foreground relative"
                    style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}
                  >
                    <motion.span
                      animate={{
                        opacity: [1, 0.7, 1],
                      }}
                      transition={{
                        duration: 2,
                        delay: index * 0.2,
                        repeat: Infinity,
                      }}
                    >
                      {greeting.text}
                    </motion.span>
                  </motion.span>
                ))}
              </div>

              {/* Welcome text */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1, ease: [0.22, 1, 0.36, 1] }}
                className="text-5xl md:text-7xl lg:text-8xl font-light italic text-foreground mt-4"
                style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
              >
                Welcome
              </motion.div>
            </motion.div>
          )}

          {/* Phase 3+: Welcome + Name + Role */}
          {(phase === "welcome" || phase === "name" || phase === "complete") && (
            <motion.div
              key="welcome-section"
              className="flex flex-col items-center gap-6"
            >
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="text-5xl md:text-7xl lg:text-8xl font-light italic text-foreground"
                style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
              >
                Welcome
              </motion.h1>

              {(phase === "name" || phase === "complete") && (
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                  className="flex flex-col items-center gap-6"
                >
                  <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-foreground">
                    {"I'm "}
                    <span className="relative">
                      <span className="relative z-10">Dipesh Kumar</span>
                      <motion.span
                        className="absolute bottom-2 left-0 right-0 h-3 bg-foreground/20 -z-0"
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        style={{ originX: 0 }}
                      />
                    </span>
                  </h2>

                  {/* Animated role text */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                    className="flex flex-wrap items-center justify-center gap-3 text-lg md:text-xl lg:text-2xl text-muted-foreground font-medium"
                  >
                    <motion.span
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.6 }}
                    >
                      ML Engineer
                    </motion.span>
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.7, type: "spring" }}
                      className="w-2 h-2 rounded-full bg-foreground"
                    />
                    <motion.span
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.8 }}
                    >
                      Data Science
                    </motion.span>
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.9, type: "spring" }}
                      className="w-2 h-2 rounded-full bg-foreground"
                    />
                    <motion.span
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 1 }}
                    >
                      Backend
                    </motion.span>
                  </motion.div>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Scroll indicator */}
        {phase === "complete" && (
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            onClick={handleScrollDown}
            className="absolute -bottom-32 left-1/2 -translate-x-1/2 cursor-pointer group"
            aria-label="Scroll down"
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="flex flex-col items-center gap-2"
            >
              <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors font-medium tracking-widest uppercase">
                Explore
              </span>
              <motion.div
                animate={{ scaleY: [1, 1.5, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <ChevronDown className="w-6 h-6 text-muted-foreground group-hover:text-foreground transition-colors" />
              </motion.div>
            </motion.div>
          </motion.button>
        )}
      </motion.div>
    </section>
  );
}
