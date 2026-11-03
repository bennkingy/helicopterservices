import type { ReviewSummary } from "@/lib/reviews";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import HeroVideo from "./HeroVideo";
import { FacebookIcon, GoogleIcon, TripadvisorIcon } from "./ReviewIcons";

type props = {
	height?: string; // e.g. 'h-[70vh]' or 'h-[50vh]'
	title?: string; // e.g. 'Mallard Plumbing and Heating'
	subtitle?: string; // e.g. 'From checkout to global sales......'
	cta?: {
		label: string; // e.g. 'Get a quote'
		onClick: () => void; // e.g. () => registerModal.onOpen()
	};
	cta2?: {
		label: string; // e.g. 'Get a quote'
		onClick: () => void; // e.g. () => registerModal.onOpen()
	};
	className?: string;
	titleMargins?: string;
	// Review scores from Sanity Settings. Each part is hidden when empty.
	reviews?: ReviewSummary;
};

const Hero = ({
	height = "h-[70vh]",
	cta,
	cta2,
	title,
	subtitle,
	className,
	titleMargins = "mt-[45px] sm:mt-[60px]",
	reviews,
}: props) => {
	// "★ 4.7 over 50+ reviews": the star score is Tripadvisor and Google
	// combined, weighted by number of reviews. The count also includes Facebook
	// (which has no stars), rounded down to a multiple of 10.
	const stars = reviews?.stars ?? [];
	const facebook = reviews?.facebook ?? null;
	const starCount = stars.reduce((sum, r) => sum + r.count, 0);
	const reviewAverage = starCount
		? stars.reduce((sum, r) => sum + r.rating * r.count, 0) / starCount
		: 0;
	const allReviews = starCount + (facebook?.count ?? 0);
	const reviewCountText = allReviews >= 10 ? `${Math.floor(allReviews / 10) * 10}+` : `${allReviews}`;
	const sourceIcons = { Tripadvisor: TripadvisorIcon, Google: GoogleIcon, Facebook: FacebookIcon };
	// Logos under the score: Google, Facebook, Tripadvisor (each only if it has reviews).
	const order = ["Google", "Facebook", "Tripadvisor"] as const;
	const logos = [
		...stars.map(({ source, sourceUrl }) => ({ source, sourceUrl })),
		...(facebook ? [{ source: "Facebook" as const, sourceUrl: facebook.sourceUrl }] : []),
	].sort((a, b) => order.indexOf(a.source) - order.indexOf(b.source));
	return (
		<section className={`${height} ${className} overflow-hidden relative`}>
			<div
				className={
					"h-full z-[8] bg-opacity-60 absolute bg-brand-dark-blue top-0 left-0 right-0 bottom-0"
				}
			/>
			<div className={"relative h-full"}>
				{/* First frame of the video, shown straight away and while the video
				    loads, so there is a real image for LCP. */}
				<picture>
					<source
						media="(max-width: 767px)"
						srcSet="/videos/hero-poster-mobile.webp"
						type="image/webp"
					/>
					{/* Decorative, under a dark overlay. Already sized WebP, so no next/image. */}
					{/* eslint-disable-next-line @next/next/no-img-element */}
					<img
						src="/videos/hero-poster.webp"
						alt=""
						fetchPriority="high"
						className={`w-full h-full absolute object-cover ${height}`}
					/>
				</picture>
				{/* Loads after the page has painted. Phones get a 540p encode, desktops a 2 MB 1600px one. */}
				<HeroVideo
					className={`w-full h-full cover absolute object-cover ${height}`}
				/>
				<div className="h-full grid container mx-auto lg:gap-8 xl:gap-0 lg:grid-cols-12 relative z-[9]">
					<div
						className={`mr-auto place-self-start lg:col-span-8 ${titleMargins} text-balance`}
					>
						{/* Plain HTML, no entrance animation, so it paints straight away. */}
						<h1 className="mb-4 text-4xl leading-10 sm:text-4xl md:text-6xl xl:text-7xl dark:text-white text-white font-extralight font-workSans">
							{title?.split("<br/>").map((part, index) => (
								<span key={index}>
									{part}
									{index < title.split("<br/>").length - 1 && <br />}
								</span>
							))}
						</h1>
						{subtitle && (
							<p className="max-w-2xl mb-6 font-light text-white lg:mb-8 md:text-lg lg:text-xl xl:text-2xl dark:text-white">
								{subtitle}
							</p>
						)}
						{starCount > 0 && (
							<p className="mb-6 flex flex-col items-start gap-2 text-white font-semibold font-workSans tracking-wide">
								<span>
									<span className="text-brand-orange" aria-hidden="true">
										★
									</span>{" "}
									{reviewAverage.toFixed(1)} over {reviewCountText} reviews
								</span>
								<span className="flex items-center gap-2">
									{logos.map(({ source, sourceUrl }) => {
										const Icon = sourceIcons[source];
										const icon = <Icon className="h-6 w-6 shadow-sm rounded-full" />;
										return sourceUrl ? (
											<a
												key={source}
												href={sourceUrl}
												target="_blank"
												rel="noopener noreferrer"
												aria-label={`Our ${source} reviews`}
												title={`${source} reviews`}
												className="rounded-full transition-transform hover:scale-110"
											>
												{icon}
											</a>
										) : (
											<span key={source} role="img" aria-label={source} title={source}>
												{icon}
											</span>
										);
									})}
								</span>
							</p>
						)}
						{cta && (
							<Button
								onClick={() => {
									cta?.onClick();
								}}
							/>
						)}
						{cta2 && (
							<Button
								onClick={() => {
									cta2?.onClick();
								}}
								className="ml-3"
							/>
						)}
					</div>
				</div>
				<div className="absolute z-[9] bottom-[1px] left-0 w-full py-3 bg-brand-dark-blue bg-opacity-50 dark:bg-black dark:bg-opacity-50 flex flex-col sm:flex-row items-center justify-center text-white text-center px-5">
					<p className="mb-4 sm:mb-0 sm:mr-10 text-md sm:text-lg font-semibold font-workSans tracking-wide">
						A leading UK CAA and EASA approved Training Organisation
					</p>
					<div className="flex items-center justify-center space-x-5">
						<Image
							src="/images/caa.svg"
							alt="UK Civil Aviation Authority approved"
							width={50}
							height={34}
						/>
						<Image
							src="/images/easa.webp"
							alt="European Union Aviation Safety Agency approved"
							width={101}
							height={34}
						/>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Hero;
