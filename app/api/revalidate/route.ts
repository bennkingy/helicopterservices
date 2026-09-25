import { parseBody } from "next-sanity/webhook";
import { revalidatePath } from "next/cache";
import { type NextRequest, NextResponse } from "next/server";

// Called by a Sanity webhook whenever content is published, so the site
// updates within seconds instead of waiting for the page cache to expire.
// Pages share menus, footers and cross-references, so the whole site is
// refreshed rather than guessing which pages a change affects.
//
// Setup: in sanity.io/manage, add a webhook for the production dataset that
// POSTs to https://www.helicopterservices.co.uk/api/revalidate with the same
// secret as the SANITY_REVALIDATE_SECRET environment variable in Vercel.
export async function POST(request: NextRequest) {
	const secret = process.env.SANITY_REVALIDATE_SECRET;
	if (!secret) {
		return NextResponse.json(
			{ message: "SANITY_REVALIDATE_SECRET is not set" },
			{ status: 500 },
		);
	}

	try {
		const { isValidSignature, body } = await parseBody<{ _type?: string }>(
			request,
			secret,
			true,
		);
		if (!isValidSignature) {
			return NextResponse.json({ message: "Invalid signature" }, { status: 401 });
		}

		revalidatePath("/", "layout");
		return NextResponse.json({ revalidated: true, type: body?._type ?? null });
	} catch (error) {
		console.error("Revalidation failed", error);
		return NextResponse.json({ message: "Revalidation failed" }, { status: 500 });
	}
}
