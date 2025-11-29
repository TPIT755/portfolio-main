export interface SkillData {
	name: string;
	type: string;
	color: string;
	projects: ProjectData[];
}

export interface ProjectData {
	name: string;
	description: string;
	demoUrl?: string;
	repoUrl: string;
	stars: number;
	forks: number;
	language: string | null;
	lastUpdated: string;
	private: boolean;
}

// Dữ liệu skills cứng - Full Stack Development
export const HARDCODED_SKILLS: SkillData[] = [
	{
		name: "JavaScript",
		type: "Programming Language",
		color: "bg-yellow-500",
		projects: [],
	},
	{
		name: "TypeScript",
		type: "Programming Language",
		color: "bg-blue-600",
		projects: [],
	},
	{
		name: "PHP",
		type: "Programming Language",
		color: "bg-indigo-600",
		projects: [],
	},
	{
		name: "Python",
		type: "Programming Language",
		color: "bg-green-600",
		projects: [],
	},
	{
		name: "Java",
		type: "Programming Language",
		color: "bg-red-600",
		projects: [],
	},
	{
		name: "HTML",
		type: "Markup Language",
		color: "bg-orange-500",
		projects: [],
	},
	{
		name: "CSS",
		type: "Styling Language",
		color: "bg-blue-500",
		projects: [],
	},
	{
		name: "Node.js",
		type: "JavaScript Runtime",
		color: "bg-green-600",
		projects: [],
	},
	
	{
		name: "Laravel",
		type: "Backend Framework",
		color: "bg-red-500",
		projects: [],
	},
	{
		name: "Vue.js",
		type: "Frontend Framework",
		color: "bg-green-500",
		projects: [],
	},
	{
		name: "WordPress",
		type: "CMS Platform",
		color: "bg-blue-600",
		projects: [],
	},
	{
		name: "Unity",
		type: "Game Development",
		color: "bg-gray-800",
		projects: [],
	},
	{
		name: "MySQL",
		type: "Database",
		color: "bg-blue-700",
		projects: [],
	},
	{
		name: "MongoDB",
		type: "Database",
		color: "bg-green-500",
		projects: [],
	},

	{
		name: "Docker",
		type: "Containerization",
		color: "bg-blue-500",
		projects: [],
	},
	{
		name: "WebSocket",
		type: "Real-time Communication",
		color: "bg-indigo-500",
		projects: [],
	},
];

// Metadata cho skills
export const SKILLS_METADATA = {
	username: "TPITCodeCraft",
	totalRepositories: HARDCODED_SKILLS.length,
	totalSkills: HARDCODED_SKILLS.length,
	totalProjects: HARDCODED_SKILLS.reduce((sum, skill) => sum + skill.projects.length, 0),
	excludesForks: true,
	cacheStats: {
		hits: 0,
		misses: 0,
		hitRate: 0,
	},
};
