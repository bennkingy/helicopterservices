import { groq } from "next-sanity";
import { client } from "./sanity";

// Every page listed in the menus and footer, grouped by section.
// Used by the Navbar (mega menu + mobile menu) and the Footer. Next.js
// de-duplicates the identical request, so Sanity is asked once per page.
const query = groq`{
  "fleet": *[_type == "fleet" && isLandingPage != true]{ title, engineType, "slug": slug.current },
  "training": *[_type == "training" && isLandingPage != true]{ title, category, shortTitle, "slug": slug.current },
  "flights": *[_type == "flights" && isLandingPage != true]{ title, category, shortTitle, "slug": slug.current },
  "about": *[_type == "about" && isLandingPage != true]{ title, "slug": slug.current },
  "legal": *[_type == "legal" && isLandingPage != true]{ title, "slug": slug.current },
  "industry": *[_type == "industry" && isLandingPage != true]{ title, "slug": slug.current }
}`;

export type NavPage = {
	title: string;
	slug: string;
	shortTitle?: string;
	engineType?: string;
	category?: Record<string, boolean>;
};

export type Navigation = Record<"fleet" | "training" | "flights" | "about" | "legal" | "industry", NavPage[]>;

export async function getNavigation(): Promise<Navigation | undefined> {
	try {
		return await client.fetch(query, {}, { next: { revalidate: 30 } });
	} catch (error) {
		console.error("Failed to fetch navigation data:", error);
		return undefined;
	}
}
