"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function HeroCodeShowcase() {
  return (
    <section className="relative min-h-screen w-full xl:w-[80%] mx-auto flex flex-col md:flex-row items-center justify-center px-6 py-20 lg:px-16 overflow-hidden">
      
      {/* Left: Text */}
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        className="relative md:w-1/2 w-full text-center md:text-left mb-10 md:mb-0"
      >
        {/* 🔦 Brighter, Larger Spotlight */}
        <div className="absolute -top-32 left-10 w-[500px] h-[500px] bg-[radial-gradient(circle_at_top_left,_rgba(99,102,241,0.4),_transparent_80%)] rounded-full blur-3xl z-0 pointer-events-none" />

        {/* Animated Text Content */}
        <motion.div
          animate={{ y: [0, -4, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="relative z-10"
        >
          <h1 className="text-4xl lg:text-7xl sm:text-5xl font-bold mb-6">
            Full-Stack Dev. <br />
            <span className="text-primary">Code to UI</span>
          </h1>
          <p className="text-muted-foreground mb-6 max-w-md mx-auto md:mx-0">
            I turn clean code into clean UI. Explore my skills in frontend, backend, and everything between.
          </p>
          <div className="flex justify-center md:justify-start gap-4">
            <Button className="text-foreground cursor-pointer hover:text-foreground/50">
              See Projects
            </Button>
            <Link href={"/Tushar-portfolio"} download>
            <Button variant="outline" className="cursor-pointer">
              Download Resume
            </Button>
            </Link>
          </div>
        </motion.div>
      </motion.div>

      {/* Right: Code + Preview */}
      <motion.div
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        className="md:w-1/2 w-full flex flex-col gap-6"
      >
        {/* Code Block */}
        <div className="bg-zinc-900 text-green-400 font-mono p-4 rounded-xl shadow-md text-xs leading-relaxed">
          <p><span className="text-purple-400">const</span> button = (text) =&gt; &#123;</p>
          <p className="pl-4">return &lt;button className=&apos;btn&apos;&gt;&#123;text&#125;&lt;/button&gt;</p>
          <p>&#125;</p>
          <br />
          <p>export default function Hero() &#123;</p>
          <p className="pl-4">return &lt;section&gt;Hello World&lt;/section&gt;</p>
          <p>&#125;</p>
        </div>

        {/* UI Preview Box */}
        <div className="bg-white dark:bg-zinc-800 border rounded-xl p-4 shadow-md">
          <div className="flex gap-2 mb-2">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <div className="w-3 h-3 rounded-full bg-yellow-500" />
            <div className="w-3 h-3 rounded-full bg-green-500" />
          </div>
          <div className="bg-muted p-4 rounded-md text-center">
            <h2 className="text-lg font-semibold">Hello World 👋</h2>
            <button className="mt-4 bg-primary text-white text-sm px-4 py-2 rounded-md hover:opacity-90 transition">
              Get Started
            </button>
          </div>
        </div>
      </motion.div>
    </section>
  )
}
