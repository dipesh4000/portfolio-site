"use client";

import { motion, useInView } from "framer-motion";
import { createContext, useContext, useRef, useState, useEffect } from "react";
import { Code2, Target, Flame, Calendar, Award, TrendingUp, ExternalLink, Zap } from "lucide-react";

// Stats from public/data/codio-stats.json — refresh: POST /api/codolio (writes this file). Optional: CODOLIO_CRON_SECRET + Authorization: Bearer …
import statsData from "@/public/data/codio-stats.json";

const stats = statsData as typeof statsData;

const ReducedMotionContext = createContext(false);

function useReducedMotionPreference() {
  return useContext(ReducedMotionContext);
}

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);
  return reduced;
}

function Counter({ value, duration = 2 }: { value: number; duration?: number }) {
  const reduced = useReducedMotionPreference();
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;
    if (reduced) {
      setCount(value);
      return;
    }
    let start = 0;
    const timer = setInterval(() => {
      start += value / (duration * 60);
      if (start >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [isInView, value, duration, reduced]);

  return <span ref={ref}>{count}</span>;
}

function CircularProgress({
  value,
  max,
  size = 140,
  strokeWidth = 8,
  label,
}: {
  value: number;
  max: number;
  size?: number;
  strokeWidth?: number;
  label?: string;
}) {
  const reduced = useReducedMotionPreference();
  const ref = useRef<SVGSVGElement>(null);
  const isInView = useInView(ref, { once: true });
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const percentage = (value / max) * 100;

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg ref={ref} className="transform -rotate-90" width={size} height={size}>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
          fill="none"
          className="stroke-white/5"
        />
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
          fill="none"
          strokeLinecap="round"
          className="stroke-white"
          initial={{ strokeDasharray: circumference, strokeDashoffset: circumference }}
          animate={isInView ? { strokeDashoffset: circumference - (percentage / 100) * circumference } : {}}
          transition={{ duration: reduced ? 0 : 1.5, ease: "easeOut" }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-3xl font-bold text-white">
          <Counter value={value} />
        </span>
        {label && <span className="text-xs text-white/40 mt-1">{label}</span>}
      </div>
    </div>
  );
}

function TopicBar({ topic, count, maxCount, delay = 0 }: { topic: string; count: number; maxCount: number; delay?: number }) {
  const reduced = useReducedMotionPreference();
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });
  const percentage = (count / maxCount) * 100;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -20 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ delay: reduced ? 0 : delay, duration: reduced ? 0 : 0.4 }}
    >
      <div className="flex justify-between mb-2 text-sm">
        <span className="text-white/60">{topic}</span>
        <span className="text-white/40">{count}</span>
      </div>
      <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={isInView ? { width: `${percentage}%` } : {}}
          transition={{ delay: reduced ? 0 : delay + 0.1, duration: reduced ? 0 : 0.6, ease: "easeOut" }}
          className="h-full bg-white rounded-full"
        />
      </div>
    </motion.div>
  );
}

function StatCard({ icon: Icon, label, value, suffix = "", delay = 0 }: { icon: typeof Code2; label: string; value: number; suffix?: string; delay?: number }) {
  const reduced = useReducedMotionPreference();
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: reduced ? 0 : delay, duration: reduced ? 0 : 0.4 }}
      className="p-6 rounded-2xl bg-[#111111] border border-white/5 hover:border-white/10 transition-all"
    >
      <div className="flex items-center gap-2 mb-3">
        <Icon className="w-4 h-4 text-white/40" />
        <span className="text-sm text-white/40">{label}</span>
      </div>
      <div className="text-4xl font-bold text-white">
        <Counter value={value} />
        {suffix && <span className="text-lg text-white/40">{suffix}</span>}
      </div>
    </motion.div>
  );
}

function ContributionHeatmap() {
  const reduced = useReducedMotionPreference();
  const months = ["Nov", "Dec", "Jan", "Feb", "Mar", "Apr"];
  const [mounted, setMounted] = useState(false);
  const contributions = useRef<number[][]>([]);

  useEffect(() => {
    contributions.current = Array.from({ length: 24 }, () =>
      Array.from({ length: 7 }, () => Math.floor(Math.random() * 5)),
    );
    setMounted(true);
  }, []);

  const getColor = (level: number) => {
    const colors = ["bg-white/5", "bg-white/15", "bg-white/30", "bg-white/50", "bg-white/80"];
    return colors[level];
  };

  if (!mounted) {
    return (
      <div
        className={`p-6 rounded-2xl bg-[#111111] border border-white/5 min-h-[240px] ${reduced ? "" : "animate-pulse"}`}
      >
        <div className="h-4 w-32 bg-white/5 rounded mb-5" />
        <div className="h-32 bg-white/5 rounded" />
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: reduced ? 0 : 0.4 }}
      className="p-6 rounded-2xl bg-[#111111] border border-white/5"
    >
      <div className="flex items-center justify-between mb-5">
        <h3 className="text-sm font-medium text-white/60 flex items-center gap-2">
          <Calendar className="w-4 h-4" />
          Coding Activity
        </h3>
        <div className="flex items-center gap-4 text-xs text-white/40">
          <span>{stats.submissions} submissions</span>
          <span className="flex items-center gap-1">
            <Flame className="w-3 h-3" />
            {stats.maxStreak} max streak
          </span>
        </div>
      </div>

      <div className="overflow-x-auto pb-2">
        <div className="flex gap-1 min-w-max">
          {contributions.current.map((week, wi) => (
            <div key={wi} className="flex flex-col gap-1">
              {week.map((level, di) => (
                <motion.div
                  key={`${wi}-${di}`}
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: reduced ? 0 : wi * 0.01 + di * 0.005, duration: reduced ? 0 : 0.1 }}
                  viewport={{ once: true }}
                  className={`w-3 h-3 rounded-sm ${getColor(level)}`}
                />
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between mt-4">
        <div className="flex gap-6 text-[10px] text-white/20">
          {months.map((m) => (
            <span key={m}>{m}</span>
          ))}
        </div>
        <div className="flex items-center gap-1 text-[10px] text-white/20">
          <span>Less</span>
          {[0, 1, 2, 3, 4].map((l) => (
            <div key={l} className={`w-2.5 h-2.5 rounded-sm ${getColor(l)}`} />
          ))}
          <span>More</span>
        </div>
      </div>
    </motion.div>
  );
}

export function CodingStats() {
  const reduced = usePrefersReducedMotion();
  const maxTopic = Math.max(1, ...stats.topics.map((t) => t.count));

  return (
    <ReducedMotionContext.Provider value={reduced}>
      <section id="coding-stats" className="py-32 px-6" style={{ backgroundColor: "#0a0a0a" }}>
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: reduced ? 0 : 0.4 }}
            className="mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Coding Stats</h2>
            <p className="text-white/40 text-lg">My problem-solving journey</p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <StatCard icon={Target} label="Total Questions" value={stats.totalQuestions} delay={0} />
            <StatCard icon={Calendar} label="Active Days" value={stats.totalActiveDays} delay={0.1} />
            <StatCard icon={Flame} label="Max Streak" value={stats.maxStreak} suffix=" days" delay={0.2} />
            <StatCard icon={Award} label="Awards" value={stats.awards} delay={0.3} />
          </div>

          <div className="mb-8">
            <ContributionHeatmap />
          </div>

          <div className="grid lg:grid-cols-2 gap-6 mb-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: reduced ? 0 : 0.4 }}
              className="p-6 rounded-2xl bg-[#111111] border border-white/5"
            >
              <h3 className="text-sm font-medium text-white/60 mb-8 flex items-center gap-2">
                <TrendingUp className="w-4 h-4" />
                Problems Solved
              </h3>

              <div className="flex flex-wrap justify-center gap-12">
                <div className="flex flex-col items-center">
                  <CircularProgress value={stats.dsa.total} max={300} label="DSA" />
                  <div className="mt-4 space-y-2 text-sm w-28">
                    <div className="flex justify-between">
                      <span className="text-green-400/80">Easy</span>
                      <span className="text-white/70">{stats.dsa.easy}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-yellow-400/80">Medium</span>
                      <span className="text-white/70">{stats.dsa.medium}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-red-400/80">Hard</span>
                      <span className="text-white/70">{stats.dsa.hard}</span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col items-center">
                  <CircularProgress value={stats.fundamentals.total} max={20} size={120} label="Fundamentals" />
                  <div className="mt-4 space-y-2 text-sm w-28">
                    <div className="flex justify-between">
                      <span className="text-white/50">GFG</span>
                      <span className="text-white/70">{stats.fundamentals.gfg}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/50">HackerRank</span>
                      <span className="text-white/70">{stats.fundamentals.hackerrank}</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: reduced ? 0 : 0.4 }}
              className="p-6 rounded-2xl bg-[#111111] border border-white/5"
            >
              <h3 className="text-sm font-medium text-white/60 mb-6 flex items-center gap-2">
                <Zap className="w-4 h-4" />
                Topic Analysis
              </h3>
              <div className="space-y-5">
                {stats.topics.map((topic, i) => (
                  <TopicBar key={topic.name} topic={topic.name} count={topic.count} maxCount={maxTopic} delay={i * 0.08} />
                ))}
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: reduced ? 0 : 0.4 }}
            className="flex flex-wrap justify-center gap-4"
          >
            <a
              href="https://codolio.com/profile/dipesh4000"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-black font-medium hover:bg-white/90 transition-colors"
            >
              View Codolio Profile
              <ExternalLink className="w-4 h-4" />
            </a>
            <a
              href="https://leetcode.com/u/dipesh4000/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-transparent border border-white/20 text-white font-medium hover:bg-white/5 transition-colors"
            >
              <Code2 className="w-4 h-4" />
              LeetCode Profile
            </a>
          </motion.div>
        </div>
      </section>
    </ReducedMotionContext.Provider>
  );
}

export function CodingStatsSection() {
  return <CodingStats />;
}
