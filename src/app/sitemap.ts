import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
	const baseUrl = "https://portfolio-tpit.vercel.app";
	const currentDate = new Date().toISOString();

	return [
		{
			url: baseUrl,
			lastModified: currentDate,
			changeFrequency: "weekly",
			priority: 1,
		},
		{
			url: "https://facebook.com/Phatdeptry.IT",
			lastModified: currentDate,
			changeFrequency: "monthly",
			priority: 0.5,
		},
	];
}
