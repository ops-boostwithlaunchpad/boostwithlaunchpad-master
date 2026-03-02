import { NextRequest, NextResponse } from "next/server";
import { getDataSource, ContactSubmission } from "@/lib/db";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, message, company } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required" },
        { status: 400 }
      );
    }

    const ds = await getDataSource();
    const repo = ds.getRepository(ContactSubmission);

    const submission = repo.create({
      name,
      email,
      company: company || null,
      message,
    });

    await repo.save(submission);

    return NextResponse.json({ success: true, id: submission.id });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "Failed to submit contact form" },
      { status: 500 }
    );
  }
}
