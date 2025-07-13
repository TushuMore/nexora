import Link from "next/link"
import { Github, Linkedin, Mail } from "lucide-react"

export default function Footer() {
  return (
    <footer className="w-full border-t bg-background px-6 py-10 md:px-16">
      <div className="flex flex-col md:flex-row justify-between items-center gap-6 max-w-6xl mx-auto">
        {/* Brand */}
        <div className="text-lg font-semibold text-primary">
          Tushar More
        </div>

        {/* Navigation Links */}
        <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
          <Link href="/">Home</Link>
          <Link href="/projects">Projects</Link>
          <Link href="/contact">Contact</Link>
        </div>

        {/* Social Icons */}
        <div className="flex gap-4">
          <a href="mailto:your@email.com" target="_blank" aria-label="Email">
            <Mail className="w-5 h-5 hover:text-primary transition-colors" />
          </a>
          <a href="https://github.com/yourusername" target="_blank" aria-label="GitHub">
            <Github className="w-5 h-5 hover:text-primary transition-colors" />
          </a>
          <a href="https://linkedin.com/in/yourusername" target="_blank" aria-label="LinkedIn">
            <Linkedin className="w-5 h-5 hover:text-primary transition-colors" />
          </a>
        </div>
      </div>

      {/* Bottom Text */}
      <div className="mt-6 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} Tushar More. Built with ❤️ using Next.js & Tailwind CSS.
      </div>
    </footer>
  )
}
