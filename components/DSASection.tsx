import React from 'react';
import { motion, useInView } from 'framer-motion';
import statsData from '@/public/data/codio-stats.json';
import { Counter } from '@/components/stats'; // reuse Counter component if exported, else define inline

const stats = statsData as typeof statsData;

export function DSASection() {
  const dsa = stats.dsa;
  const max = Math.max(250, Math.ceil(dsa.total / 50) * 50);
  const reduced = false; // no reduced motion handling needed for simplicity
  
  return (
    <section id="dsa-stats" className="py-32 px-6" style={{ backgroundColor: '#0c0c0c' }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
        className="mb-16"
      >
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Data Structures &amp; Algorithms</h2>
        <p className="text-white/40 text-lg">Problem solving milestones</p>
      </motion.div>
      <div className="flex flex-col items-center">
        <div className="flex gap-8">
          <div className="p-4 bg-[#111111] rounded-xl">
            <h3 className="text-white/60 mb-2">Total Problems</h3>
            <p className="text-3xl font-bold text-white"><Counter value={dsa.total} /></p>
          </div>
        </div>
        <div className="mt-8">
          <div className="flex flex-col items-center">
            <h3 className="text-white/60 mb-2">Difficulty Breakdown</h3>
            <ul className="space-y-2 text-white">
              <li>Easy: {dsa.easy}</li>
              <li>Medium: {dsa.medium}</li>
              <li>Hard: {dsa.hard}</li>
              <li>Other: {dsa.other}</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
