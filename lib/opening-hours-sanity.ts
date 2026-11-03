import { OPENING_HOURS, hoursFromSanity, type SanityOpeningHours, type WeeklyHours } from "./opening-hours";
import { client } from "./sanity";

// Opening hours from Sanity (Settings > Opening hours). Falls back to the
// built-in hours in lib/opening-hours.ts while that field is empty, or if any
// day is filled in wrongly, so the header and contact boxes never go blank.
export async function getOpeningHours(): Promise<WeeklyHours> {
	try {
		const doc = await client.fetch<SanityOpeningHours>(
			`*[_type == "settings" && !(_id in path("drafts.**"))][0].officeHours`,
			{},
			{ next: { revalidate: 60 } },
		);
		const hours = hoursFromSanity(doc);
		if (doc && !hours) console.error("Opening hours in Sanity are incomplete or invalid; using the built-in hours");
		return hours ?? OPENING_HOURS;
	} catch (error) {
		console.error("Failed to load opening hours from Sanity", error);
		return OPENING_HOURS;
	}
}
