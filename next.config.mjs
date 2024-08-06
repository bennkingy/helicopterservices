/** @type {import('next').NextConfig} */
// import withPlaiceholder from "@plaiceholder/next";

const nextConfig = {
	typescript: {
		ignoreBuildErrors: true,
	},
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "cdn.sanity.io",
				port: "",
			},
			{
				protocol: "https",
				hostname: "placehold.co",
				port: "",
			},
			{
				protocol: "https",
				hostname: "openweathermap.org",
				port: "",
			},
			{
				protocol: "https",
				hostname: "dynamic-media-cdn.tripadvisor.com",
				port: "",
			},
			{
				protocol: "https",
				hostname: "img.youtube.com",
				port: "",
			},
			{
				protocol: "http",
				hostname: "img.youtube.com",
				port: "",
			},
			{
				protocol: "http",
				hostname: "helicopterservices.vercel.app",
				port: "",
			},
			{
				protocol: "https",
				hostname: "helicopterservices.vercel.app",
				port: "",
			},
		],
	},
	async redirects() {
		return [
			// Legals
			{
				source: "/privacy",
				destination: "/legal/privacy",
				permanent: true,
			},
			{
				source: "/cookies",
				destination: "/legal/cookies",
				permanent: true,
			},
			{
				source: "/terms-conditions",
				destination: "/legal/terms-conditions",
				permanent: true,
			},
			// Training
			{
				source: "/training/training",
				destination: "/training",
				permanent: true,
			},
			{
				source: "/vr-simulator",
				destination: "/training/virtual-reality-simulator",
				permanent: true,
			},
			{
				source: "/commercial-pilot-licence",
				destination: "/training/commercial-pilot-licence",
				permanent: true,
			},
			{
				source: "/pbn",
				destination: "/training/pbn",
				permanent: true,
			},
			{
				source: "/night-rating",
				destination: "/training/night-rating",
				permanent: true,
			},
			{
				source: "/examiner-ratings",
				destination: "/training/flight-examiner-ratings",
				permanent: true,
			},
			{
				source: "/instructor-ratings",
				destination: "/training/flight-instructor-ratings",
				permanent: true,
			},
			{
				source: "/instrument-rating",
				destination: "/training/instrument-ratings",
				permanent: true,
			},
			{
				source: "/type-ratings",
				destination: "/training/type-ratings",
				permanent: true,
			},
			{
				source: "/flight-instructor-refresher-seminar",
				destination: "/training/flight-instructor-ratings",
				permanent: true,
			},
			{
				source: "/simulator",
				destination: "/training/simulator",
				permanent: true,
			},
			{
				source: "/private-pilot-licence",
				destination: "/training/private-pilot-licence",
				permanent: true,
			},
			{
				source: "/advanced-flying-programme",
				destination: "/training/advanced-flying-programme",
				permanent: true,
			},
			{
				source: "/elcas",
				destination: "/training/elcas",
				permanent: true,
			},
			{
				source: "/faa",
				destination: "/training/faa",
				permanent: true,
			},
			// About us
			{
				source: "/about-us/about-us",
				destination: "/about-us",
				permanent: true,
			},
			{
				source: "/company",
				destination: "/about-us",
				permanent: true,
			},
			{
				source: "/our-hanger",
				destination: "/about-us/the-hanger",
				permanent: true,
			},
			{
				source: "/faq",
				destination: "/about-us/faqs",
				permanent: true,
			},
			{
				source: "/team",
				destination: "/about-us/meet-the-team",
				permanent: true,
			},
			// Contact
			{
				source: "/contact",
				destination: "/enquire",
				permanent: true,
			},
			// Fleet
			{
				source: "/fleet/fleet",
				destination: "/fleet",
				permanent: true,
			},
			// Flights
			{
				source: "/flights/flights",
				destination: "/flights",
				permanent: true,
			},
			{
				source: "/special-events",
				destination: "/flights/special-events",
				permanent: true,
			},
			{
				source: "/local-sightseeing",
				destination: "/flights/local-area-tours",
				permanent: true,
			},
			{
				source: "/trial-lessons",
				destination: "/flights/trail-lessons",
				permanent: true,
			},
			{
				source: "/flight-services",
				destination: "/flights",
				permanent: true,
			},
			{
				source: "/airport-transfer",
				destination: "/flights/airport-transfers",
				permanent: true,
			},
			{
				source: "/london-sightseeing",
				destination: "/flights/london-sightseeing",
				permanent: true,
			},
			{
				source: "/charter",
				destination: "/flights/helicopter-charter",
				permanent: true,
			},
			// Industry
			{
				source: "/industry/industry",
				destination: "/industry",
				permanent: true,
			},
			{
				source: "/aerial-photography",
				destination: "/industry/photography-filming",
				permanent: true,
			},
			{
				source: "/load-lifting",
				destination: "/industry/load-lifting",
				permanent: true,
			},
			// Old pages
			{
				source: "/corona-19",
				destination: "/", // Old covid page
				permanent: true,
			},
			{
				source: "/ato-flying-risk-assessment",
				destination: "/", // Old covid page
				permanent: true,
			},
			{
				source: "/general-risk-assessment",
				destination: "/", // Old covid page
				permanent: true,
			},
			{
				source: "/airtaxi", // Old covid page
				destination: "/",
				permanent: true,
			},
			{
				source: "/brexit", // Old brexit page
				destination: "/",
				permanent: true,
			},
			{
				source: "/recovery-risk-assessment", // Old covid page
				destination: "/",
				permanent: true,
			},
		];
	},
};

// export default withPlaiceholder(nextConfig);
export default nextConfig;
