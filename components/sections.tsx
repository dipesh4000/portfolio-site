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
  ArrowUpRight,
  Sparkles,
  MapPin,
  Mail,
  User,
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
      className={`py-24 md:py-32 px-4 sm:px-6 lg:px-8 ${className}`}
    >
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="max-w-7xl mx-auto"
      >
        {children}
      </motion.div>
    </section>
  );
}

function GradientBadge({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <span className={`px-4 py-2 rounded-full text-sm font-medium glass text-white/80 ${className}`}>
      {children}
    </span>
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
        className="text-center mb-16"
      >
        <motion.div
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6"
        >
          <User className="w-5 h-5 text-cyan-400" />
          <span className="text-sm font-medium text-white/80">About Me</span>
        </motion.div>
        <h2 className="text-4xl md:text-6xl font-black text-white mb-4">
          Who I <span className="gradient-text">Am</span>
        </h2>
      </motion.div>

      <div className="grid lg:grid-cols-5 gap-12 items-start">
        {/* Left: Profile & Description */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="lg:col-span-3 space-y-8"
        >
          {/* Profile placeholder - user will add their photo */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="relative w-48 h-48 mx-auto lg:mx-0 rounded-3xl glass-strong overflow-hidden group"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-pink-500/20" />
            <div className="absolute inset-0 flex items-center justify-center">
              <Sparkles className="w-16 h-16 text-white/30" />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center pb-4">
              <span className="text-xs text-white/70">Add your photo</span>
            </div>
          </motion.div>

          <div className="space-y-6">
            <p className="text-xl md:text-2xl text-white leading-relaxed">
              {"I'm a Data Science + CS student pursuing a dual degree at "}
              <span className="font-bold gradient-text">IIT Madras</span>
              {" and "}
              <span className="font-bold gradient-text">MSIT</span>
              {", building production-grade ML pipelines, data warehouses, and FastAPI backends."}
            </p>

            <div className="flex flex-wrap items-center gap-3">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="px-5 py-2.5 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold text-sm"
              >
                Currently at LearnQ.ai
              </motion.div>
              <GradientBadge>Open to Roles</GradientBadge>
            </div>

            <div className="flex flex-wrap gap-4 text-white/60 text-sm">
              <span className="flex items-center gap-2">
                <MapPin className="w-4 h-4" /> India
              </span>
              <span className="flex items-center gap-2">
                <Mail className="w-4 h-4" /> dipeshkumar4036@gmail.com
              </span>
            </div>

            <p className="text-white/70 leading-relaxed text-lg">
              {"My work spans machine learning pipelines, deep learning models, and scalable backend architectures. I focus on turning complex data into actionable insights and deploying models that make a real difference."}
            </p>
          </div>
        </motion.div>

        {/* Right: Skills */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="lg:col-span-2 space-y-8"
        >
          {Object.entries(skills).map(([category, skillList], catIndex) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: catIndex * 0.1 }}
              viewport={{ once: true }}
              className="glass-strong rounded-2xl p-6"
            >
              <h4 className="text-sm font-bold text-white/60 mb-4 uppercase tracking-wider">{category}</h4>
              <div className="flex flex-wrap gap-2">
                {skillList.map((skill, index) => (
                  <motion.span
                    key={skill}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: catIndex * 0.1 + index * 0.03 }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.1, y: -2 }}
                    className="px-3 py-1.5 rounded-lg text-sm font-medium bg-white/10 text-white/80 hover:bg-gradient-to-r hover:from-purple-500/30 hover:to-pink-500/30 transition-all cursor-default"
                  >
                    {skill}
                  </motion.span>
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
      gradient: "from-purple-500 to-pink-500",
    },
    {
      title: "End-to-End ML Pipeline + FastAPI",
      description:
        "Full pipeline (ingest, clean, train, evaluate, serve) with FastAPI REST endpoint, PostgreSQL inference logging, containerised with Docker.",
      tags: ["scikit-learn", "FastAPI", "PostgreSQL", "Docker"],
      icon: Server,
      github: "https://github.com/dipesh4000/Database_Projects",
      gradient: "from-cyan-500 to-blue-500",
    },
    {
      title: "SQL Data Warehouse",
      description:
        "Medallion Architecture (Bronze/Silver/Gold) with progressive data cleaning, schema standardisation, and feature-ready Gold tables for ML.",
      tags: ["PostgreSQL", "ETL", "Python", "Data Engineering"],
      icon: Database,
      github: "https://github.com/dipesh4000/Database_Projects",
      gradient: "from-emerald-500 to-teal-500",
    },
    {
      title: "Reddit-like REST API",
      description:
        "Full-featured REST API with JWT authentication, role-based access control, owner-only edit/delete, and secure password hashing with Argon2.",
      tags: ["FastAPI", "PostgreSQL", "JWT", "Argon2"],
      icon: MessageSquare,
      github: "https://github.com/dipesh4000/redditAPI",
      gradient: "from-orange-500 to-red-500",
    },
  ];

  return (
    <SectionWrapper id="projects">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <motion.div
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6"
        >
          <Rocket className="w-5 h-5 text-pink-400" />
          <span className="text-sm font-medium text-white/80">My Work</span>
        </motion.div>
        <h2 className="text-4xl md:text-6xl font-black text-white mb-4">
          Featured <span className="gradient-text">Projects</span>
        </h2>
        <p className="text-lg text-white/60 max-w-2xl mx-auto">
          From computer vision to backend APIs - here are some things I&apos;ve built
        </p>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-6">
        {projects.map((project, index) => (
          <motion.div
            key={project.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            viewport={{ once: true }}
            whileHover={{ y: -8, scale: 1.02 }}
            className="group relative"
          >
            {/* Glow effect */}
            <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} rounded-3xl blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-500`} />
            
            <div className="relative h-full glass-strong rounded-3xl p-8 hover:border-white/20 transition-all overflow-hidden">
              {/* Gradient line */}
              <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${project.gradient}`} />
              
              <div className="relative z-10">
                <div className="flex items-start justify-between gap-4 mb-6">
                  <div className="flex items-center gap-4">
                    <motion.div
                      whileHover={{ rotate: 360, scale: 1.1 }}
                      transition={{ duration: 0.5 }}
                      className={`p-4 rounded-2xl bg-gradient-to-br ${project.gradient}`}
                    >
                      <project.icon className="w-6 h-6 text-white" />
                    </motion.div>
                    <div>
                      <h3 className="text-xl font-bold text-white">{project.title}</h3>
                      {project.featured && (
                        <span className="inline-block mt-1 px-3 py-1 rounded-full bg-gradient-to-r from-yellow-500/20 to-orange-500/20 text-yellow-400 text-xs font-medium">
                          Featured
                        </span>
                      )}
                    </div>
                  </div>
                  <motion.a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.2, rotate: 10 }}
                    whileTap={{ scale: 0.9 }}
                    className="p-3 rounded-xl glass text-white/60 hover:text-white transition-colors"
                  >
                    <Github className="w-5 h-5" />
                  </motion.a>
                </div>
                
                <p className="text-white/70 text-sm leading-relaxed mb-6">
                  {project.description}
                </p>
                
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 rounded-lg text-xs font-medium bg-white/5 text-white/60 border border-white/10"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* GitHub CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mt-12"
      >
        <motion.a
          href="https://github.com/dipesh4036"
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl glass text-white font-semibold hover:bg-white/10 transition-colors"
        >
          <Github className="w-5 h-5" />
          View All on GitHub
          <ExternalLink className="w-4 h-4" />
        </motion.a>
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
      color: "from-purple-500 to-pink-500",
    },
    {
      title: "Implementation Intern",
      company: "LearnQ.ai",
      period: "Apr - Jun 2025",
      description:
        "Technical documentation, data workflows, and supporting ML implementation processes.",
      color: "from-cyan-500 to-blue-500",
    },
  ];

  const education = [
    {
      degree: "B.S. Data Science & Applications",
      school: "IIT Madras",
      period: "2024 - 2028",
      gpa: "7.80",
      color: "from-purple-500 to-pink-500",
    },
    {
      degree: "B.Tech Computer Science",
      school: "MSIT",
      period: "2024 - 2028",
      gpa: "8.25",
      color: "from-cyan-500 to-blue-500",
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
        className="text-center mb-16"
      >
        <motion.div
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6"
        >
          <Briefcase className="w-5 h-5 text-emerald-400" />
          <span className="text-sm font-medium text-white/80">Journey</span>
        </motion.div>
        <h2 className="text-4xl md:text-6xl font-black text-white mb-4">
          Experience & <span className="gradient-text-blue">Education</span>
        </h2>
      </motion.div>

      <div className="grid lg:grid-cols-2 gap-12">
        {/* Experience */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="glass-strong rounded-3xl p-8"
        >
          <h3 className="text-xl font-bold text-white mb-8 flex items-center gap-3">
            <Briefcase className="w-6 h-6 text-purple-400" />
            Work Experience
          </h3>
          <div className="space-y-8">
            {experiences.map((exp, index) => (
              <motion.div
                key={exp.title}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="relative pl-8 group"
              >
                <div className={`absolute left-0 top-0 bottom-0 w-1 rounded-full bg-gradient-to-b ${exp.color}`} />
                <motion.div
                  whileHover={{ scale: 1.5 }}
                  className={`absolute -left-1.5 top-1 w-4 h-4 rounded-full bg-gradient-to-br ${exp.color}`}
                />
                <div className="space-y-2">
                  <h4 className="text-lg font-bold text-white">{exp.title}</h4>
                  <p className="text-white/80 font-medium">{exp.company}</p>
                  <p className="text-sm text-white/50">{exp.period}</p>
                  <p className="text-white/60 text-sm leading-relaxed">{exp.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Education */}
        <div className="space-y-8">
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass-strong rounded-3xl p-8"
          >
            <h3 className="text-xl font-bold text-white mb-8 flex items-center gap-3">
              <GraduationCap className="w-6 h-6 text-cyan-400" />
              Education
            </h3>
            <div className="space-y-8">
              {education.map((edu, index) => (
                <motion.div
                  key={edu.school}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="relative pl-8 group"
                >
                  <div className={`absolute left-0 top-0 bottom-0 w-1 rounded-full bg-gradient-to-b ${edu.color}`} />
                  <motion.div
                    whileHover={{ scale: 1.5 }}
                    className={`absolute -left-1.5 top-1 w-4 h-4 rounded-full bg-gradient-to-br ${edu.color}`}
                  />
                  <div className="space-y-2">
                    <h4 className="text-lg font-bold text-white">{edu.degree}</h4>
                    <p className="text-white/80 font-medium">{edu.school}</p>
                    <p className="text-sm text-white/50">{edu.period}</p>
                    <span className={`inline-block mt-2 px-4 py-1.5 rounded-full text-sm font-bold bg-gradient-to-r ${edu.color} text-white`}>
                      GPA: {edu.gpa}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Leadership */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-strong rounded-3xl p-8"
          >
            <h4 className="text-sm font-bold text-white/60 mb-4 uppercase tracking-wider">
              Leadership Roles
            </h4>
            <ul className="space-y-4">
              {roles.map((role) => (
                <li key={role} className="text-sm text-white/80 flex items-start gap-3">
                  <span className="w-2 h-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 mt-1.5 flex-shrink-0" />
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
      <div className="max-w-4xl mx-auto text-center relative">
        {/* Background glow */}
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-cyan-500/10 rounded-3xl blur-3xl" />
        
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative glass-strong rounded-3xl p-12 md:p-16"
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-8"
          >
            <Mail className="w-5 h-5 text-pink-400" />
            <span className="text-sm font-medium text-white/80">Get In Touch</span>
          </motion.div>

          <h2 className="text-4xl md:text-6xl font-black text-white mb-4">
            {"Let's Build"}
          </h2>
          <h2 className="text-4xl md:text-6xl font-light italic text-white/80 mb-8">
            Something <span className="gradient-text">Amazing</span>
          </h2>
          
          <p className="text-xl text-white/60 leading-relaxed max-w-xl mx-auto mb-10">
            Open to Junior ML Engineer, Data Scientist, MLOps Engineer, or Backend roles. Let&apos;s connect and create something extraordinary together!
          </p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <motion.a
              href="mailto:dipeshkumar4036@gmail.com"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-2xl font-bold text-lg shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50 transition-shadow"
            >
              Say Hello
              <ArrowUpRight className="w-5 h-5" />
            </motion.a>
            <motion.a
              href="https://www.linkedin.com/in/dipeshkumar4000/"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-3 px-10 py-5 glass text-white rounded-2xl font-bold text-lg hover:bg-white/10 transition-colors"
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
