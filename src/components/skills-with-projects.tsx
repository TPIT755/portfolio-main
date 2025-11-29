"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useSkills, useSkillsCache } from "@/hooks/use-skills";
import { cn } from "@/lib/utils";
import { Loader2, RefreshCw } from "lucide-react";
import { motion } from "motion/react";
import Link from "next/link";
import { useState } from "react";

export function SkillsWithProjects() {
	const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

	// Fetch skills data from GitHub API
	const { skills: skillsData, loading, error, isValidating, metadata } = useSkills();
	const { refreshSkills } = useSkillsCache();



	// Show loading state
	if (loading) {
		return (
			<div className="flex items-center justify-center py-12">
				<div className="flex items-center gap-3">
					<Loader2 className="h-6 w-6 animate-spin text-purple-500" />
					<p className="text-zinc-400">Loading skills from GitHub...</p>
				</div>
			</div>
		);
	}

	// Show error state
	if (error) {
		return (
			<div className="py-12 text-center">
				<div className="space-y-4">
					<p className="text-red-400">Failed to load skills: {error}</p>
					<Button
						onClick={() => refreshSkills()}
						variant="outline"
						className="border-purple-500 text-purple-400 hover:bg-purple-500/10"
					>
						<RefreshCw className="mr-2 h-4 w-4" />
						Try Again
					</Button>
				</div>
			</div>
		);
	}

	// Show empty state
	if (!skillsData || skillsData.length === 0) {
		return (
			<div className="py-12 text-center">
				<p className="text-zinc-400">
					No skills found. Make sure you have repositories with topics and languages.
				</p>
			</div>
		);
	}

	return (
		<div className="space-y-8">
			{/* Header with metadata */}
			{metadata && (
				<div className="space-y-2 text-center">
					<p className="text-sm text-zinc-500">
						Found {metadata.totalSkills} skills from {metadata.totalRepositories} original repositories
						{metadata.excludesForks && <span className="text-xs text-zinc-600"> (forks excluded)</span>}
					</p>
					{isValidating && (
						<div className="flex items-center justify-center gap-2">
							<Loader2 className="h-4 w-4 animate-spin text-purple-500" />
							<span className="text-xs text-zinc-400">Updating...</span>
						</div>
					)}
				</div>
			)}

			{/* Skills Badges Grid */}
			<div className="flex flex-wrap justify-center gap-3">
				{skillsData.map((skill) => (
					<motion.div
						key={skill.name}
						initial={{ opacity: 0, scale: 0.9 }}
						whileInView={{ opacity: 1, scale: 1 }}
						transition={{ duration: 0.3 }}
						viewport={{ once: true }}
						whileHover={{ scale: 1.05 }}
						whileTap={{ scale: 0.95 }}
					>
						<Badge
							variant="secondary"
							className={cn(
								"relative px-4 py-2 text-sm font-medium transition-all duration-300",
								"bg-zinc-800/50 text-zinc-300 hover:bg-zinc-700 hover:text-white",
								hoveredSkill === skill.name && "shadow-md",
							)}
							onMouseEnter={() => setHoveredSkill(skill.name)}
							onMouseLeave={() => setHoveredSkill(null)}
						>
							<span className="relative z-10 flex items-center gap-2">
								<div className={cn("h-2 w-2 rounded-full", skill.color)} />
								{skill.name}
							</span>
						</Badge>
					</motion.div>
				))}
			</div>

			{/* Selected Skill Details removed */}

			{/* Instructions */}
			<motion.div
				initial={{ opacity: 0 }}
				whileInView={{ opacity: 1 }}
				transition={{ duration: 0.5, delay: 0.5 }}
				viewport={{ once: true }}
				className="space-y-2 text-center"
			>
				<p className="text-sm text-zinc-500">Skills list is aggregated from GitHub.</p>
				{metadata && (
					<div className="flex items-center justify-center gap-4 text-xs text-zinc-600">
						<span className="group">
							Data from{" "}
							<Link
								className="rounded-full px-1 py-0.5 group-hover:bg-white/20 group-hover:text-white"
								href={`https://github.com/${metadata.username}`}
							>
								@{metadata.username}
							</Link>
						</span>
						<Button
							onClick={() => refreshSkills()}
							variant="ghost"
							size="sm"
							className="h-6 px-2 text-xs hover:bg-white/20 hover:text-white"
							disabled={isValidating}
						>
							<RefreshCw className={cn("mr-1 h-3 w-3", isValidating && "animate-spin")} />
							Refresh
						</Button>
					</div>
				)}
			</motion.div>
		</div>
	);
}
