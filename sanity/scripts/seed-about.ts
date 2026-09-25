/**
 * Copies the main about page's built-in content into Sanity as an unpublished
 * draft, keeping the fields the document already has.
 *
 * Run from the sanity folder after `npx sanity login`:
 *   pnpm sanity exec scripts/seed-about.ts --with-user-token
 *
 * It only writes a draft. Review it in the Studio and press Publish when happy.
 */
import { aboutDefaults as d } from "../../lib/about-defaults";
import { client, image } from "./seed-utils";

async function run() {
	const published = await client.fetch<any>(
		`*[_type == "about" && slug.current == "about-us" && !(_id in path("drafts.**"))][0]`,
	);
	if (!published) throw new Error("No published about-us page found");
	const { _rev, _createdAt, _updatedAt, ...existing } = published;

	const draft = {
		...existing,
		_id: `drafts.${published._id}`,
		heroTitle: d.heroTitle,
		intro: {
			tag: d.intro.tag,
			heading: d.intro.heading,
			body: d.intro.body.join("\n\n"),
			signatureName: d.intro.signatureName,
			signatureRole: d.intro.signatureRole,
			signatureCompany: d.intro.signatureCompany,
			mainImage: await image(d.intro.mainImage.src),
			secondaryImage: await image(d.intro.secondaryImage.src),
		},
		award: {
			heading: d.award.heading,
			body: d.award.body.join("\n\n"),
			mainImage: await image(d.award.mainImage.src),
			secondaryImage: await image(d.award.secondaryImage.src),
			logo: await image(d.award.logo.src, "The Royal Aero Club"),
		},
		moreHeading: d.moreHeading,
		moreNote: d.moreNote,
		servicesHeading: d.servicesHeading,
	};

	await client.createOrReplace(draft);
	console.log(
		`Saved draft ${draft._id}. Open About us in the Studio, check it, and press Publish.`,
	);
}

run().catch((error) => {
	console.error(error);
	process.exit(1);
});
