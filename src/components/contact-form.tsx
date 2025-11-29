"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/hooks/use-toast";
import { Send } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";

const contactFormSchema = z.object({
	name: z.string().min(2, "Name must be at least 2 characters").max(50, "Name must be less than 50 characters"),
	email: z.email("Please enter a valid email address"),
	subject: z
		.string()
		.min(5, "Subject must be at least 5 characters")
		.max(100, "Subject must be less than 100 characters"),
	message: z
		.string()
		.min(10, "Message must be at least 10 characters")
		.max(1000, "Message must be less than 1000 characters"),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;

interface ApiResponse {
	error?: string;
	message?: string;
	id?: string;
}

export function ContactForm() {
	const { toast } = useToast();
	const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm<ContactFormData>({
		resolver: zodResolver(contactFormSchema),
		defaultValues: {
			name: "",
			email: "",
			subject: "",
			message: "",
		},
	});

	const onSubmit = async (data: ContactFormData) => {
		setIsSubmitting(true);

		try {
			const response = await fetch("/api/contact", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(data),
			});

			const result = (await response.json()) as ApiResponse;

			if (response.ok) {
				toast({
					title: "🎉 Message Sent Successfully!",
					description: "Thank you for reaching out! I'll get back to you as soon as possible.",
					className: "border-green-500/50 bg-green-500/10 text-green-400",
				});
				reset();
			} else {
				toast({
					title: "❌ Error Sending Message",
					description: result.error || "Failed to send message. Please try again.",
					variant: "destructive",
					className: "border-red-500/50 bg-red-500/10",
				});
			}
		} catch (error) {
			console.error("Contact form error:", error);
			toast({
				title: "⚠️ Network Error",
				description: "Something went wrong. Please check your connection and try again.",
				variant: "destructive",
				className: "border-orange-500/50 bg-orange-500/10",
			});
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			whileInView={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.5 }}
			viewport={{ once: true }}
		>
			<div className="relative overflow-hidden rounded-xl border border-zinc-700/50 bg-zinc-800/50 p-6 backdrop-blur-xs transition-all duration-300 hover:border-purple-500/50">
				<div className="absolute -inset-1 rounded-xl bg-linear-to-r from-purple-500/10 to-pink-500/10 opacity-25 blur-sm transition duration-1000 hover:opacity-100 hover:duration-200"></div>

				<div className="relative">
					<h3 className="mb-6 text-2xl font-bold">Send Me a Message</h3>

					<form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
						<div className="space-y-2">
							<Label htmlFor="name" className="text-sm font-medium text-zinc-200">
								Name
							</Label>
							<Input
								id="name"
								placeholder="Your Name"
								{...register("name")}
								aria-invalid={!!errors.name}
								{...(errors.name && { "aria-describedby": "name-error" })}
								disabled={isSubmitting}
								className="border-zinc-700 bg-zinc-900/50 focus:border-purple-500 focus:ring-purple-500/20"
							/>
							{errors.name && (
								<p id="name-error" className="text-sm text-red-400">
									{errors.name.message}
								</p>
							)}
						</div>

						<div className="space-y-2">
							<Label htmlFor="email" className="text-sm font-medium text-zinc-200">
								Email
							</Label>
							<Input
								id="email"
								type="email"
								placeholder="Your Email"
								{...register("email")}
								aria-invalid={!!errors.email}
								{...(errors.email && { "aria-describedby": "email-error" })}
								disabled={isSubmitting}
								className="border-zinc-700 bg-zinc-900/50 focus:border-purple-500 focus:ring-purple-500/20"
							/>
							{errors.email && (
								<p id="email-error" className="text-sm text-red-400">
									{errors.email.message}
								</p>
							)}
						</div>

						<div className="space-y-2">
							<Label htmlFor="subject" className="text-sm font-medium text-zinc-200">
								Subject
							</Label>
							<Input
								id="subject"
								placeholder="Subject"
								{...register("subject")}
								aria-invalid={!!errors.subject}
								{...(errors.subject && { "aria-describedby": "subject-error" })}
								disabled={isSubmitting}
								className="border-zinc-700 bg-zinc-900/50 focus:border-purple-500 focus:ring-purple-500/20"
							/>
							{errors.subject && (
								<p id="subject-error" className="text-sm text-red-400">
									{errors.subject.message}
								</p>
							)}
						</div>

						<div className="space-y-2">
							<Label htmlFor="message" className="text-sm font-medium text-zinc-200">
								Message
							</Label>
							<Textarea
								id="message"
								placeholder="Your Message"
								rows={5}
								{...register("message")}
								aria-invalid={!!errors.message}
								{...(errors.message && { "aria-describedby": "message-error" })}
								disabled={isSubmitting}
								className="border-zinc-700 bg-zinc-900/50 focus:border-purple-500 focus:ring-purple-500/20"
							/>
							{errors.message && (
								<p id="message-error" className="text-sm text-red-400">
									{errors.message.message}
								</p>
							)}
						</div>

						<Button type="submit" variant="primary" className="w-full relative overflow-hidden" disabled={isSubmitting}>
							{isSubmitting && (
								<div className="absolute inset-0 flex items-center justify-center">
									<div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
								</div>
							)}
							<span className={isSubmitting ? "opacity-0" : "opacity-100 transition-opacity flex items-center justify-center"}>
								{isSubmitting ? "Sending..." : (
									<>
										<span>Send Message</span>
										<Send className="ml-2 h-4 w-4" />
									</>
								)}
							</span>
						</Button>
					</form>
				</div>
			</div>
		</motion.div>
	);
}
