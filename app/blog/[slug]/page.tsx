export const dynamic = "force-dynamic";

import { connectDB } from "@/lib/mongodb";
import { Blog } from "@/models/Blogs";
import { notFound } from "next/navigation";
import Image from "next/image";
import { BlogType } from "@/types/blog";

interface BlogPageProps {
  params: Promise<{ slug: string }>; // Updated to reflect params as a Promise
}

export default async function BlogDetailsPage({ params }: BlogPageProps) {
  await connectDB();

  // Await params to resolve the slug
  const { slug } = await params;
  const doc = await Blog.findOne({ slug }).lean();

  if (!doc || typeof doc !== "object" || Array.isArray(doc)) return notFound();

  const blog: BlogType = {
    _id: doc._id?.toString() ?? "",
    title: doc.title ?? "",
    slug: doc.slug ?? "",
    content: doc.content ?? "",
    image: doc.image ?? "",
    tags: Array.isArray(doc.tags) ? doc.tags : [],
    createdAt: doc.createdAt?.toString() ?? "",
    updatedAt: doc.updatedAt?.toString() ?? "",
  };

  return (
    <section className="max-w-4xl mx-auto px-6 py-20">
      {blog.image && (
        <div className="overflow-hidden rounded-2xl shadow-lg mb-10">
          <Image
            src={blog.image}
            alt={blog.title}
            width={1200}
            height={600}
            className="w-full h-80 object-cover transition-transform duration-300 hover:scale-105"
          />
        </div>
      )}

      <h1 className="text-4xl font-extrabold tracking-tight mb-4 text-foreground">
        {blog.title}
      </h1>

      <div className="flex flex-wrap gap-2 mb-6">
        {blog.tags.map((tag, index) => (
          <span
            key={index}
            className="text-sm font-medium bg-primary/10 text-primary px-3 py-1 rounded-full"
          >
            #{tag}
          </span>
        ))}
      </div>

      <article className="prose lg:prose-xl prose-neutral dark:prose-invert max-w-none leading-relaxed">
        <p>{blog.content}</p>
      </article>
    </section>
  );
}