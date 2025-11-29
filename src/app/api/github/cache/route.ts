import { NextRequest, NextResponse } from "next/server";

export async function GET() {
	return NextResponse.json({
		cache: { size: 0, keys: [] },
		rateLimit: null,
		timestamp: new Date().toISOString(),
	});
}

export async function DELETE(request: NextRequest) {
	const { searchParams } = new URL(request.url);
	const key = searchParams.get("key");
	return NextResponse.json({
		message: key ? `Cleared cache for key: ${key}` : "Cleared all cache",
		timestamp: new Date().toISOString(),
	});
}
