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
  children,
}: {
  id: string;
  children: React.ReactNode;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id={id}
      ref={ref}
      className="py-32 px-6"
      style={{ backgroundColor: "#0a0a0a" }}
    >
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="max-w-6xl mx-auto"
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
        className="mb-16"
      >
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Projects</h2>
        <p className="text-white/40 text-lg">Things I&apos;ve built</p>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-6">
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
            className="group block p-6 rounded-2xl bg-[#111111] border border-white/5 hover:border-white/15 transition-all"
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
          className="inline-flex items-center gap-2 text-sm text-white/40 hover:text-white transition-colors border-b border-white/20 hover:border-white/50 pb-1"
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
      description: "Analyzed production issues with engineering teams and implemented technical fixes reducing recurring bugs. Structured product workflows and testing documentation improving team clarity and execution.",
    },
    {
      title: "Implementation Intern",
      company: "LearnQ.ai",
      period: "Apr 2025 - Jun 2025",
      description: "Built technical documentation systems enabling faster onboarding and consistent implementation processes. Executed technical deliverables within fast-paced startup environment, improving cross-team coordination.",
    },
  ];

  const education = [
    {
      degree: "B.S. Data Science and Applications",
      school: "IIT Madras",
      period: "2024 - 2028",
      gpa: "7.80 / 10",
      relevantCourses: ["Data Structures and Algorithms", "Database Management Systems", "Machine Learning", "Probability and Statistics", "Calculus", "Linear Algebra"]
    },
    {
      degree: "B.Tech Computer Science",
      school: "Maharaja Surajmal Institute of Technology",
      period: "2024 - 2028",
      gpa: "8.25 / 10",
      relevantCourses: ["Object Oriented Programming", "Software Engineering", "Operating Systems", "Computer Networks"]
    },
  ];

  const roles = [
    "Deputy Head PR & Sponsorship, Microsoft Student Chapter MSIT",
    "Member, AI ML Department, GeekRoom MSIT",
  ];

  return (
    <SectionWrapper id="experience">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-16"
      >
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Experience</h2>
        <p className="text-white/40 text-lg">My journey so far</p>
      </motion.div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Work Experience */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="space-y-6 flex flex-col h-full"
        >
          <h3 className="text-sm font-medium text-white/40 uppercase tracking-wider flex items-center gap-2">
            <Briefcase className="w-4 h-4" />
            Past Experience
          </h3>

          <div className="space-y-6">
            {experiences.map((exp, index) => (
              <motion.div
                key={exp.title}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ x: 4 }}
                className="p-5 rounded-2xl bg-[#111111] border border-white/5 hover:border-white/10 hover:bg-white/[0.02] transition-all group relative overflow-hidden flex flex-col justify-between min-h-[180px]"
              >
                <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity">
                  <Briefcase className="w-12 h-12" />
                </div>
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h4 className="font-bold text-white text-lg">{exp.title}</h4>
                    <p className="text-sm text-white/60 font-medium">{exp.company}</p>
                  </div>
                                      <span className="text-[10px] text-white/30 font-bold uppercase tracking-widest whitespace-nowrap bg-white/5 px-2 py-1 rounded-md">{exp.period}</span>
                </div>
                <ul className="list-disc list-inside text-sm text-white/40 leading-relaxed max-w-[90%] space-y-1">{exp.description.split('. ').filter(Boolean).map((item, i) => (<li key={i}>{item.trim()}</li>))}</ul>
              </motion.div>
            ))}
          </div>

          {/* Currently */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="p-5 rounded-2xl bg-[#111111] border border-white/5 flex-1 flex flex-col"
          >
            <div className="flex items-center gap-2 mb-2">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-sm font-medium text-white">Currently</span>
            </div>
            <p className="text-sm text-white/50">Contributing to Open Source & Building ML Projects</p>
          </motion.div>
        </motion.div>

        {/* Education & Roles */}
        <div className="space-y-6 flex flex-col h-full">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="text-sm font-medium text-white/40 uppercase tracking-wider flex items-center gap-2 mb-6">
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
                  whileHover={{ y: -4 }}
                  className="p-5 rounded-2xl bg-[#111111] border border-white/5 hover:border-white/10 hover:bg-white/[0.02] transition-all group flex flex-col justify-between min-h-[180px]"
                >
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h4 className="font-bold text-white group-hover:text-white transition-colors">{edu.degree}</h4>
                      <p className="text-sm text-white/50">{edu.school}</p>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] text-white/30 font-bold uppercase tracking-widest">{edu.period}</span>
                    </div>
                  </div>

                  {edu.relevantCourses && (
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {edu.relevantCourses.map((course: string) => (
                        <span 
                          key={course} 
                          className="text-[10px] px-2.5 py-1 rounded-full bg-white/[0.03] text-white/40 border border-white/5 hover:border-white/10 hover:text-white/60 transition-all"
                        >
                          {course}
                        </span>
                      ))}
                    </div>
                  )}

                  <div className="flex justify-end mt-4 pt-4 border-t border-white/5">
                    {edu.gpa && (
                      <div className="px-2 py-1 rounded-md bg-white/5 border border-white/10">
                        <span className="text-[10px] text-white/60 font-semibold uppercase tracking-wider">CGPA: {edu.gpa}</span>
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Leadership */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="p-6 rounded-2xl bg-[#111111] border border-white/5"
          >
            <h4 className="text-sm font-medium text-white/40 uppercase tracking-wider mb-6 flex items-center gap-2">
              <Award className="w-4 h-4" />
              Leadership & Activities
            </h4>
            <div className="space-y-4">
              {roles.map((role, i) => (
                <div key={i} className="flex gap-4 p-3 rounded-xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] transition-colors">
                  <div className="p-2 bg-white/5 rounded-lg h-fit">
                    <Star className="w-3 h-3 text-white/60" />
                  </div>
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
      <div className="max-w-2xl mx-auto text-center">
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
            <a href="https://github.com/dipesh4000" target="_blank" rel="noopener noreferrer" className="hover:text-white/60 transition-colors">
              <Github className="w-5 h-5" />
            </a>
            <a href="https://codolio.com/profile/dipesh4000" target="_blank" rel="noopener noreferrer" className="hover:text-white/60 transition-colors">
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
