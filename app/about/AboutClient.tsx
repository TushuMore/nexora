"use client";

import { motion } from "framer-motion";
import { GithubIcon, LinkedinIcon, MailIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

const skills = [
  "Next.js", "TypeScript", "Tailwind CSS",
  "MongoDB", "PostgreSQL", "Framer Motion",
  "ShadCN UI", "Lenis", "Clerk", "Vercel"
];

export default function AboutClient() {
  return (
    <section className="min-h-screen px-6 lg:px-24 py-20 text-foreground relative overflow-hidden">
      <div className="max-w-6xl mx-auto space-y-24">

        {/* ✅ Hero Section */}
        <div className="relative grid grid-cols-1 md:grid-cols-2 items-center gap-12 z-10">
          {/* Gradient BG Blob */}
          <div className="absolute left-1/2 top-1/2 -translate-y-1/2 w-[400px] h-[400px] md:w-[600px] md:h-[600px] bg-gradient-to-br from-primary/40 via-purple-500/30 to-pink-500/20 rounded-full blur-3xl opacity-70 pointer-events-none z-0" />

          {/* Text */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="z-10 space-y-5 sm:mt-0 mt-10"
          >
            <h1 className="text-4xl lg:text-6xl font-bold leading-tight bg-gradient-to-r from-primary to-purple-500 text-transparent bg-clip-text">
              Hey, I&apos;m Tushar.
            </h1>
            <p className="text-muted-foreground text-md max-w-xl">
              A full-stack web developer focused on UI magic, clean design, and advanced frontend performance.
              Passionate about building beautiful, responsive, and interactive websites using
              <strong> Next.js</strong>, <strong> Tailwind</strong>, <strong> Framer Motion</strong>, and more.
            </p>

            {/* Buttons */}
            <div className="flex flex-wrap gap-4 mt-4">
              <Link href="/Tushar-More-Resume.pdf" download>
                <Button size="lg" className="rounded-full text-foreground cursor-pointer">
                  Download Resume
                </Button>
              </Link>
              <Link href="/contact">
                <Button size="lg" variant="outline" className="rounded-full cursor-pointer">
                  Contact Me
                </Button>
              </Link>
            </div>
          </motion.div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="z-10 flex justify-center"
          >
            <Image
            priority
            width={1000}
            height={1090}
              src="/images/about.png"
              alt="Tushar Illustration"
              className="w-120 object-contain drop-shadow-xl"
            />
          </motion.div>
        </div>

        {/* ✅ Tech Stack */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.6 }}
          viewport={{ once: true }}
          className="space-y-8"
        >
          <h2 className="text-2xl font-semibold text-center">Tech Stack I Use</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            {skills.map((tech, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.05 }}
                className="rounded-lg border border-border bg-muted/40 text-center py-3 px-4 shadow-md hover:shadow-lg transition"
              >
                <p className="text-sm font-medium text-muted-foreground">{tech}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* ✅ Contact / Resume */}
        <motion.div
          id="contact"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          viewport={{ once: true }}
          className="mx-auto max-w-xl text-center backdrop-blur-md bg-muted/30 border border-border p-8 rounded-2xl space-y-6 shadow-xl"
        >
          <h3 className="text-xl font-semibold">Let&apos;s work together 👇</h3>

          <Link href="/Tushar-More-Resume.pdf" download>
            <Button size="lg" className="w-full my-2 mb-5 text-foreground cursor-pointer">
              Download Resume
            </Button>
          </Link>

          <div className="flex justify-center gap-6 text-muted-foreground">
            <Link href="https://github.com/tusharmore-dev" target="_blank" className="hover:text-primary transition">
              <GithubIcon className="w-5 h-5" />
            </Link>
            <Link href="https://linkedin.com/in/tusharmore-dev" target="_blank" className="hover:text-primary transition">
              <LinkedinIcon className="w-5 h-5" />
            </Link>
            <Link href="mailto:tusharmore@gmail.com" className="hover:text-primary transition">
              <MailIcon className="w-5 h-5" />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
