import { auth } from "@clerk/nextjs/server";
import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
	title: "Onboarding",
};

export default async function OnboardingLayout({ children }: { children: React.ReactNode }) {
	const sessionClaims = (await auth()).sessionClaims;
	if (sessionClaims?.metadata?.onboardingComplete === true) {
		redirect("/");
	}

	return <>{children}</>;
}
