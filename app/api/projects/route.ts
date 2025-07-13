import { connectDB } from "@/lib/mongodb";
import { Project } from "@/models/Projects";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  await connectDB();
  const body = await req.json();

  const { title, description, image, tech, github, live } = body;

  if (!title) {
    return NextResponse.json({ message: "Title is required" }, { status: 400 });
  }

  const project = await Project.create({
    title,
    description,
    image,
    tech,
    github,
    live,
  });

  return NextResponse.json(project, { status: 201 });
}

export async function GET() {
  try {
    await connectDB();
    const projects = await Project.find().sort({ createdAt: -1 }).lean();

    return NextResponse.json({ projects }); // ✅ Important fix
  } catch (error) {
    console.error("Error fetching projects:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch projects" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request) {
  try {
    await connectDB();
    const { id } = await req.json();

    if (!id) {
      return NextResponse.json({ message: "Project ID is required" }, { status: 400 });
    }

    await Project.findByIdAndDelete(id);

    return NextResponse.json({ success: true, message: "Project deleted" });
  } catch (error) {
    console.error("Error deleting project:", error);
    return NextResponse.json({ success: false, error: "Failed to delete project" }, { status: 500 });
  }
}
