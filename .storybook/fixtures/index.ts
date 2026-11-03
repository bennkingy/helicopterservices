// Shared sample data for stories. JSON files are real content copied from the
// production Sanity dataset (re-fetch them if the content model changes).
import fleetAll from "./fleet-all.json";
import fleetR44 from "./fleet-r44.json";
import trialLessons from "./flights-trial-lessons.json";
import navigation from "./navigation.json";

export { fleetAll, fleetR44, navigation, trialLessons };

export const pilot = (trialLessons as any).pilot;

// A Sanity image reference, as stored on a document.
export const sanityImage = (ref: string, alt = "") => ({
	_type: "image",
	asset: { _ref: ref, _type: "reference" },
	alt,
});

export const R22_IMAGE = "image-b534b400d343eca3f9efe3dec6ae3f0446455f4c-1200x800-jpg";
export const R44_IMAGE = "image-49dad8bd7da33c5cf518f2df8964a4b78fc94f3d-1200x799-jpg";
export const HANGAR_IMAGE = "image-3f320fe2f067daa82b5e3bdb9f8260ccc6ff919b-1600x645-jpg";

export const slides = [
	{ img: "/images/special-events.png", title: "Special Events", description: "Avoid the traffic and arrive in style at your special event.", link: "/flights/special-events" },
	{ img: "/images/london millennium dome.png", title: "London Sightseeing Tours", description: "The ultimate way to see this iconic city at its best.", link: "/flights/london-sightseeing-tours" },
	{ img: "/images/Trial lessons.png", title: "Helicopter Trial Lessons", description: "Discover the fun and manoeuvrability of a helicopter in 30 minutes!", link: "/flights/trial-lessons" },
	{ img: "/images/Local area tours.png", title: "Local Area Tours", description: "Experience the UK from the air with our local area tours.", link: "/flights/local-area-tours" },
];
