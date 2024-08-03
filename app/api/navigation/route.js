import { client } from "@/lib/sanity";
import { NextResponse } from "next/server";
import { groq } from "next-sanity";

const query = groq`
{
  "fleet": *[_type == "fleet"] {
    title,
    category,
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

export async function GET() {
	try {
		const data = await client.fetch(query);

		return NextResponse.json(data);
	} catch (error) {
		console.error("Failed to fetch data:", error);
		return NextResponse.json(
			{ error: "Failed to fetch data" },
			{ status: 500 },
		);
	}
}
