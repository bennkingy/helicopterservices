// Content fixes from SITE-REVIEW.md (3 Nov 2026):
//  - /flights links to /flights/london-sightseeing, which only redirects
//  - the Crazy Bear link is dead (the group is in administration), so the
//    link is removed and the text kept
// Dry run:  npx sanity exec scripts/fix-site-review-links.ts --with-user-token
// Apply:    npx sanity exec scripts/fix-site-review-links.ts --with-user-token -- --apply
import { getCliClient } from "sanity/cli";

const client = getCliClient({ apiVersion: "2024-01-01" });
const apply = process.argv.includes("--apply");

const OLD_URL = "/flights/london-sightseeing";
const NEW_URL = "/flights/london-sightseeing-tours";
const isDeadLink = (href: unknown) => typeof href === "string" && /crazybeargroup\.co\.uk/i.test(href);

type Change = string;

// Returns a new value and records what changed. Plain objects and arrays only.
function fix(value: any, path: string, changes: Change[]): any {
	if (value === OLD_URL) {
		changes.push(`${path}: ${OLD_URL} -> ${NEW_URL}`);
		return NEW_URL;
	}
	if (Array.isArray(value)) return value.map((v, i) => fix(v, `${path}[${v?._key ? `_key=="${v._key}"` : i}]`, changes));
	if (!value || typeof value !== "object") return value;

	// A Portable Text block: drop dead link annotations, keep the text.
	if (value._type === "block" && Array.isArray(value.markDefs)) {
		const dead = new Set(value.markDefs.filter((m: any) => isDeadLink(m.href)).map((m: any) => m._key));
		if (dead.size) {
			changes.push(`${path}: removed link to ${value.markDefs.filter((m: any) => dead.has(m._key)).map((m: any) => m.href).join(", ")}`);
			value = {
				...value,
				markDefs: value.markDefs.filter((m: any) => !dead.has(m._key)),
				children: value.children.map((c: any) => (c.marks ? { ...c, marks: c.marks.filter((k: string) => !dead.has(k)) } : c)),
			};
		}
	}
	const out: any = {};
	for (const [k, v] of Object.entries(value)) out[k] = k.startsWith("_") ? v : fix(v, path ? `${path}.${k}` : k, changes);
	return out;
}

async function main() {
	const docs: any[] = await client.fetch(
		`*[[string(@)] match "london-sightseeing" || [string(@)] match "crazybeargroup" || _type in ["flights", "page", "homepage", "about", "training", "industry"]]`,
	);
	let total = 0;
	for (const doc of docs) {
		const changes: Change[] = [];
		const fixed = fix(doc, "", changes);
		if (!changes.length) continue;
		total += changes.length;
		console.log(`\n${doc._type} ${doc.slug?.current ?? ""} (${doc._id})`);
		for (const c of changes) console.log(`  ${c}`);
		if (apply) {
			const { _id, _rev, _createdAt, _updatedAt, ...fields } = fixed;
			await client.patch(_id).set(fields).commit();
		}
	}
	console.log(`\n${total} change(s) found.`);
	console.log(apply ? "Saved." : "Dry run only. Re-run with -- --apply to save these changes.");
}

main().catch((e) => {
	console.error(e);
	process.exit(1);
});
