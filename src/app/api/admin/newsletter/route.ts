import { NextRequest, NextResponse } from "next/server";
import { getDataSource, NewsletterSubscriber } from "@/lib/db";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email } = body;

    if (!email) {
      return NextResponse.json(
        { error: "Email is required" },
        { status: 400 }
      );
    }

    const ds = await getDataSource();
    const repo = ds.getRepository(NewsletterSubscriber);

    // Check if already subscribed
    const existing = await repo.findOne({ where: { email } });
    if (existing) {
      return NextResponse.json({ success: true, message: "Already subscribed" });
    }

    const subscriber = repo.create({ email });
    await repo.save(subscriber);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Newsletter subscription error:", error);
    return NextResponse.json(
      { error: "Failed to subscribe" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const ds = await getDataSource();
    const repo = ds.getRepository(NewsletterSubscriber);

    const subscribers = await repo.find({
      order: { createdAt: "DESC" },
    });

    return NextResponse.json({ subscribers });
  } catch (error) {
    console.error("Newsletter GET error:", error);
    return NextResponse.json(
      { error: "Failed to fetch subscribers" },
      { status: 500 }
    );
  }
}
