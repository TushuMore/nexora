"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import BlogCard from "./BlogCard";

interface Blog {
  _id: string;
  title: string;
  slug: string;
  description?: string;
  excerpt?: string;
  date?: string;
  tags?: string[];
  image?: string;
}

export default function BlogPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchBlogs() {
      try {
        const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
        if (!baseUrl) {
          throw new Error("Missing NEXT_PUBLIC_BASE_URL");
        }
        const url = `${baseUrl}/api/blogs`;
        const res = await axios.get<Blog[]>(url);
        setBlogs(res.data);
      } catch (err) {
        console.error("Failed to fetch blogs:", err);
        setError("Failed to load blogs.");
      }
    }
    fetchBlogs();
  }, []);

  return (
    <section className="px-6 lg:px-16 py-20 min-h-screen">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold">Blog</h1>
        <p className="text-muted-foreground mt-2 text-sm">
          Insights, tips, and tutorials from my journey as a developer.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-6xl mx-auto">
        {error ? (
          <p className="col-span-full text-center text-red-500">{error}</p>
        ) : blogs.length === 0 ? (
          <p className="col-span-full text-center text-muted-foreground">
            No blog posts available.
          </p>
        ) : (
          blogs.map((post) => <BlogCard key={post._id} post={post} />)
        )}
      </div>
    </section>
  );
}