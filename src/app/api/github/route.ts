import { NextResponse } from "next/server";

const PROJECTS = [
	{
		title: "Modern Portfolio",
		repoName: "xirothedev/modern-portfolio",
		description:
			"A visually stunning, modern portfolio website built with Next.js 15, Tailwind CSS, and TypeScript. Features animated UI, project showcases, and seamless integration with GitHub for dynamic project data.",
		fallbackTags: ["Next.js", "TypeScript", "Tailwind CSS", "Portfolio", "GitHub API"],
		image: "/repositories/modern-portfolio.png",
		demoUrl: "https://xiro-portfolio.vercel.app",
	},
	{
		title: "Discord.js Template v14",
		repoName: "xirothedev/discord.js-template-v14",
		description:
			"A robust template for rapid development of Discord bots with multi-language support, modular command/event handling, and PostgreSQL integration.",
		fallbackTags: ["TypeScript", "Discord.js", "PostgreSQL", "Node.js"],
		image: "/repositories/discord.js-template-v14.png",
		demoUrl: "https://v0-cyberpunk-server-dashboard.vercel.app",
	},
	{
		title: "Discord Bot Dashboard",
		repoName: "xirothedev/discord-bot-dashboard",
		description:
			"A modern, intuitive platform for managing Discord bots with real-time monitoring and powerful customization features.",
		fallbackTags: ["TypeScript", "React", "Next.js", "Discord API"],
		image: "/repositories/discord-bot-dashboard.png",
		demoUrl: "https://github.com/xirothedev/discord-bot-dashboard",
	},
	{
		title: "Xiro Discord Music Bot",
		repoName: "xirothedev/xiro-discord-bot-music",
		description:
			"A robust, extensible Discord music bot supporting YouTube, Spotify, Apple Music, SoundCloud with advanced playlist management and audio filters.",
		fallbackTags: ["TypeScript", "Discord.js", "Music API", "Audio Processing"],
		image: "/repositories/xiro-discord-bot-music.png",
		demoUrl: "https://github.com/xirothedev/xiro-discord-bot-music",
	},
	{
		title: "Next.js 15 Template",
		repoName: "xirothedev/next-15-template",
		description:
			"A modern, opinionated template for building scalable web applications with Next.js 15, providing best practices and optimized configuration.",
		fallbackTags: ["Next.js", "TypeScript", "Tailwind CSS", "Best Practices"],
		image: "/repositories/next-15-template.png",
		demoUrl: "https://github.com/xirothedev/next-15-template",
	},
];

export async function GET() {
	const projectsData = PROJECTS.map((project) => ({
		...project,
		tags: project.fallbackTags,
		repoUrl: `https://github.com/${project.repoName}`,
		stars: 0,
		forks: 0,
		language: null,
		languages: {},
		lastUpdated: new Date().toISOString(),
		isFromGitHub: false,
	}));
	return NextResponse.json({ projects: projectsData });
}
