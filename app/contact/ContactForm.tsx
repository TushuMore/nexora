"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { SendIcon, Mail, Github, Twitter, Linkedin } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Failed to send");

      setStatus("success");
      setFormData({ name: "", email: "", message: "" });

      setTimeout(() => setStatus("idle"), 3000);
    } catch (err) {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 3000);
      console.log(err)
    }
  };

  return (
    <section className="relative min-h-screen px-4 py-20 flex justify-center items-center text-foreground overflow-hidden">
      {/* 🌈 Gradient Blobs */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.3 }}
        transition={{ duration: 1 }}
        className="absolute top-20 left-20 h-72 w-72 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full blur-3xl z-0"
      />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.3 }}
        transition={{ duration: 1.2, delay: 0.3 }}
        className="absolute bottom-20 right-20 h-80 w-60 bg-gradient-to-br from-sky-500 to-cyan-400 rounded-full blur-2xl z-0"
      />

      {/* Contact Card */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-2xl rounded-2xl bg-muted/20 border border-border backdrop-blur-lg p-8 shadow-xl space-y-8 z-10"
      >
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold">Let&apos;s Talk</h1>
          <p className="text-muted-foreground text-sm">
            I&apos;m open to freelance, collaborations, or just a good tech convo!
          </p>
        </div>

        {/* Contact Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid gap-4">
            <Input
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <Input
              name="email"
              type="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <Textarea
              name="message"
              placeholder="Your Message"
              rows={5}
              className="h-30 resize-none"
              value={formData.message}
              onChange={handleChange}
              required
            />
          </div>

          <Button
            type="submit"
            disabled={status === "loading"}
            className="w-full flex justify-center gap-2"
          >
            {status === "loading" ? (
              <>
                <span className="animate-spin w-4 h-4 border-2 border-t-transparent rounded-full border-white"></span>
                Sending...
              </>
            ) : status === "success" ? (
              "✅ Message Sent!"
            ) : status === "error" ? (
              "❌ Try Again"
            ) : (
              <>
                <SendIcon size={16} />
                Send Message
              </>
            )}
          </Button>
        </form>

        {/* Social Links */}
        <div className="flex justify-center gap-6 mt-8 text-muted-foreground">
          <Link href="mailto:tusharmore@gmail.com" target="_blank">
            <Mail className="hover:text-primary transition" />
          </Link>
          <Link href="https://github.com/TushuMore" target="_blank">
            <Github className="hover:text-primary transition" />
          </Link>
          <Link href="https://twitter.com/" target="_blank">
            <Twitter className="hover:text-primary transition" />
          </Link>
          <Link href="https://linkedin.com/in/" target="_blank">
            <Linkedin className="hover:text-primary transition" />
          </Link>
        </div>
      </motion.div>
    </section>
  );
}
