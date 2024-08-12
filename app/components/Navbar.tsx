// import NavbarHeader from "./NavBarHeader";
// import AccrediationsText from "./AccrediationsText";

// async function getNavigationData() {
// 	let data: any;

// 	try {
// 		const response = await fetch(`${process?.env?.CURRENT_URL}/api/navigation`);
// 		data = await response.json();
// 	} catch (error) {
// 		console.error("Failed to fetch navigation data:", error);
// 	}

// 	return data;
// }

// export default async function Navbar() {
// 	const data = await getNavigationData();

// 	return (
// 		<>
// 			<AccrediationsText />
// 			<NavbarHeader menuData={data} />
// 		</>
// 	);
// }

import NavbarHeader from "./NavBarHeader";
import AccrediationsText from "./AccrediationsText";
import { client } from "@/lib/sanity";
import { groq } from "next-sanity";

// GROQ query to fetch the necessary navigation data
const query = groq`
{
  "fleet": *[_type == "fleet"] {
    title,
    engineType,
    "slug": slug.current,
  },
  "training": *[_type == "training"] {
    title,
    category,
    shortTitle,
    "slug": slug.current,
  },
  "flights": *[_type == "flights"] {
    title,
    category,
    shortTitle,
    "slug": slug.current,
  },
  "about": *[_type == "about"] {
    title,
    "slug": slug.current,
  },
  "legal": *[_type == "legal"] {
    title,
    "slug": slug.current,
  },
  "industry": *[_type == "industry"] {
    title,
    "slug": slug.current,
  }
}`;

async function getNavigationData() {
	// @ts-ignore
	let data;

	try {
		data = await client.fetch(query);
	} catch (error) {
		console.error("Failed to fetch navigation data:", error);
	}

	return data;
}

export default async function Navbar() {
	const data = await getNavigationData();

	return (
		<>
			<AccrediationsText />
			<NavbarHeader menuData={data} />
		</>
	);
}
