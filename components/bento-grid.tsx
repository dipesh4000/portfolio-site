"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Github, ExternalLink, MapPin, GraduationCap, Briefcase, Code2, Database, Brain, Terminal, Download } from "lucide-react";
import { TechCube } from "./tech-cube";
import Image from "next/image";

const skills = [
  { name: "Python", level: 95 },
  { name: "Machine Learning", level: 85 },
  { name: "SQL & Databases", level: 90 },
  { name: "Computer Vision", level: 80 },
  { name: "FastAPI/Flask", level: 85 },
  { name: "Data Engineering", level: 82 },
];

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

function SkillBar({ name, level, delay }: { name: string; level: number; delay: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <div ref={ref} className="space-y-2">
      <div className="flex justify-between text-sm">
        <span className="text-white/70">{name}</span>
        <span className="text-white/40">{level}%</span>
      </div>
      <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-white rounded-full"
          initial={{ width: 0 }}
          animate={isInView ? { width: `${level}%` } : { width: 0 }}
          transition={{ duration: 1, delay: delay * 0.1, ease: "easeOut" }}
        />
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
          <BentoCard className="md:col-span-1" delay={4}>
            <div className="flex flex-col h-full">
              <div className="p-2 bg-white/5 rounded-xl w-fit mb-3">
                <GraduationCap className="w-4 h-4 text-white/60" />
              </div>
              <h3 className="text-white font-semibold text-sm mb-1">Education</h3>
              <p className="text-xs text-white/50">IIT Madras - B.S. Data Science</p>
              <p className="text-xs text-white/40">MSIT - B.Tech CS</p>
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

          {/* Skills with animated bars */}
          <BentoCard className="md:col-span-2 md:row-span-2" delay={6}>
            <h3 className="text-white font-semibold mb-6 flex items-center gap-2">
              <Brain className="w-4 h-4 text-white/60" />
              Skills
            </h3>
            <div className="space-y-4">
              {skills.map((skill, i) => (
                <SkillBar key={skill.name} name={skill.name} level={skill.level} delay={i} />
              ))}
            </div>
          </BentoCard>

          {/* Featured Projects */}
          <BentoCard className="md:col-span-2 md:row-span-2" delay={7}>
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
          <BentoCard className="md:col-span-1" delay={8}>
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
          <BentoCard className="md:col-span-1 group cursor-pointer" delay={9}>
            <a href="/resume.pdf" download className="flex flex-col h-full items-center justify-center text-center">
              <div className="p-3 bg-white/5 rounded-xl mb-3 group-hover:bg-white/10 transition-colors">
                <Download className="w-5 h-5 text-white/60 group-hover:text-white transition-colors" />
              </div>
              <span className="text-white/60 text-sm group-hover:text-white transition-colors">Download CV</span>
            </a>
          </BentoCard>

          {/* Positions */}
          <BentoCard className="md:col-span-2" delay={10}>
            <div className="flex items-start gap-4">
              <div className="p-2 bg-white/5 rounded-xl">
                <Database className="w-4 h-4 text-white/60" />
              </div>
              <div>
                <h3 className="text-white font-semibold text-sm mb-1">Leadership</h3>
                <p className="text-xs text-white/50">Deputy Head PR, Microsoft Student Chapter</p>
                <p className="text-xs text-white/50">Member, AI ML Dept, GeekRoom</p>
              </div>
            </div>
          </BentoCard>

        </div>
      </div>
    </section>
  );
}
