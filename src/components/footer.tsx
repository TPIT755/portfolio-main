import { Facebook, Instagram } from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";
import { TikTokIcon } from "./ui/tiktok-icon";

export default function Footer() {
	return (
		<footer className="relative overflow-hidden border-t border-zinc-800 py-12">
			<div className="animate-border-flow absolute top-0 left-0 h-0.5 w-full rounded-full bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 bg-[length:300%_300%] opacity-90" />
			<div className="relative z-10 container flex flex-col items-center justify-between gap-8 md:flex-row">
				<div>
					<Link href="/" className="text-xl font-bold">
						<span className="bg-linear-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
							TPIT{" "}
						</span>
						<span className="text-white">CodeCraft</span>
					</Link>
					<p className="mt-2 text-sm text-zinc-500">
						© {new Date().getFullYear()} TPIT CodeCraft. All rights reserved.
					</p>
				</div>
				<div className="flex gap-4">
					{[
						{
							href: "https://www.facebook.com/Phatdeptry.IT",
							icon: <Facebook className="h-5 w-5" />,
							label: "Facebook",
							external: true,
						},
						{
							href: "https://www.instagram.com/tpit.dev",
							icon: <Instagram className="h-5 w-5" />,
							label: "Instagram",
							external: true,
						},
						{
							href: "https://www.tiktok.com/@tpit.exe",
							icon: <TikTokIcon className="h-5 w-5" />,
							label: "TikTok",
							external: true,
						},
					].map(({ href, icon, label, external }) => (
						<Link
							key={label}
							href={href}
							{...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
						>
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


		</footer>
	);
}
