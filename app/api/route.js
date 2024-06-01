import { NextResponse } from "next/server";
import { getPlaiceholder } from "plaiceholder";

export async function POST(req) {
	try {
		const { image } = await req.json();
		if (!image) {
			return NextResponse.json({ error: "Image is required" }, { status: 400 });
		}

		// Decode base64 string to binary
		const binaryString = Buffer.from(
			image.replace(/^data:image\/\w+;base64,/, ""),
			"base64",
		);

		const { base64 } = await getPlaiceholder(binaryString);
		return NextResponse.json({ base64 });
	} catch (error) {
		return NextResponse.json(
			{ error: "Failed to process image" },
			{ status: 500 },
		);
	}
}

export async function GET() {
	return NextResponse.json({ message: "Hello from Next.js!" });
}
