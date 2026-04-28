"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Briefcase, Code, GraduationCap, Sparkles } from "lucide-react";

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
  const skills = [
    "Python",
    "TensorFlow",
    "PyTorch",
    "Scikit-learn",
    "FastAPI",
    "Node.js",
    "PostgreSQL",
    "Docker",
    "AWS",
    "MLOps",
  ];

  return (
    <SectionWrapper id="about">
      <SectionTitle>About Me</SectionTitle>
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <p className="text-lg text-muted-foreground leading-relaxed">
            {
              "I'm a passionate ML Engineer and Data Scientist with expertise in building intelligent systems that solve real-world problems. With a strong foundation in backend development, I bridge the gap between data science and production-ready applications."
            }
          </p>
          <p className="text-lg text-muted-foreground leading-relaxed">
            My work spans across machine learning pipelines, deep learning
            models, and scalable backend architectures. I thrive on turning
            complex data into actionable insights and deploying models that make
            a difference.
          </p>
        </div>
        <div className="flex flex-wrap gap-2 justify-center md:justify-start">
          {skills.map((skill, index) => (
            <motion.div
              key={skill}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
              viewport={{ once: true }}
            >
              <Badge
                variant="secondary"
                className="text-sm px-3 py-1 bg-secondary hover:bg-primary/20 transition-colors"
              >
                {skill}
              </Badge>
            </motion.div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}

export function ProjectsSection() {
  const projects = [
    {
      title: "AI-Powered Analytics Platform",
      description:
        "End-to-end ML pipeline for real-time business analytics with predictive modeling and automated reporting.",
      tags: ["Python", "TensorFlow", "FastAPI", "React"],
      icon: Sparkles,
    },
    {
      title: "Natural Language Processing Engine",
      description:
        "Advanced NLP system for text classification, sentiment analysis, and entity extraction at scale.",
      tags: ["PyTorch", "Transformers", "Docker", "AWS"],
      icon: Code,
    },
    {
      title: "Computer Vision Pipeline",
      description:
        "Real-time object detection and image classification system deployed on edge devices.",
      tags: ["OpenCV", "YOLO", "TensorRT", "Kubernetes"],
      icon: Sparkles,
    },
  ];

  return (
    <SectionWrapper id="projects" className="bg-card/30">
      <SectionTitle>Projects</SectionTitle>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project, index) => (
          <motion.div
            key={project.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            viewport={{ once: true }}
          >
            <Card className="h-full bg-card border-border hover:border-primary/50 transition-colors group">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-primary/10 text-primary group-hover:bg-primary/20 transition-colors">
                    <project.icon className="w-5 h-5" />
                  </div>
                  <CardTitle className="text-lg">{project.title}</CardTitle>
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
      title: "Senior ML Engineer",
      company: "Tech Company",
      period: "2022 - Present",
      description:
        "Leading ML initiatives, designing scalable pipelines, and mentoring junior engineers.",
      icon: Briefcase,
    },
    {
      title: "Data Scientist",
      company: "Analytics Firm",
      period: "2020 - 2022",
      description:
        "Developed predictive models and data-driven solutions for enterprise clients.",
      icon: Code,
    },
    {
      title: "Software Engineer",
      company: "Startup",
      period: "2018 - 2020",
      description:
        "Built backend services and APIs for data-intensive applications.",
      icon: GraduationCap,
    },
  ];

  return (
    <SectionWrapper id="experience">
      <SectionTitle>Experience</SectionTitle>
      <div className="space-y-8">
        {experiences.map((exp, index) => (
          <motion.div
            key={exp.title}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            viewport={{ once: true }}
            className="flex gap-4 md:gap-6"
          >
            <div className="flex-shrink-0">
              <div className="p-3 rounded-full bg-primary/10 text-primary">
                <exp.icon className="w-5 h-5" />
              </div>
            </div>
            <div className="space-y-1">
              <h3 className="text-xl font-semibold text-foreground">
                {exp.title}
              </h3>
              <p className="text-primary font-medium">{exp.company}</p>
              <p className="text-sm text-muted-foreground">{exp.period}</p>
              <p className="text-muted-foreground mt-2">{exp.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  );
}

export function ContactSection() {
  return (
    <SectionWrapper id="contact" className="bg-card/30">
      <SectionTitle>Get In Touch</SectionTitle>
      <div className="max-w-2xl mx-auto text-center space-y-6">
        <p className="text-lg text-muted-foreground leading-relaxed">
          {
            "I'm always interested in hearing about new opportunities, collaborations, or just having a chat about ML and data science. Feel free to reach out!"
          }
        </p>
        <motion.a
          href="mailto:hello@example.com"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors"
        >
          Say Hello
        </motion.a>
      </div>
    </SectionWrapper>
  );
}
