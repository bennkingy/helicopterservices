// The homepage content as it was hard-coded before it moved to Sanity.
// The page falls back to these values for any field left empty in Sanity, and
// sanity/scripts/seed-homepage.ts uses them to pre-fill the Studio.
// Keep this file free of imports so the Studio seed script can load it too.

export type HomepageImage = {
	src: string;
	alt: string;
	width: number;
	height: number;
};

export type HomepageSection = {
	tag: string;
	heading: string;
	body: string[];
	mainImage: HomepageImage;
	secondaryImage: HomepageImage;
};

export type HomepageSlide = {
	title: string;
	description: string;
	link: string;
	img: string;
};

export type HomepageServiceCard = {
	title: string;
	description: string;
};

export const homepageDefaults = {
	seoTitle:
		"Helicopter Services - Expert Training, Charter, and Aerial Services",
	seoDescription:
		"Expert helicopter training, charter, and aerial services. Based at White Waltham Airfield, Maidenhead. London helicopter tours, photography, and more.",
	heroTitle: "Exceeding exacting\nindustry standards",
	services: {
		training: {
			title: "Training",
			description:
				"From beginner to advanced, you're in expert hands. UK CAA and EASA approved.",
		},
		flights: {
			title: "Flights",
			description:
				"Choose a leading UK helicopter company for your next flight.",
		},
		industry: {
			title: "Industry",
			description:
				"Elevating industry to new heights with film and lifting services.",
		},
		company: {
			title: "Our company",
			description:
				"Trust a company with over 25 years helicopter operating experence.",
		},
	},
	about: {
		tag: "About us",
		heading: "Over 25 years helicopter operating experience",
		body: [
			"We offer training from Private Pilot's Licence to Commercial, Instruments, Instructor, and Examiner Ratings. Our senior instructors/examiners in the UK provide type ratings on 17+ helicopter types, and advanced courses. For gifts, transfers, charters, photography, load lifting, flight learning, helicopter purchase, AOC management, or medical info, we're here.",
		],
		bulletPoints: [
			"Experienced pilots & instructors",
			"Professional & accommodating",
			"Excellent customer service",
			"Operating safely since 1998",
			"Exceeding exacting industry standards",
		],
		signatureName: "Captain Leon Smith",
		signatureRole: "Head of Training and Chief Pilot",
		signatureCompany: "Helicopter Services",
		mainImage: {
			src: "/images/grandad-helicopter.png",
			alt: "Helicopter Services",
			width: 1000,
			height: 1000,
		},
		secondaryImage: {
			src: "/images/helciopter-caves.jpg",
			alt: "Helicopter Services",
			width: 240,
			height: 240,
		},
	},
	training: {
		tag: "Training",
		heading: "From beginner to advanced, you're in expert hands",
		body: [
			"Our highly experienced instructors and examiners are among the UK's most senior. We provide type ratings for over 17+ helicopter types, along with Flight Instructor Refresher and Instrument Rating Examiner courses.",
			"Additionally, we offer a helicopter flight simulator for safe instrument flying skill development and an advanced programme to enhance PPL skills.",
		],
		mainImage: {
			src: "/images/flying.png",
			alt: "Helicopter Services",
			width: 1000,
			height: 1000,
		},
		secondaryImage: {
			src: "/images/cockpit.jpg",
			alt: "Helicopter Services",
			width: 240,
			height: 240,
		},
	},
	flights: {
		tag: "Flights",
		heading: "For gifts, swift transfers and private charters",
		slides: [
			{
				img: "/images/special-events.png",
				title: "Special Events",
				description:
					"Avoid the traffic and arrive in style at your special event.",
				link: "/flights/special-events",
			},
			{
				img: "/images/london millennium dome.png",
				title: "London Sightseeing Tours",
				description: "The ultimate way to see this iconic city at its best.",
				link: "/flights/london-sightseeing-tours",
			},
			{
				img: "/images/Trial lessons.png",
				title: "Helicopter Trial Lessons",
				description:
					"Discover the fun and manoeuvrability of a helicopter in 30 minutes!",
				link: "/flights/trial-lessons",
			},
			{
				img: "/images/Local area tours.png",
				title: "Local Area Tours",
				description:
					"Experience the UK from the air with our local area tours.",
				link: "/flights/local-area-tours",
			},
			{
				img: "/images/private-pilot-licence.png",
				title: "Private Pilot Licence",
				description: "Fly helicopters privately with a private pilot licence.",
				link: "/training/private-pilot-licence",
			},
		] as HomepageSlide[],
	},
	industry: {
		tag: "Industry",
		heading: "Elevating industry to new heights",
		body: [
			"We can help you get the best shots efficiently with over 20 years of experience in aerial photography and filming worldwide, in a range of locations from city skylines to mountainous regions, deserts, and oceans.",
			"Our credits include many promotional videos for blue-chip companies, feature films for BBC, ITV, Sky, Channel 4, news gathering missions and photography for national newspapers.",
		],
		mainImage: {
			src: "/images/loadlifting.png",
			alt: "Helicopter Services",
			width: 1000,
			height: 1000,
		},
		secondaryImage: {
			src: "/images/planes.jpg",
			alt: "Helicopter Services",
			width: 240,
			height: 240,
		},
	},
};
