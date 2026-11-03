import type { Preview } from "@storybook/nextjs";
import "../styles/globals.css";

// Sample OpenWeatherMap reply, so the footer weather widget works without an API key.
const sampleWeather = {
	coord: { lon: -0.76, lat: 51.5 },
	weather: [{ id: 802, main: "Clouds", description: "scattered clouds", icon: "03d" }],
	base: "stations",
	main: { temp: 11.4, feels_like: 10.2, temp_min: 10, temp_max: 12.5, pressure: 1016, humidity: 71 },
	visibility: 10000,
	wind: { speed: 4.6, deg: 240 },
	clouds: { all: 40 },
	dt: 0,
	sys: { country: "GB", sunrise: 0, sunset: 0 },
	timezone: 0,
	id: 0,
	name: "White Waltham",
	cod: 200,
};

const preview: Preview = {
	parameters: {
		nextjs: {
			appDirectory: true,
			navigation: { pathname: "/" },
			// Show remote images as-is. Storybook's image loader adds ?w=&q= to the
			// URL, which Tripadvisor rejects (400) for the review photos.
			image: { unoptimized: true },
		},
		layout: "fullscreen",
		controls: { matchers: { color: /(background|color)$/i, date: /Date$/i } },
		a11y: { test: "todo" }, // show accessibility issues in the panel without failing
		viewport: {
			options: {
				mobile: { name: "Phone (390)", styles: { width: "390px", height: "844px" } },
				tablet: { name: "Tablet (820)", styles: { width: "820px", height: "1180px" } },
				desktop: { name: "Desktop (1440)", styles: { width: "1440px", height: "900px" } },
			},
		},
		options: {
			storySort: {
				order: ["Introduction", "Brand", "Guides", ["Vibe coding a page", "*"], "Site", "Homepage", "Pages", "Content", "Cards", "Contact", "Media", "UI kit", "Misc"],
			},
		},
	},
	beforeEach: () => {
		const realFetch = window.fetch;
		window.fetch = async (input, init) =>
			String(input).includes("api.openweathermap.org")
				? new Response(JSON.stringify(sampleWeather), { headers: { "content-type": "application/json" } })
				: realFetch(input, init);
		return () => {
			window.fetch = realFetch;
		};
	},
};

export default preview;
