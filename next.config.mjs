/** @type {import('next').NextConfig} */
import withPlaiceholder from "@plaiceholder/next";

const nextConfig = {
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
		],
	},
};

export default withPlaiceholder(nextConfig);
