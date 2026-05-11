"use client";

import { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

const techStack = {
  front: ["Python", "SQL", "Java", "C++"],
  back: ["FastAPI", "Flask", "Docker", "Git"],
  left: ["YOLOv8", "Scikit-learn", "XGBoost", "Pandas"],
  right: ["PostgreSQL", "SQLAlchemy", "NumPy", "Matplotlib"],
  top: ["ETL", "Medallion", "REST APIs", "Jupyter"],
  bottom: ["ML", "CV", "Data Eng", "Backend"],
};

export function TechCube() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-1, 1], [30, -30]), { stiffness: 100, damping: 30 });
  const rotateY = useSpring(useTransform(mouseX, [-1, 1], [-30, 30]), { stiffness: 100, damping: 30 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    mouseX.set((e.clientX - centerX) / (rect.width / 2));
    mouseY.set((e.clientY - centerY) / (rect.height / 2));
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    setIsHovered(false);
  };

  const FaceContent = ({ skills, label }: { skills: string[]; label: string }) => (
    <div className="w-full h-full bg-[#111111] border border-white/10 rounded-xl p-4 flex flex-col justify-center items-center gap-2">
      <span className="text-[10px] text-white/30 uppercase tracking-widest mb-2">{label}</span>
      <div className="grid grid-cols-2 gap-2">
        {skills.map((skill) => (
          <span key={skill} className="text-xs text-white/70 bg-white/5 px-2 py-1 rounded text-center">
            {skill}
          </span>
        ))}
      </div>
    </div>
  );

  return (
    <div
      ref={containerRef}
      className="relative w-[280px] h-[280px] cursor-grab active:cursor-grabbing"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{ perspective: "1000px" }}
    >
      <motion.div
        className="w-full h-full relative"
        style={{
          transformStyle: "preserve-3d",
          rotateX: isHovered ? rotateX : 0,
          rotateY: isHovered ? rotateY : 0,
        }}
        animate={!isHovered ? { rotateY: 360 } : {}}
        transition={!isHovered ? { duration: 20, repeat: Infinity, ease: "linear" } : {}}
      >
        {/* Front face */}
        <div
          className="absolute w-full h-full"
          style={{ transform: "translateZ(140px)" }}
        >
          <FaceContent skills={techStack.front} label="Languages" />
        </div>

        {/* Back face */}
        <div
          className="absolute w-full h-full"
          style={{ transform: "rotateY(180deg) translateZ(140px)" }}
        >
          <FaceContent skills={techStack.back} label="Backend" />
        </div>

        {/* Left face */}
        <div
          className="absolute w-full h-full"
          style={{ transform: "rotateY(-90deg) translateZ(140px)" }}
        >
          <FaceContent skills={techStack.left} label="ML & CV" />
        </div>

        {/* Right face */}
        <div
          className="absolute w-full h-full"
          style={{ transform: "rotateY(90deg) translateZ(140px)" }}
        >
          <FaceContent skills={techStack.right} label="Data" />
        </div>

        {/* Top face */}
        <div
          className="absolute w-full h-full"
          style={{ transform: "rotateX(90deg) translateZ(140px)" }}
        >
          <FaceContent skills={techStack.top} label="Tools" />
        </div>

        {/* Bottom face */}
        <div
          className="absolute w-full h-full"
          style={{ transform: "rotateX(-90deg) translateZ(140px)" }}
        >
          <FaceContent skills={techStack.bottom} label="Domains" />
        </div>
      </motion.div>

      {/* Glow effect */}
      <div className="absolute inset-0 rounded-full bg-white/5 blur-3xl -z-10" />
    </div>
  );
}
