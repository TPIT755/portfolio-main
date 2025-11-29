import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function GET() {
	const { userId, sessionClaims } = await auth();

	if (!userId) {
		return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
	}

	return NextResponse.json({
		userId,
		onboardingComplete: sessionClaims?.metadata?.onboardingComplete || false,
		metadata: sessionClaims?.metadata,
	});
}
