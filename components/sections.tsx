"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-12 text-center">
      {children}
    </h2>
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
      <SectionTitle>About Me</SectionTitle>
      <div className="grid lg:grid-cols-5 gap-12 items-start">
        <div className="lg:col-span-3 space-y-6">
          <p className="text-lg text-muted-foreground leading-relaxed">
            {"I'm a Data Science + CS student pursuing a dual degree at "}
            <span className="text-foreground font-medium">IIT Madras</span>
            {" (B.S. Data Science) and "}
            <span className="text-foreground font-medium">MSIT</span>
            {" (B.Tech Computer Science), building production-grade ML pipelines, data warehouses, and FastAPI backends."}
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <Badge className="bg-green-100 text-green-800 hover:bg-green-100 border-green-200">
              Currently at LearnQ.ai
            </Badge>
            <Badge variant="outline" className="border-foreground/20">
              Open to Roles
            </Badge>
          </div>
          <p className="text-muted-foreground leading-relaxed">
            {"My work spans machine learning pipelines, deep learning models, and scalable backend architectures. I focus on turning complex data into actionable insights and deploying models that make a real difference."}
          </p>
        </div>
        <div className="lg:col-span-2 space-y-6">
          {Object.entries(skills).map(([category, skillList]) => (
            <div key={category}>
              <h4 className="text-sm font-semibold text-foreground mb-3">{category}</h4>
              <div className="flex flex-wrap gap-2">
                {skillList.map((skill, index) => (
                  <motion.div
                    key={skill}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.03 }}
                    viewport={{ once: true }}
                  >
                    <Badge
                      variant="secondary"
                      className="text-xs px-2.5 py-1"
                    >
                      {skill}
                    </Badge>
                  </motion.div>
                ))}
              </div>
            </div>
          ))}
        </div>
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
        "Full pipeline (ingest → clean → train → evaluate → serve) with FastAPI REST endpoint, PostgreSQL inference logging, containerised with Docker.",
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
      <SectionTitle>Projects</SectionTitle>
      <div className="grid md:grid-cols-2 gap-6">
        {projects.map((project, index) => (
          <motion.div
            key={project.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            viewport={{ once: true }}
          >
            <Card className="h-full bg-background border-border hover:border-foreground/20 transition-all hover:shadow-lg group">
              <CardHeader>
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-muted text-foreground group-hover:bg-foreground group-hover:text-background transition-colors">
                      <project.icon className="w-5 h-5" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{project.title}</CardTitle>
                      {project.featured && (
                        <Badge className="mt-1 bg-foreground text-background text-xs">
                          Featured
                        </Badge>
                      )}
                    </div>
                  </div>
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                  >
                    <Github className="w-5 h-5" />
                  </a>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground text-sm leading-relaxed">
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
              </CardContent>
            </Card>
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
      icon: Briefcase,
    },
    {
      title: "Implementation Intern",
      company: "LearnQ.ai",
      period: "Apr - Jun 2025",
      description:
        "Technical documentation, data workflows, and supporting ML implementation processes.",
      icon: Briefcase,
    },
  ];

  const education = [
    {
      degree: "B.S. Data Science & Applications",
      school: "IIT Madras",
      period: "2024 - 2028",
      gpa: "GPA: 7.80",
    },
    {
      degree: "B.Tech Computer Science",
      school: "MSIT",
      period: "2024 - 2028",
      gpa: "GPA: 8.25",
    },
  ];

  const roles = [
    "Deputy Head PR & Sponsorship, Microsoft Student Chapter, MSIT",
    "Member AI/ML Dept, GeekRoom, MSIT",
  ];

  return (
    <SectionWrapper id="experience">
      <SectionTitle>Experience & Education</SectionTitle>
      
      <div className="grid lg:grid-cols-2 gap-12">
        {/* Experience */}
        <div>
          <h3 className="text-xl font-semibold text-foreground mb-6 flex items-center gap-2">
            <Briefcase className="w-5 h-5" /> Experience
          </h3>
          <div className="space-y-6">
            {experiences.map((exp, index) => (
              <motion.div
                key={exp.title}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="relative pl-6 border-l-2 border-border"
              >
                <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-foreground" />
                <div className="space-y-1">
                  <h4 className="text-lg font-semibold text-foreground">
                    {exp.title}
                  </h4>
                  <p className="text-foreground font-medium">{exp.company}</p>
                  <p className="text-sm text-muted-foreground">{exp.period}</p>
                  <p className="text-muted-foreground mt-2 text-sm">{exp.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Education */}
        <div>
          <h3 className="text-xl font-semibold text-foreground mb-6 flex items-center gap-2">
            <GraduationCap className="w-5 h-5" /> Education
          </h3>
          <div className="space-y-6">
            {education.map((edu, index) => (
              <motion.div
                key={edu.school}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="relative pl-6 border-l-2 border-border"
              >
                <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-foreground" />
                <div className="space-y-1">
                  <h4 className="text-lg font-semibold text-foreground">
                    {edu.degree}
                  </h4>
                  <p className="text-foreground font-medium">{edu.school}</p>
                  <p className="text-sm text-muted-foreground">{edu.period}</p>
                  <Badge variant="secondary" className="mt-2 text-xs">
                    {edu.gpa}
                  </Badge>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Roles */}
          <div className="mt-8">
            <h4 className="text-sm font-semibold text-foreground mb-3">Leadership Roles</h4>
            <ul className="space-y-2">
              {roles.map((role) => (
                <li key={role} className="text-sm text-muted-foreground flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-foreground mt-2 flex-shrink-0" />
                  {role}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}

export function ContactSection() {
  return (
    <SectionWrapper id="contact" className="bg-muted/30">
      <SectionTitle>Get In Touch</SectionTitle>
      <div className="max-w-2xl mx-auto text-center space-y-6">
        <p className="text-lg text-muted-foreground leading-relaxed">
          {
            "I'm open to Junior ML Engineer, Data Scientist, MLOps Engineer, or Backend (ML focus) roles. Feel free to reach out for opportunities, collaborations, or just to chat about ML and data science!"
          }
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <motion.a
            href="mailto:dipeshkumar0853822@gmail.com"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex items-center gap-2 px-8 py-4 bg-foreground text-background rounded-lg font-semibold hover:bg-foreground/90 transition-colors"
          >
            Say Hello
            <ExternalLink className="w-4 h-4" />
          </motion.a>
          <motion.a
            href="https://linkedin.com/in/dipesh4000"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex items-center gap-2 px-8 py-4 border border-foreground text-foreground rounded-lg font-semibold hover:bg-foreground hover:text-background transition-colors"
          >
            LinkedIn
            <ExternalLink className="w-4 h-4" />
          </motion.a>
        </div>
      </div>
    </SectionWrapper>
  );
}
