import React, { useEffect, useState } from "react";
import Image from "next/image";

export function CodingSection() {
  const [stats, setStats] = useState<any>(null);

  useEffect(() => {
    fetch("/data/codio-stats.json")
      .then((res) => res.json())
      .then(setStats)
      .catch(() => setStats(null));
  }, []);

  if (!stats) {
    return null;
  }

  return (
    <section className="py-12 px-6 bg-[#111111] rounded-2xl" id="coding-stats">
      <h2 className="text-3xl font-bold text-white mb-6">Coding Overview</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-white/80">
        <div className="p-4 bg-[#0a0a0a] rounded-lg">
          <p className="text-sm opacity-60">Total Questions</p>
          <p className="text-xl font-medium">{stats.totalQuestions}</p>
        </div>
        <div className="p-4 bg-[#0a0a0a] rounded-lg">
          <p className="text-sm opacity-60">Active Days</p>
          <p className="text-xl font-medium">{stats.totalActiveDays}</p>
        </div>
        <div className="p-4 bg-[#0a0a0a] rounded-lg">
          <p className="text-sm opacity-60">Submissions</p>
          <p className="text-xl font-medium">{stats.submissions}</p>
        </div>
        <div className="p-4 bg-[#0a0a0a] rounded-lg">
          <p className="text-sm opacity-60">Current Streak</p>
          <p className="text-xl font-medium">{stats.currentStreak} days</p>
        </div>
      </div>
    </section>
  );
}
