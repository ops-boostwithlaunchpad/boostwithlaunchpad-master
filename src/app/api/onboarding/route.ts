import { NextRequest, NextResponse } from "next/server";
import { getDataSource, BusinessProfile } from "@/lib/db";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      businessName,
      category,
      description,
      phone,
      email,
      website,
      needsWebsite,
      address,
      city,
      state,
      zip,
      weekdayOpen,
      weekdayClose,
      saturdayOpen,
      saturdayClose,
      sundayOpen,
      sundayClose,
      keywords,
      customKeywords,
      authorized,
      password,
    } = body;

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
      description: description || null,
      phone: phone || null,
      email,
      website: website || null,
      needsWebsite: needsWebsite || false,
      address: address || null,
      city: city || null,
      state: state || null,
      zip: zip || null,
      weekdayOpen: weekdayOpen || null,
      weekdayClose: weekdayClose || null,
      saturdayOpen: saturdayOpen || null,
      saturdayClose: saturdayClose || null,
      sundayOpen: sundayOpen || null,
      sundayClose: sundayClose || null,
      keywords: keywords || null,
      customKeywords: customKeywords || null,
      authorized: authorized || false,
      password: password || null,
      status: "active",
    });

    await repo.save(profile);

    return NextResponse.json({ success: true, id: profile.id });
  } catch (error) {
    console.error("Onboarding error:", error);
    return NextResponse.json(
      { error: "Failed to save business profile" },
      { status: 500 }
    );
  }
}
