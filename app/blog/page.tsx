import { Metadata } from "next";
import BlogCard from "./BlogCard";
import axios from "axios";

export const metadata: Metadata = {
  title: "Blog | Tushar More",
  description: "Articles and thoughts on web development, design, and learning.",
};

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

async function getBlogs(): Promise<Blog[]> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
    if (!baseUrl) {
      throw new Error("NEXT_PUBLIC_BASE_URL is not defined");
    }
    const res = await axios.get<Blog[]>(`${baseUrl}/api/blogs`);
    return res.data;
  } catch (err) {
    console.error("Failed to fetch blogs:", err);
    return [];
  }
}

export default async function BlogPage() {
  const blogs = await getBlogs();

  return (
    <section className="px-6 lg:px-16 py-20 min-h-screen">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold">Blog</h1>
        <p className="text-muted-foreground mt-2 text-sm">
          Insights, tips, and tutorials from my journey as a developer.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-6xl mx-auto">
        {blogs.length === 0 ? (
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