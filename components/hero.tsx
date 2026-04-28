"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Github, Linkedin, Mail, Twitter } from "lucide-react";

const greetings = [
  { text: "Hi", lang: "en" },
  { text: "नमस्ते", lang: "hi" },
  { text: "こんにちは", lang: "ja" },
  { text: "안녕", lang: "ko" },
  { text: "你好", lang: "zh" },
];

// Interactive particle system
function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      color: string;
      alpha: number;
    }> = [];

    const colors = ["#a855f7", "#ec4899", "#06b6d4", "#3b82f6", "#8b5cf6"];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const init = () => {
      particles.length = 0;
      const count = Math.min(100, Math.floor((canvas.width * canvas.height) / 12000));
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.8,
          vy: (Math.random() - 0.5) * 0.8,
          size: Math.random() * 2.5 + 0.5,
          color: colors[Math.floor(Math.random() * colors.length)],
          alpha: Math.random() * 0.6 + 0.2,
        });
      }
    };

    const animate = () => {
      ctx.fillStyle = "rgba(12, 10, 29, 0.1)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p, i) => {
        // Mouse interaction
        const dx = mouseRef.current.x - p.x;
        const dy = mouseRef.current.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 150) {
          const force = (150 - dist) / 150;
          p.vx -= (dx / dist) * force * 0.02;
          p.vy -= (dy / dist) * force * 0.02;
        }

        // Update
        p.x += p.vx;
        p.y += p.vy;
        p.vx *= 0.99;
        p.vy *= 0.99;

        // Bounds
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        // Draw particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha;
        ctx.fill();

        // Connections
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const d = Math.hypot(p.x - p2.x, p.y - p2.y);
          if (d < 100) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = p.color;
            ctx.globalAlpha = (1 - d / 100) * 0.2;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      });

      ctx.globalAlpha = 1;
      animationId = requestAnimationFrame(animate);
    };

    const handleMouse = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    resize();
    init();
    animate();

    window.addEventListener("resize", () => { resize(); init(); });
    window.addEventListener("mousemove", handleMouse);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouse);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0" style={{ zIndex: 1 }} />;
}

// 3D floating orbs
function FloatingOrbs() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 0 }}>
      <motion.div
        className="absolute w-[700px] h-[700px] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(139,92,246,0.3) 0%, rgba(139,92,246,0) 70%)",
          left: "-15%",
          top: "5%",
          filter: "blur(40px)",
        }}
        animate={{ x: [0, 60, 0], y: [0, -40, 0], scale: [1, 1.15, 1] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute w-[500px] h-[500px] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(236,72,153,0.35) 0%, rgba(236,72,153,0) 70%)",
          right: "-10%",
          top: "15%",
          filter: "blur(50px)",
        }}
        animate={{ x: [0, -50, 0], y: [0, 50, 0], scale: [1, 0.9, 1] }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute w-[600px] h-[600px] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(6,182,212,0.25) 0%, rgba(6,182,212,0) 70%)",
          left: "25%",
          bottom: "-20%",
          filter: "blur(60px)",
        }}
        animate={{ x: [0, 40, 0], y: [0, -60, 0] }}
        transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
      />
      
      {/* Geometric shapes */}
      <motion.div
        className="absolute w-24 h-24 border-2 border-purple-500/20 rounded-2xl"
        style={{ left: "12%", top: "20%" }}
        animate={{ rotate: 360, y: [0, -30, 0] }}
        transition={{ rotate: { duration: 30, repeat: Infinity, ease: "linear" }, y: { duration: 8, repeat: Infinity } }}
      />
      <motion.div
        className="absolute w-16 h-16 border-2 border-pink-500/20 rounded-full"
        style={{ right: "18%", top: "30%" }}
        animate={{ rotate: -360, scale: [1, 1.3, 1] }}
        transition={{ rotate: { duration: 25, repeat: Infinity, ease: "linear" }, scale: { duration: 6, repeat: Infinity } }}
      />
      <motion.div
        className="absolute w-20 h-20 border-2 border-cyan-500/20"
        style={{ left: "55%", bottom: "25%", rotate: "45deg" }}
        animate={{ rotate: [45, 225, 45], y: [0, 40, 0] }}
        transition={{ rotate: { duration: 20, repeat: Infinity }, y: { duration: 7, repeat: Infinity } }}
      />
    </div>
  );
}

export function Hero() {
  const [phase, setPhase] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouse = useCallback((e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: (e.clientX - rect.left - rect.width / 2) / 40,
      y: (e.clientY - rect.top - rect.height / 2) / 40,
    });
  }, []);

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 600),
      setTimeout(() => setPhase(2), 2200),
      setTimeout(() => setPhase(3), 4200),
      setTimeout(() => setPhase(4), 5200),
      setTimeout(() => setPhase(5), 6200),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <section
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      onMouseMove={handleMouse}
      style={{ background: "linear-gradient(135deg, #0c0a1d 0%, #1a0a2e 50%, #0d1117 100%)" }}
    >
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      <FloatingOrbs />
      <ParticleField />

      <motion.div
        className="relative z-10 text-center px-6 max-w-5xl"
        style={{ transform: `translate(${mousePos.x}px, ${mousePos.y}px)` }}
      >
        <AnimatePresence mode="wait">
          {phase === 1 && (
            <motion.div
              key="hi"
              initial={{ opacity: 0, scale: 0.5, filter: "blur(30px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, scale: 1.2, filter: "blur(20px)" }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="text-[10rem] md:text-[14rem] font-black gradient-text leading-none"
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
              exit={{ opacity: 0, y: -30 }}
            >
              {greetings.map((g, i) => (
                <motion.span
                  key={g.lang}
                  initial={{ opacity: 0, y: 50, scale: 0, rotate: -15 }}
                  animate={{ opacity: 1, y: 0, scale: 1, rotate: 0 }}
                  transition={{ delay: i * 0.12, type: "spring", stiffness: 150, damping: 12 }}
                  className="text-5xl md:text-7xl font-bold text-white/90"
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
                className="text-3xl md:text-5xl font-light italic text-white/60"
                style={{ fontFamily: "Georgia, serif" }}
              >
                Welcome
              </motion.p>

              {phase >= 4 && (
                <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                  <h1 className="text-5xl md:text-8xl font-black mb-6">
                    <span className="text-white">I&apos;m </span>
                    <span className="gradient-text">Dipesh Kumar</span>
                  </h1>
                </motion.div>
              )}

              {phase >= 5 && (
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="space-y-10"
                >
                  <div className="flex flex-wrap items-center justify-center gap-4">
                    {["ML Engineer", "Data Scientist", "Backend Developer"].map((role, i) => (
                      <motion.span
                        key={role}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.15 * i }}
                        className="px-6 py-3 rounded-full glass text-white/80 text-lg md:text-xl font-medium"
                      >
                        {role}
                      </motion.span>
                    ))}
                  </div>

                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.7 }}
                    className="flex items-center justify-center gap-5"
                  >
                    {[
                      { icon: Github, href: "https://github.com/dipesh4036" },
                      { icon: Linkedin, href: "https://www.linkedin.com/in/dipeshkumar4000/" },
                      { icon: Mail, href: "mailto:dipeshkumar4036@gmail.com" },
                      { icon: Twitter, href: "https://x.com/dipesh400" },
                    ].map(({ icon: Icon, href }) => (
                      <motion.a
                        key={href}
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.15, y: -3 }}
                        whileTap={{ scale: 0.95 }}
                        className="p-4 rounded-2xl glass hover:bg-white/10 transition-all group glow"
                      >
                        <Icon className="w-6 h-6 text-white/70 group-hover:text-white transition-colors" />
                      </motion.a>
                    ))}
                  </motion.div>
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
            transition={{ delay: 1.2 }}
            className="absolute left-1/2 -translate-x-1/2 -bottom-28 flex flex-col items-center gap-3 text-white/40 hover:text-white/80 transition-colors cursor-pointer"
          >
            <motion.span
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-sm tracking-[0.3em] uppercase font-medium"
            >
              Scroll
            </motion.span>
            <motion.div animate={{ y: [0, 5, 0] }} transition={{ duration: 2, repeat: Infinity, delay: 0.2 }}>
              <ChevronDown className="w-6 h-6" />
            </motion.div>
          </motion.a>
        )}
      </motion.div>
    </section>
  );
}
