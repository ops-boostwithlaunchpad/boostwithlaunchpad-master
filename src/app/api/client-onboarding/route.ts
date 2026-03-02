import { NextResponse } from "next/server";
import { getDataSource, ClientOnboarding } from "@/lib/db";

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const db = await getDataSource();
        const repo = db.getRepository(ClientOnboarding);

        // Convert empty strings to null for integer columns
        const intFields = ["monthlyLeadGoal", "avgClientValue", "reviewCount", "yourReviewsCount", "autoHeadcountToReplace"];
        for (const field of intFields) {
            if (body[field] === "" || body[field] === undefined) {
                body[field] = null;
            } else if (body[field] !== null) {
                body[field] = Number(body[field]);
            }
        }

        const submission = repo.create({
            ...body,
            specificStartDate: body.specificStartDate ? new Date(body.specificStartDate) : null,
        });

        await repo.save(submission);

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Onboarding submission error:", error);
        return NextResponse.json(
            { error: "Failed to save onboarding data" },
            { status: 500 }
        );
    }
}
