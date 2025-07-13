import { Metadata } from "next";
import { connectDB } from "@/lib/mongodb";
import { Blog } from "@/models/Blogs";

// Define BlogType locally or import from "@/types/blog"
interface BlogType {
  _id: string;
  title: string;
  content: string;
  image?: string;
  tags?: string[];
  slug: string;
  createdAt: string;
  updatedAt: string;
  excerpt?: string;
  description?: string;
}

type Props = {
  params: { slug: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    await connectDB();

    const blog = await Blog.findOne({ slug: params.slug }).lean<BlogType>();

    if (!blog) {
      return { title: "Blog Not Found" };
    }

    return {
      title: `${blog.title} | Tushar More`,
      description: blog.excerpt || blog.description || "Read this blog post on Tushar More's website.",
    };
  } catch (error) {
    console.error("Error generating metadata:", error);
    return { title: "Error | Tushar More" };
  }
}