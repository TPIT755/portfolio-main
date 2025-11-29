import { SkillData, HARDCODED_SKILLS, SKILLS_METADATA } from "@/lib/hardcoded-skills";

interface UseSkillsReturn {
	skills: SkillData[];
	loading: boolean;
	error: string | null;
	isValidating: boolean;
	metadata?: {
		username: string;
		totalRepositories: number;
		totalSkills: number;
		totalProjects: number;
		excludesForks?: boolean;
		cacheStats?: any;
	};
	mutate: () => Promise<{
		skills: SkillData[];
		metadata: {
			username: string;
			totalRepositories: number;
			totalSkills: number;
			totalProjects: number;
			excludesForks?: boolean;
			cacheStats?: any;
		};
	} | undefined>;
}

export function useSkills(username?: string): UseSkillsReturn {
	// Sử dụng dữ liệu cứng thay vì gọi API
	const skills = HARDCODED_SKILLS;
	const errorMessage = null;

	return {
		skills,
		loading: false,
		error: errorMessage,
		isValidating: false,
		metadata: SKILLS_METADATA,
		mutate: async () => {
			// Trả về dữ liệu cứng khi mutate được gọi
			return {
				skills: HARDCODED_SKILLS,
				metadata: SKILLS_METADATA,
			};
		},
	};
}

// Hook for manual cache management (không cần thiết với dữ liệu cứng)
export function useSkillsCache(username?: string) {
	const refreshSkills = async () => {
		console.log("🔄 Skills data is hardcoded, no refresh needed");
		return {
			skills: HARDCODED_SKILLS,
			metadata: SKILLS_METADATA,
		};
	};

	const clearCache = async () => {
		console.log("🗑️ Skills data is hardcoded, no cache to clear");
		return {
			skills: HARDCODED_SKILLS,
			metadata: SKILLS_METADATA,
		};
	};

	return {
		refreshSkills,
		clearCache,
	};
}
