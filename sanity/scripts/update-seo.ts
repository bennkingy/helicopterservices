// Sets the SEO title and description on every page, from SEO-TITLES-DESCRIPTIONS.md.
// Also updates any unpublished draft, so publishing it later won't undo this.
//
// Dry run (prints the changes):  npx sanity exec scripts/update-seo.ts --with-user-token
// Apply the changes:             npx sanity exec scripts/update-seo.ts --with-user-token -- --apply
import { client } from "./seed-utils";

const apply = process.argv.includes("--apply");

type Entry = { path: string; type: string; slug: string | null; seoTitle: string; seoDescription: string };

const entries: Entry[] = [
	{
		"path": "/",
		"type": "homepage",
		"slug": null,
		"seoTitle": "Helicopter Training, Charter & Tours | Helicopter Services",
		"seoDescription": "Helicopter training, charter, London tours, aerial filming and load lifting from White Waltham near Maidenhead. Over 25 years' experience."
	},
	{
		"path": "/training",
		"type": "training",
		"slug": "training",
		"seoTitle": "Helicopter Training, White Waltham | Helicopter Services",
		"seoDescription": "CAA and EASA approved helicopter training at White Waltham, near Maidenhead: PPL(H), CPL(H), instrument, type ratings and instructor courses."
	},
	{
		"path": "/training/private-pilot-licence",
		"type": "training",
		"slug": "private-pilot-licence",
		"seoTitle": "Private Pilot Licence PPL(H) | Helicopter Services",
		"seoDescription": "Learn to fly helicopters with a UK or EASA PPL(H). Training on the Robinson R22 at White Waltham, near Maidenhead, with expert instructors."
	},
	{
		"path": "/training/commercial-pilot-licence",
		"type": "training",
		"slug": "commercial-pilot-licence",
		"seoTitle": "Commercial Pilot Licence CPL(H) | Helicopter Services",
		"seoDescription": "Train for your commercial helicopter pilot licence, CPL(H), with modular UK and EASA training at White Waltham Airfield. Call to discuss costs."
	},
	{
		"path": "/training/instrument-rating",
		"type": "training",
		"slug": "instrument-rating",
		"seoTitle": "Helicopter Instrument Rating IR(H) | Helicopter Services",
		"seoDescription": "Integrated IR(H) helicopter instrument rating with PBN. Fly IFR down to a 200ft decision height. Simulator and flight training at White Waltham."
	},
	{
		"path": "/training/pbn",
		"type": "training",
		"slug": "pbn",
		"seoTitle": "Performance-Based Navigation (PBN) | Helicopter Services",
		"seoDescription": "Add a performance-based navigation (PBN) endorsement to your helicopter instrument rating, trained on our UK-approved FNPT II simulator."
	},
	{
		"path": "/training/night-rating",
		"type": "training",
		"slug": "night-rating",
		"seoTitle": "Helicopter Night Rating Course | Helicopter Services",
		"seoDescription": "Add a night rating to your PPL(H) or CPL(H). Build instrument skills and fly VFR at night with experienced instructors at White Waltham Airfield."
	},
	{
		"path": "/training/type-ratings",
		"type": "training",
		"slug": "type-ratings",
		"seoTitle": "Helicopter Type Ratings, 17+ Types | Helicopter Services",
		"seoDescription": "Add a helicopter type rating to your licence. Over 17 types available, including the AS355, AW109 and R66, with ground school and flying."
	},
	{
		"path": "/training/flight-instructor-certificates",
		"type": "training",
		"slug": "flight-instructor-certificates",
		"seoTitle": "Flight Instructor Course FI(H) | Helicopter Services",
		"seoDescription": "Become a helicopter flight instructor. Our full-time FI(H) course teaches you to fly and teach from the instructor's seat, at White Waltham."
	},
	{
		"path": "/training/flight-examiner-certificates",
		"type": "training",
		"slug": "flight-examiner-certificates",
		"seoTitle": "Flight Examiner FE(H) & TRE(H) Courses | Helicopter Services",
		"seoDescription": "Become a helicopter flight examiner. FE(H) and TRE(H) training for PPL and CPL skills tests and type rating examinations, at White Waltham."
	},
	{
		"path": "/training/flight-instructor-refresher-seminars",
		"type": "training",
		"slug": "flight-instructor-refresher-seminars",
		"seoTitle": "FI(H) & FE(H) Refresher Seminars | Helicopter Services",
		"seoDescription": "Flight instructor and examiner refresher seminars for helicopter pilots whose FI(H) or FE(H) is within a year of expiry. Held at White Waltham."
	},
	{
		"path": "/training/simulator",
		"type": "training",
		"slug": "simulator",
		"seoTitle": "FNPT II Helicopter Flight Simulator | Helicopter Services",
		"seoDescription": "Train on our UK-approved FNPT II helicopter simulator. Build instrument flying skills safely and cut the cost of your IR training at White Waltham."
	},
	{
		"path": "/training/advanced-flying-programme",
		"type": "training",
		"slug": "advanced-flying-programme",
		"seoTitle": "Advanced Helicopter Flying for PPL(H) | Helicopter Services",
		"seoDescription": "Keep your helicopter skills sharp after your PPL(H), with refresher flights, fly-aways to other airfields and structured courses with our instructors."
	},
	{
		"path": "/training/elcas",
		"type": "training",
		"slug": "elcas",
		"seoTitle": "ELCAS Helicopter Pilot Training | Helicopter Services",
		"seoDescription": "ELCAS Approved Learning Provider for military pilots moving into civil helicopter flying. Ask us about ELCAS and credit for your military experience."
	},
	{
		"path": "/flights",
		"type": "flights",
		"slug": "flights",
		"seoTitle": "Helicopter Flights near London | Helicopter Services",
		"seoDescription": "Book helicopter flights from White Waltham: London sightseeing tours, trial lessons, private charter, airport transfers and special event flights."
	},
	{
		"path": "/flights/london-sightseeing-tours",
		"type": "flights",
		"slug": "london-sightseeing-tours",
		"seoTitle": "London Helicopter Sightseeing Tours | Helicopter Services",
		"seoDescription": "See London's landmarks on a private twin-engine helicopter sightseeing tour from White Waltham. A perfect gift for birthdays, anniversaries and days out."
	},
	{
		"path": "/flights/trial-lessons",
		"type": "flights",
		"slug": "trial-lessons",
		"seoTitle": "Helicopter Trial Lessons & Gifts | Helicopter Services",
		"seoDescription": "Take the controls on a 30-minute helicopter trial lesson at White Waltham, near Maidenhead. The perfect gift experience, with a full briefing included."
	},
	{
		"path": "/flights/helicopter-charter",
		"type": "flights",
		"slug": "helicopter-charter",
		"seoTitle": "Private Helicopter Charter UK | Helicopter Services",
		"seoDescription": "Private helicopter charter to race meetings, the British Grand Prix, festivals and events. Arrive safely and on time, with over 25 years of VIP flights."
	},
	{
		"path": "/flights/airport-transfers",
		"type": "flights",
		"slug": "airport-transfers",
		"seoTitle": "Helicopter Airport Transfers London | Helicopter Services",
		"seoDescription": "Skip the traffic with a helicopter transfer to and from London airports and The London Heliport, in twin-engine helicopters from White Waltham."
	},
	{
		"path": "/flights/local-area-tours",
		"type": "flights",
		"slug": "local-area-tours",
		"seoTitle": "Chilterns Helicopter Rides & Tours | Helicopter Services",
		"seoDescription": "A 30-minute helicopter tour over the Chiltern Hills from White Waltham, from £380 for up to three people in a Robinson R44. Custom routes available."
	},
	{
		"path": "/flights/special-events",
		"type": "flights",
		"slug": "special-events",
		"seoTitle": "Wedding & Event Helicopter Hire | Helicopter Services",
		"seoDescription": "Helicopter hire for weddings, anniversaries and celebrations. Private flights to hotels, restaurants and private landing sites, tailored to your day."
	},
	{
		"path": "/industry",
		"type": "industry",
		"slug": "industry",
		"seoTitle": "Helicopter Industry Services | Helicopter Services",
		"seoDescription": "Helicopter services for industry: aerial filming and photography for TV and film, and load lifting of 800kg and more, across the UK and Europe."
	},
	{
		"path": "/industry/load-lifting",
		"type": "industry",
		"slug": "load-lifting",
		"seoTitle": "Helicopter Load Lifting Services | Helicopter Services",
		"seoDescription": "Lift loads of 800kg and more by helicopter, faster and cheaper than a crane, with minimal site disruption. Over 25 years of lifting in the UK and Europe."
	},
	{
		"path": "/industry/photography-filming",
		"type": "industry",
		"slug": "photography-filming",
		"seoTitle": "Aerial Filming & Photography | Helicopter Services",
		"seoDescription": "Helicopter aerial filming and photography for TV, film and advertising. Trusted by the BBC, ITV, Sky and Channel 4, with over 25 years' experience."
	},
	{
		"path": "/fleet",
		"type": "fleet",
		"slug": "fleet",
		"seoTitle": "Our Helicopter Fleet | Helicopter Services",
		"seoDescription": "Explore our helicopter fleet, from the Robinson R22 and R44 to the twin-engine AS355 and AW109, used for training, charter and aerial work."
	},
	{
		"path": "/fleet/r22",
		"type": "fleet",
		"slug": "r22",
		"seoTitle": "Robinson R22 Training Helicopter | Helicopter Services",
		"seoDescription": "The Robinson R22, our two-seat training helicopter for PPL(H) students and trial lessons. Safe, simple and efficient, based at White Waltham."
	},
	{
		"path": "/fleet/r44",
		"type": "fleet",
		"slug": "r44",
		"seoTitle": "Robinson R44 Helicopter | Helicopter Services",
		"seoDescription": "The Robinson R44, a four-seat helicopter for training, sightseeing tours and aerial photography. Fly with us from White Waltham, near Maidenhead."
	},
	{
		"path": "/fleet/r66",
		"type": "fleet",
		"slug": "r66",
		"seoTitle": "Robinson R66 Turbine Helicopter | Helicopter Services",
		"seoDescription": "The Robinson R66, a five-seat turbine helicopter with a Rolls-Royce engine, used for training, type ratings, charter and aerial work at White Waltham."
	},
	{
		"path": "/fleet/ab206",
		"type": "fleet",
		"slug": "ab206",
		"seoTitle": "Agusta Bell 206 JetRanger | Helicopter Services",
		"seoDescription": "The AB206 JetRanger, a reliable five-seat turbine helicopter used for training, charter and aerial work from our base at White Waltham Airfield."
	},
	{
		"path": "/fleet/as350",
		"type": "fleet",
		"slug": "as350",
		"seoTitle": "Airbus AS350 Squirrel Helicopter | Helicopter Services",
		"seoDescription": "The AS350 Single Squirrel, a high-performance turbine helicopter for up to five passengers, used for training, charter and aerial work at White Waltham."
	},
	{
		"path": "/fleet/as355",
		"type": "fleet",
		"slug": "as355",
		"seoTitle": "Airbus AS355 Twin Squirrel | Helicopter Services",
		"seoDescription": "The AS355 Twin Squirrel, our twin-engine helicopter for charter, training, filming and load lifting up to 800kg. Five passengers, at White Waltham."
	},
	{
		"path": "/fleet/aw109",
		"type": "fleet",
		"slug": "aw109",
		"seoTitle": "Leonardo AW109 Helicopter | Helicopter Services",
		"seoDescription": "The AW109, a fast twin-engine executive helicopter for up to seven passengers. Ideal for VIP charter and airport transfers from White Waltham."
	},
	{
		"path": "/about-us",
		"type": "about",
		"slug": "about-us",
		"seoTitle": "About Our Helicopter Company | Helicopter Services",
		"seoDescription": "With over 25 years' experience, Helicopter Services offers helicopter training, charter, tours, filming and load lifting from its White Waltham hangar."
	},
	{
		"path": "/about-us/faqs",
		"type": "about",
		"slug": "faqs",
		"seoTitle": "Helicopter Training & Flight FAQs | Helicopter Services",
		"seoDescription": "Answers to common questions about learning to fly helicopters: how long a PPL(H) takes, ground exams, medicals, safety, staying current and booking."
	},
	{
		"path": "/about-us/meet-the-team",
		"type": "about",
		"slug": "meet-the-team",
		"seoTitle": "Meet Our Pilots & Instructors | Helicopter Services",
		"seoDescription": "Meet the experienced helicopter pilots, instructors and examiners at Helicopter Services, here to help you get the best out of helicopter flying."
	},
	{
		"path": "/about-us/the-hangar",
		"type": "about",
		"slug": "the-hangar",
		"seoTitle": "Our Hangar at White Waltham Airfield | Helicopter Services",
		"seoDescription": "Visit our purpose-built helicopter hangar at White Waltham Airfield near Maidenhead, with private briefing rooms, easy parking and 7-day access."
	},
	{
		"path": "/legal/terms-and-conditions",
		"type": "legal",
		"slug": "terms-and-conditions",
		"seoTitle": "Terms & Conditions | Helicopter Services",
		"seoDescription": "The terms and conditions for using the Helicopter Services website and booking our helicopter training, flights and charter services."
	},
	{
		"path": "/legal/privacy",
		"type": "legal",
		"slug": "privacy",
		"seoTitle": "Privacy Policy | Helicopter Services",
		"seoDescription": "How Helicopter Services collects, uses and protects your personal information when you use our website or book training and flights with us."
	},
	{
		"path": "/legal/cookies",
		"type": "legal",
		"slug": "cookies",
		"seoTitle": "Cookie Policy | Helicopter Services",
		"seoDescription": "How the Helicopter Services website uses cookies, what they do, and how you can manage or turn off cookies in your browser settings."
	}
];

type Doc = { _id: string; seoTitle?: string; seoDescription?: string };

async function main() {
	const transaction = client.transaction();
	let changed = 0;
	const missing: string[] = [];

	for (const entry of entries) {
		const docs = await client.fetch<Doc[]>(
			entry.slug === null
				? `*[_type == $type]{ _id, seoTitle, seoDescription }`
				: `*[_type == $type && slug.current == $slug]{ _id, seoTitle, seoDescription }`,
			{ type: entry.type, slug: entry.slug ?? "" },
		);
		if (!docs.some((doc) => !doc._id.startsWith("drafts."))) missing.push(entry.path);
		for (const doc of docs) {
			if (doc.seoTitle === entry.seoTitle && doc.seoDescription === entry.seoDescription) continue;
			console.log(`
${entry.path} (${doc._id})`);
			if (doc.seoTitle !== entry.seoTitle) console.log(`  title  - ${doc.seoTitle ?? ""}
         + ${entry.seoTitle}`);
			if (doc.seoDescription !== entry.seoDescription)
				console.log(`  desc   - ${doc.seoDescription ?? ""}
         + ${entry.seoDescription}`);
			transaction.patch(doc._id, (patch) =>
				patch.set({ seoTitle: entry.seoTitle, seoDescription: entry.seoDescription }),
			);
			changed++;
		}
	}

	if (missing.length) console.log(`
No published document found for: ${missing.join(", ")}`);
	console.log(`
${changed} document(s) to update.`);
	if (!changed) return;
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
