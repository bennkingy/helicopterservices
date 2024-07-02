import { client } from "@/lib/sanity";
import { NextResponse } from "next/server";

async function fetchData(query) {
	return await client.fetch(query);
}

const queries = {
	fleet: `
    *[_type == "fleet"] {
      title,
			category,
      "slug": slug.current,
    }`,
	training: `
    *[_type == "training"] {
      title,
			category,
      "slug": slug.current,
    }`,
	flights: `
    *[_type == "flights"] {
      title,
			isLandingPage
			category,
      "slug": slug.current,
    }`,
	about: `
    *[_type == "about"] {
      title,
      "slug": slug.current,
    }`,
	legal: `
    *[_type == "legal"] {
      title,
      "slug": slug.current,
    }`,
	industry: `
    *[_type == "industry"] {
      title,
      "slug": slug.current,
    }`,
};

export async function GET() {
	try {
		const data = await Promise.all([
			fetchData(queries.fleet),
			fetchData(queries.training),
			fetchData(queries.flights),
			fetchData(queries.about),
			fetchData(queries.legal),
			fetchData(queries.industry),
		]);

		return NextResponse.json({
			fleet: data[0],
			training: data[1],
			flights: data[2],
			about: data[3],
			legal: data[4],
			industry: data[5],
		});
	} catch (error) {
		console.error("Failed to fetch data:", error);
		return NextResponse.json(
			{ error: "Failed to fetch data" },
			{ status: 500 },
		);
	}
}
