"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

interface BlogCardProps {
  post: {
    title: string;
    slug: string;
    excerpt?: string;
    description?: string;
    content?: string;
    date: string;
    tags: string[];
    image?: string;
  };
}

export default function BlogCard({ post }: BlogCardProps) {
  const summary =
    post.excerpt ||
    post.description ||
    post.content?.slice(0, 120) + "..." ||
    "No summary available";

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      className="rounded-xl bg-muted/20 shadow-md overflow-hidden hover:shadow-lg transition-shadow"
    >
      {/* ✅ Image with fallback */}
      {post.image ? (
        <Image
        width={1000}
        height={1000}
          src={post.image}
          alt={post.title}
          className="w-full h-48 object-cover"
        />
      ) : (
        <div className="w-full h-48 bg-gray-200 flex items-center justify-center text-gray-500 text-sm">
          No image available
        </div>
      )}

      <div className="p-6 flex flex-col gap-2">
        <h3 className="text-xl font-semibold">{post.title}</h3>

        <p className="text-sm text-muted-foreground line-clamp-3">{summary}</p>

        <div className="flex flex-wrap gap-2 mt-3">
          {post.tags.map((tag, i) => (
            <span
              key={i}
              className="text-xs bg-primary/10 text-primary px-2 py-1 rounded"
            >
              {tag}
            </span>
          ))}
        </div>

        <Link
          href={`/blog/${post.slug}`}
          className="text-sm mt-4 text-primary hover:underline"
        >
          Read More →
        </Link>
      </div>
    </motion.div>
  );
}
