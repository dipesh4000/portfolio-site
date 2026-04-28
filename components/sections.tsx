"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  Briefcase,
  ExternalLink,
  Github,
  GraduationCap,
  Rocket,
  Server,
  Database,
  MessageSquare,
  MapPin,
  Mail,
  User,
  ArrowRight,
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
      className={`py-20 md:py-28 px-4 sm:px-6 lg:px-8 ${className}`}
      style={{ backgroundColor: "#0a0a0a" }}
    >
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="max-w-6xl mx-auto"
      >
        {children}
      </motion.div>
    </section>
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
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-12"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 mb-4">
          <User className="w-4 h-4 text-purple-400" />
          <span className="text-sm text-white/60">About Me</span>
        </div>
        <h2 className="text-3xl md:text-5xl font-bold text-white">
          Who I Am
        </h2>
      </motion.div>

      <div className="grid lg:grid-cols-5 gap-10 items-start">
        {/* Left: Profile & Description */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="lg:col-span-3 space-y-6"
        >
          {/* Profile placeholder */}
          <div className="relative w-40 h-40 mx-auto lg:mx-0 rounded-2xl bg-white/5 border border-white/10 overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center text-white/20">
              <User className="w-16 h-16" />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end justify-center pb-3 opacity-0 hover:opacity-100 transition-opacity">
              <span className="text-xs text-white/60">Add photo</span>
            </div>
          </div>

          <div className="space-y-4">
            <p className="text-lg md:text-xl text-white/90 leading-relaxed">
              {"I'm a Data Science + CS student pursuing a dual degree at "}
              <span className="font-semibold text-purple-400">IIT Madras</span>
              {" and "}
              <span className="font-semibold text-purple-400">MSIT</span>
              {", building production-grade ML pipelines, data warehouses, and FastAPI backends."}
            </p>

            <div className="flex flex-wrap items-center gap-3">
              <span className="px-4 py-2 rounded-full bg-purple-600 text-white text-sm font-medium">
                Currently at LearnQ.ai
              </span>
              <span className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-white/70 text-sm">
                Open to Roles
              </span>
            </div>

            <div className="flex flex-wrap gap-4 text-white/50 text-sm">
              <span className="flex items-center gap-2">
                <MapPin className="w-4 h-4" /> India
              </span>
              <span className="flex items-center gap-2">
                <Mail className="w-4 h-4" /> dipeshkumar4036@gmail.com
              </span>
            </div>

            <p className="text-white/60 leading-relaxed">
              {"My work spans machine learning pipelines, deep learning models, and scalable backend architectures. I focus on turning complex data into actionable insights and deploying models that make a real difference."}
            </p>
          </div>
        </motion.div>

        {/* Right: Skills */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="lg:col-span-2 space-y-6"
        >
          {Object.entries(skills).map(([category, skillList], catIndex) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: catIndex * 0.1 }}
              viewport={{ once: true }}
              className="p-5 rounded-2xl bg-white/5 border border-white/10"
            >
              <h4 className="text-xs font-semibold text-white/50 mb-3 uppercase tracking-wider">{category}</h4>
              <div className="flex flex-wrap gap-2">
                {skillList.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1 rounded-lg text-sm bg-white/5 text-white/70 hover:bg-purple-500/20 hover:text-purple-300 transition-colors"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
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
    <SectionWrapper id="projects">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-12"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 mb-4">
          <Rocket className="w-4 h-4 text-pink-400" />
          <span className="text-sm text-white/60">My Work</span>
        </div>
        <h2 className="text-3xl md:text-5xl font-bold text-white mb-3">
          Featured Projects
        </h2>
        <p className="text-white/50 max-w-xl mx-auto">
          From computer vision to backend APIs - here are some things I&apos;ve built
        </p>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-5">
        {projects.map((project, index) => (
          <motion.div
            key={project.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            viewport={{ once: true }}
            className="group p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/[0.07] hover:border-white/15 transition-all"
          >
            <div className="flex items-start justify-between gap-4 mb-4">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-xl bg-purple-500/20">
                  <project.icon className="w-5 h-5 text-purple-400" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">{project.title}</h3>
                  {project.featured && (
                    <span className="inline-block mt-1 px-2 py-0.5 rounded text-xs font-medium bg-yellow-500/20 text-yellow-400">
                      Featured
                    </span>
                  )}
                </div>
              </div>
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-white/5 text-white/50 hover:text-white hover:bg-white/10 transition-colors"
              >
                <Github className="w-5 h-5" />
              </a>
            </div>
            
            <p className="text-white/60 text-sm leading-relaxed mb-4">
              {project.description}
            </p>
            
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-1 rounded text-xs bg-white/5 text-white/50"
                >
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      {/* GitHub CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mt-10"
      >
        <a
          href="https://github.com/dipesh4036"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white/5 border border-white/10 text-white font-medium hover:bg-white/10 transition-colors"
        >
          <Github className="w-5 h-5" />
          View All on GitHub
          <ExternalLink className="w-4 h-4" />
        </a>
      </motion.div>
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
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-12"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 mb-4">
          <Briefcase className="w-4 h-4 text-emerald-400" />
          <span className="text-sm text-white/60">Journey</span>
        </div>
        <h2 className="text-3xl md:text-5xl font-bold text-white">
          Experience & Education
        </h2>
      </motion.div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Experience */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="p-6 rounded-2xl bg-white/5 border border-white/10"
        >
          <h3 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
            <Briefcase className="w-5 h-5 text-purple-400" />
            Work Experience
          </h3>
          <div className="space-y-6">
            {experiences.map((exp, index) => (
              <motion.div
                key={exp.title}
                initial={{ opacity: 0, x: -15 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="relative pl-6 border-l-2 border-purple-500/30"
              >
                <div className="absolute -left-[5px] top-1 w-2 h-2 rounded-full bg-purple-500" />
                <h4 className="font-semibold text-white">{exp.title}</h4>
                <p className="text-white/70 text-sm">{exp.company}</p>
                <p className="text-white/40 text-xs mt-1">{exp.period}</p>
                <p className="text-white/50 text-sm mt-2">{exp.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Education & Roles */}
        <div className="space-y-6">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="p-6 rounded-2xl bg-white/5 border border-white/10"
          >
            <h3 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
              <GraduationCap className="w-5 h-5 text-cyan-400" />
              Education
            </h3>
            <div className="space-y-6">
              {education.map((edu, index) => (
                <motion.div
                  key={edu.school}
                  initial={{ opacity: 0, x: 15 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="relative pl-6 border-l-2 border-cyan-500/30"
                >
                  <div className="absolute -left-[5px] top-1 w-2 h-2 rounded-full bg-cyan-500" />
                  <h4 className="font-semibold text-white">{edu.degree}</h4>
                  <p className="text-white/70 text-sm">{edu.school}</p>
                  <p className="text-white/40 text-xs mt-1">{edu.period}</p>
                  <span className="inline-block mt-2 px-3 py-1 rounded-full text-xs font-semibold bg-purple-500/20 text-purple-300">
                    GPA: {edu.gpa}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Leadership */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="p-6 rounded-2xl bg-white/5 border border-white/10"
          >
            <h4 className="text-xs font-semibold text-white/50 mb-4 uppercase tracking-wider">
              Leadership Roles
            </h4>
            <ul className="space-y-3">
              {roles.map((role) => (
                <li key={role} className="text-sm text-white/70 flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-500 mt-1.5 flex-shrink-0" />
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
    <SectionWrapper id="contact">
      <div className="max-w-3xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="space-y-6"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10">
            <Mail className="w-4 h-4 text-purple-400" />
            <span className="text-sm text-white/60">Get in Touch</span>
          </div>
          
          <h2 className="text-3xl md:text-5xl font-bold text-white">
            {"Let's Work Together"}
          </h2>
          
          <p className="text-white/50 text-lg max-w-xl mx-auto">
            {"I'm open to internships, collaborations, and interesting ML projects. Feel free to reach out!"}
          </p>
          
          <div className="flex flex-wrap justify-center gap-4 pt-4">
            <motion.a
              href="mailto:dipeshkumar4036@gmail.com"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-semibold transition-colors"
            >
              <Mail className="w-5 h-5" />
              Send Email
              <ArrowRight className="w-4 h-4" />
            </motion.a>
            
            <motion.a
              href="https://www.linkedin.com/in/dipeshkumar4000/"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-white/5 border border-white/10 text-white font-semibold hover:bg-white/10 transition-colors"
            >
              Connect on LinkedIn
              <ExternalLink className="w-4 h-4" />
            </motion.a>
          </div>

          <p className="text-white/30 text-sm pt-6">
            dipeshkumar4036@gmail.com
          </p>
        </motion.div>
      </div>
    </SectionWrapper>
  );
}
