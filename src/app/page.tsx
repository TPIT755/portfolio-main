"use client";

import { ContactForm } from "@/components/contact-form";
import { ErrorBoundary } from "@/components/error-boundary";
import { FloatingNav } from "@/components/floating-nav";
import { GlowingEffect } from "@/components/glowing-effect";
import { HeroSkeleton, ProjectCardSkeleton } from "@/components/loading-skeleton";
import { ProjectCard } from "@/components/project-card";
import { SectionHeading } from "@/components/section-heading";
import { SkillsWithProjects } from "@/components/skills-with-projects";
import { Testimonials, type TestimonialItem } from "@/components/testimonials";
import { Timeline } from "@/components/timeline";
import { Button } from "@/components/ui/button";
import { useGitHubProjects } from "@/hooks/use-github-projects";
import { createTimeline, stagger, text } from "animejs";
import {
	ArrowRight,
	Download,
	Facebook,
	Github,
	Instagram,
	Linkedin,
	Mail,
	MessageCircle,
	MessageSquare,
	Send,
} from "lucide-react";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";

const AnimatedName = dynamic(
	() => import("@/components/animated-name").then((mod) => ({ default: mod.AnimatedName })),
	{
		ssr: false,
	},
);

const CreativeHero = dynamic(
	() => import("@/components/creative-hero").then((mod) => ({ default: mod.CreativeHero })),
	{
		ssr: false,
		loading: () => <HeroSkeleton />,
	},
);

export default function Portfolio() {
	const { projects, loading, error } = useGitHubProjects();

	useEffect(() => {
		const { chars } = text.split("#description", {
			chars: {
				wrap: "clip",
				clone: "bottom",
			},
		});

		createTimeline().add(
			chars,
			{
				y: "-100%",
				loop: true,
				loopDelay: 3750,
				duration: 750,
				ease: "inOut(2)",
			},
			stagger(150, { from: "first" }),
		);
	}, []);

	return (
		<>
			<FloatingNav />

			{/* Hero Section */}
			<section className="relative flex min-h-screen items-center justify-center overflow-hidden">
				<div className="relative z-10 container grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
					<div className="space-y-6">
						<div className="inline-block">
							<div className="relative mt-4 mb-4 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-sm font-medium backdrop-blur-xs">
								<span className="relative z-10">Backend Developer</span>
								<span className="absolute inset-0 animate-pulse rounded-full bg-linear-to-r from-purple-500/20 to-pink-500/20"></span>
							</div>
						</div>
						<h1 className="text-5xl font-bold tracking-tight md:text-7xl">
							<span className="block">Hi, I&apos;m</span>
							<AnimatedName />
						</h1>
						<p id="description" className="max-w-[600px] text-xl text-zinc-400">
							I design and build reliable backend solutions powered by code, architecture, and a drive for
							innovation.
						</p>
						<div className="flex flex-wrap gap-4 pt-4">
							<Button
								variant="outline"
								className="border-zinc-700 bg-transparent text-pink-500 hover:border-zinc-500 hover:text-pink-700"
							>
								Contact Me
							</Button>
						</div>
						<div className="flex gap-4 pt-4">
							{[
								{
									href: "https://www.instagram.com/tpit.dev/",
									target: "_blank",
									rel: "noopener noreferrer",
									icon: <Instagram className="h-5 w-5" />,
									label: "Instagram",
								},
								{
									href: "https://www.facebook.com/Phatdeptry.IT",
									target: "_blank",
									rel: "noopener noreferrer",
									icon: <Facebook className="h-5 w-5" />,
									label: "Facebook",
								},
								{
									href: "mailto:phah321@gmail.com",
									icon: <Mail className="h-5 w-5" />,
									label: "Email",
								},
								{
									href: "https://t.me/TPIT755",
									target: "_blank",
									rel: "noopener noreferrer",
									icon: <Send className="h-5 w-5" />,
									label: "Telegram",
								},
							].map(({ href, target, rel, icon, label }) => (
								<Link key={label} href={href} target={target} rel={rel}>
									<Button
										variant="ghost"
										size="icon"
										className="rounded-full bg-zinc-800/50 text-zinc-400 hover:bg-zinc-800 hover:text-white"
									>
										{icon}
										<span className="sr-only">{label}</span>
									</Button>
								</Link>
							))}
						</div>
					</div>
					<div className="flex justify-center">
						<ErrorBoundary>
							<CreativeHero />
						</ErrorBoundary>
					</div>
				</div>

				<Link
					href="#about"
					className="absolute bottom-10 left-1/2 hidden -translate-x-1/2 animate-bounce lg:inline-block"
				>
					<div className="flex h-10 w-6 items-start justify-center rounded-full border-2 border-white/20 p-1">
						<div className="h-1.5 w-1.5 animate-pulse rounded-full bg-white/60"></div>
					</div>
				</Link>
			</section>

			{/* About Section */}
			<section id="about" className="relative py-12 md:py-20">
				<div className="absolute inset-0 z-0">
					<div className="absolute top-1/4 right-1/4 h-64 w-64 rounded-full bg-purple-500 opacity-10 mix-blend-multiply blur-3xl filter"></div>
					<div className="absolute bottom-1/3 left-1/3 h-64 w-64 rounded-full bg-pink-500 opacity-10 mix-blend-multiply blur-3xl filter"></div>
				</div>

				<div className="relative z-10 container">
					<SectionHeading title="About Me" subtitle="My background and journey" />

					<div className="mt-8 grid grid-cols-1 items-center gap-12 md:mt-16 md:grid-cols-2">
						<div className="relative">
							<div className="absolute -inset-4 rounded-xl bg-linear-to-r from-purple-500/20 to-pink-100/20 opacity-70 blur-xl"></div>
							<div className="relative h-[565px] overflow-hidden rounded-xl border border-zinc-700">
								<Image
									src="/avt-tpit.jpg"
									alt="tpit"
									sizes="(max-width: 768px) 100vw, 50vw"
									height={0}
									width={0}
									priority
									className="h-full w-full object-cover object-center"
								/>
								<div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent"></div>
								<div className="absolute bottom-0 left-0 w-full p-6">
									<div className="flex items-center gap-2">
										<div className="relative h-3 w-3">
											<div className="absolute inset-0 animate-ping rounded-full bg-green-400 opacity-75"></div>
											<div className="relative h-full w-full animate-pulse rounded-full bg-green-500 shadow-lg shadow-green-500/50"></div>
										</div>
										<span className="text-sm font-medium">TPIT MASTER</span>
									</div>
								</div>
							</div>
						</div>

						<div className="space-y-6">
							<div className="relative rounded-2xl border border-zinc-700/50 bg-zinc-800/50 p-8 backdrop-blur-sm">
								<GlowingEffect
									disabled={false}
									proximity={50}
									spread={30}
									borderWidth={2}
									movementDuration={1.5}
								/>
								<p className="text-lg leading-relaxed text-zinc-300">
									I&apos;m a passionate developer with solid experience in backend development,
									especially with Laravel. I&apos;ve also explored Java, game development with Unity,
									and Python scripting for automation tools. Currently, I&apos;m learning and working
									to continuously improve my skills.
								</p>
								<p className="mt-4 text-lg leading-relaxed text-zinc-300">
									While my main focus is backend, I&apos;m always curious about new technologies.
									Beyond backend, I&apos;ve explored game development and I&apos;m expanding into
									frontend with TypeScript, Vue.js, React, as well as containerization with Docker.
								</p>
								<p className="mt-4 text-lg leading-relaxed text-zinc-300">
									With a strong passion for technology, I enjoy building reliable systems,
									experimenting with new ideas, and constantly improving myself through learning and
									practice.
								</p>

								<div className="mt-8 grid grid-cols-1 gap-4 lg:grid-cols-2">
									<div className="space-y-1">
										<div className="text-sm text-zinc-500">Full Name</div>
										<div className="font-medium">Huynh Tan Phat</div>
									</div>
									<div className="space-y-1">
										<div className="text-sm text-zinc-500">Email</div>
										<div className="max-w-[180px] truncate font-medium">phath321@gmail.com</div>
									</div>
									<div className="space-y-1">
										<div className="text-sm text-zinc-500">Location</div>
										<div className="font-medium">Ho Chi Minh City</div>
									</div>
									<div className="space-y-1">
										<div className="text-sm text-zinc-500">Working</div>
										<div className="font-medium text-red-500">BACKEND DEVELOPER</div>
									</div>
								</div>

								{/* <div className="mt-8">
									<Link
										href="/lethanhtrung-webdeveloper-cv.pdf"
										target="_blank"
										rel="noopener noreferrer"
									>
										<Button className="bg-zinc-800 text-white hover:bg-zinc-700">
											<Download className="mr-2 h-4 w-4" />
											Download Resume
										</Button>
									</Link>
								</div> */}
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* Skills Section */}
			<section id="skills" className="relative py-12 md:py-20">
				<div className="absolute inset-0 z-0">
					<div className="absolute top-1/3 left-1/4 h-64 w-64 rounded-full bg-blue-500 opacity-10 mix-blend-multiply blur-3xl filter"></div>
					<div className="absolute right-1/4 bottom-1/4 h-64 w-64 rounded-full bg-purple-500 opacity-10 mix-blend-multiply blur-3xl filter"></div>
				</div>

				<div className="relative z-10 container">
					<SectionHeading title="My Skills" subtitle="Technologies I work with" />

					<div className="mt-8 md:mt-16">
						<SkillsWithProjects />
					</div>
				</div>
			</section>

			{/* Experience Section */}
			<section id="experience" className="relative py-12 md:py-20">
				<div className="absolute inset-0 z-0">
					<div className="absolute top-1/3 right-1/3 h-64 w-64 rounded-full bg-purple-500 opacity-10 mix-blend-multiply blur-3xl filter"></div>
					<div className="absolute bottom-1/4 left-1/4 h-64 w-64 rounded-full bg-blue-500 opacity-10 mix-blend-multiply blur-3xl filter"></div>
				</div>

				<div className="relative z-10 container">
					<SectionHeading title="Work Experience" subtitle="My professional journey" />

					<div className="mt-8 md:mt-16">
						<Timeline />
					</div>
				</div>
			</section>

			{/* Testimonials Section */}
			<section id="testimonials" className="relative py-12 md:py-20">
				<div className="absolute inset-0 z-0">
					<div className="absolute top-1/3 left-1/4 h-64 w-64 rounded-full bg-green-500 opacity-10 mix-blend-multiply blur-3xl filter"></div>
					<div className="absolute right-1/4 bottom-1/4 h-64 w-64 rounded-full bg-blue-500 opacity-10 mix-blend-multiply blur-3xl filter"></div>
				</div>

				<div className="relative z-10 container">
					<Testimonials title="Testimonials" subtitle="What people say about my work" layout="auto" />
				</div>
			</section>

			{/* Contact Section */}
			<section id="contact" className="relative py-12 md:py-20">
				<div className="absolute inset-0 z-0">
					<div className="absolute top-1/4 left-1/4 h-64 w-64 rounded-full bg-pink-500 opacity-10 mix-blend-multiply blur-3xl filter"></div>
					<div className="absolute right-1/3 bottom-1/3 h-64 w-64 rounded-full bg-purple-500 opacity-10 mix-blend-multiply blur-3xl filter"></div>
				</div>

				<div className="relative z-10 container">
					<SectionHeading title="Get In Touch" subtitle="Let's work together" />

					<div className="mt-8 grid grid-cols-1 items-center gap-12 md:mt-16 md:grid-cols-2">
						<div className="relative rounded-2xl border border-zinc-700/50 bg-zinc-800/50 p-8 backdrop-blur-sm">
							<GlowingEffect
								disabled={false}
								proximity={50}
								spread={30}
								borderWidth={2}
								movementDuration={1.5}
							/>
							<h3 className="mb-6 text-2xl font-bold">Contact Information</h3>
							<div className="space-y-6">
								{[
									{
										icon: <Mail className="h-5 w-5 text-purple-400" />,
										label: "Email",
										value: "phath321@gmail.com",
									},
									{
										icon: <MessageCircle className="h-5 w-5 text-purple-400" />,
										label: "Telegram",
										value: "t.me/TPIT755",
									},
									{
										icon: <Github className="h-5 w-5 text-purple-400" />,
										label: "GitHub",
										value: "github.com/TPITCodeCraft",
									},
									{
										icon: <MessageSquare className="h-5 w-5 text-purple-400" />,
										label: "Discord",
										value: "@tpit755",
									},
								].map((item, idx) => (
									<div key={idx} className="flex items-center gap-4">
										<div className="flex h-12 w-12 items-center justify-center rounded-full bg-zinc-800">
											{item.icon}
										</div>
										<div className="min-w-0 flex-1">
											<div className="text-sm text-zinc-500">{item.label}</div>
											<div className="truncate font-medium">{item.value}</div>
										</div>
									</div>
								))}
							</div>

							<div className="mt-8 border-t border-zinc-800 pt-8">
								<h4 className="mb-4 text-lg font-medium">Current Status</h4>
								<div className="flex items-center gap-2">
									<div className="relative h-3 w-3">
										<div className="absolute inset-0 animate-ping rounded-full bg-green-400 opacity-75"></div>
										<div className="relative h-full w-full animate-pulse rounded-full bg-green-500 shadow-lg shadow-green-500/50"></div>
									</div>
									<span>Backend developer | Exploring Python tools & game dev</span>
								</div>
							</div>
						</div>

						<ContactForm />
					</div>
				</div>
			</section>
		</>
	);
}
