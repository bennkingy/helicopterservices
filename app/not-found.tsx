import { cn } from "@/lib/utils";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
	return {
		title: "Not found",
		description: "Not found!",
	};
}

export default async function NotFound() {
	return (
		<>
			<div className="container mt-14 mb-20">
				<div className="flex items-baseline">
					<p className="text-brand-light-blue text-base sm:text-[22px] font-workSans">
						Sorry
					</p>
				</div>
				<h3 className="text-brand-dark-blue text-6xl font-light font-workSans -ml-1 mb-5 mt-3">
					Page not found!
				</h3>
				<div
					className={cn(
						"prose prose-a:text-brand-orange prose-a:transition-colors prose-a hover:prose-a:text-brand-dark-blue prose-a:no-underline  font-openSans prose-h2:font-workSans prose-h2:text-4xl prose-strong:font-bold marker:text-brand-light-blue max-w-full text-brand-dark-grey mt-8",
					)}
				>
					<p>The page you are looking for does not exist.</p>
				</div>
			</div>
		</>
	);
}
