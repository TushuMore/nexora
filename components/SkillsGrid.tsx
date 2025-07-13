"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  SiNextdotjs, SiReact, SiTailwindcss, SiTypescript,
  SiJavascript, SiHtml5, SiCss3, SiNodedotjs, SiPostgresql,
  SiPrisma, SiGithub, SiVercel,
} from "react-icons/si";

const skills = [
  { name: "HTML5", icon: <SiHtml5 className="text-orange-500" /> },
  { name: "CSS3", icon: <SiCss3 className="text-blue-500" /> },
  { name: "JavaScript", icon: <SiJavascript className="text-yellow-400" /> },
  { name: "TypeScript", icon: <SiTypescript className="text-blue-600" /> },
  { name: "React", icon: <SiReact className="text-cyan-400" /> },
  { name: "Next.js", icon: <SiNextdotjs className="text-zinc-900 dark:text-white" /> },
  { name: "Tailwind", icon: <SiTailwindcss className="text-sky-400" /> },
  { name: "Node.js", icon: <SiNodedotjs className="text-green-500" /> },
  { name: "Prisma", icon: <SiPrisma className="text-zinc-900 dark:text-white" /> },
  { name: "PostgreSQL", icon: <SiPostgresql className="text-sky-700" /> },
  { name: "GitHub", icon: <SiGithub className="text-zinc-900 dark:text-white" /> },
  { name: "Vercel", icon: <SiVercel className="text-zinc-900 dark:text-white" /> },
];

export default function SkillsGrid() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      ref={ref}
      className="relative py-20 px-6 lg:px-16 bg-background overflow-hidden"
    >
      {/* 🎈 Small bouncing gradient blobs */}
      <motion.div
        className="absolute top-10 left-60 w-16 h-16 bg-gradient-to-br from-pink-500 to-purple-500 rounded-full blur-2xl opacity-100 z-0"
        animate={{ y: [0, -20, 0] }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute bottom-20 right-60 w-20 h-20 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-full blur-2xl opacity-100 z-0"
        animate={{ y: [0, -25, 0] }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute top-1/2 left-1/2 w-20 h-20 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full blur-2xl opacity-100 z-0"
        animate={{ y: [0, -60, 0] }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* 👇 Main Skills Section */}
      <div className="relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold">Tech Stack</h2>
          <p className="text-muted-foreground mt-2">Tools I use to build modern web apps</p>
        </div>

        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-6 max-w-5xl mx-auto">
          {skills.map((skill, index) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.05, duration: 0.4 }}
              className="group flex flex-col items-center gap-2 text-center"
            >
              <div className="text-4xl transition-transform group-hover:scale-110">
                {skill.icon}
              </div>
              <p className="text-sm text-muted-foreground">{skill.name}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
