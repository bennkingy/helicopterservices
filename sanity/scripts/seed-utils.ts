// Shared helpers for the seed scripts in this folder.
import { createReadStream } from "node:fs";
import { basename, join } from "node:path";
import { getCliClient } from "sanity/cli";

export const client = getCliClient({ apiVersion: "2023-05-03" });

const publicDir = join(__dirname, "..", "..", "public");
const uploaded = new Map<string, string>();

// Uploads a file from the site's public folder once and returns an image
// field pointing at it. Sanity also de-duplicates identical files.
export async function image(src: string, alt?: string) {
	let assetId = uploaded.get(src);
	if (!assetId) {
		const asset = await client.assets.upload(
			"image",
			createReadStream(join(publicDir, src)),
			{ filename: basename(src) },
		);
		assetId = asset._id;
		uploaded.set(src, assetId);
		console.log(`Uploaded ${src}`);
	}
	return {
		_type: "image",
		asset: { _type: "reference", _ref: assetId },
		// The built-in alt text is only a placeholder, so leave it for editors.
		...(alt && alt !== "Helicopter Services" ? { alt } : {}),
	};
}

let keyCount = 0;
export const key = () => `seed${(keyCount++).toString().padStart(4, "0")}`;
