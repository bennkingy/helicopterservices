import { client } from "@/lib/sanity";
import { NextResponse } from "next/server";

async function getHelicopterData() {
	const query = `
    *[_type == "fleet"] {
      title,
      workType,
      helicopterType,
      engineType,
      capacity,
      ifrcapable,
      cruiseSpeed,
      base,
			"gallerySingle": gallerySingle{
				"imageUrl": asset->url,
				"altText": alt,
				"blur": blur,
				"height": asset->metadata.dimensions.height,
				"width": asset->metadata.dimensions.width
			},
    }`;
	const data = await client.fetch(query);

	return data;
}

export async function GET() {
	try {
		const data = await getHelicopterData();
		return NextResponse.json(data);
	} catch (error) {
		console.error("Failed to fetch helicopter data:", error);
		return NextResponse.json(
			{ error: "Failed to fetch helicopter data" },
			{ status: 500 },
		);
	}
}
