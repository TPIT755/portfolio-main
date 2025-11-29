// import { BundleMonitor } from "@/components/dev/bundle-monitor";
// import { CacheDebug } from "@/components/dev/cache-debug";
// import { PerformanceMonitor } from "@/components/dev/performance-monitor";
import Footer from "@/components/footer";
import { MouseFollower } from "@/components/mouse-follower";
import { SWRProvider } from "@/components/providers/swr-provider";
import { ScrollProgress } from "@/components/scroll-progress";
import { Toaster } from "@/components/ui/toaster";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { GoogleAnalytics, GoogleTagManager } from "@next/third-parties/google";
import { Analytics } from "@vercel/analytics/next";
import type { Metadata, Viewport } from "next";
import Script from "next/script";

import "./globals.css";

const BASE_URL =
	process.env.NEXT_PUBLIC_BASE_URL ??
	(process.env.NODE_ENV === "production" ? "https://portfolio-tpit.vercel.app" : "http://localhost:3000");

export const metadata: Metadata = {
	metadataBase: new URL(BASE_URL),
	applicationName: "TPIT CodeCraft - Portfolio",
	title: { default: "TPIT CodeCraft - Web Developer", template: "TPIT | %s" },
	description: "TPIT's Portfolio - Full Stack & Discord Bot Developer",
	keywords: [
		"Web Developer",
		"Backend Developer",
		"Discord Bot Developer",
		"React",
		"Next.js",
		"TypeScript",
		"Node.js",
		"Tailwind CSS",
		"Portfolio Developer",
		"TPIT CodeCraft",
	],
	authors: [{ name: "TPIT CodeCraft", url: "https://github.com/BLACKHOLE245/" }],
	creator: "TPIT CodeCraft",
	publisher: "TPIT CodeCraft",
	robots: {
		index: true,
		follow: true,
		"max-snippet": -1,
		"max-image-preview": "large",
		"max-video-preview": -1,
	},
	openGraph: {
		title: "TPIT CodeCraft - Web Developer",
		description: "TPIT's Portfolio - Backend Developer",
		type: "website",
		locale: "vi_VN",
		countryName: "Vietnam",
		url: BASE_URL,
		images: "/seo.png",
		siteName: "TPIT CodeCraft Portfolio",
	},
	twitter: {
		card: "summary_large_image",
		title: "TPIT CodeCraft - Web Developer",
		description: "TPIT's Portfolio - Backend Developer",
		images: "/seo.png",
	},
	icons: {
		apple: "/01.png?v=2",
		icon: "/icon.png?v=2",
	},
	manifest: "/manifest.json",
	alternates: {
		canonical: BASE_URL,
	},
	formatDetection: {
		email: true,
		address: false,
		telephone: false,
	},
	referrer: "origin-when-cross-origin",
	other: {
		"apple-mobile-web-app-capable": "yes",
		"apple-mobile-web-app-status-bar-style": "black-translucent",
		"mobile-web-app-capable": "yes",
		"msapplication-TileColor": "#8b5cf6",
		"theme-color": "#8b5cf6",
	},
};

export const viewport: Viewport = {
	width: "device-width",
	initialScale: 1,
	maximumScale: 1,
	userScalable: false,
	themeColor: "#8b5cf6",
	viewportFit: "cover",
};

const structuredData = {
	"@context": "https://schema.org",
	"@type": "Person",
	name: "TPIT CodeCraft",
	alternateName: "Huỳnh Tấn Phát",
	jobTitle: "Backend Developer",
	url: BASE_URL,
	image: `${BASE_URL}/seo.png`,
	description: "Backend Developer & Creator Portfolio",
	email: "phah321@gmail.com",
	address: {
		"@type": "PostalAddress",
		addressCountry: "VN",
		addressLocality: "Vietnam",
	},
	sameAs: ["https://t.me/TPIT755", "https://facebook.com/Phatdeptry.IT"],
	knowsAbout: ["PHP", "Next.js", "TypeScript", "Node.js", "Laravel", "Backend Development"],
	worksFor: {
		"@type": "Organization",
		name: "Freelance",
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const clerkPublishableKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;

	const LayoutContent = () => (
		<html lang="en" dir="ltr" suppressHydrationWarning>
			<GoogleAnalytics gaId="G-MGK3BM8C3J" />
			<GoogleTagManager gtmId="GTM-MMWR3898" />

			<head>
				<meta charSet="utf-8" />
				<meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
				<link rel="preconnect" href="https://fonts.googleapis.com" />
				<link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
				<link rel="preconnect" href="https://api.github.com" />
				<link rel="preconnect" href="https://vercel.live" />

				<link rel="dns-prefetch" href="//fonts.googleapis.com" />
				<link rel="dns-prefetch" href="//api.github.com" />
				<link rel="dns-prefetch" href="//vercel.live" />
			</head>
			<body id="home" className="scroll-smooth">
				<Script
					id="structured-data"
					type="application/ld+json"
					dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
				/>
				<MouseFollower />
				<ScrollProgress />
				<div className="pointer-events-none absolute inset-0 z-0">
					<div className="animate-blob absolute top-20 left-10 h-72 w-72 rounded-full bg-purple-500 opacity-20 mix-blend-multiply blur-3xl filter"></div>
					<div className="animate-blob animation-delay-2000 absolute top-40 right-10 h-72 w-72 rounded-full bg-yellow-500 opacity-20 mix-blend-multiply blur-3xl filter"></div>
					<div className="animate-blob animation-delay-4000 absolute bottom-20 left-1/3 h-72 w-72 rounded-full bg-pink-500 opacity-20 mix-blend-multiply blur-3xl filter"></div>
				</div>
				<div className="min-h-screen overflow-hidden bg-linear-to-b from-zinc-900 via-zinc-900 to-black text-white">
					<SWRProvider>
						{children}
						<Footer />
						{/* <BundleMonitor />
						<CacheDebug />
						<PerformanceMonitor /> */}
					</SWRProvider>
					<Analytics />
					<Toaster />
				</div>
			</body>
		</html>
	);

	// If Clerk key is not available, render without ClerkProvider
	if (!clerkPublishableKey) {
		return <LayoutContent />;
	}

	return (
		<ClerkProvider
			appearance={{
				baseTheme: [dark],
				variables: {
					colorPrimary: "#a855f7",
					colorBackground: "#18181b",
					colorText: "#ffffff",
					colorInputText: "#ffffff",
					colorInputBackground: "#27272a",
					borderRadius: "0.5rem",
				},
				elements: {
					card: "backdrop-blur-lg bg-zinc-900/50",
					formButtonPrimary: "bg-purple-500 hover:bg-purple-600",
					socialButtonsIconButton: "hover:bg-zinc-800",
					footerActionLink: "text-purple-400 hover:text-purple-300",
				},
			}}
		>
			<LayoutContent />
		</ClerkProvider>
	);
}
