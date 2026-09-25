/**
 * Adds the 2026 Open Day popup to Sanity as a reusable example. Its dates are
 * in the past, so it doesn't show on the site. Duplicate it in the Studio and
 * set new dates to run another advert.
 *
 * Run from the sanity folder after `npx sanity login`:
 *   pnpm sanity exec scripts/seed-popup.ts --with-user-token
 */
import { client, image } from "./seed-utils";

async function run() {
	const doc = {
		_id: "promoPopup-open-day-2026",
		_type: "promoPopup",
		title: "Open Day 2026",
		enabled: true,
		startDate: "2026-04-26T00:00:00.000Z",
		endDate: "2026-05-22T22:00:00.000Z",
		showOn: "homepage",
		image: await image(
			"/images/open-day-v2.png",
			"Open Day – Friday 22nd May 2026",
		),
		link: "mailto:mike.burns@helicopterservices.co.uk?subject=Open%20Day%20Registration%20%E2%80%93%2022nd%20May%202026",
		ctaLabel: "Register your place",
		ctaText: "mike.burns@helicopterservices.co.uk",
		delaySeconds: 4,
	};
	await client.createOrReplace(doc);
	console.log(`Saved ${doc._id}`);
}

run().catch((error) => {
	console.error(error);
	process.exit(1);
});
