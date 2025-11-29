import withBundleAnalyzer from "@next/bundle-analyzer";
import withSerwistInit from "@serwist/next";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	// Sử dụng "standalone" để hỗ trợ API routes và SSR
	output: "standalone",
	turbopack: {
		rules: {
			"*.svg": {
				loaders: ["@svgr/webpack"],
				as: "*.js",
			},
		},
	},
	experimental: {
		optimizePackageImports: [
			"lucide-react",
			"react-icons",
			"@radix-ui/react-icons",
			"animejs",
			"date-fns",
			"three",
			"@react-three/fiber",
			"@react-three/drei",
		],
		optimizeCss: true,
		viewTransition: true,
	},
	// Tối ưu cho Vercel
	images: {
		unoptimized: false,
		domains: ['localhost'],
	},
};

const withSerwist = withSerwistInit({
	swSrc: "src/app/sw.ts",
	swDest: "public/sw.js",
	disable: process.env.NODE_ENV !== "production",
	dontCacheBustURLsMatching: /^dist\/static\/([a-zA-Z0-9]+)\.([a-z0-9]+)\.(css|js)$/,
	include: [/\.(js|css|json)$/, ({ asset }) => asset.name.startsWith("client/")],
	exclude: [/\.map$/, /^manifest.*\.js$/, ({ asset }) => asset.name.startsWith("server/")],
});

const withAnalyzer = withBundleAnalyzer({
	enabled: process.env.ANALYZE === "true",
});

export default withSerwist(withAnalyzer(nextConfig));
