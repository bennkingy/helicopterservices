// Sets the Media library alt text on each image (asset altText), from SEO-IMAGES.md.
// The site falls back to this wherever a placement has no alt of its own.
//
// Dry run:  npx sanity exec scripts/update-image-alts.ts --with-user-token
// Apply:    npx sanity exec scripts/update-image-alts.ts --with-user-token -- --apply
import { client } from "./seed-utils";

const apply = process.argv.includes("--apply");
const entries: { id: string; altText: string }[] = [
	{
		"id": "image-0334428a9db7b05ded422a17aec88c8b4d9ecaca-542x305-jpg",
		"altText": "View from the back seat of two pilots flying a twin-engine helicopter"
	},
	{
		"id": "image-03a4b74846fb35f35a574a0031e3300a8bc209a1-251x253-webp",
		"altText": "Dr Ann Lechat wearing a headset in a helicopter cockpit"
	},
	{
		"id": "image-04be44f6d162c9d88189b1b99dc4ab62aeb4f430-1400x1400-jpg",
		"altText": "Student pilot at the controls of a Robinson R22 training helicopter"
	},
	{
		"id": "image-0c1a77b8a579dea3aad7d876e7ae7b001cd52096-1200x1200-jpg",
		"altText": "Pilots flying a helicopter towards sea cliffs over turquoise water"
	},
	{
		"id": "image-0d1853d7f8e948a02e861e3add270fcd8f30b93b-2141x1254-jpg",
		"altText": "Red Robinson helicopter flying over water"
	},
	{
		"id": "image-10230ec3433b34f93d0caae2d7ad7716b0b91e61-541x357-jpg",
		"altText": "Instrument panel and flight controls inside a twin-engine helicopter cockpit"
	},
	{
		"id": "image-109bddb9acbd64debc36f52d9399d0734dff7248-1593x242-webp",
		"altText": "Twin Squirrel helicopter landed on a private lawn for a charter flight"
	},
	{
		"id": "image-176e146e3f5faad71379e47492b239300929e50c-3024x3350-jpg",
		"altText": "Captain Rob Parcell standing beside a helicopter in the hangar"
	},
	{
		"id": "image-1cc69c3f32ad9656960b50ef5dc4874fee6a47ce-1400x1050-webp",
		"altText": "Student pilot in a Robinson R22 helicopter ready for a trial lesson"
	},
	{
		"id": "image-1fac7c97e90a38e39b3244c59c8708c97db50970-1200x900-webp",
		"altText": "Flight instructor and smiling pilot in a helicopter cockpit"
	},
	{
		"id": "image-21e8f64791bbafaa171aea77ec7dcc844ce719bd-1400x1050-jpg",
		"altText": "Aerial view of the London Olympic Park and stadium from a helicopter"
	},
	{
		"id": "image-2236ccb9d3c3b505a0fb5b9bd5bcd8c905915b0e-1187x791-jpg",
		"altText": "Bride and bridesmaids beside a wedding helicopter on a country house lawn"
	},
	{
		"id": "image-225738e98c70c33f72a9b194e9f597d44d623884-1200x900-jpg",
		"altText": "Pilot flying a helicopter along a coastline of beaches and hills"
	},
	{
		"id": "image-244dedbb6070f71a5da823c768c6c0ce69533cde-720x960-webp",
		"altText": "London at night from a helicopter, with Tower Bridge lit up"
	},
	{
		"id": "image-2a1e251c313c59c0331ce612fd03b2e11ea72eb9-1964x1964-jpg",
		"altText": "Squirrel helicopter parked on a helipad in open countryside"
	},
	{
		"id": "image-2c9262636f3315890615df07f01a56bc9c82768c-1680x419-jpg",
		"altText": "Helicopter filming a Spitfire on a grass airfield"
	},
	{
		"id": "image-2d0ba939e97f3d4d687c3fb8c7685c0501dc8876-1680x419-jpg",
		"altText": "Helicopter cockpit instruments glowing during a night flight"
	},
	{
		"id": "image-3539977b6998753d2c6fa4fe22b4df278bc1c184-640x480-webp",
		"altText": "Helicopter lifting an underslung load over moorland"
	},
	{
		"id": "image-39afffc3c842d024c741193b6d7c2780288e6922-1024x768-webp",
		"altText": "View from the back seat of two pilots flying on instruments"
	},
	{
		"id": "image-39fe5d90efedcdba328a2a06f937fd04fd5e6ae9-1024x768-webp",
		"altText": "Sunset through the windscreen on a helicopter night rating flight"
	},
	{
		"id": "image-3ad1eb773538bac8744b9c48e77bcb919750a302-1200x1600-jpg",
		"altText": "Red Robinson helicopter landed beside towering sea cliffs"
	},
	{
		"id": "image-3da251c71de51ddccd5f7cf34c9dea9ad09926c3-1200x900-webp",
		"altText": "Pilot flying a helicopter along a coastline on an advanced flying trip"
	},
	{
		"id": "image-3e84abd25633cba92f0568c2f4ca3c6bdfed4ac7-1035x1118-jpg",
		"altText": "Flight instructors at a refresher seminar in the briefing room"
	},
	{
		"id": "image-3f320fe2f067daa82b5e3bdb9f8260ccc6ff919b-1600x645-jpg",
		"altText": "Robinson helicopters lined up inside the hangar at White Waltham"
	},
	{
		"id": "image-41ea00ea44457f499c5620fc7aea8245ffa0e227-1024x768-jpg",
		"altText": "Instructor running the FNPT II helicopter simulator with a student in the cockpit"
	},
	{
		"id": "image-421211519ae5121607d4d0bc01128a89efad11a2-1200x899-jpg",
		"altText": "Aerial view of a Heathrow Airport runway with aircraft at the terminals"
	},
	{
		"id": "image-43f82e5118786418324cfa1c8de75e6e93bae80c-1680x419-jpg",
		"altText": "Instructor at the FNPT II helicopter simulator control station"
	},
	{
		"id": "image-45584955fe4047d3f0e6eb9cc8efc369a7ab0d4a-1035x1118-webp",
		"altText": "Helicopter instructors in a refresher seminar briefing"
	},
	{
		"id": "image-47f390848731f4acf490c82ce71629dbdf30e5ef-1200x800-jpg",
		"altText": "Aerial view of Waddesdon Manor and its gardens from a helicopter"
	},
	{
		"id": "image-4973316ce5d37216181b1491384a2cb7ea9bd218-1672x419-jpg",
		"altText": "Robinson R22 and a red helicopter on the grass ready for trial lessons"
	},
	{
		"id": "image-4b11a1e7b5e84d5b2b286d47a632cdb2f8f4c0d4-265x266-webp",
		"altText": "Twin Squirrel helicopter fitted with a nose-mounted camera for aerial filming"
	},
	{
		"id": "image-5363bb5a21c26e0e5167a54397d80b7a64570c53-1279x1279-jpg",
		"altText": "Red Robinson helicopter flying over water"
	},
	{
		"id": "image-53f2e838a35e22927bb3f6bb53094a7288a216aa-1200x900-webp",
		"altText": "Helicopters landed on a lakeside lawn during a fly-away trip"
	},
	{
		"id": "image-54b549bb4b290e24c17495cef68c9ef46f7c5862-330x330-jpg",
		"altText": "Helicopter lifting a load next to a tall tower"
	},
	{
		"id": "image-55a9c223da59335327cbb29c801bced208e9a719-1118x620-jpg",
		"altText": "Leonardo AW109 twin-engine helicopter on an airport apron"
	},
	{
		"id": "image-56b99e5847a75171532e8af94a50a291d3e4c960-686x485-jpg",
		"altText": "Bell 505 helicopter on a helipad"
	},
	{
		"id": "image-5728fb9600e56c170d953fb26a54f9c2b14bf9d8-251x253-webp",
		"altText": "Captain Peter Wilson in front of a red helicopter in the hangar"
	},
	{
		"id": "image-5f8f736371753f0411f599233bf1a79b94707bdc-330x330-jpg",
		"altText": "Bride and bridesmaids beside a wedding helicopter on a country house lawn"
	},
	{
		"id": "image-60e72d0df6aa15d699ebce3c6b1a75790f1deafc-1024x685-webp",
		"altText": "Helicopter landing at a London helipad next to the O2"
	},
	{
		"id": "image-614ce907fe7c220aa9ce5b6c902fb94fedff8ffc-494x554-png",
		"altText": "Helicopter lifting a load beside Tower Bridge in London"
	},
	{
		"id": "image-641beff88977f6ce784aac101e508efcafabbd9c-1024x768-jpg",
		"altText": "View from the back seat of a helicopter cockpit with two pilots"
	},
	{
		"id": "image-6850e3b27d428660cb282cb2665a9e78e2a74eb8-185x185-jpg",
		"altText": "Captain Leon Smith with an aviation award at a Breitling awards dinner"
	},
	{
		"id": "image-69ce6bee97af0a3fd0f74e538cb42a813d0052c8-993x1109-png",
		"altText": "The silver Britannia Trophy statuette"
	},
	{
		"id": "image-6de85404adce24a994a5b8568e7ccaf494908481-1200x1176-jpg",
		"altText": "Photographer shooting from the open door of a helicopter over the sea"
	},
	{
		"id": "image-70fd70ae86240c7daa8bf4ec6ad7bf6821d9647e-1170x1028-jpg",
		"altText": "Aerial photo of a racing yacht under full sail"
	},
	{
		"id": "image-71af7b72b19fa64ba8180651f891cb45274476ee-1035x1118-webp",
		"altText": "Helicopter instructors in a classroom briefing"
	},
	{
		"id": "image-7282a448d20480ace4dba40ed877a30703ed46ab-330x330-jpg",
		"altText": "Helicopter filming a Spitfire as it taxis on a grass airfield"
	},
	{
		"id": "image-758ee72eca09c0360772b0817a8dc54b9a8a7c66-496x554-png",
		"altText": "Twin Squirrel helicopter on the apron under a rainbow"
	},
	{
		"id": "image-7804a458a2cc6fb3916738247e1da902a337bb6c-1054x949-png",
		"altText": "Helicopter Services open day poster for Friday 22 May 2026 at White Waltham"
	},
	{
		"id": "image-7f56a969b4829614bbcc9ae45ad8c54b5701c652-1024x768-webp",
		"altText": "Pilot flying a helicopter past white chalk cliffs"
	},
	{
		"id": "image-819e783a423078a51a3e9065f3eadab9145531f5-1200x899-webp",
		"altText": "Helicopter on the apron at night under a full moon"
	},
	{
		"id": "image-83bdb9102864d0f3bf274c550ff89b860215d2bb-1024x1024-jpg",
		"altText": "Cabri G2 training helicopter hovering above the grass"
	},
	{
		"id": "image-848689487eb6df109f9be46dac32666331cc0f88-1400x1050-webp",
		"altText": "Aerial view of Canary Wharf and the London skyline from a helicopter"
	},
	{
		"id": "image-870218bb08b8402a29c9675801304ad5c93fc221-591x554-png",
		"altText": "Pilot flying a Robinson helicopter over the countryside"
	},
	{
		"id": "image-8972cdec675dc9b780d17d68ef5c17c7de341020-1922x583-svg",
		"altText": "Helicopter Services logo"
	},
	{
		"id": "image-89f2367e26b21b6d32fc388f91fb4ea5eec6b895-2107x984-jpg",
		"altText": "Helicopters parked inside the Helicopter Services hangar at White Waltham"
	},
	{
		"id": "image-8c40839c8b700368bca269e66e02dd278d74905a-330x410-webp",
		"altText": "Helicopter lifting a load beside Tower Bridge in London"
	},
	{
		"id": "image-905d94dd23603a616715c728d90547d2d86607c2-1200x800-webp",
		"altText": "Robinson R22 training helicopter lifting off from a grass airfield"
	},
	{
		"id": "image-9081da14df03449f91749f006362f26316c2354d-2217x2803-jpg",
		"altText": "Alex Barrett standing beside a helicopter in the hangar"
	},
	{
		"id": "image-95133e0594dc909a8bc6b0cf09de040dccddbc4e-373x372-jpg",
		"altText": "Squirrel helicopter landed on grass under a blue sky"
	},
	{
		"id": "image-96459cfd5a7d16feb683e314460d1f179e32d777-404x604-webp",
		"altText": "Helicopter lowering a load next to a tall tower"
	},
	{
		"id": "image-977368ae3e938a0cb4008a517de3cb03a0264dde-920x414-jpg",
		"altText": "Helicopter on the helipad at Silverstone"
	},
	{
		"id": "image-9915b634a9e40bd0a40f372ac03e69da5e16aba5-1200x800-jpg",
		"altText": "Aerial view of a village and countryside on a local helicopter tour"
	},
	{
		"id": "image-9c34dc7cc369bb54afd28ad4611f6ab89a74273b-1679x419-png",
		"altText": "Helicopter lifting an underslung load over the hills"
	},
	{
		"id": "image-9e47c7bafa60fefee4c37ed2f67eaac042e11ff9-1200x1600-webp",
		"altText": "Robinson helicopter cockpit view flying over a sandy beach"
	},
	{
		"id": "image-a101f47275db57786c35382c307e6138268789da-238x238-jpg",
		"altText": "Helicopter filming a Spitfire on a grass airfield"
	},
	{
		"id": "image-a91edd654dccae68176b7903dc2586bd12fd0f97-1916x582-svg",
		"altText": "Helicopter Services logo"
	},
	{
		"id": "image-b0089479789c970d270fcea18b0182e1f90b88b7-1200x900-webp",
		"altText": "Helicopter cockpit moving map while flying over a river valley"
	},
	{
		"id": "image-b016c7e6db54b4b10729edc7edeb250465b0b13a-1200x800-jpg",
		"altText": "Aerial view of Waddesdon Manor on a local helicopter tour"
	},
	{
		"id": "image-b3c026696f906c5bae207e5c5eb004e09ce236f8-1526x1526-jpg",
		"altText": "Squirrel helicopter on a helipad in a grass field"
	},
	{
		"id": "image-b555e7ff0047c20d9884988ddfb90d7dea2e7a83-1200x800-webp",
		"altText": "Passengers in a Robinson R44 helicopter landed on grass"
	},
	{
		"id": "image-b582ebf0be6f005475248d04e57ceef4f2252ff0-1200x800-jpg",
		"altText": "Aerial view of patchwork fields from a helicopter tour"
	},
	{
		"id": "image-b764c9a7d73fe8b97a8d3823845f5b9a93d7da8a-251x253-webp",
		"altText": "Captain Jamie Anderson"
	},
	{
		"id": "image-b805a5eb639932072386bf4e3d78cb459338f5b9-1024x768-jpg",
		"altText": "Sunset through the cockpit windscreen on a night flight"
	},
	{
		"id": "image-c01b64fba7375e26a18adc5fab2d6dc69c121c1a-500x334-jpg",
		"altText": "Twin Squirrel helicopter landing at a helipad with Canary Wharf behind"
	},
	{
		"id": "image-d2471460647f4e993f04fe064612992f264eef70-238x241-png",
		"altText": "Britannia Trophy presentation at the Royal Aero Club awards"
	},
	{
		"id": "image-d3f70cd646e81ae7f4ce1382411a45f6c513b89d-1200x799-webp",
		"altText": "Pilots flying a helicopter towards sea cliffs over turquoise water"
	},
	{
		"id": "image-dc9d55ff31e4eec5d852fd3da0fdd1f06a670f41-1600x1068-jpg",
		"altText": "Bride arriving for her wedding in a helicopter"
	},
	{
		"id": "image-e2e2eb0a0135721c6da2bb3ebd2c477d0697185d-1200x900-webp",
		"altText": "Snow-covered mountains seen from a helicopter"
	},
	{
		"id": "image-e3d5377d120b42b2dc151ea137fb9a157a600505-1000x556-webp",
		"altText": "Helicopter filming a Spitfire on a grass airfield"
	},
	{
		"id": "image-e49e55ab3a318d82d8248fb6500a172122dfe566-1150x1274-jpg",
		"altText": "Captain Alexander Woodward in front of a Robinson helicopter"
	},
	{
		"id": "image-e69d8e45e15932b05d29c41b942332d493dae785-1680x611-jpg",
		"altText": "Helicopter lifting an underslung load over moorland"
	},
	{
		"id": "image-e9abd8e8d140c4496ef1429f2aaa375601473765-1680x419-jpg",
		"altText": "Twin Squirrel helicopter flying past the Canary Wharf skyline"
	},
	{
		"id": "image-eb0a99fe9faa3d5ec6e6ab3c9278de93cf5af6ce-1200x900-jpg",
		"altText": "Moving map in a Robinson helicopter cockpit over a river valley"
	},
	{
		"id": "image-ec0f523d686580c3e038f2c439c926de610b0283-1200x800-webp",
		"altText": "Instrument panel inside the FNPT II helicopter simulator"
	},
	{
		"id": "image-fa947b31163be0ed460253f1323281bc8946d267-1024x768-webp",
		"altText": "Instructor running a session on the FNPT II helicopter simulator"
	},
	{
		"id": "image-24de5e6ffa282e84a012bd728f5bb0dd1bda2262-1200x799-jpg",
		"altText": "Agusta Bell 206 JetRanger helicopter"
	},
	{
		"id": "image-90d25b724e3a207a0e3f094d44162615aefbc460-1200x800-jpg",
		"altText": "Airbus AS350 Squirrel helicopter"
	},
	{
		"id": "image-b23b2125e137a14d778641de2b53f53cd24d2a81-1200x800-jpg",
		"altText": "Airbus AS355 Twin Squirrel helicopter"
	},
	{
		"id": "image-7d37ddf47efd3de9efa715aa50f6e8c75a2fa3bf-1155x770-jpg",
		"altText": "Leonardo AW109 twin-engine helicopter"
	},
	{
		"id": "image-b534b400d343eca3f9efe3dec6ae3f0446455f4c-1200x800-jpg",
		"altText": "Robinson R22 training helicopter"
	},
	{
		"id": "image-49dad8bd7da33c5cf518f2df8964a4b78fc94f3d-1200x799-jpg",
		"altText": "Robinson R44 helicopter"
	},
	{
		"id": "image-a04b00dc82624494da03b1fe643f4dba45e11283-1080x720-webp",
		"altText": "Robinson R66 turbine helicopter"
	},
	{
		"id": "image-ad28ef0a7c33701473b42ad273dce1bffbd3edb7-700x467-webp",
		"altText": "Instructor and pilot navigating a Robinson helicopter over lakes and towns"
	}
];

async function main() {
	const transaction = client.transaction();
	let changed = 0;

	// 1. The alt text on each image in the Media library.
	const current = await client.fetch<{ _id: string; altText?: string }[]>(
		`*[_id in $ids]{ _id, altText }`,
		{ ids: entries.map((e) => e.id) },
	);
	const byId = new Map(current.map((d) => [d._id, d.altText]));
	for (const entry of entries) {
		if (!byId.has(entry.id)) {
			console.log(`missing asset ${entry.id}`);
			continue;
		}
		if (byId.get(entry.id) === entry.altText) continue;
		console.log(`${entry.id}\n  - ${byId.get(entry.id) ?? ""}\n  + ${entry.altText}`);
		transaction.patch(entry.id, (patch) => patch.set({ altText: entry.altText }));
		changed++;
	}

	// 2. An "alt" set on a particular use of an image overrides the Media library
	// alt text, so replace any that differ (e.g. old placeholders like "fancy helicopter").
	const altById = new Map(entries.map((e) => [e.id, e.altText]));
	const docs = await client.fetch<Record<string, unknown>[]>(
		`*[references($ids) && !(_type match "sanity.*")]`,
		{ ids: entries.map((e) => e.id) },
	);
	for (const doc of docs) {
		const set: Record<string, string> = {};
		const walk = (value: unknown, path: string) => {
			if (Array.isArray(value)) {
				value.forEach((item, i) => {
					const key = item && typeof item === "object" && "_key" in item ? item._key : null;
					walk(item, key ? `${path}[_key=="${key}"]` : `${path}[${i}]`);
				});
			} else if (value && typeof value === "object") {
				const ref = (value as { asset?: { _ref?: string } }).asset?._ref;
				const target = ref ? altById.get(ref) : undefined;
				const alt = (value as { alt?: string }).alt;
				if (target && alt && alt !== target) set[`${path}.alt`] = target;
				for (const [field, child] of Object.entries(value)) {
					if (field !== "asset") walk(child, path ? `${path}.${field}` : field);
				}
			}
		};
		walk(doc, "");
		if (!Object.keys(set).length) continue;
		for (const [path, value] of Object.entries(set)) {
			console.log(`${doc._id} ${path}\n  + ${value}`);
		}
		transaction.patch(doc._id as string, (patch) => patch.set(set));
		changed++;
	}

	console.log(`\n${changed} image(s) or document(s) to update.`);
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
