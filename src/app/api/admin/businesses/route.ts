import { NextRequest, NextResponse } from "next/server";
import { getDataSource, BusinessProfile } from "@/lib/db";

export async function GET() {
  try {
    const ds = await getDataSource();
    const repo = ds.getRepository(BusinessProfile);

    const businesses = await repo.find({
      order: { createdAt: "DESC" },
    });

    const totalKeywords = businesses.reduce((count, b) => {
      const kw = b.keywords ? b.keywords.split(",").length : 0;
      const ckw = b.customKeywords ? b.customKeywords.split(",").length : 0;
      return count + kw + ckw;
    }, 0);

    return NextResponse.json({
      businesses,
      stats: {
        activeCount: businesses.filter((b) => b.status === "active").length,
        keywordCount: totalKeywords,
      },
    });
  } catch (error) {
    console.error("Admin businesses GET error:", error);
    return NextResponse.json(
      { error: "Failed to fetch businesses" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { businessName, category, email, city } = body;

    if (!businessName || !category || !email) {
      return NextResponse.json(
        { error: "Business name, category, and email are required" },
        { status: 400 }
      );
    }

    const ds = await getDataSource();
    const repo = ds.getRepository(BusinessProfile);

    const profile = repo.create({
      businessName,
      category,
      email,
      city: city || null,
      status: "active",
    });

    await repo.save(profile);

    return NextResponse.json({ success: true, id: profile.id });
  } catch (error) {
    console.error("Admin businesses POST error:", error);
    return NextResponse.json(
      { error: "Failed to add business" },
      { status: 500 }
    );
  }
}
