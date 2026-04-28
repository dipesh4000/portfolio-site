"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import useSWR from "swr";
import { Code2, Trophy, Target, Flame, Calendar, Zap, Award, TrendingUp, ExternalLink, RefreshCw } from "lucide-react";

// Fetcher for SWR
const fetcher = (url: string) => fetch(url).then((res) => res.json());

// Default stats (from your Codolio screenshot)
const DEFAULT_STATS = {
  totalQuestions: 166,
  totalActiveDays: 102,
  submissions: 203,
  maxStreak: 24,
  currentStreak: 1,
  awards: 2,
  dsa: { total: 155, easy: 72, medium: 75, hard: 8 },
  fundamentals: { total: 9, gfg: 1, hackerrank: 8 },
  topics: [
    { name: "Arrays", count: 85 },
    { name: "Binary Search", count: 38 },
    { name: "HashMap & Set", count: 28 },
    { name: "Two Pointers", count: 27 },
    { name: "String", count: 25 },
    { name: "Linked Lists", count: 23 },
  ],
  lastUpdated: null as string | null,
};

// Animated counter
function Counter({ value, duration = 2 }: { value: number; duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;
    let start: number;
    const animate = (time: number) => {
      if (!start) start = time;
      const progress = Math.min((time - start) / (duration * 1000), 1);
      setCount(Math.floor(progress * value));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [isInView, value, duration]);

  return <span ref={ref}>{count.toLocaleString()}</span>;
}

// Circular progress ring
function CircularProgress({ 
  value, 
  max, 
  size = 140, 
  strokeWidth = 10,
  color = "stroke-purple-500",
  label,
}: { 
  value: number; 
  max: number; 
  size?: number;
  strokeWidth?: number;
  color?: string;
  label?: string;
}) {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const percentage = (value / max) * 100;

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg className="transform -rotate-90" width={size} height={size}>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
          fill="none"
          className="stroke-white/10"
        />
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
          fill="none"
          strokeLinecap="round"
          className={color}
          initial={{ strokeDasharray: `0 ${circumference}` }}
          whileInView={{ strokeDasharray: `${(percentage / 100) * circumference} ${circumference}` }}
          transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }}
          viewport={{ once: true }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-3xl font-bold text-white">
          <Counter value={value} />
        </span>
        {label && <span className="text-xs text-white/50 mt-1">{label}</span>}
      </div>
    </div>
  );
}

// Topic bar
function TopicBar({ 
  topic, 
  count, 
  maxCount, 
  delay = 0,
  color = "bg-purple-500",
}: { 
  topic: string; 
  count: number; 
  maxCount: number; 
  delay?: number;
  color?: string;
}) {
  const percentage = (count / maxCount) * 100;
  
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ delay, duration: 0.4 }}
      viewport={{ once: true }}
    >
      <div className="flex justify-between mb-1.5 text-sm">
        <span className="text-white/70">{topic}</span>
        <span className="text-white/50">{count}</span>
      </div>
      <div className="h-2 bg-white/10 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${percentage}%` }}
          transition={{ delay: delay + 0.1, duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true }}
          className={`h-full rounded-full ${color}`}
        />
      </div>
    </motion.div>
  );
}

// Stat card
function StatCard({
  icon: Icon,
  label,
  value,
  suffix = "",
  delay = 0,
}: {
  icon: typeof Code2;
  label: string;
  value: number;
  suffix?: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.4 }}
      viewport={{ once: true }}
      className="p-5 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/[0.07] hover:border-white/15 transition-all"
    >
      <div className="flex items-center gap-2 mb-3">
        <Icon className="w-5 h-5 text-purple-400" />
        <span className="text-sm text-white/50">{label}</span>
      </div>
      <div className="text-3xl font-bold text-white">
        <Counter value={value} />
        <span className="text-lg text-white/50">{suffix}</span>
      </div>
    </motion.div>
  );
}

// Contribution heatmap
function ContributionHeatmap({ submissions, maxStreak }: { submissions: number; maxStreak: number }) {
  const months = ["Nov", "Dec", "Jan", "Feb", "Mar", "Apr"];
  
  const generateContributions = () => {
    const data: number[][] = [];
    for (let week = 0; week < 24; week++) {
      const weekData: number[] = [];
      for (let day = 0; day < 7; day++) {
        const recentBoost = week > 16 ? 2 : week > 8 ? 1 : 0;
        const randomValue = Math.random();
        let level = 0;
        if (randomValue > 0.3) level = 1;
        if (randomValue > 0.5) level = 2;
        if (randomValue > 0.7) level = 3;
        if (randomValue > 0.85) level = 4;
        level = Math.min(4, level + recentBoost);
        weekData.push(level);
      }
      data.push(weekData);
    }
    return data;
  };

  const contributions = useRef(generateContributions());
  
  const getColor = (level: number) => {
    const colors = [
      "bg-white/5",
      "bg-green-500/30",
      "bg-green-500/50",
      "bg-green-500/70",
      "bg-green-500",
    ];
    return colors[level];
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="p-6 rounded-2xl bg-white/5 border border-white/10"
    >
      <div className="flex items-center justify-between mb-5">
        <h3 className="text-lg font-semibold text-white flex items-center gap-2">
          <Calendar className="w-5 h-5 text-green-400" />
          Coding Activity
        </h3>
        <div className="flex items-center gap-4 text-sm text-white/50">
          <span>{submissions} submissions</span>
          <span className="flex items-center gap-1">
            <Flame className="w-4 h-4 text-orange-400" />
            {maxStreak} max streak
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
                  transition={{ delay: wi * 0.015 + di * 0.005, duration: 0.15 }}
                  viewport={{ once: true }}
                  className={`w-3 h-3 rounded-sm ${getColor(level)}`}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
      
      <div className="flex items-center justify-between mt-4">
        <div className="flex gap-6 text-xs text-white/30">
          {months.map((m) => <span key={m}>{m}</span>)}
        </div>
        <div className="flex items-center gap-1.5 text-xs text-white/30">
          <span>Less</span>
          {[0, 1, 2, 3, 4].map((l) => (
            <div key={l} className={`w-3 h-3 rounded-sm ${getColor(l)}`} />
          ))}
          <span>More</span>
        </div>
      </div>
    </motion.div>
  );
}

export function CodingStatsSection() {
  // Fetch stats from API with SWR (caches and revalidates)
  const { data: stats, isLoading, mutate } = useSWR("/api/codolio", fetcher, {
    fallbackData: DEFAULT_STATS,
    revalidateOnFocus: false,
    refreshInterval: 48 * 60 * 60 * 1000, // 48 hours
  });

  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await mutate();
    setIsRefreshing(false);
  };

  return (
    <section id="coding-stats" className="py-20 md:py-28 px-4 sm:px-6 lg:px-8" style={{ backgroundColor: "#0a0a0a" }}>
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 mb-4">
            <Code2 className="w-4 h-4 text-purple-400" />
            <span className="text-sm text-white/60">Problem Solving</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-3">
            Coding Statistics
          </h2>
          <div className="flex items-center justify-center gap-4 text-sm text-white/40">
            <span>LeetCode + GeeksforGeeks + HackerRank</span>
            <button
              onClick={handleRefresh}
              disabled={isRefreshing}
              className="flex items-center gap-1 hover:text-white/60 transition-colors"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? "animate-spin" : ""}`} />
              Refresh
            </button>
          </div>
        </motion.div>

        {/* Top stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <StatCard icon={Target} label="Total Questions" value={stats.totalQuestions} delay={0} />
          <StatCard icon={Calendar} label="Active Days" value={stats.totalActiveDays} delay={0.1} />
          <StatCard icon={Flame} label="Max Streak" value={stats.maxStreak} suffix=" days" delay={0.2} />
          <StatCard icon={Award} label="Awards" value={stats.awards} delay={0.3} />
        </div>

        {/* Contribution heatmap */}
        <div className="mb-6">
          <ContributionHeatmap submissions={stats.submissions} maxStreak={stats.maxStreak} />
        </div>

        {/* Problems solved & Topic analysis */}
        <div className="grid lg:grid-cols-2 gap-6 mb-8">
          {/* Left: Circular charts */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="p-6 rounded-2xl bg-white/5 border border-white/10"
          >
            <h3 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-cyan-400" />
              Problems Solved
            </h3>

            <div className="flex flex-wrap justify-center gap-10">
              {/* DSA Problems */}
              <div className="flex flex-col items-center">
                <CircularProgress
                  value={stats.dsa.total}
                  max={300}
                  color="stroke-yellow-400"
                  label="DSA"
                />
                <div className="mt-4 space-y-1.5 text-sm w-32">
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-green-500" />
                      <span className="text-white/50">Easy</span>
                    </span>
                    <span className="text-white">{stats.dsa.easy}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-yellow-500" />
                      <span className="text-white/50">Medium</span>
                    </span>
                    <span className="text-white">{stats.dsa.medium}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-red-500" />
                      <span className="text-white/50">Hard</span>
                    </span>
                    <span className="text-white">{stats.dsa.hard}</span>
                  </div>
                </div>
              </div>

              {/* Fundamentals */}
              <div className="flex flex-col items-center">
                <CircularProgress
                  value={stats.fundamentals.total}
                  max={20}
                  color="stroke-cyan-400"
                  label="Fundamentals"
                />
                <div className="mt-4 space-y-1.5 text-sm w-32">
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-green-600" />
                      <span className="text-white/50">GFG</span>
                    </span>
                    <span className="text-white">{stats.fundamentals.gfg}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-500" />
                      <span className="text-white/50">HackerRank</span>
                    </span>
                    <span className="text-white">{stats.fundamentals.hackerrank}</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right: Topic Analysis */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="p-6 rounded-2xl bg-white/5 border border-white/10"
          >
            <h3 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
              <Zap className="w-5 h-5 text-yellow-400" />
              DSA Topic Analysis
            </h3>

            <div className="space-y-4">
              {stats.topics.map((topic: { name: string; count: number }, i: number) => (
                <TopicBar
                  key={topic.name}
                  topic={topic.name}
                  count={topic.count}
                  maxCount={100}
                  delay={i * 0.08}
                  color={i % 2 === 0 ? "bg-purple-500" : "bg-cyan-500"}
                />
              ))}
            </div>
          </motion.div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-3"
        >
          <motion.a
            href="https://codolio.com/profile/dipesh4000"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-medium transition-colors"
          >
            View Codolio Profile
            <ExternalLink className="w-4 h-4" />
          </motion.a>
          <motion.a
            href="https://leetcode.com/u/dipesh4000/"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 text-white font-medium transition-colors"
          >
            <Code2 className="w-4 h-4 text-yellow-400" />
            LeetCode Profile
          </motion.a>
        </motion.div>

        {/* Last updated */}
        {stats.lastUpdated && (
          <p className="text-center text-xs text-white/30 mt-6">
            Last updated: {new Date(stats.lastUpdated).toLocaleString()}
          </p>
        )}
      </div>
    </section>
  );
}

// Legacy exports for compatibility
export function GitHubStatsSection() { return null; }
export function DSAStatsSection() { return null; }
