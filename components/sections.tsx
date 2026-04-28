"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Badge } from "@/components/ui/badge";
import {
  Briefcase,
  ExternalLink,
  Github,
  GraduationCap,
  Rocket,
  Server,
  Database,
  MessageSquare,
  ArrowUpRight,
  Sparkles,
} from "lucide-react";

function SectionWrapper({
  id,
  children,
  className = "",
}: {
  id: string;
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id={id}
      ref={ref}
      className={`py-20 md:py-32 px-4 sm:px-6 lg:px-8 ${className}`}
    >
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="max-w-6xl mx-auto"
      >
        {children}
      </motion.div>
    </section>
  );
}

function SectionTitle({ children, icon: Icon }: { children: React.ReactNode; icon?: typeof Sparkles }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="flex items-center justify-center gap-3 mb-12"
    >
      {Icon && <Icon className="w-8 h-8 text-foreground" />}
      <h2 className="text-3xl md:text-4xl font-bold text-foreground">
        {children}
      </h2>
    </motion.div>
  );
}

export function AboutSection() {
  const skills = {
    "ML & AI": ["Python", "scikit-learn", "YOLOv8", "PyTorch", "Pandas", "NumPy"],
    "Backend & APIs": ["FastAPI", "Flask", "PostgreSQL", "MongoDB", "Docker", "SQLAlchemy"],
    "Data Engineering": ["ETL Pipelines", "Medallion Architecture", "SQL", "Git"],
  };

  return (
    <SectionWrapper id="about">
      <SectionTitle icon={Sparkles}>About Me</SectionTitle>
      <div className="grid lg:grid-cols-5 gap-12 items-start">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="lg:col-span-3 space-y-6"
        >
          <p className="text-xl text-foreground leading-relaxed">
            {"I'm a Data Science + CS student pursuing a dual degree at "}
            <span className="font-bold underline decoration-2 underline-offset-4">IIT Madras</span>
            {" and "}
            <span className="font-bold underline decoration-2 underline-offset-4">MSIT</span>
            {", building production-grade ML pipelines, data warehouses, and FastAPI backends."}
          </p>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex flex-wrap items-center gap-3"
          >
            <Badge className="bg-foreground text-background hover:bg-foreground/90 px-4 py-2 text-sm">
              Currently at LearnQ.ai
            </Badge>
            <Badge variant="outline" className="border-foreground/40 px-4 py-2 text-sm">
              Open to Roles
            </Badge>
          </motion.div>
          <p className="text-muted-foreground leading-relaxed text-lg">
            {"My work spans machine learning pipelines, deep learning models, and scalable backend architectures. I focus on turning complex data into actionable insights and deploying models that make a real difference."}
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="lg:col-span-2 space-y-6"
        >
          {Object.entries(skills).map(([category, skillList], catIndex) => (
            <div key={category}>
              <h4 className="text-sm font-bold text-foreground mb-3 uppercase tracking-wider">{category}</h4>
              <div className="flex flex-wrap gap-2">
                {skillList.map((skill, index) => (
                  <motion.div
                    key={skill}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: catIndex * 0.1 + index * 0.03 }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.05, y: -2 }}
                  >
                    <Badge
                      variant="secondary"
                      className="text-sm px-3 py-1.5 bg-muted hover:bg-foreground hover:text-background transition-all cursor-default"
                    >
                      {skill}
                    </Badge>
                  </motion.div>
                ))}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </SectionWrapper>
  );
}

export function ProjectsSection() {
  const projects = [
    {
      title: "Spacestation Object Detection",
      description:
        "YOLOv8 object detection model trained on synthetic space station imagery and validated on real NASA datasets. Multi-class detection with precision/recall benchmarking.",
      tags: ["Python", "YOLOv8", "Computer Vision", "Synthetic Data"],
      icon: Rocket,
      featured: true,
      github: "https://github.com/dipesh4000/Spacestation_objects_detection_duality",
    },
    {
      title: "End-to-End ML Pipeline + FastAPI",
      description:
        "Full pipeline (ingest, clean, train, evaluate, serve) with FastAPI REST endpoint, PostgreSQL inference logging, containerised with Docker.",
      tags: ["scikit-learn", "FastAPI", "PostgreSQL", "Docker"],
      icon: Server,
      github: "https://github.com/dipesh4000/Database_Projects",
    },
    {
      title: "SQL Data Warehouse",
      description:
        "Medallion Architecture (Bronze/Silver/Gold) with progressive data cleaning, schema standardisation, and feature-ready Gold tables for ML.",
      tags: ["PostgreSQL", "ETL", "Python", "Data Engineering"],
      icon: Database,
      github: "https://github.com/dipesh4000/Database_Projects",
    },
    {
      title: "Reddit-like REST API",
      description:
        "Full-featured REST API with JWT authentication, role-based access control, owner-only edit/delete, and secure password hashing with Argon2.",
      tags: ["FastAPI", "PostgreSQL", "JWT", "Argon2"],
      icon: MessageSquare,
      github: "https://github.com/dipesh4000/redditAPI",
    },
  ];

  return (
    <SectionWrapper id="projects" className="bg-muted/30">
      <SectionTitle icon={Rocket}>Projects</SectionTitle>
      <div className="grid md:grid-cols-2 gap-6">
        {projects.map((project, index) => (
          <motion.div
            key={project.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            viewport={{ once: true }}
            whileHover={{ y: -8 }}
            className="group"
          >
            <div className="h-full bg-background border border-border rounded-2xl p-6 hover:border-foreground/40 transition-all hover:shadow-2xl relative overflow-hidden">
              {/* Hover gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-foreground/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              
              <div className="relative z-10">
                <div className="flex items-start justify-between gap-3 mb-4">
                  <div className="flex items-center gap-3">
                    <motion.div
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.5 }}
                      className="p-3 rounded-xl bg-muted text-foreground group-hover:bg-foreground group-hover:text-background transition-colors"
                    >
                      <project.icon className="w-5 h-5" />
                    </motion.div>
                    <div>
                      <h3 className="text-lg font-bold text-foreground">{project.title}</h3>
                      {project.featured && (
                        <Badge className="mt-1 bg-foreground text-background text-xs">
                          Featured
                        </Badge>
                      )}
                    </div>
                  </div>
                  <motion.a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                  >
                    <Github className="w-5 h-5" />
                  </motion.a>
                </div>
                <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <Badge
                      key={tag}
                      variant="outline"
                      className="text-xs border-border"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  );
}

export function ExperienceSection() {
  const experiences = [
    {
      title: "Product Quality Intern",
      company: "LearnQ.ai",
      period: "Oct - Dec 2025",
      description:
        "ML validation, data quality pipelines, and ensuring model performance meets production standards.",
    },
    {
      title: "Implementation Intern",
      company: "LearnQ.ai",
      period: "Apr - Jun 2025",
      description:
        "Technical documentation, data workflows, and supporting ML implementation processes.",
    },
  ];

  const education = [
    {
      degree: "B.S. Data Science & Applications",
      school: "IIT Madras",
      period: "2024 - 2028",
      gpa: "7.80",
    },
    {
      degree: "B.Tech Computer Science",
      school: "MSIT",
      period: "2024 - 2028",
      gpa: "8.25",
    },
  ];

  const roles = [
    "Deputy Head PR & Sponsorship, Microsoft Student Chapter, MSIT",
    "Member AI/ML Dept, GeekRoom, MSIT",
  ];

  return (
    <SectionWrapper id="experience">
      <SectionTitle icon={Briefcase}>Experience & Education</SectionTitle>

      <div className="grid lg:grid-cols-2 gap-12">
        {/* Experience */}
        <div>
          <h3 className="text-xl font-bold text-foreground mb-8 flex items-center gap-2">
            <Briefcase className="w-5 h-5" /> Experience
          </h3>
          <div className="space-y-8">
            {experiences.map((exp, index) => (
              <motion.div
                key={exp.title}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="relative pl-8 border-l-2 border-foreground/20 hover:border-foreground transition-colors group"
              >
                <motion.div
                  className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-foreground"
                  whileHover={{ scale: 1.5 }}
                />
                <div className="space-y-2">
                  <h4 className="text-lg font-bold text-foreground">
                    {exp.title}
                  </h4>
                  <p className="text-foreground font-medium">{exp.company}</p>
                  <p className="text-sm text-muted-foreground">{exp.period}</p>
                  <p className="text-muted-foreground text-sm">{exp.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Education */}
        <div>
          <h3 className="text-xl font-bold text-foreground mb-8 flex items-center gap-2">
            <GraduationCap className="w-5 h-5" /> Education
          </h3>
          <div className="space-y-8">
            {education.map((edu, index) => (
              <motion.div
                key={edu.school}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="relative pl-8 border-l-2 border-foreground/20 hover:border-foreground transition-colors group"
              >
                <motion.div
                  className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-foreground"
                  whileHover={{ scale: 1.5 }}
                />
                <div className="space-y-2">
                  <h4 className="text-lg font-bold text-foreground">
                    {edu.degree}
                  </h4>
                  <p className="text-foreground font-medium">{edu.school}</p>
                  <p className="text-sm text-muted-foreground">{edu.period}</p>
                  <Badge className="mt-2 bg-foreground text-background">
                    GPA: {edu.gpa}
                  </Badge>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Roles */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-10 p-6 bg-muted/50 rounded-2xl"
          >
            <h4 className="text-sm font-bold text-foreground mb-4 uppercase tracking-wider">
              Leadership Roles
            </h4>
            <ul className="space-y-3">
              {roles.map((role) => (
                <li
                  key={role}
                  className="text-sm text-muted-foreground flex items-start gap-3"
                >
                  <span className="w-2 h-2 rounded-full bg-foreground mt-1.5 flex-shrink-0" />
                  {role}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </SectionWrapper>
  );
}

export function ContactSection() {
  return (
    <SectionWrapper id="contact" className="bg-muted/30">
      <div className="max-w-3xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="space-y-8"
        >
          <h2 className="text-4xl md:text-6xl font-bold text-foreground">
            {"Let's Build"}
            <br />
            <span className="italic font-light">Something Great</span>
          </h2>
          <p className="text-xl text-muted-foreground leading-relaxed max-w-xl mx-auto">
            {
              "Open to Junior ML Engineer, Data Scientist, MLOps Engineer, or Backend roles. Let's connect!"
            }
          </p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <motion.a
              href="mailto:dipeshkumar0853822@gmail.com"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2 px-10 py-5 bg-foreground text-background rounded-full font-bold text-lg hover:bg-foreground/90 transition-colors"
            >
              Say Hello
              <ArrowUpRight className="w-5 h-5" />
            </motion.a>
            <motion.a
              href="https://linkedin.com/in/dipesh4000"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2 px-10 py-5 border-2 border-foreground text-foreground rounded-full font-bold text-lg hover:bg-foreground hover:text-background transition-all"
            >
              LinkedIn
              <ExternalLink className="w-5 h-5" />
            </motion.a>
          </motion.div>
        </motion.div>
      </div>
    </SectionWrapper>
  );
}
