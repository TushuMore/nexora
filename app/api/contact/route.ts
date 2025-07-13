import { connectDB } from "@/lib/mongodb";
import { Contact } from "@/models/Contact";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    await connectDB();
    const { name, email, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    const contact = await Contact.create({ name, email, message });

    return NextResponse.json({ success: true, data: contact }, { status: 201 });
  } catch (error) {
    console.error("Error saving contact:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function GET() {
  await connectDB();
  const contacts = await Contact.find().sort({ createdAt: -1 });
  return NextResponse.json(contacts);
}