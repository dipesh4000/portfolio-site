"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Github, ExternalLink, MapPin, GraduationCap, Briefcase, Code2, Database, Brain, Terminal } from "lucide-react";
import { TechCube } from "./tech-cube";

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
          
          {/* Bio card - large */}
          <BentoCard className="md:col-span-2 md:row-span-2" delay={0}>
            <div className="h-full flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 text-white/40 text-sm mb-4">
                  <MapPin className="w-4 h-4" />
                  <span>Noida, India</span>
                </div>
                <p className="text-white/70 leading-relaxed">
                  ML Engineer with hands-on experience in computer vision, model training, and production ML systems. 
                  Strong foundation in Python, SQL, and data engineering with practical expertise in YOLOv8, 
                  feature engineering, and ETL workflows.
                </p>
              </div>
              <div className="flex flex-wrap gap-2 mt-4">
                {["Open Source", "ML Systems", "Data Pipelines"].map((tag) => (
                  <span key={tag} className="px-3 py-1 bg-white/5 rounded-full text-xs text-white/50">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </BentoCard>

          {/* 3D Tech Cube */}
          <BentoCard className="md:col-span-2 md:row-span-2 flex items-center justify-center" delay={1}>
            <TechCube />
          </BentoCard>

          {/* Education */}
          <BentoCard className="md:col-span-2" delay={2}>
            <div className="flex items-start gap-4">
              <div className="p-3 bg-white/5 rounded-xl">
                <GraduationCap className="w-5 h-5 text-white/60" />
              </div>
              <div>
                <h3 className="text-white font-semibold mb-1">Education</h3>
                <p className="text-sm text-white/50">IIT Madras - B.S. Data Science</p>
                <p className="text-sm text-white/50">MSIT - B.Tech CS (CGPA: 7.80/8.25)</p>
              </div>
            </div>
          </BentoCard>

          {/* Current Status */}
          <BentoCard className="md:col-span-2" delay={3}>
            <div className="flex items-start gap-4">
              <div className="p-3 bg-white/5 rounded-xl">
                <Code2 className="w-5 h-5 text-white/60" />
              </div>
              <div>
                <h3 className="text-white font-semibold mb-1">Currently</h3>
                <p className="text-sm text-white/50">Contributing to Open Source</p>
                <p className="text-sm text-white/50">Building ML projects</p>
              </div>
            </div>
          </BentoCard>

          {/* Skills with animated bars */}
          <BentoCard className="md:col-span-2 md:row-span-2" delay={4}>
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
          <BentoCard className="md:col-span-2 md:row-span-2" delay={5}>
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
          <BentoCard className="md:col-span-2" delay={6}>
            <div className="flex items-start gap-4">
              <div className="p-3 bg-white/5 rounded-xl">
                <Briefcase className="w-5 h-5 text-white/60" />
              </div>
              <div>
                <h3 className="text-white font-semibold mb-1">Past Experience</h3>
                <p className="text-sm text-white/50">LearnQ.ai - Product Quality Intern</p>
                <p className="text-xs text-white/30">Oct 2025 - Dec 2025</p>
              </div>
            </div>
          </BentoCard>

          {/* Positions */}
          <BentoCard className="md:col-span-2" delay={7}>
            <div className="flex items-start gap-4">
              <div className="p-3 bg-white/5 rounded-xl">
                <Database className="w-5 h-5 text-white/60" />
              </div>
              <div>
                <h3 className="text-white font-semibold mb-1">Leadership</h3>
                <p className="text-sm text-white/50">Deputy Head PR, Microsoft Student Chapter</p>
                <p className="text-sm text-white/50">Member, AI ML Dept, GeekRoom</p>
              </div>
            </div>
          </BentoCard>

        </div>
      </div>
    </section>
  );
}
