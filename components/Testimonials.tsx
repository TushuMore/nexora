"use client"

import { motion } from "framer-motion"
import { Quote } from "lucide-react"

const testimonials = [
  {
    name: "Rajesh Sharma",
    text: "Tushar delivered an incredible website for us. Clean code and great communication!",
  },
  {
    name: "Sonal Patil",
    text: "Highly professional and creative. The landing page was exactly what we needed.",
  },
  {
    name: "Aniket More",
    text: "Loved working with him! He nailed the UI design and interactions perfectly.",
  },
]

export default function Testimonials() {
  return (
    <section className="py-20 px-6 lg:px-16 bg-background">
      <div className="text-center mb-12">
        <h2 className="text-3xl sm:text-4xl font-bold">Testimonials</h2>
        <p className="text-muted-foreground mt-2">
          What people say about working with me
        </p>
      </div>

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
        {testimonials.map((item, index) => (
          <motion.div
            key={item.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="bg-muted p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow relative"
          >
            {/* Double quote icon at top */}
            <Quote className="w-8 h-8 text-primary mb-4" />

            <p className="text-sm text-muted-foreground mb-4">“{item.text}”</p>

            <h4 className="text-base font-semibold">{item.name}</h4>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
