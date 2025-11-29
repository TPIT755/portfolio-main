"use client";

import { motion } from "motion/react";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";

const experiences = [
	{
		title: "Full-Stack Developer",
		company: "Personal Projects",
		period: "2025 - Now",
		description:
			"Learning Laravel and PHP 3, improving frontend with TypeScript and React.js, and developing personal projects.",
		technologies: ["Laravel", "PHP", "TypeScript", "React.js"],
		phase: "Phase IV: Professional Growth",
		phaseDescription: "Combining backend and frontend expertise",
	},
	{
		title: "Frontend & Game Developer",
		company: "Personal Projects",
		period: "2024 - 2025",
		description:
			"Studied frontend frameworks, PHP 1 & 2, built WordPress e-commerce websites, created a Dragon Ball game with Unity, and coded projects in NetBeans.",
		technologies: ["React/Next.js", "PHP", "WordPress", "Unity", "NetBeans"],
		phase: "Phase III: Practical Projects",
		phaseDescription: "Applying knowledge into real projects",
	},
	{
		title: "Tech Explorer",
		company: "Personal Projects",
		period: "2023 - 2024",
		description:
			"Explored multiple technologies: Python tools, Telegram bots, office software, C++, databases, basic PHP, and UI/UX design with Figma.",
		technologies: ["Python", "Telegram Bot", "C++", "Database", "PHP Basics", "Figma"],
		phase: "Phase II: Multi-Tool Learning",
		phaseDescription: "Experimenting with diverse technologies",
	},
	{
		title: "Beginner Web Developer",
		company: "Elaina Team",
		period: "2022 - 2023",
		description: "Started learning web development through F8 courses. Focused on HTML, CSS, and basic JavaScript.",
		technologies: ["HTML", "CSS", "JavaScript"],
		phase: "Phase I: Web Foundations",
		phaseDescription: "Building the first coding skills",
	},
];

export function Timeline() {
	const isMobile = useIsMobile();

	return (
		<div className="relative space-y-16">
			{/* Timeline line for desktop */}
			{!isMobile && (
				<div className="absolute left-1/2 h-full w-0.5 -translate-x-px transform bg-gradient-to-b from-blue-500 via-purple-500 to-purple-600"></div>
			)}

			{experiences.map((experience, index) => (
				<div
					key={index}
					className={cn(
						"relative z-10 flex items-center",
						index % 2 === 0 ? "md:flex-row-reverse" : "md:flex-row",
					)}
				>
					<motion.div
						className={cn("w-full md:w-1/2", index % 2 === 0 ? "md:pl-10" : "md:pr-10")}
						initial={{ opacity: 0, x: index % 2 === 0 ? 50 : -50 }}
						whileInView={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.6, delay: index * 0.1 }}
						viewport={{ once: true }}
					>
						<div className="relative overflow-hidden rounded-2xl border border-zinc-700/50 bg-zinc-800/50 p-8 backdrop-blur-sm transition-all duration-500 hover:border-purple-500/50 hover:shadow-2xl hover:shadow-purple-500/10">
							{/* Gradient background effect */}
							<div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-blue-500/10 opacity-25 blur-sm transition duration-1000 hover:opacity-100 hover:duration-200"></div>

							<div className="relative">
								{/* Phase indicator */}
								<div className="mb-4">
									<span className="inline-block rounded-full border border-purple-500/30 bg-gradient-to-r from-purple-500/20 to-pink-500/20 px-3 py-1 text-xs font-semibold text-purple-300">
										{experience.phase}
									</span>
								</div>

								{/* Title and company */}
								<h3 className="mb-2 bg-gradient-to-r from-white to-zinc-300 bg-clip-text text-2xl font-bold text-transparent">
									{experience.title}
								</h3>
								<div className="mb-4 font-medium text-zinc-400">
									{experience.company} | {experience.period}
								</div>

								{/* Phase description */}
								<p className="mb-4 text-sm text-zinc-500 italic">{experience.phaseDescription}</p>

								{/* Description */}
								<p className="mb-6 leading-relaxed text-zinc-300">{experience.description}</p>

								{/* Technologies */}
								<div className="flex flex-wrap gap-2">
									{experience.technologies.map((tech, techIndex) => (
										<span
											key={techIndex}
											className="rounded-lg border border-zinc-600/50 bg-zinc-700/50 px-3 py-1 text-xs font-medium text-zinc-300 transition-colors duration-200 hover:border-purple-500/50"
										>
											{tech}
										</span>
									))}
								</div>
							</div>
						</div>
					</motion.div>

					{/* Timeline dot for desktop */}
					{!isMobile && (
						<div className="absolute left-1/2 flex -translate-x-1/2 items-center justify-center">
							<motion.div
								className="z-10 flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-r from-purple-500 to-pink-500 shadow-lg shadow-purple-500/25"
								initial={{ scale: 0 }}
								whileInView={{ scale: 1 }}
								transition={{ duration: 0.4, delay: index * 0.1 }}
								viewport={{ once: true }}
							>
								<div className="h-3 w-3 rounded-full bg-white shadow-sm"></div>
							</motion.div>
						</div>
					)}

					{/* Mobile timeline dot */}
					{isMobile && (
						<div className="absolute top-8 left-0 flex -translate-x-1/2 items-center justify-center">
							<motion.div
								className="z-10 flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-r from-purple-500 to-pink-500 shadow-lg shadow-purple-500/25"
								initial={{ scale: 0 }}
								whileInView={{ scale: 1 }}
								transition={{ duration: 0.4, delay: index * 0.1 }}
								viewport={{ once: true }}
							>
								<div className="h-2 w-2 rounded-full bg-white shadow-sm"></div>
							</motion.div>
						</div>
					)}
				</div>
			))}

			{/* Career progression summary */}
			<motion.div
				className="mt-16 rounded-2xl border border-zinc-700/50 bg-gradient-to-r from-zinc-800/50 to-zinc-900/50 p-8 backdrop-blur-sm"
				initial={{ opacity: 0, y: 30 }}
				whileInView={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.6 }}
				viewport={{ once: true }}
			>
				<h3 className="mb-4 text-xl font-bold text-white">Career Development Path</h3>
				<div className="grid gap-6 text-sm text-zinc-300 md:grid-cols-2">
					<div>
						<h4 className="mb-2 font-semibold text-purple-300">Key Lessons:</h4>
						<ul className="space-y-2">
							<li>• Build a solid foundation with HTML, CSS, and basic JavaScript</li>
							<li>• Explore diverse tools: Python, C++, databases, UI/UX, PHP basics</li>
							<li>• Apply knowledge with real projects: WordPress, Unity, NetBeans</li>
							<li>
								• Grow into full-stack by combining Laravel, PHP, and modern frontend (TypeScript,
								React)
							</li>
						</ul>
					</div>
					<div>
						<h4 className="mb-2 font-semibold text-pink-300">Development Model:</h4>
						<ul className="space-y-2">
							<li>• Step-by-step learning from basics to advanced</li>
							<li>• Mix theory with hands-on projects</li>
							<li>• Expand skills across both frontend and backend</li>
							<li>• Transition from beginner web developer to full-stack developer</li>
						</ul>
					</div>
				</div>
			</motion.div>
		</div>
	);
}
