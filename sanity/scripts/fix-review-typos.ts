// Fixes the typos from the Oct 2026 site review in every Sanity document, and
// swaps the homepage hero heading for one that says what the business does.
//   "experence"  -> "experience"
//   "Hanger"     -> "Hangar"      (the-hangar page heading, SEO title etc.)
//   "over 17+"   -> "17+"
//   homepage heroTitle "Exceeding exacting industry standards"
//     -> "Helicopter Training, Tours & Charter from White Waltham"
//        (the old line moves to the new "Hero subheading" field)
//
// Dry run (prints the changes):  npx sanity exec scripts/fix-review-typos.ts --with-user-token
// Apply the changes:             npx sanity exec scripts/fix-review-typos.ts --with-user-token -- --apply
import { client } from "./seed-utils";

const apply = process.argv.includes("--apply");

const replacements: [RegExp, string][] = [
	[/\bexperence\b/g, "experience"],
	[/\bExperence\b/g, "Experience"],
	[/\bHanger\b/g, "Hangar"],
	[/\bover 17\+/gi, "17+"],
];

const OLD_HERO = /^\s*Exceeding exacting\s+industry standards\.?\s*$/i;
const NEW_HERO = "Helicopter Training, Tours\n& Charter from White Waltham";
const NEW_SUBTITLE = "Exceeding exacting industry standards since 1998.";

type Change = { path: string; from: string; to: string };

// Builds Sanity patch paths, using _key for array items so edits made in the
// Studio meanwhile can't shift them.
function findChanges(value: unknown, path: string, out: Change[]) {
	if (typeof value === "string") {
		let to = value;
		for (const [pattern, replacement] of replacements) to = to.replace(pattern, replacement);
		if (to !== value) out.push({ path, from: value, to });
	} else if (Array.isArray(value)) {
		value.forEach((item, index) => {
			const key = item && typeof item === "object" && "_key" in item ? item._key : null;
			findChanges(item, key ? `${path}[_key=="${key}"]` : `${path}[${index}]`, out);
		});
	} else if (value && typeof value === "object") {
		for (const [field, child] of Object.entries(value)) {
			if (field.startsWith("_") || field === "slug") continue;
			findChanges(child, path ? `${path}.${field}` : field, out);
		}
	}
}

async function main() {
	// Includes drafts, so publishing an old draft later won't bring the typos back.
	const docs = await client.fetch<Record<string, unknown>[]>(`*[!(_type match "sanity.*")]`);
	let total = 0;
	const transaction = client.transaction();

	for (const doc of docs) {
		const changes: Change[] = [];
		findChanges(doc, "", changes);

		if (doc._type === "homepage" && typeof doc.heroTitle === "string" && OLD_HERO.test(doc.heroTitle)) {
			changes.push({ path: "heroTitle", from: doc.heroTitle, to: NEW_HERO });
			if (!doc.heroSubtitle) changes.push({ path: "heroSubtitle", from: "", to: NEW_SUBTITLE });
		}

		if (!changes.length) continue;
		const slug = (doc.slug as { current?: string } | undefined)?.current ?? "";
		console.log(`\n${doc._type} ${slug} (${doc._id})`);
		for (const change of changes) {
			console.log(`  ${change.path}\n    - ${change.from.slice(0, 120)}\n    + ${change.to.slice(0, 120)}`);
		}
		transaction.patch(doc._id as string, (patch) =>
			patch.set(Object.fromEntries(changes.map((c) => [c.path, c.to]))),
		);
		total += changes.length;
	}

	console.log(`\n${total} change(s) found.`);
	if (!total) return;
	if (!apply) {
		console.log("Dry run only. Re-run with -- --apply to save these changes.");
		return;
	}
	await transaction.commit();
	console.log("Saved.");
}

main().catch((error) => {
	console.error(error);
	process.exit(1);
});
