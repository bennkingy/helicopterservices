// Changes "20 years" to "25 years" in every text field of every document,
// so the experience claim matches the rest of the site.
//
// Dry run (prints the changes):  npx sanity exec scripts/update-years.ts --with-user-token
// Apply the changes:             npx sanity exec scripts/update-years.ts --with-user-token -- --apply
import { client } from "./seed-utils";

const apply = process.argv.includes("--apply");
const pattern = /\b20(\s*(?:years|yrs)\b)/gi;

type Change = { path: string; from: string; to: string };

// Builds Sanity patch paths, using _key for array items so edits made in the
// Studio meanwhile can't shift them.
function findChanges(value: unknown, path: string, out: Change[]) {
	if (typeof value === "string") {
		const to = value.replace(pattern, "25$1");
		if (to !== value) out.push({ path, from: value, to });
	} else if (Array.isArray(value)) {
		value.forEach((item, index) => {
			const key = item && typeof item === "object" && "_key" in item ? item._key : null;
			findChanges(item, key ? `${path}[_key=="${key}"]` : `${path}[${index}]`, out);
		});
	} else if (value && typeof value === "object") {
		for (const [field, child] of Object.entries(value)) {
			if (field.startsWith("_")) continue;
			findChanges(child, path ? `${path}.${field}` : field, out);
		}
	}
}

async function main() {
	// Includes drafts, so publishing an old draft later won't bring "20 years" back.
	const docs = await client.fetch<Record<string, unknown>[]>(`*[!(_type match "sanity.*")]`);
	let total = 0;
	const transaction = client.transaction();

	for (const doc of docs) {
		const changes: Change[] = [];
		findChanges(doc, "", changes);
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
