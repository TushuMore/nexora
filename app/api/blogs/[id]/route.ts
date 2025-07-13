import { connectDB } from "@/lib/mongodb";
import { Blog } from "@/models/Blogs";
import { NextRequest, NextResponse } from "next/server";

interface RouteParams {
  params: Promise<{ id: string }>;
}

// PUT: Update a blog post by ID
export async function PUT(request: Request, { params }: RouteParams) {
  try {
    await connectDB();

    // Await params to resolve the id
    const { id } = await params;

    // Parse the request body
    const body = await request.json();

    // Update the blog post in the database
    const updatedBlog = await Blog.findOneAndUpdate(
      { _id: id },
      { $set: body },
      { new: true, runValidators: true }
    ).lean();

    if (!updatedBlog) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    }

    return NextResponse.json(updatedBlog, { status: 200 });
  } catch (error) {
    console.error("Error updating blog:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// DELETE: Delete a blog post by ID
export async function DELETE(request: NextRequest, { params }: RouteParams) {
  try {
    await connectDB();

    // Await params to resolve the id
    const { id } = await params;

    const deletedBlog = await Blog.findByIdAndDelete(id);

    if (!deletedBlog) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("DELETE /api/blogs/[id] error:", error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}