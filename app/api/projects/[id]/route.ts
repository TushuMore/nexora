import { connectDB } from "@/lib/mongodb";
import { Project } from "@/models/Projects";
import { NextRequest, NextResponse } from "next/server";

interface RouteParams {
  params: Promise<{ id: string }>;
}

// DELETE project
export async function DELETE(request: NextRequest, { params }: RouteParams) {
  try {
    await connectDB();
    // Await params to resolve the id
    const { id } = await params;

    const deleted = await Project.findByIdAndDelete(id);

    if (!deleted) {
      return NextResponse.json({ message: "Project not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Project deleted" }, { status: 200 });
  } catch (error) {
    console.error("DELETE /api/projects/[id] error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// UPDATE project
export async function PUT(request: NextRequest, { params }: RouteParams) {
  try {
    await connectDB();
    // Await params to resolve the id
    const { id } = await params;
    const data = await request.json();

    const updated = await Project.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    }).lean();

    if (!updated) {
      return NextResponse.json({ message: "Project not found" }, { status: 404 });
    }

    return NextResponse.json(updated, { status: 200 });
  } catch (error) {
    console.error("PUT /api/projects/[id] error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}