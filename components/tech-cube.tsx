"use client";

import { motion } from "framer-motion";

const techStack = {
  front: ["Python", "SQL", "Java", "C++"],
  back: ["FastAPI", "Flask", "Docker", "Git"],
  left: ["YOLOv8", "Scikit-learn", "XGBoost", "Pandas"],
  right: ["PostgreSQL", "SQLAlchemy", "NumPy", "Matplotlib"],
  top: ["ETL", "Medallion", "REST APIs", "Jupyter"],
  bottom: ["ML", "CV", "Data Eng", "Backend"],
};

export function TechCube() {
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
      className="relative w-[280px] h-[280px]"
      style={{ perspective: "1000px" }}
    >
      <motion.div
        className="w-full h-full relative"
        style={{
          transformStyle: "preserve-3d",
        }}
        animate={{ rotateY: 360 }}
        transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
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
