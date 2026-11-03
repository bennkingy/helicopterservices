import { cn } from "@/lib/utils";
import IconsHelper from "./IconsHelper";

type props = {
	title: string;
	// Bold line under the title.
	intro?: string;
	// Small label above the title, e.g. "About us". Hidden when empty.
	tag?: string;
	iconType?: "Industry" | "Company" | "Flights" | "Training";
	// 'light' for white pages (FAQs, Meet the team), 'dark' for dark blue
	// pages (Enquire).
	tone?: "light" | "dark";
	className?: string;
	// Extra classes for the intro line, e.g. a narrower max width.
	introClassName?: string;
};

// The plain page title for pages without a photo banner: optional tag, h1 and
// a bold intro line. Pages with a photo use Header; the homepage uses Hero.
const PageTitle = ({
	title,
	intro,
	tag,
	iconType = "Company",
	tone = "light",
	className,
	introClassName,
}: props) => {
	const dark = tone === "dark";
	return (
		<div className={cn("font-workSans", className)}>
			{tag && (
				<div className="flex items-center text-brand-light-blue">
					<IconsHelper iconType={iconType} iconColor="Blue" iconSize={18} />
					<p className="text-base font-normal">{tag}</p>
				</div>
			)}
			<h1
				className={cn(
					"text-4xl sm:text-6xl font-light leading-tight",
					tag && "mt-3",
					dark ? "text-white" : "text-brand-dark-blue",
				)}
			>
				{title}
			</h1>
			{intro && (
				<p
					className={cn(
						"mt-5 font-bold text-base sm:text-2xl max-w-[800px]",
						dark ? "text-white" : "text-brand-dark-blue",
						introClassName,
					)}
				>
					{intro}
				</p>
			)}
		</div>
	);
};

export default PageTitle;
