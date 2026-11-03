// Stand-in for the Google map in Storybook. The real map's API key only
// allows the live site's domain, so it can't load on localhost:6006.
export default function GMapPlaceholder({ className = "" }: { className?: string }) {
	return (
		<div
			className={`${className} flex items-center justify-center text-center bg-brand-light-grey text-brand-dark-blue font-openSans text-sm p-6`}
			style={{ aspectRatio: "1 / 1" }}
		>
			<div>
				<p className="font-bold">Google map: White Waltham Airfield</p>
				<p className="mt-1">Shows on the real site. Storybook can&apos;t load it (the API key only allows our domain).</p>
			</div>
		</div>
	);
}
