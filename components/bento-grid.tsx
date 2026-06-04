"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Github, ExternalLink, MapPin, GraduationCap, Briefcase, Code2, Database, Brain, Terminal, Download } from "lucide-react";
import { TechCube } from "./tech-cube";
import Image from "next/image";
import statsData from "@/public/data/codio-stats.json";

const RESUME_URL = "https://presio.me/dipesh4000/resume";
const stats = statsData as typeof statsData;

const skills = {
  languages: ["Python", "SQL", "JavaScript", "C++"],
  ml: ["PyTorch", "TensorFlow", "Scikit-learn", "YOLOv8", "OpenCV"],
  backend: ["FastAPI", "Flask", "PostgreSQL", "REST APIs"],
  tools: ["Git", "Docker", "Pandas", "NumPy", "Matplotlib"],
};

const projects = [
  {
    title: "Spacestation Detection",
    desc: "YOLOv8 object detection on space imagery",
    tech: ["YOLOv8", "Python", "CV"],
    link: "https://github.com/dipesh4000/Spacestation_objects_detection_duality",
  },
  {
    title: "SQL Data Warehouse",
    desc: "Medallion architecture ETL pipeline",
    tech: ["SQL", "ETL", "Star Schema"],
    link: "https://github.com/dipesh4000/Database_Projects/tree/main/sql-data-warehouse",
  },
  {
    title: "FastAPI CRUD App",
    desc: "Production RESTful API with PostgreSQL",
    tech: ["FastAPI", "PostgreSQL", "Pydantic"],
    link: "https://github.com/dipesh4000/Database_Projects/tree/main/fastapi-crud-app",
  },
];

// ASCII Cat Animation frames
const catFrames = [
  `
  /\\_/\\  
 ( o.o ) 
  > ^ <
  `,
  `
  /\\_/\\  
 ( -.- ) 
  > ^ <
  `,
  `
  /\\_/\\  
 ( o.o ) 
  > ^ <
 /|   |\\
  `,
  `
  /\\_/\\  
 ( ^.^ ) 
  > ^ <
  `,
];

function ASCIICat() {
  const [frame, setFrame] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setFrame((prev) => (prev + 1) % catFrames.length);
    }, 800);
    return () => clearInterval(interval);
  }, []);

  return (
    <pre className="text-[10px] md:text-xs font-mono text-white/60 leading-tight whitespace-pre select-none">
      {catFrames[frame]}
    </pre>
  );
}

function LanguageDistribution() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const languages =
    (stats as { languages?: { name: string; percentage: number; color: string }[] }).languages ?? [];

  return (
    <div ref={ref} className="space-y-6">
      <div className="flex h-7 overflow-hidden rounded-full border border-white/5 bg-white/[0.03] p-1">
        {languages.map((language, index) => (
          <motion.div
            key={language.name}
            className="h-full first:rounded-l-full last:rounded-r-full"
            style={{ backgroundColor: language.color }}
            initial={{ width: 0 }}
            animate={isInView ? { width: `${language.percentage}%` } : { width: 0 }}
            transition={{ duration: 0.7, delay: index * 0.08, ease: "easeOut" }}
            title={`${language.name}: ${language.percentage}%`}
          />
        ))}
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {languages.length > 0 ? (
          languages.map((language, index) => (
            <motion.div
              key={language.name}
              initial={{ opacity: 0, y: 8 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.15 + index * 0.05 }}
              className="flex items-center justify-between gap-3 rounded-xl border border-white/5 bg-white/[0.02] px-3 py-2"
            >
              <div className="flex min-w-0 items-center gap-2">
                <span className="h-3 w-3 shrink-0 rounded-full" style={{ backgroundColor: language.color }} />
                <span className="truncate text-sm text-white/65">{language.name}</span>
              </div>
              <span className="text-sm font-medium tabular-nums text-white/80">{language.percentage}%</span>
            </motion.div>
          ))
        ) : (
          <p className="text-sm text-white/35">Language distribution will appear after the next Codolio sync.</p>
        )}
      </div>
    </div>
  );
}

function BentoCard({
  children,
  className = "",
  delay = 0
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.6, delay: delay * 0.1 }}
      className={`bg-[#111111] border border-white/5 rounded-2xl p-6 hover:border-white/10 transition-all duration-500 ${className}`}
    >
      {children}
    </motion.div>
  );
}

export function BentoGrid() {
  return (
    <section id="about" className="py-32 px-6" style={{ backgroundColor: "#0a0a0a" }}>
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">About Me</h2>
          <p className="text-white/40 text-lg max-w-2xl">
            ML Engineer passionate about building production-ready AI systems
          </p>
        </motion.div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 auto-rows-[180px]">

          {/* Profile Photo Card */}
          <BentoCard className="md:col-span-1 md:row-span-2 overflow-hidden p-0" delay={0}>
            <div className="relative w-full h-full group">
              <Image
                src="/dipesh.jpg"
                alt="Dipesh Kumar"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                style={{ objectPosition: "center 20%" }}
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                <h3 className="text-white font-bold text-lg">Dipesh Kumar</h3>
                <p className="text-white/60 text-sm">ML Engineer</p>
              </div>
            </div>
          </BentoCard>

          {/* Bio card */}
          <BentoCard className="md:col-span-2 md:row-span-1" delay={1}>
            <div className="h-full flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 text-white/40 text-sm mb-3">
                  <MapPin className="w-4 h-4" />
                  <span>Noida, India</span>
                </div>
                <p className="text-white/70 text-sm leading-relaxed">
                  ML Engineer with hands-on experience in computer vision, model training, and production ML systems.
                  Strong foundation in Python, SQL, and data engineering.
                </p>
              </div>
              <div className="flex flex-wrap gap-2 mt-3">
                {["Open Source", "ML Systems", "Data Pipelines"].map((tag) => (
                  <span key={tag} className="px-3 py-1 bg-white/5 rounded-full text-xs text-white/50">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </BentoCard>

          {/* ASCII Cat Card */}
          <BentoCard className="md:col-span-1 flex items-center justify-center" delay={2}>
            <div className="text-center">
              <ASCIICat />
              <p className="text-[10px] text-white/30 mt-2">meow, hire me!</p>
            </div>
          </BentoCard>

          {/* 3D Tech Cube */}
          <BentoCard className="md:col-span-2 md:row-span-2 flex items-center justify-center" delay={3}>
            <TechCube />
          </BentoCard>

          {/* Education */}
          <BentoCard className="md:col-span-1 md:row-span-2" delay={4}>
            <div className="flex flex-col h-full">
              <div className="p-2 bg-white/5 rounded-xl w-fit mb-3">
                <GraduationCap className="w-4 h-4 text-white/60" />
              </div>
              <h3 className="text-white font-semibold text-sm mb-4">Education</h3>

              <div className="space-y-6">
                <div className="relative pl-4 border-l border-white/10">
                  <p className="text-sm text-white/80 font-medium">IIT Madras</p>
                  <p className="text-xs text-white/40 mb-1">B.S. Data Science</p>
                  <div className="inline-flex items-center px-2 py-0.5 rounded-full bg-white/5 border border-white/10">
                    <span className="text-[10px] text-white/60">CGPA: 7.8 / 10</span>
                  </div>
                </div>

                <div className="relative pl-4 border-l border-white/10">
                  <p className="text-sm text-white/80 font-medium">MSIT</p>
                  <p className="text-xs text-white/40 mb-1">B.Tech Computer Science</p>
                  <div className="inline-flex items-center px-2 py-0.5 rounded-full bg-white/5 border border-white/10">
                    <span className="text-[10px] text-white/60">CGPA: 8.25 / 10</span>
                  </div>
                </div>
              </div>

              <div className="mt-auto pt-6">
                <p className="text-[10px] text-white/20 uppercase tracking-widest font-bold">Academic Background</p>
              </div>
            </div>
          </BentoCard>

          {/* Current Status */}
          <BentoCard className="md:col-span-1" delay={5}>
            <div className="flex flex-col h-full">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-xs text-white/40">Status</span>
              </div>
              <h3 className="text-white font-semibold text-sm mb-1">Open Source</h3>
              <p className="text-xs text-white/50">Contributing & building ML projects</p>
            </div>
          </BentoCard>

          {/* Skills with tags */}
          <BentoCard className="md:col-span-2 md:row-span-2" delay={6}>
            <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
              <Brain className="w-4 h-4 text-white/60" />
              Skills
            </h3>
            <div className="space-y-4">
              <div>
                <p className="text-[10px] text-white/30 uppercase tracking-wider mb-2">Languages</p>
                <div className="flex flex-wrap gap-2">
                  {skills.languages.map((s) => (
                    <span key={s} className="px-3 py-1.5 bg-white/10 text-white/80 rounded-lg text-xs font-medium hover:bg-white/20 transition-colors">{s}</span>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-[10px] text-white/30 uppercase tracking-wider mb-2">ML / AI</p>
                <div className="flex flex-wrap gap-2">
                  {skills.ml.map((s) => (
                    <span key={s} className="px-3 py-1.5 bg-white/5 text-white/60 rounded-lg text-xs hover:bg-white/10 transition-colors">{s}</span>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-[10px] text-white/30 uppercase tracking-wider mb-2">Backend</p>
                <div className="flex flex-wrap gap-2">
                  {skills.backend.map((s) => (
                    <span key={s} className="px-3 py-1.5 bg-white/5 text-white/60 rounded-lg text-xs hover:bg-white/10 transition-colors">{s}</span>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-[10px] text-white/30 uppercase tracking-wider mb-2">Tools</p>
                <div className="flex flex-wrap gap-2">
                  {skills.tools.map((s) => (
                    <span key={s} className="px-3 py-1.5 bg-white/5 text-white/60 rounded-lg text-xs hover:bg-white/10 transition-colors">{s}</span>
                  ))}
                </div>
              </div>
            </div>
          </BentoCard>

          {/* Top Languages from GitHub */}
          <BentoCard className="md:col-span-2 md:row-span-2" delay={7}>
            <div className="mb-7 flex items-start justify-between gap-4">
              <div>
                <h3 className="text-white font-semibold flex items-center gap-2">
                  <Code2 className="w-4 h-4 text-white/60" />
                  Top Languages
                </h3>
                <p className="mt-1 text-xs text-white/35">Live repository distribution from Codolio</p>
              </div>
              <span className="rounded-full border border-white/10 px-2.5 py-1 text-[10px] font-medium uppercase tracking-wide text-white/35">
                GitHub
              </span>
            </div>
            <LanguageDistribution />
          </BentoCard>

          {/* Featured Projects */}
          <BentoCard className="md:col-span-2 md:row-span-2" delay={8}>
            <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
              <Terminal className="w-4 h-4 text-white/60" />
              Featured Projects
            </h3>
            <div className="space-y-4">
              {projects.map((project) => (
                <a
                  key={project.title}
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block group"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="text-white/80 text-sm font-medium group-hover:text-white transition-colors">
                        {project.title}
                      </h4>
                      <p className="text-white/40 text-xs mt-1">{project.desc}</p>
                    </div>
                    <ExternalLink className="w-3 h-3 text-white/20 group-hover:text-white/60 transition-colors" />
                  </div>
                  <div className="flex gap-2 mt-2">
                    {project.tech.map((t) => (
                      <span key={t} className="text-[10px] text-white/30 bg-white/5 px-2 py-0.5 rounded">
                        {t}
                      </span>
                    ))}
                  </div>
                </a>
              ))}
            </div>
          </BentoCard>

          {/* Experience */}
          <BentoCard className="md:col-span-1" delay={9}>
            <div className="flex flex-col h-full">
              <div className="p-2 bg-white/5 rounded-xl w-fit mb-3">
                <Briefcase className="w-4 h-4 text-white/60" />
              </div>
              <h3 className="text-white font-semibold text-sm mb-1">Past Work</h3>
              <p className="text-xs text-white/50">LearnQ.ai</p>
              <p className="text-[10px] text-white/30">Product Quality Intern</p>
            </div>
          </BentoCard>

          {/* Resume Download */}
          <BentoCard className="md:col-span-1 group cursor-pointer" delay={10}>
            <a href={RESUME_URL} target="_blank" rel="noopener noreferrer" className="flex flex-col h-full items-center justify-center text-center">
              <div className="p-3 bg-white/5 rounded-xl mb-3 group-hover:bg-white/10 transition-colors">
                <Download className="w-5 h-5 text-white/60 group-hover:text-white transition-colors" />
              </div>
              <span className="text-white/60 text-sm group-hover:text-white transition-colors">Download CV</span>
            </a>
          </BentoCard>

        </div>
      </div>
    </section>
  );
}
