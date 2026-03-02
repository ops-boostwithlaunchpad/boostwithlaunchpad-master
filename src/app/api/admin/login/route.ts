import { NextRequest, NextResponse } from "next/server";
import { getDataSource, BusinessProfile } from "@/lib/db";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { password } = body;

    if (!password) {
      return NextResponse.json(
        { error: "Password is required" },
        { status: 400 }
      );
    }

    const ds = await getDataSource();
    const repo = ds.getRepository(BusinessProfile);

    // Check if any business profile matches this password
    const profile = await repo.findOne({
      where: { password },
    });

    if (profile) {
      return NextResponse.json({ success: true, businessId: profile.id });
    }

    // Also accept a master admin password from env
    const masterPassword = process.env.ADMIN_PASSWORD || "launchpad2026";
    if (password === masterPassword) {
      return NextResponse.json({ success: true, admin: true });
    }

    return NextResponse.json(
      { error: "Invalid password" },
      { status: 401 }
    );
  } catch (error) {
    console.error("Admin login error:", error);
    return NextResponse.json(
      { error: "Login failed" },
      { status: 500 }
    );
  }
}
