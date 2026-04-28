"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Github, Code2, Trophy, Target, Flame, Calendar, GitCommit, Star } from "lucide-react";

// Animated counter component
function AnimatedCounter({ value, duration = 2 }: { value: number; duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;
    
    let startTime: number;
    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / (duration * 1000), 1);
      setCount(Math.floor(progress * value));
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    requestAnimationFrame(animate);
  }, [isInView, value, duration]);

  return <span ref={ref}>{count}</span>;
}

// GitHub contribution graph simulation
function ContributionGraph() {
  const weeks = 52;
  const days = 7;
  const contributions = useRef(
    Array.from({ length: weeks }, () =>
      Array.from({ length: days }, () => Math.floor(Math.random() * 5))
    )
  );

  const getColor = (level: number) => {
    const colors = [
      "bg-muted",
      "bg-foreground/20",
      "bg-foreground/40",
      "bg-foreground/60",
      "bg-foreground/80",
    ];
    return colors[level] || colors[0];
  };

  return (
    <div className="overflow-x-auto pb-2">
      <div className="flex gap-[3px] min-w-max">
        {contributions.current.map((week, weekIndex) => (
          <div key={weekIndex} className="flex flex-col gap-[3px]">
            {week.map((level, dayIndex) => (
              <motion.div
                key={`${weekIndex}-${dayIndex}`}
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{
                  delay: weekIndex * 0.01 + dayIndex * 0.01,
                  duration: 0.2,
                }}
                viewport={{ once: true }}
                className={`w-[10px] h-[10px] rounded-sm ${getColor(level)} hover:ring-2 hover:ring-foreground/30 transition-all cursor-pointer`}
                title={`${level} contributions`}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

// Individual stat card
function StatCard({
  icon: Icon,
  label,
  value,
  suffix = "",
  delay = 0,
}: {
  icon: typeof Github;
  label: string;
  value: number;
  suffix?: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5 }}
      viewport={{ once: true }}
      whileHover={{ scale: 1.05, y: -5 }}
      className="relative group"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-foreground/5 to-transparent rounded-2xl blur-xl group-hover:blur-2xl transition-all opacity-0 group-hover:opacity-100" />
      <div className="relative bg-background border border-border rounded-2xl p-6 hover:border-foreground/30 transition-all">
        <div className="flex items-center gap-3 mb-3">
          <div className="p-2 rounded-lg bg-foreground/5 text-foreground">
            <Icon className="w-5 h-5" />
          </div>
          <span className="text-sm text-muted-foreground font-medium">{label}</span>
        </div>
        <div className="text-3xl md:text-4xl font-bold text-foreground">
          <AnimatedCounter value={value} />
          {suffix}
        </div>
      </div>
    </motion.div>
  );
}

// LeetCode difficulty bar
function DifficultyBar({
  label,
  solved,
  total,
  color,
  delay = 0,
}: {
  label: string;
  solved: number;
  total: number;
  color: string;
  delay?: number;
}) {
  const percentage = (solved / total) * 100;

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ delay, duration: 0.5 }}
      viewport={{ once: true }}
      className="space-y-2"
    >
      <div className="flex justify-between text-sm">
        <span className={`font-medium ${color}`}>{label}</span>
        <span className="text-muted-foreground">
          <AnimatedCounter value={solved} /> / {total}
        </span>
      </div>
      <div className="h-2 bg-muted rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${percentage}%` }}
          transition={{ delay: delay + 0.3, duration: 1, ease: "easeOut" }}
          viewport={{ once: true }}
          className={`h-full rounded-full ${color.replace("text-", "bg-")}`}
        />
      </div>
    </motion.div>
  );
}

export function GitHubStatsSection() {
  const githubStats = {
    totalRepos: 24,
    totalCommits: 847,
    totalStars: 42,
    contributions: 1247,
  };

  return (
    <section id="github-stats" className="py-20 md:py-32 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-center justify-center gap-3 mb-12"
        >
          <Github className="w-8 h-8 text-foreground" />
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            GitHub Stats
          </h2>
        </motion.div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          <StatCard icon={Github} label="Repositories" value={githubStats.totalRepos} delay={0} />
          <StatCard icon={GitCommit} label="Commits" value={githubStats.totalCommits} delay={0.1} />
          <StatCard icon={Star} label="Stars" value={githubStats.totalStars} delay={0.2} />
          <StatCard icon={Calendar} label="Contributions" value={githubStats.contributions} delay={0.3} />
        </div>

        {/* Contribution graph */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-background border border-border rounded-2xl p-6"
        >
          <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            Contribution Activity
          </h3>
          <ContributionGraph />
          <div className="flex items-center justify-end gap-2 mt-4 text-xs text-muted-foreground">
            <span>Less</span>
            {[0, 1, 2, 3, 4].map((level) => (
              <div
                key={level}
                className={`w-[10px] h-[10px] rounded-sm ${
                  ["bg-muted", "bg-foreground/20", "bg-foreground/40", "bg-foreground/60", "bg-foreground/80"][level]
                }`}
              />
            ))}
            <span>More</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export function DSAStatsSection() {
  const leetcodeStats = {
    totalSolved: 287,
    easy: { solved: 95, total: 830 },
    medium: { solved: 162, total: 1750 },
    hard: { solved: 30, total: 780 },
    ranking: 89432,
    streak: 47,
    contestRating: 1654,
  };

  return (
    <section id="dsa-stats" className="py-20 md:py-32 px-4 sm:px-6 lg:px-8 bg-muted/30">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-center justify-center gap-3 mb-12"
        >
          <Code2 className="w-8 h-8 text-foreground" />
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            DSA Stats
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left: Problem solving stats */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-background border border-border rounded-2xl p-6 space-y-6"
          >
            {/* Total solved with circular progress */}
            <div className="flex items-center gap-6">
              <div className="relative w-32 h-32">
                <svg className="w-full h-full transform -rotate-90">
                  <circle
                    cx="64"
                    cy="64"
                    r="56"
                    stroke="currentColor"
                    strokeWidth="8"
                    fill="none"
                    className="text-muted"
                  />
                  <motion.circle
                    cx="64"
                    cy="64"
                    r="56"
                    stroke="currentColor"
                    strokeWidth="8"
                    fill="none"
                    strokeLinecap="round"
                    className="text-foreground"
                    initial={{ strokeDasharray: "0 352" }}
                    whileInView={{ strokeDasharray: `${(leetcodeStats.totalSolved / 3360) * 352} 352` }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    viewport={{ once: true }}
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-3xl font-bold text-foreground">
                    <AnimatedCounter value={leetcodeStats.totalSolved} />
                  </span>
                  <span className="text-xs text-muted-foreground">Solved</span>
                </div>
              </div>
              <div className="flex-1 space-y-4">
                <DifficultyBar
                  label="Easy"
                  solved={leetcodeStats.easy.solved}
                  total={leetcodeStats.easy.total}
                  color="text-green-500"
                  delay={0.2}
                />
                <DifficultyBar
                  label="Medium"
                  solved={leetcodeStats.medium.solved}
                  total={leetcodeStats.medium.total}
                  color="text-yellow-500"
                  delay={0.3}
                />
                <DifficultyBar
                  label="Hard"
                  solved={leetcodeStats.hard.solved}
                  total={leetcodeStats.hard.total}
                  color="text-red-500"
                  delay={0.4}
                />
              </div>
            </div>
          </motion.div>

          {/* Right: Other stats */}
          <div className="grid grid-cols-2 gap-4">
            <StatCard icon={Trophy} label="Global Ranking" value={leetcodeStats.ranking} delay={0.1} />
            <StatCard icon={Flame} label="Current Streak" value={leetcodeStats.streak} suffix=" days" delay={0.2} />
            <StatCard icon={Target} label="Contest Rating" value={leetcodeStats.contestRating} delay={0.3} />
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-foreground/5 to-transparent rounded-2xl blur-xl group-hover:blur-2xl transition-all opacity-0 group-hover:opacity-100" />
              <a
                href="https://leetcode.com/dipesh4000"
                target="_blank"
                rel="noopener noreferrer"
                className="relative bg-foreground text-background border border-foreground rounded-2xl p-6 hover:bg-foreground/90 transition-all flex flex-col items-center justify-center gap-2 h-full"
              >
                <Code2 className="w-8 h-8" />
                <span className="font-semibold">View Profile</span>
              </a>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
