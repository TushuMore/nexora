import { connectDB } from "@/lib/mongodb";
import { Project } from "@/models/Projects";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    await connectDB();
    const body = await req.json();

    const newProject = await Project.create({
      title: body.title,
      description: body.description,
      image: body.image,
      tech: body.tech.split(",").map((t: string) => t.trim()),
      github: body.github,
      live: body.live,
    });

    return NextResponse.json({ success: true, project: newProject });
  } catch (err) {
    console.error("Error adding project:", err);
    return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
  }
}
