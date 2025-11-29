import { NextRequest } from "next/server";

import { prisma } from "@/lib/db";

export async function GET(request: NextRequest) {
	const authHeader = request.headers.get("authorization");
	if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
		return new Response("Unauthorized", { status: 401 });
	}

	const expiredTokens = await prisma.token.findMany({
		where: {
			isUsed: true,
			expireAt: { lt: new Date() },
		},
		include: { project: true },
	});

	// No-op: không gọi GitHub, chỉ báo số lượng token hết hạn cần xử lý
	const removed = 0;

	return Response.json({ success: true, removed, candidates: expiredTokens.length });
}
