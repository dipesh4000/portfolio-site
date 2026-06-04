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
  ArrowRight,
  Code2,
  Star,
  Award,
} from "lucide-react";

function SectionWrapper({
  id,
  variant = "surface",
  children,
}: {
  id: string;
  variant?: "surface" | "surface-alt";
  children: React.ReactNode;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const bg = variant === "surface-alt" ? "#0c0c0c" : "#0a0a0a";

  return (
    <section
      id={id}
      ref={ref}
      className="px-4 py-20 sm:px-6 lg:py-24"
      style={{ backgroundColor: bg }}
    >
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="mx-auto max-w-6xl"
      >
        {children}
      </motion.div>
    </section>
  );
}

export function ProjectsSection() {
  const projects = [
    {
      title: "Spacestation Object Detection",
      description:
        "Trained YOLOv8 model for multi-class object detection on synthetic and real space imagery with production inference pipeline. Implemented data augmentation and precision-recall analysis.",
      tags: ["YOLOv8", "Python", "Computer Vision", "Deep Learning"],
      icon: Rocket,
      featured: true,
      github: "https://github.com/dipesh4000/Spacestation_objects_detection_duality",
    },
    {
      title: "SQL Data Warehouse",
      description:
        "Designed Bronze-Silver-Gold data warehouse (Medallion architecture) with ETL pipelines transforming raw data into analytics-ready star schema with data validation.",
      tags: ["PostgreSQL", "ETL", "Medallion", "Data Engineering"],
      icon: Database,
      github: "https://github.com/dipesh4000/Database_Projects/tree/main/sql-data-warehouse",
    },
    {
      title: "FastAPI CRUD Application",
      description:
        "Built production RESTful API with FastAPI, PostgreSQL, and Pydantic validation demonstrating clean architecture best practices.",
      tags: ["FastAPI", "PostgreSQL", "Pydantic", "REST API"],
      icon: Server,
      github: "https://github.com/dipesh4000/Database_Projects/tree/main/fastapi-crud-app",
    },
    {
      title: "Reddit-like REST API",
      description:
        "Full-featured REST API with JWT authentication, role-based access control, owner-only edit/delete, and secure password hashing.",
      tags: ["FastAPI", "JWT", "PostgreSQL", "Auth"],
      icon: MessageSquare,
      github: "https://github.com/dipesh4000/redditAPI",
    },
  ];

  return (
    <SectionWrapper id="projects">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-10 sm:mb-14"
      >
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Projects</h2>
        <p className="text-white/40 text-lg">Things I&apos;ve built</p>
      </motion.div>

      <div className="grid gap-4 md:grid-cols-2 lg:gap-6">
        {projects.map((project, index) => (
          <motion.a
            key={project.title}
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            viewport={{ once: true }}
            className="group block rounded-2xl border border-white/5 bg-[#111111] p-5 transition-all hover:border-teal-500/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-400/35 sm:p-6"
          >
            <div className="flex items-start justify-between gap-4 mb-4">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-xl bg-white/5">
                  <project.icon className="w-5 h-5 text-white/60" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white group-hover:text-white/90">{project.title}</h3>
                  {project.featured && (
                    <span className="inline-block mt-1 px-2 py-0.5 rounded text-[10px] font-medium bg-white/10 text-white/60">
                      Featured
                    </span>
                  )}
                </div>
              </div>
              <Github className="w-5 h-5 text-white/20 group-hover:text-white/60 transition-colors" />
            </div>

            <p className="text-white/50 text-sm leading-relaxed mb-4">
              {project.description}
            </p>

            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span key={tag} className="px-2 py-1 rounded text-xs bg-white/5 text-white/40">
                  {tag}
                </span>
              ))}
            </div>
          </motion.a>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mt-12"
      >
        <a
          href="https://github.com/dipesh4000"
          target="_blank"
          rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm text-white/40 hover:text-teal-300/90 transition-colors border-b border-white/20 hover:border-teal-400/50 pb-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-400/40 focus-visible:rounded-sm"
        >
          View all projects on GitHub
          <ExternalLink className="w-3 h-3" />
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
      period: "Oct 2025 - Dec 2025",
      bullets: [
        "Analyzed production issues with engineering teams and implemented technical fixes reducing recurring bugs",
        "Structured product workflows and testing documentation improving team clarity and execution",
      ],
    },
    {
      title: "Implementation Intern",
      company: "LearnQ.ai",
      period: "Apr 2025 - Jun 2025",
      bullets: [
        "Built technical documentation systems enabling faster onboarding and consistent implementation processes",
        "Executed technical deliverables within fast-paced startup environment",
      ],
    },
  ];

  const education = [
    {
      degree: "B.S. Data Science and Applications",
      school: "IIT Madras",
      period: "2024 - 2028",
      gpa: "7.80 / 10",
    },
    {
      degree: "B.Tech Computer Science",
      school: "Maharaja Surajmal Institute of Technology",
      period: "2024 - 2028",
      gpa: "8.25 / 10",
    },
  ];

  const roles = [
    "Deputy Head PR & Sponsorship, Microsoft Student Chapter MSIT",
    "Member, AI ML Department, GeekRoom MSIT",
  ];

  return (
    <SectionWrapper id="experience" variant="surface-alt">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-10 sm:mb-14"
      >
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Experience</h2>
        <p className="text-white/40 text-lg">Professional experience and academic background</p>
      </motion.div>

      <div className="grid gap-10 lg:grid-cols-2 lg:gap-12">
        {/* ── Left Column: Work Experience Timeline ── */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <h3 className="text-xs font-semibold text-white/40 uppercase tracking-[0.2em] flex items-center gap-2 mb-8">
            <Briefcase className="w-4 h-4" />
            Work Experience
          </h3>

          {/* Timeline */}
          <div className="relative pl-6 border-l border-white/10">
            {experiences.map((exp, index) => (
              <motion.div
                key={exp.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.15 }}
                viewport={{ once: true }}
                className="relative mb-10 last:mb-8"
              >
                {/* Timeline dot */}
                <div className="absolute -left-[calc(1.5rem+4px)] top-1 w-2.5 h-2.5 rounded-full bg-white/60 border-2 border-[#0c0c0c]" />

                {/* Date badge */}
                <span className="inline-block mb-3 px-3 py-1 rounded-md bg-white/5 border border-white/10 text-[11px] font-mono text-white/50 tracking-wide">
                  {exp.period}
                </span>

                <h4 className="text-lg font-bold text-white">{exp.title}</h4>
                <p className="text-sm text-white/50 mb-3">{exp.company}</p>

                <ul className="space-y-2">
                  {exp.bullets.map((b, i) => (
                    <li key={i} className="flex gap-2 text-sm text-white/40 leading-relaxed">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/30 flex-shrink-0" />
                      {b}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}

            {/* Present / Open Source */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="absolute -left-[calc(1.5rem+4px)] top-1 w-2.5 h-2.5 rounded-full bg-green-500 border-2 border-[#0c0c0c]" />

              <span className="inline-block mb-3 px-3 py-1 rounded-md bg-green-500/10 border border-green-500/25 text-[11px] font-semibold text-green-400 tracking-wide">
                Present
              </span>

              <h4 className="text-lg font-bold text-white">Open Source &amp; Projects</h4>
              <p className="text-sm text-white/50">Contributing to open source and building ML projects</p>
            </motion.div>
          </div>
        </motion.div>

        {/* ── Right Column: Education + Leadership ── */}
        <div className="space-y-8">
          {/* Education */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="text-xs font-semibold text-white/40 uppercase tracking-[0.2em] flex items-center gap-2 mb-8">
              <GraduationCap className="w-4 h-4" />
              Education
            </h3>

            <div className="space-y-4">
              {education.map((edu, index) => (
                <motion.div
                  key={edu.school}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="p-5 rounded-2xl bg-[#111111] border border-white/5 hover:border-white/10 transition-all"
                >
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <h4 className="font-bold text-white">{edu.degree}</h4>
                      <p className="text-sm text-teal-400/70">{edu.school}</p>
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-white/30 sm:whitespace-nowrap">
                      {edu.period}
                    </span>
                  </div>
                  <div className="flex justify-end mt-4 pt-3 border-t border-white/5">
                    <div className="px-3 py-1 rounded-md bg-white/5 border border-white/10">
                      <span className="text-[11px] text-white/60 font-mono tracking-wider">
                        CGPA: {edu.gpa}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Leadership & Activities */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="p-6 rounded-2xl bg-[#111111] border border-white/5"
          >
            <h4 className="text-xs font-semibold text-white/40 uppercase tracking-[0.2em] mb-6 flex items-center gap-2">
              <Award className="w-4 h-4" />
              Leadership &amp; Activities
            </h4>
            <div className="space-y-3">
              {roles.map((role, i) => (
                <div
                  key={i}
                  className="flex gap-3 items-start p-3 rounded-xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] transition-colors"
                >
                  <Star className="w-4 h-4 text-white/40 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-white/70 leading-snug">{role}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </SectionWrapper>
  );
}

export function ContactSection() {
  return (
    <SectionWrapper id="contact">
      <div className="mx-auto max-w-2xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="space-y-8"
        >
          <h2 className="text-4xl md:text-6xl font-bold text-white">
            Let&apos;s Connect
          </h2>

          <p className="text-white/40 text-lg">
            Open to internships, collaborations, and interesting ML projects
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
            <motion.a
              href="mailto:dipeshkumar0853822@gmail.com"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-white text-black font-medium hover:bg-white/90 transition-colors"
            >
              <Mail className="w-5 h-5" />
              Send Email
              <ArrowRight className="w-4 h-4" />
            </motion.a>

            <motion.a
              href="https://linkedin.com/in/dipesh4000"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full border border-white/20 text-white font-medium hover:bg-white/5 transition-colors"
            >
              LinkedIn
              <ExternalLink className="w-4 h-4" />
            </motion.a>
          </div>

          <div className="flex items-center justify-center gap-6 pt-4 text-white/30">
            <a
              href="https://github.com/dipesh4000"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-teal-300/90 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-400/40 rounded-sm"
            >
              <Github className="w-5 h-5" />
            </a>
            <a
              href="https://codolio.com/profile/dipesh4000"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-teal-300/90 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-400/40 rounded-sm"
            >
              <Code2 className="w-5 h-5" />
            </a>
            <span className="flex items-center gap-2 text-sm">
              <MapPin className="w-4 h-4" />
              Noida, India
            </span>
          </div>
        </motion.div>
      </div>
    </SectionWrapper>
  );
}

// Legacy export for compatibility
export function AboutSection() { return null; }
