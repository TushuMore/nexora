"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { Github, ExternalLink } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

interface Project {
  _id: string;
  title: string;
  description: string;
  image: string;
  tech: string[];
  github?: string;
  live?: string;
}

export default function ProjectsGrid() {
  const [projects, setProjects] = useState<Project[]>([]);

useEffect(() => {
  const fetchProjects = async () => {
    try {
      const res = await axios.get<{ projects: Project[] }>("/api/projects");
      setProjects((res.data.projects || []).slice(0, 2));
    } catch (error) {
      console.error("Failed to fetch projects:", error);
    }
  };

  fetchProjects();
}, []);

  return (
    <section className="py-20 px-6 lg:px-16 bg-background">
      <div className="text-center mb-12">
        <h2 className="text-3xl sm:text-4xl font-bold">Projects</h2>
        <p className="text-muted-foreground mt-2">What I&apos;ve built recently</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-6xl mx-auto">
        {projects.map((project, index) => (
          <motion.div
            key={project._id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="group rounded-xl h-max overflow-hidden shadow-md bg-muted/20 hover:shadow-xl transition-shadow"
          >
            <Image
            width={1000}
            height={1000}
              src={project.image}
              alt={project.title}
              className="h-[60%] w-full object-cover"
            />

            <div className="p-6 flex flex-col gap-3">
              <h3 className="text-xl font-semibold">{project.title}</h3>
              <p className="text-sm text-muted-foreground">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-2 mt-2">
                {project.tech.map((tech, i) => (
                  <span
                    key={i}
                    className="text-xs px-2 py-1 rounded bg-primary/10 text-primary"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.2 }}
                className="flex gap-4 mt-4"
              >
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    className="flex items-center gap-1 text-sm hover:underline"
                    rel="noreferrer"
                  >
                    <Github className="w-4 h-4" />
                    GitHub
                  </a>
                )}
                {project.live && (
                  <a
                    href={project.live}
                    target="_blank"
                    className="flex items-center gap-1 text-sm hover:underline"
                    rel="noreferrer"
                  >
                    <ExternalLink className="w-4 h-4" />
                    Live
                  </a>
                )}
              </motion.div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Show More Button */}
      <div className="mt-12 text-center">
        <Link href="/projects">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            className="px-6 py-2 rounded-full bg-primary text-white font-medium shadow hover:shadow-lg transition"
          >
            View More Projects →
          </motion.button>
        </Link>
      </div>
    </section>
  );
}
