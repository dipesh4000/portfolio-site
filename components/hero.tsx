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

export function Hero() {
  const [phase, setPhase] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 50, damping: 20 });

  useEffect(() => {
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
  }, [mouseX, mouseY]);

  useEffect(() => {
    // Extended timing for 5-6 second sequence
    const timers = [
      setTimeout(() => setPhase(1), 300),      // Show "Hi" (0.3s)
      setTimeout(() => setPhase(2), 1500),     // Fan out greetings (1.5s)
      setTimeout(() => setPhase(3), 3500),     // Show Welcome (3.5s)
      setTimeout(() => setPhase(4), 4500),     // Show name (4.5s)
      setTimeout(() => setPhase(5), 5500),     // Show subtitle & socials (5.5s)
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ backgroundColor: "#0a0a0a" }}
    >
      {/* Subtle animated particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white/20 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -100, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 3 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 3,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Very subtle grid */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)`,
          backgroundSize: "100px 100px",
        }}
      />

      {/* Main content with parallax */}
      <motion.div 
        className="relative z-10 text-center px-6 max-w-5xl"
        style={{ x: springX, y: springY }}
      >
        <AnimatePresence mode="wait">
          {/* Phase 0: Nothing - brief pause */}
          
          {/* Phase 1: Single "Hi" centered with dramatic entrance */}
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

          {/* Phase 2: Fan out to 5 languages */}
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
                    damping: 15 
                  }}
                  className="text-5xl md:text-7xl lg:text-8xl font-bold text-white"
                  style={{ textShadow: "0 0 60px rgba(255,255,255,0.3)" }}
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
              className="space-y-8"
            >
              {/* Welcome */}
              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="text-4xl md:text-6xl font-light text-white/40"
                style={{ fontFamily: "Georgia, 'Times New Roman', serif", fontStyle: "italic" }}
              >
                Welcome
              </motion.p>

              {/* Name - Phase 4 */}
              {phase >= 4 && (
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                >
                  <h1 className="text-6xl md:text-9xl font-black tracking-tight">
                    <span className="text-white/60">I&apos;m </span>
                    <span className="text-white relative">
                      Dipesh Kumar
                      <motion.span
                        className="absolute -bottom-2 left-0 h-1 bg-white"
                        initial={{ width: 0 }}
                        animate={{ width: "100%" }}
                        transition={{ delay: 0.5, duration: 0.8, ease: "easeOut" }}
                      />
                    </span>
                  </h1>
                </motion.div>
              )}

              {/* Subtitle & socials - Phase 5 */}
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

                  {/* Social links */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="flex items-center justify-center gap-4"
                  >
                    {[
                      { icon: Github, href: "https://github.com/dipesh4000", label: "GitHub" },
                      { icon: Linkedin, href: "https://linkedin.com/in/dipesh4000", label: "LinkedIn" },
                      { icon: Mail, href: "mailto:dipeshkumar0853822@gmail.com", label: "Email" },
                      { icon: ExternalLink, href: "https://www.dipesh4000.xyz", label: "Portfolio" },
                    ].map(({ icon: Icon, href, label }) => (
                      <motion.a
                        key={label}
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.1, backgroundColor: "rgba(255,255,255,0.1)" }}
                        whileTap={{ scale: 0.95 }}
                        className="p-4 rounded-full border border-white/10 bg-transparent transition-all duration-300"
                        aria-label={label}
                      >
                        <Icon className="w-5 h-5 text-white/60 hover:text-white transition-colors" />
                      </motion.a>
                    ))}
                  </motion.div>

                  {/* Resume button - subtle */}
                  <motion.a
                    href="/resume.pdf"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    className="inline-flex items-center gap-2 text-sm text-white/40 hover:text-white/80 transition-colors border-b border-white/20 hover:border-white/50 pb-1"
                  >
                    Download Resume
                    <ExternalLink className="w-3 h-3" />
                  </motion.a>
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
            transition={{ delay: 1 }}
            className="absolute left-1/2 -translate-x-1/2 bottom-[-140px] flex flex-col items-center gap-2 text-white/20 hover:text-white/50 transition-colors cursor-pointer group"
          >
            <span className="text-[10px] tracking-[0.3em] uppercase font-medium">Scroll</span>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <ChevronDown className="w-4 h-4" />
            </motion.div>
          </motion.a>
        )}
      </motion.div>
    </section>
  );
}
