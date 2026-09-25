// The main about page content as it was hard-coded before it moved to Sanity.
// The page falls back to these values for any field left empty in Sanity, and
// sanity/scripts/seed-about.ts uses them to pre-fill the Studio.
// Keep this file free of imports so the Studio seed script can load it too.

const image = (src: string, width: number, height: number, alt = "Helicopter Services") => ({
	src,
	alt,
	width,
	height,
});

export const aboutDefaults = {
	seoTitle: "About us - Helicopter Services",
	seoDescription: "Helicopter Services",
	heroTitle: "About Helicopter\nServices",
	intro: {
		tag: "About us",
		heading: "Making your flying experience outstanding",
		body: [
			"At Helicopter Services we have the aviation experience to make your experience of flying outstanding.",
			"From that excited adrenalin rush of your very first flight to the business end of examining a candidate's procedural flying for a commercial company we set out to make flying safe and fun for you.",
			"Our lovely new hangar with great facilities at White Waltham is so convenient for flying and we have built a team who are dedicated to helping you enjoy and advance your flying.",
			"If you feel like joining the “Aviation Nation, Helicopter Tribe” please contact us... and be aware that this helicopter flying malarkey is addictive!",
		],
		signatureName: "Captain Leon Smith",
		signatureRole: "Head of Training and Chief Pilot",
		signatureCompany: "Helicopter Services",
		mainImage: image("/images/flying.png", 1000, 1000),
		secondaryImage: image("/images/helciopter-caves.jpg", 240, 240),
	},
	award: {
		heading: "The Britannia Trophy 2018",
		body: [
			"We supported one of our own pilots with an advanced flying development programme. It was a proud moment when he was awarded the Britannia Trophy, 2018 by the Royal Aero Club of the United Kingdom nominated by the Helicopter Club of Great Britain for his Three Journeys Round project.",
			"Here Peter Wilson is pictured with our Head of Training, Leon Smith. Well done!",
		],
		mainImage: image("/images/trophy.png", 1000, 1000),
		secondaryImage: image("/images/trophy-award.png", 240, 240),
		logo: image("/images/the-royal-areo-club.png", 1000, 1000),
	},
	moreHeading: "More on Helicopter Services",
	moreNote: "Some of our helicopter fleet pages feature 3D tours of the cockpit.",
	servicesHeading: "Our services",
};
