import { NextResponse } from "next/server";

const DEFAULT_USERNAME = "xirothedev"; // Default GitHub username

export async function GET(request: Request) {
	const { searchParams } = new URL(request.url);
	const username = searchParams.get("username") || DEFAULT_USERNAME;
	return NextResponse.json({
		skills: [],
		metadata: {
			username,
			totalRepositories: 0,
			totalSkills: 0,
			totalProjects: 0,
			excludesForks: true,
			cacheStats: { size: 0, keys: [] },
		},
	});
}
