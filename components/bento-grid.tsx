"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import statsData from "@/public/data/codio-stats.json";

const stats = statsData as typeof statsData;

const skills = {
  languages: ["Python", "SQL", "JavaScript", "C++"],
  ml: ["PyTorch", "TensorFlow", "Scikit-learn", "YOLOv8", "OpenCV"],
  backend: ["FastAPI", "Flask", "PostgreSQL", "REST APIs"],
  tools: ["Git", "Docker", "Pandas", "NumPy", "Matplotlib"],
};

const approach = [
  { num: "01", label: "Understand the problem & data" },
  { num: "02", label: "Build clean, modular solutions" },
  { num: "03", label: "Deploy & iterate fast" },
];

const statItems = [
  { value: "02+", label: "Years Of Experience" },
  { value: "15+", label: "Projects Completed" },
  { value: "05+", label: "Technologies Mastered" },
];

const skillCategories = [
  { title: "Languages", items: skills.languages },
  { title: "ML / AI", items: skills.ml },
  { title: "Backend", items: skills.backend },
  { title: "Tools", items: skills.tools },
];

function SectionHeading({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div className="text-center mb-12">
      <h2 className="text-4xl md:text-5xl font-bold text-white mb-3">{title}</h2>
      <p className="text-white/40 text-sm">{subtitle}</p>
    </div>
  );
}

export function BentoGrid() {
  const aboutRef = useRef(null);
  const skillsRef = useRef(null);
  const aboutInView = useInView(aboutRef, { once: true, margin: "-80px" });
  const skillsInView = useInView(skillsRef, { once: true, margin: "-80px" });

  return (
    <>
      {/* ── About Me ── */}
      <section id="about" className="px-4 py-20 sm:px-6 lg:py-24" style={{ backgroundColor: "#000000" }}>
        <div className="max-w-5xl mx-auto" ref={aboutRef}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={aboutInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <SectionHeading
              title="About Me"
              subtitle="Building production-ready ML systems and data pipelines"
            />

            {/* Bio */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={aboutInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-white/55 text-base leading-relaxed text-center max-w-3xl mx-auto mb-16"
            >
              I&apos;m an ML Engineer and Data Scientist passionate about crafting clean, efficient, and
              production-ready AI systems. I focus on building end-to-end machine learning pipelines,
              designing scalable data architectures, and delivering reliable backend services that power
              real-world applications.
            </motion.p>

            {/* My Approach */}
            <div className="mb-16">
              <h3 className="text-white/50 text-sm font-semibold uppercase tracking-[0.2em] text-center mb-8">
                My Approach
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {approach.map((item, i) => (
                  <motion.div
                    key={item.num}
                    initial={{ opacity: 0, y: 20 }}
                    animate={aboutInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.15 + i * 0.1 }}
                    className="flex items-center gap-4 p-5 rounded-xl border border-white/8 bg-[#0f0f0f]"
                  >
                    <span className="text-white/20 text-sm font-mono font-bold shrink-0">{item.num}</span>
                    <p className="text-white/70 text-sm">{item.label}</p>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Stats */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-10 sm:gap-20">
              {statItems.map((s, i) => (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={aboutInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
                  className="text-center"
                >
                  <p className="text-4xl font-black text-white mb-1">{s.value}</p>
                  <p className="text-white/40 text-sm">{s.label}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Skills ── */}
      <section id="skills" className="px-4 py-20 sm:px-6 lg:py-24" style={{ backgroundColor: "#050505" }}>
        <div className="max-w-5xl mx-auto" ref={skillsRef}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={skillsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <SectionHeading
              title="Skills"
              subtitle="Crafting ML systems, data pipelines, and clean backend code"
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {skillCategories.map((cat, i) => (
                <motion.div
                  key={cat.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={skillsInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.1 + i * 0.08 }}
                  className="p-5 rounded-xl border border-white/8 bg-[#0f0f0f]"
                >
                  <h3 className="text-white font-semibold text-sm mb-4">{cat.title}</h3>
                  <div className="flex flex-wrap gap-2">
                    {cat.items.map((skill) => (
                      <span
                        key={skill}
                        className="px-3 py-1.5 border border-white/12 text-white/60 rounded-md text-xs hover:border-white/25 hover:text-white/80 transition-colors"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
