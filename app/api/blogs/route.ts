import { connectDB } from "@/lib/mongodb";
import { Blog } from "@/models/Blogs";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectDB();
    const blogs = await Blog.find().lean();
    return NextResponse.json(blogs, { status: 200 });
  } catch (error) {
    console.error("GET /api/blogs error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

function generateSlug(title: string) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export async function POST(req: Request) {
  try {
    await connectDB();

    const data = await req.json();
    const { title, content, image, tags } = data;

    if (!title || !content) {
      return NextResponse.json(
        { error: "Title and content are required." },
        { status: 400 }
      );
    }

    const slug = generateSlug(title);

    const newBlog = await Blog.create({
      title,
      content,
      slug,
      image: image || "",
      tags: tags || [],
    });

    return NextResponse.json(newBlog, { status: 201 });
  } catch (error) {
    console.error("🔥 Error in POST /api/blogs:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
