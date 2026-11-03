# Image inventory and alt text

Built on 2026-10-08 from three sources: Sanity's image library (with every document that uses each image), the server HTML of all 40 live pages, and the image files in `public/`.

## Status (9 Oct 2026): done

- **In Sanity:** all the alt text below has been saved, using `sanity/scripts/update-image-alts.ts`, which is safe to re-run.
  - 93 images got Media library alt text: the 86 in section 1, plus the 7 fleet aircraft photos and "Russia Flight", which showed generic alt in fleet cards.
  - Placement-level alts that overrode it (e.g. "fancy helicopter", "London city helicopter") were replaced in 5 documents.
- **In code (not deployed yet):**
  - Every image query now falls back to the Media library alt text: `coalesce(alt, asset->altText)` on the landing, fleet, team and about pages. Two queries were reading a field that doesn't exist (`image.altText`).
  - `app/components/SanityImage.tsx` also checks the image's `alt`, then the `alt` prop (e.g. the page title on a hero), before "Helicopter Services".
- **Verified:** I built the current code separately and crawled all 40 pages. All 181 Sanity images render real alt text, and none fall back to "Helicopter Services".
- **On the live site now:** about 100 of them already show the new text, because those pages' queries already read the image's own alt text. The rest, the landing-page heroes and cards, team photos and fleet cards, follow once the code is deployed.

The tables below show the state before this work.

## Summary

| | Count |
| --- | --- |
| Sanity images | 147 |
| ↳ Used on published pages | 107 |
| ↳ ↳ Showing only generic or no alt text on the live site | **86** |
| ↳ Not used anywhere (safe to ignore or delete) | 40 |
| Image placements in Sanity with their own alt text set | 12 of 140 |
| `public/` image files | 111 |
| ↳ Used (in code or on a page) | 61 |
| ↳ Not used anywhere | 50 |

## Read this first: where the site takes alt text from

The code reads alt text from different places depending on where the image appears, so adding it in only one place won't always work:

| Where the image appears | Component | Alt text comes from |
| --- | --- | --- |
| Main and hero images, cards, single gallery images | `app/components/SanityImage.tsx` | The image's own **Alt text** in Sanity's media library (`asset->altText`). Single gallery images use the field's `alt`. |
| Images inside the page body | `app/components/Template.tsx:76` | The **alt** field on that image inside the body content |
| Gallery grids | `app/components/Template.tsx:126, 142` | The **alt** field on each gallery item |

If nothing is set, the site falls back to `alt="Helicopter Services"`. That's why about 400 images on the site currently have that exact alt.

**Safest option for now:** set alt text in **both** places, on the image itself in the media library and on the image field in the document.

**Better long-term:** a small code change so `SanityImage` and `Template.tsx` check every source in order: field `alt`, then asset `altText`, then the fallback. Then you'd only need to fill in one place. This has not been done; ask if you want it.

## Writing good alt text

- Describe what's in the photo, in plain words, in about 5–15 words. For example: "Robinson R44 helicopter landing at White Waltham Airfield".
- Use a place or service name only when it's actually in the picture. Don't stuff keywords.
- Don't start with "Image of" or "Photo of".
- Decorative images (icons, dividers, background textures) should have `alt=""`. Those live in code; see the last section.

---

## 1. Sanity images used on pages, with no real alt text (86)

Grouped by the document they're in. Fix these first. Click a file name to see the image.

The **Alt to add** column was written by looking at each image. Before using it, check:

- **Team photos:** the names come from the team member's document in Sanity. On the award photos, it isn't clear which person is which.
- **Landmarks:** named only where clearly identifiable (Tower Bridge, Canary Wharf, the O2, the Olympic Park, Heathrow, Silverstone). Country houses and coastlines are described, not named. Add the place name if you know it. Waddesdon Manor is confirmed and named.
- **Aircraft types:** named where recognisable (Robinson R22/R44, Squirrel, Twin Squirrel, AW109, Cabri G2, Bell 505). Check them against your own fleet.
- **The same image in several places:** it gets the same alt everywhere. That's fine, but you can tailor it per page if you like.

### about/about-us

| Image | Field | Size | Current alt on live site | Alt to add |
| --- | --- | --- | --- | --- |
| [helciopter-caves.jpg](https://cdn.sanity.io/images/0he7nz2b/production/3ad1eb773538bac8744b9c48e77bcb919750a302-1200x1600.jpg?w=400) | `intro.secondaryImage` | 1200×1600 | Helicopter Services | Red Robinson helicopter landed beside towering sea cliffs |
| [trophy.png](https://cdn.sanity.io/images/0he7nz2b/production/69ce6bee97af0a3fd0f74e538cb42a813d0052c8-993x1109.png?w=400) | `award.mainImage` | 993×1109 | Helicopter Services | The silver Britannia Trophy statuette |
| [flying.png](https://cdn.sanity.io/images/0he7nz2b/production/870218bb08b8402a29c9675801304ad5c93fc221-591x554.png?w=400) | `intro.mainImage` | 591×554 | Helicopter Services | Pilot flying a Robinson helicopter over the countryside |
| [trophy-award.png](https://cdn.sanity.io/images/0he7nz2b/production/d2471460647f4e993f04fe064612992f264eef70-238x241.png?w=400) | `award.secondaryImage` | 238×241 | Helicopter Services | Britannia Trophy presentation at the Royal Aero Club awards |

### about/meet-the-team

| Image | Field | Size | Current alt on live site | Alt to add |
| --- | --- | --- | --- | --- |
| [Flight Examiner Ratings - FE(H), TRE(H).jpg](https://cdn.sanity.io/images/0he7nz2b/production/641beff88977f6ce784aac101e508efcafabbd9c-1024x768.jpg?w=400) | `hero.image` | 1024×768 | Helicopter Services | View from the back seat of a helicopter cockpit with two pilots |

### about/the-hangar

| Image | Field | Size | Current alt on live site | Alt to add |
| --- | --- | --- | --- | --- |
| [hanger.jpg](https://cdn.sanity.io/images/0he7nz2b/production/89f2367e26b21b6d32fc388f91fb4ea5eec6b895-2107x984.jpg?w=400) | `hero.image` | 2107×984 | Helicopter Services | Helicopters parked inside the Helicopter Services hangar at White Waltham |

### fleet/fleet

| Image | Field | Size | Current alt on live site | Alt to add |
| --- | --- | --- | --- | --- |
| [White Waltham Helicopter Hanger.jpg](https://cdn.sanity.io/images/0he7nz2b/production/3f320fe2f067daa82b5e3bdb9f8260ccc6ff919b-1600x645.jpg?w=400) | `hero.image` | 1600×645 | Helicopter Services | Robinson helicopters lined up inside the hangar at White Waltham |

### flights/airport-transfers

| Image | Field | Size | Current alt on live site | Alt to add |
| --- | --- | --- | --- | --- |
| [Olympic stadium helicopter charter.jpg](https://cdn.sanity.io/images/0he7nz2b/production/21e8f64791bbafaa171aea77ec7dcc844ce719bd-1400x1050.jpg?w=400) | `mainImage` | 1400×1050 | Helicopter Services | Aerial view of the London Olympic Park and stadium from a helicopter |
| [bdca495f6518d6e51623358b3a22a068a5f33860-1024x685.webp](https://cdn.sanity.io/images/0he7nz2b/production/60e72d0df6aa15d699ebce3c6b1a75790f1deafc-1024x685.webp?w=400) | `body[].images[]` | 1024×685 | Helicopter Services | Helicopter landing at a London helipad next to the O2 |

### flights/flights

| Image | Field | Size | Current alt on live site | Alt to add |
| --- | --- | --- | --- | --- |
| [Trial lessons.jpg](https://cdn.sanity.io/images/0he7nz2b/production/04be44f6d162c9d88189b1b99dc4ab62aeb4f430-1400x1400.jpg?w=400) | `service[].image` | 1400×1400 | Helicopter Services | Student pilot at the controls of a Robinson R22 training helicopter |
| [Flights.jpg](https://cdn.sanity.io/images/0he7nz2b/production/225738e98c70c33f72a9b194e9f597d44d623884-1200x900.jpg?w=400) | `hero.image` | 1200×900 | Helicopter Services | Pilot flying a helicopter along a coastline of beaches and hills |
| [Aiport transfers.jpg](https://cdn.sanity.io/images/0he7nz2b/production/421211519ae5121607d4d0bc01128a89efad11a2-1200x899.jpg?w=400) | `service[].image` | 1200×899 | Helicopter Services | Aerial view of a Heathrow Airport runway with aircraft at the terminals |
| [wedding-helicopter-service.jpg](https://cdn.sanity.io/images/0he7nz2b/production/5f8f736371753f0411f599233bf1a79b94707bdc-330x330.jpg?w=400) | `service[].image` | 330×330 | Helicopter Services | Bride and bridesmaids beside a wedding helicopter on a country house lawn |
| [London sightseeing tours.webp](https://cdn.sanity.io/images/0he7nz2b/production/848689487eb6df109f9be46dac32666331cc0f88-1400x1050.webp?w=400) | `service[].image` | 1400×1050 | Helicopter Services | Aerial view of Canary Wharf and the London skyline from a helicopter |
| [BOSN battersea 1.jpg](https://cdn.sanity.io/images/0he7nz2b/production/95133e0594dc909a8bc6b0cf09de040dccddbc4e-373x372.jpg?w=400) | `service[].image` | 373×372 | Helicopter Services | Squirrel helicopter landed on grass under a blue sky |
| [Local area tours.jpg](https://cdn.sanity.io/images/0he7nz2b/production/b016c7e6db54b4b10729edc7edeb250465b0b13a-1200x800.jpg?w=400) | `service[].image` | 1200×800 | Helicopter Services | Aerial view of Waddesdon Manor on a local helicopter tour |

### flights/helicopter-charter

| Image | Field | Size | Current alt on live site | Alt to add |
| --- | --- | --- | --- | --- |
| [Helicopter charter.webp](https://cdn.sanity.io/images/0he7nz2b/production/109bddb9acbd64debc36f52d9399d0734dff7248-1593x242.webp?w=400) | `mainImage` | 1593×242 | Helicopter Services | Twin Squirrel helicopter landed on a private lawn for a charter flight |
| [Olympic stadium helicopter charter.jpg](https://cdn.sanity.io/images/0he7nz2b/production/21e8f64791bbafaa171aea77ec7dcc844ce719bd-1400x1050.jpg?w=400) | `body[].images[]` | 1400×1050 | Helicopter Services | Aerial view of the London Olympic Park and stadium from a helicopter |

### flights/local-area-tours

| Image | Field | Size | Current alt on live site | Alt to add |
| --- | --- | --- | --- | --- |
| [Another local helcopter tour in action.jpg](https://cdn.sanity.io/images/0he7nz2b/production/47f390848731f4acf490c82ce71629dbdf30e5ef-1200x800.jpg?w=400) | `mainImage` | 1200×800 | Helicopter Services | Aerial view of Waddesdon Manor and its gardens from a helicopter |
| [More local helcopter tour in action.jpg](https://cdn.sanity.io/images/0he7nz2b/production/9915b634a9e40bd0a40f372ac03e69da5e16aba5-1200x800.jpg?w=400) | `body[].images[]` | 1200×800 | Helicopter Services | Aerial view of a village and countryside on a local helicopter tour |
| [Local area tours.jpg](https://cdn.sanity.io/images/0he7nz2b/production/b016c7e6db54b4b10729edc7edeb250465b0b13a-1200x800.jpg?w=400) | `body[].images[]` | 1200×800 | Helicopter Services | Aerial view of Waddesdon Manor on a local helicopter tour |
| [Local area tour trip.webp](https://cdn.sanity.io/images/0he7nz2b/production/b555e7ff0047c20d9884988ddfb90d7dea2e7a83-1200x800.webp?w=400) | `body[].images[]` | 1200×800 | Helicopter Services | Passengers in a Robinson R44 helicopter landed on grass |
| [Local helcopter tour in action.jpg](https://cdn.sanity.io/images/0he7nz2b/production/b582ebf0be6f005475248d04e57ceef4f2252ff0-1200x800.jpg?w=400) | `body[].images[]` | 1200×800 | Helicopter Services | Aerial view of patchwork fields from a helicopter tour |

### flights/london-sightseeing-tours

| Image | Field | Size | Current alt on live site | Alt to add |
| --- | --- | --- | --- | --- |
| [Olympic stadium helicopter charter.jpg](https://cdn.sanity.io/images/0he7nz2b/production/21e8f64791bbafaa171aea77ec7dcc844ce719bd-1400x1050.jpg?w=400) | `body[].images[]` | 1400×1050 | Helicopter Services | Aerial view of the London Olympic Park and stadium from a helicopter |
| [London sightseeing tours.webp](https://cdn.sanity.io/images/0he7nz2b/production/848689487eb6df109f9be46dac32666331cc0f88-1400x1050.webp?w=400) | `body[].images[]` | 1400×1050 | Helicopter Services | Aerial view of Canary Wharf and the London skyline from a helicopter |
| [dome.jpg](https://cdn.sanity.io/images/0he7nz2b/production/e9abd8e8d140c4496ef1429f2aaa375601473765-1680x419.jpg?w=400) | `mainImage` | 1680×419 | Helicopter Services | Twin Squirrel helicopter flying past the Canary Wharf skyline |

### flights/special-events

| Image | Field | Size | Current alt on live site | Alt to add |
| --- | --- | --- | --- | --- |
| [Special Events.jpg](https://cdn.sanity.io/images/0he7nz2b/production/2236ccb9d3c3b505a0fb5b9bd5bcd8c905915b0e-1187x791.jpg?w=400) | `mainImage` | 1187×791 | Helicopter Services | Bride and bridesmaids beside a wedding helicopter on a country house lawn |
| [wedding-helicopter-service.jpg](https://cdn.sanity.io/images/0he7nz2b/production/5f8f736371753f0411f599233bf1a79b94707bdc-330x330.jpg?w=400) | `body[].images[]` | 330×330 | Helicopter Services | Bride and bridesmaids beside a wedding helicopter on a country house lawn |
| [Phillip & Vanessa wedding arrival.jpg](https://cdn.sanity.io/images/0he7nz2b/production/dc9d55ff31e4eec5d852fd3da0fdd1f06a670f41-1600x1068.jpg?w=400) | `body[].images[]` | 1600×1068 | Helicopter Services | Bride arriving for her wedding in a helicopter |

### flights/trial-lessons

| Image | Field | Size | Current alt on live site | Alt to add |
| --- | --- | --- | --- | --- |
| [b3ca1f749f901ff5bbb4e534554597256ec9d8f9-1400x1050.webp](https://cdn.sanity.io/images/0he7nz2b/production/1cc69c3f32ad9656960b50ef5dc4874fee6a47ce-1400x1050.webp?w=400) | `body[].images[]` | 1400×1050 | Helicopter Services | Student pilot in a Robinson R22 helicopter ready for a trial lesson |
| [Trail Lessons.jpg](https://cdn.sanity.io/images/0he7nz2b/production/4973316ce5d37216181b1491384a2cb7ea9bd218-1672x419.jpg?w=400) | `mainImage` | 1672×419 | Helicopter Services | Robinson R22 and a G-EFOF helicopter on the grass ready for trial lessons |

### helicopter/cabri-g2 *(not a page on the site, low priority)*

| Image | Field | Size | Current alt on live site | Alt to add |
| --- | --- | --- | --- | --- |
| [aircraft-helicopter-turbine-bell-helicopters-429-369466_b0aa7da44fb8d1b2_920X485.jpg](https://cdn.sanity.io/images/0he7nz2b/production/977368ae3e938a0cb4008a517de3cb03a0264dde-920x414.jpg?w=400) | `mainImage` | 920×414 | *(not in server HTML)* | Helicopter on the helipad at Silverstone |

### helicopter/r22 *(not a page on the site, low priority)*

| Image | Field | Size | Current alt on live site | Alt to add |
| --- | --- | --- | --- | --- |
| [aircraft-helicopter-turbine-leonardo-aw109sp-grand-new-369552_6452fcdcf9a8236b.jpg](https://cdn.sanity.io/images/0he7nz2b/production/55a9c223da59335327cbb29c801bced208e9a719-1118x620.jpg?w=400) | `mainImage` | 1118×620 | *(not in server HTML)* | Leonardo AW109 twin-engine helicopter on an airport apron |

### helicopter/r44 *(not a page on the site, low priority)*

| Image | Field | Size | Current alt on live site | Alt to add |
| --- | --- | --- | --- | --- |
| [aircraft-helicopter-turbine-bell-helicopters-505-jetranger-x-369631_17df885eb4354643_920X485.jpg](https://cdn.sanity.io/images/0he7nz2b/production/56b99e5847a75171532e8af94a50a291d3e4c960-686x485.jpg?w=400) | `mainImage` | 686×485 | *(not in server HTML)* | Bell 505 helicopter on a helipad |

### homepage/53d6bf4f-9266-4e3c-b8bd-4834bfca47b5

| Image | Field | Size | Current alt on live site | Alt to add |
| --- | --- | --- | --- | --- |
| [cockpit.jpg](https://cdn.sanity.io/images/0he7nz2b/production/10230ec3433b34f93d0caae2d7ad7716b0b91e61-541x357.jpg?w=400) | `training.secondaryImage` | 541×357 | Helicopter Services | Instrument panel and flight controls inside a twin-engine helicopter cockpit |
| [helciopter-caves.jpg](https://cdn.sanity.io/images/0he7nz2b/production/3ad1eb773538bac8744b9c48e77bcb919750a302-1200x1600.jpg?w=400) | `about.secondaryImage` | 1200×1600 | Helicopter Services | Red Robinson helicopter landed beside towering sea cliffs |
| [loadlifting.png](https://cdn.sanity.io/images/0he7nz2b/production/614ce907fe7c220aa9ce5b6c902fb94fedff8ffc-494x554.png?w=400) | `industry.mainImage` | 494×554 | Helicopter Services | Helicopter lifting a load beside Tower Bridge in London |
| [grandad-helicopter.png](https://cdn.sanity.io/images/0he7nz2b/production/758ee72eca09c0360772b0817a8dc54b9a8a7c66-496x554.png?w=400) | `about.mainImage` | 496×554 | Helicopter Services | Twin Squirrel helicopter on the apron under a rainbow |
| [flying.png](https://cdn.sanity.io/images/0he7nz2b/production/870218bb08b8402a29c9675801304ad5c93fc221-591x554.png?w=400) | `training.mainImage` | 591×554 | Helicopter Services | Pilot flying a Robinson helicopter over the countryside |
| [planes.jpg](https://cdn.sanity.io/images/0he7nz2b/production/a101f47275db57786c35382c307e6138268789da-238x238.jpg?w=400) | `industry.secondaryImage` | 238×238 | Helicopter Services | Helicopter filming a Spitfire on a grass airfield |

### industry/industry

| Image | Field | Size | Current alt on live site | Alt to add |
| --- | --- | --- | --- | --- |
| [load-lifting.jpg](https://cdn.sanity.io/images/0he7nz2b/production/54b549bb4b290e24c17495cef68c9ef46f7c5862-330x330.jpg?w=400) | `service[].image` | 330×330 | Helicopter Services | Helicopter lifting a load next to a tall tower |
| [BOSN battersea 1.jpg](https://cdn.sanity.io/images/0he7nz2b/production/7282a448d20480ace4dba40ed877a30703ed46ab-330x330.jpg?w=400) | `service[].image` | 330×330 | Helicopter Services | Helicopter filming a Spitfire as it taxis on a grass airfield |
| [aerial-work.jpg](https://cdn.sanity.io/images/0he7nz2b/production/e69d8e45e15932b05d29c41b942332d493dae785-1680x611.jpg?w=400) | `hero.image` | 1680×611 | Helicopter Services | Helicopter lifting an underslung load over moorland |
| [aerial-work.jpg](https://cdn.sanity.io/images/0he7nz2b/production/e69d8e45e15932b05d29c41b942332d493dae785-1680x611.jpg?w=400) | `mainImage` | 1680×611 | Helicopter Services | Helicopter lifting an underslung load over moorland |

### industry/load-lifting

| Image | Field | Size | Current alt on live site | Alt to add |
| --- | --- | --- | --- | --- |
| [91a6ade8b0407c8eb5323f9b0880444eb6248327-640x480.webp](https://cdn.sanity.io/images/0he7nz2b/production/3539977b6998753d2c6fa4fe22b4df278bc1c184-640x480.webp?w=400) | `body[].images[]` | 640×480 | Helicopter Services | Helicopter lifting an underslung load over moorland |
| [1448d78ce469a98696720c4ed590fa6402950922-330x410.webp](https://cdn.sanity.io/images/0he7nz2b/production/8c40839c8b700368bca269e66e02dd278d74905a-330x410.webp?w=400) | `body[].images[]` | 330×410 | Helicopter Services | Helicopter lifting a load beside Tower Bridge in London |
| [a3e4ad2f4d1d4f3b30e93eea43e1ea4c133aec3b-404x604.webp](https://cdn.sanity.io/images/0he7nz2b/production/96459cfd5a7d16feb683e314460d1f179e32d777-404x604.webp?w=400) | `body[].images[]` | 404×604 | Helicopter Services | Helicopter lowering a load next to a tall tower |
| [Load Lifting.png](https://cdn.sanity.io/images/0he7nz2b/production/9c34dc7cc369bb54afd28ad4611f6ab89a74273b-1679x419.png?w=400) | `mainImage` | 1679×419 | Helicopter Services | Helicopter lifting an underslung load over the hills |

### industry/photography-filming

| Image | Field | Size | Current alt on live site | Alt to add |
| --- | --- | --- | --- | --- |
| [Photography and Filming.jpg](https://cdn.sanity.io/images/0he7nz2b/production/2c9262636f3315890615df07f01a56bc9c82768c-1680x419.jpg?w=400) | `mainImage` | 1680×419 | Helicopter Services | Helicopter filming a Spitfire on a grass airfield |
| [765212cc62ec3c0b946418c120a9d793091b38b1-265x266.webp](https://cdn.sanity.io/images/0he7nz2b/production/4b11a1e7b5e84d5b2b286d47a632cdb2f8f4c0d4-265x266.webp?w=400) | `body[].images[]` | 265×266 | Helicopter Services | Twin Squirrel helicopter fitted with a nose-mounted camera for aerial filming |
| [photography 2.jpg](https://cdn.sanity.io/images/0he7nz2b/production/6de85404adce24a994a5b8568e7ccaf494908481-1200x1176.jpg?w=400) | `body[].images[]` | 1200×1176 | Helicopter Services | Photographer shooting from the open door of a helicopter over the sea |
| [photography flight.jpg](https://cdn.sanity.io/images/0he7nz2b/production/70fd70ae86240c7daa8bf4ec6ad7bf6821d9647e-1170x1028.jpg?w=400) | `body[].images[]` | 1170×1028 | Helicopter Services | Aerial photo of a racing yacht under full sail |
| [dc9d68eb2e1d070106213b9a8f0895701908d8ea-1000x556.webp](https://cdn.sanity.io/images/0he7nz2b/production/e3d5377d120b42b2dc151ea137fb9a157a600505-1000x556.webp?w=400) | `body[].images[]` | 1000×556 | Helicopter Services | Helicopter filming a Spitfire on a grass airfield |

### page/4fb79be9-48ae-4490-8a35-2fe8f3a610b0 *(not a page on the site, low priority)*

| Image | Field | Size | Current alt on live site | Alt to add |
| --- | --- | --- | --- | --- |
| [dome.jpg](https://cdn.sanity.io/images/0he7nz2b/production/e9abd8e8d140c4496ef1429f2aaa375601473765-1680x419.jpg?w=400) | `pageBuilder[].image` | 1680×419 | Helicopter Services | Twin Squirrel helicopter flying past the Canary Wharf skyline |

### pilots/alexander-barrett *(team member photo, used on Meet the Team)*

| Image | Field | Size | Current alt on live site | Alt to add |
| --- | --- | --- | --- | --- |
| [Alex Barrett.jpg](https://cdn.sanity.io/images/0he7nz2b/production/9081da14df03449f91749f006362f26316c2354d-2217x2803.jpg?w=400) | `mainImage` | 2217×2803 | Helicopter Services | Alex Barrett standing beside a helicopter in the hangar |

### pilots/captain-alexander-woodward *(team member photo, used on Meet the Team)*

| Image | Field | Size | Current alt on live site | Alt to add |
| --- | --- | --- | --- | --- |
| [Alex Woodward v2.jpg](https://cdn.sanity.io/images/0he7nz2b/production/e49e55ab3a318d82d8248fb6500a172122dfe566-1150x1274.jpg?w=400) | `mainImage` | 1150×1274 | Helicopter Services | Captain Alexander Woodward in front of a Robinson helicopter |

### pilots/captain-jamie-anderson *(team member photo, used on Meet the Team)*

| Image | Field | Size | Current alt on live site | Alt to add |
| --- | --- | --- | --- | --- |
| [Jamie Anderson.webp](https://cdn.sanity.io/images/0he7nz2b/production/b764c9a7d73fe8b97a8d3823845f5b9a93d7da8a-251x253.webp?w=400) | `mainImage` | 251×253 | Helicopter Services | Captain Jamie Anderson |

### pilots/captain-leon-smith *(team member photo, used on Meet the Team)*

| Image | Field | Size | Current alt on live site | Alt to add |
| --- | --- | --- | --- | --- |
| [leon-trophy.jpg](https://cdn.sanity.io/images/0he7nz2b/production/6850e3b27d428660cb282cb2665a9e78e2a74eb8-185x185.jpg?w=400) | `mainImage` | 185×185 | Helicopter Services | Captain Leon Smith with an aviation award at a Breitling awards dinner |

### pilots/captain-peter-wilson *(team member photo, used on Meet the Team)*

| Image | Field | Size | Current alt on live site | Alt to add |
| --- | --- | --- | --- | --- |
| [Peter Wilson DSC_0438 _v2.webp](https://cdn.sanity.io/images/0he7nz2b/production/5728fb9600e56c170d953fb26a54f9c2b14bf9d8-251x253.webp?w=400) | `mainImage` | 251×253 | Helicopter Services | Captain Peter Wilson in front of a red helicopter in the hangar |

### pilots/captain-rob-parcell *(team member photo, used on Meet the Team)*

| Image | Field | Size | Current alt on live site | Alt to add |
| --- | --- | --- | --- | --- |
| [Rob website.jpg](https://cdn.sanity.io/images/0he7nz2b/production/176e146e3f5faad71379e47492b239300929e50c-3024x3350.jpg?w=400) | `mainImage` | 3024×3350 | Helicopter Services | Captain Rob Parcell standing beside a helicopter in the hangar |

### pilots/dr-ann-lechat *(team member photo, used on Meet the Team)*

| Image | Field | Size | Current alt on live site | Alt to add |
| --- | --- | --- | --- | --- |
| [Ann Lechat.webp](https://cdn.sanity.io/images/0he7nz2b/production/03a4b74846fb35f35a574a0031e3300a8bc209a1-251x253.webp?w=400) | `mainImage` | 251×253 | Helicopter Services | Dr Ann Lechat wearing a headset in a helicopter cockpit |

### promoPopup/promoPopup-open-day-2026 *(promo popup, currently switched off)*

| Image | Field | Size | Current alt on live site | Alt to add |
| --- | --- | --- | --- | --- |
| [open-day-v2.png](https://cdn.sanity.io/images/0he7nz2b/production/7804a458a2cc6fb3916738247e1da902a337bb6c-1054x949.png?w=400) | `image` | 1054×949 | *(not in server HTML)* | Helicopter Services open day poster for Friday 22 May 2026 at White Waltham |

### settings/764f3465-5aa7-4bed-bd26-6c63b0744907 *(site settings, e.g. logo or default image)*

| Image | Field | Size | Current alt on live site | Alt to add |
| --- | --- | --- | --- | --- |
| [LogoDarkVNew.ac3831f9.svg](https://cdn.sanity.io/images/0he7nz2b/production/8972cdec675dc9b780d17d68ef5c17c7de341020-1922x583.svg?w=400) | `logoLightMode` | 1922×583 | *(not in server HTML)* | Helicopter Services logo |
| [LogoLightV2New.115450be.svg](https://cdn.sanity.io/images/0he7nz2b/production/a91edd654dccae68176b7903dc2586bd12fd0f97-1916x582.svg?w=400) | `logoDarkMode` | 1916×582 | *(not in server HTML)* | Helicopter Services logo |

### training/advanced-flying-programme

| Image | Field | Size | Current alt on live site | Alt to add |
| --- | --- | --- | --- | --- |
| [1c4d91fb7b32ad8d930188a3e9b3fbf41d91d241-1200x900.webp](https://cdn.sanity.io/images/0he7nz2b/production/1fac7c97e90a38e39b3244c59c8708c97db50970-1200x900.webp?w=400) | `body[].images[]` | 1200×900 | Helicopter Services | Flight instructor and smiling pilot in a helicopter cockpit |
| [731c9e0d18754e0cc6b389369117021951c3509e-1200x900.webp](https://cdn.sanity.io/images/0he7nz2b/production/3da251c71de51ddccd5f7cf34c9dea9ad09926c3-1200x900.webp?w=400) | `body[].images[]` | 1200×900 | Helicopter Services | Pilot flying a helicopter along a coastline on an advanced flying trip |
| [d5baaf7f9ac9a97657057a9c5bec5ffba867ce68-1200x900.webp](https://cdn.sanity.io/images/0he7nz2b/production/53f2e838a35e22927bb3f6bb53094a7288a216aa-1200x900.webp?w=400) | `body[].images[]` | 1200×900 | Helicopter Services | Helicopters landed on a lakeside lawn during a fly-away trip |
| [d5baaf7f9ac9a97657057a9c5bec5ffba867ce68-1200x900.webp](https://cdn.sanity.io/images/0he7nz2b/production/53f2e838a35e22927bb3f6bb53094a7288a216aa-1200x900.webp?w=400) | `body[].images[]` | 1200×900 | Helicopter Services | Helicopters landed on a lakeside lawn during a fly-away trip |
| [3bdc4cfb883f57ab4260822102d10ad207f82522-1024x768.webp](https://cdn.sanity.io/images/0he7nz2b/production/7f56a969b4829614bbcc9ae45ad8c54b5701c652-1024x768.webp?w=400) | `body[].images[]` | 1024×768 | Helicopter Services | Pilot flying a helicopter past white chalk cliffs |
| [ba6fb769cf16026954e07814f274e0a63200c1a1-1200x1600.webp](https://cdn.sanity.io/images/0he7nz2b/production/9e47c7bafa60fefee4c37ed2f67eaac042e11ff9-1200x1600.webp?w=400) | `body[].images[]` | 1200×1600 | Helicopter Services | Robinson helicopter cockpit view flying over a sandy beach |
| [Advanced flying programme.webp](https://cdn.sanity.io/images/0he7nz2b/production/b0089479789c970d270fcea18b0182e1f90b88b7-1200x900.webp?w=400) | `body[].images[]` | 1200×900 | Helicopter Services | Helicopter cockpit moving map while flying over a river valley |
| [9d2b316f0b9d1f88778dc65fa94a1c98e1fb4002-1200x799.webp](https://cdn.sanity.io/images/0he7nz2b/production/d3f70cd646e81ae7f4ce1382411a45f6c513b89d-1200x799.webp?w=400) | `body[].images[]` | 1200×799 | Helicopter Services | Pilots flying a helicopter towards sea cliffs over turquoise water |
| [ce62c431e750b97bcff25e427e33fe3af994d7f6-1200x900.webp](https://cdn.sanity.io/images/0he7nz2b/production/e2e2eb0a0135721c6da2bb3ebd2c477d0697185d-1200x900.webp?w=400) | `body[].images[]` | 1200×900 | Helicopter Services | Snow-covered mountains seen from a helicopter |
| [Advanced flying programme trip 9.jpg](https://cdn.sanity.io/images/0he7nz2b/production/eb0a99fe9faa3d5ec6e6ab3c9278de93cf5af6ce-1200x900.jpg?w=400) | `mainImage` | 1200×900 | Helicopter Services | Moving map in a Robinson helicopter cockpit over a river valley |

### training/commercial-pilot-licence

| Image | Field | Size | Current alt on live site | Alt to add |
| --- | --- | --- | --- | --- |
| [bdca495f6518d6e51623358b3a22a068a5f33860-1024x685.webp](https://cdn.sanity.io/images/0he7nz2b/production/60e72d0df6aa15d699ebce3c6b1a75790f1deafc-1024x685.webp?w=400) | `body[].images[]` | 1024×685 | Helicopter Services | Helicopter landing at a London helipad next to the O2 |
| [cec8e55ce28f241ed3ebb33367d56d0af17823ba-1200x800.webp](https://cdn.sanity.io/images/0he7nz2b/production/905d94dd23603a616715c728d90547d2d86607c2-1200x800.webp?w=400) | `body[].images[]` | 1200×800 | Helicopter Services | Robinson R22 training helicopter lifting off from a grass airfield |
| [Commercial Pilot Licence - CPL(H).jpg](https://cdn.sanity.io/images/0he7nz2b/production/b3c026696f906c5bae207e5c5eb004e09ce236f8-1526x1526.jpg?w=400) | `mainImage` | 1526×1526 | Helicopter Services | Squirrel helicopter on a helipad in a grass field |
| [96a2e35eda7a19d3545c34c9b7360dee88eb031d-500x334.jpg](https://cdn.sanity.io/images/0he7nz2b/production/c01b64fba7375e26a18adc5fab2d6dc69c121c1a-500x334.jpg?w=400) | `body[].images[]` | 500×334 | Helicopter Services | Twin Squirrel helicopter landing at a helipad with Canary Wharf behind |

### training/elcas

| Image | Field | Size | Current alt on live site | Alt to add |
| --- | --- | --- | --- | --- |
| [ELCAS.jpg](https://cdn.sanity.io/images/0he7nz2b/production/0d1853d7f8e948a02e861e3add270fcd8f30b93b-2141x1254.jpg?w=400) | `mainImage` | 2141×1254 | Helicopter Services | Red Robinson helicopter flying over water |

### training/flight-examiner-certificates

| Image | Field | Size | Current alt on live site | Alt to add |
| --- | --- | --- | --- | --- |
| [image 20.jpg](https://cdn.sanity.io/images/0he7nz2b/production/0334428a9db7b05ded422a17aec88c8b4d9ecaca-542x305.jpg?w=400) | `body[].images[]` | 542×305 | Helicopter Services | View from the back seat of two pilots flying a twin-engine helicopter |

### training/flight-instructor-certificates

| Image | Field | Size | Current alt on live site | Alt to add |
| --- | --- | --- | --- | --- |
| [1c4d91fb7b32ad8d930188a3e9b3fbf41d91d241-1200x900.webp](https://cdn.sanity.io/images/0he7nz2b/production/1fac7c97e90a38e39b3244c59c8708c97db50970-1200x900.webp?w=400) | `mainImage` | 1200×900 | Helicopter Services | Flight instructor and smiling pilot in a helicopter cockpit |

### training/flight-instructor-refresher-seminars

| Image | Field | Size | Current alt on live site | Alt to add |
| --- | --- | --- | --- | --- |
| [Refresher seminar in action.jpg](https://cdn.sanity.io/images/0he7nz2b/production/3e84abd25633cba92f0568c2f4ca3c6bdfed4ac7-1035x1118.jpg?w=400) | `mainImage` | 1035×1118 | Helicopter Services | Flight instructors at a refresher seminar in the briefing room |
| [71af7b72b19fa64ba8180651f891cb45274476ee-1035x1118.webp](https://cdn.sanity.io/images/0he7nz2b/production/45584955fe4047d3f0e6eb9cc8efc369a7ab0d4a-1035x1118.webp?w=400) | `body[].images[]` | 1035×1118 | Helicopter Services | Helicopter instructors in a refresher seminar briefing |

### training/instrument-rating

| Image | Field | Size | Current alt on live site | Alt to add |
| --- | --- | --- | --- | --- |
| [Flight Examiner Ratings.webp](https://cdn.sanity.io/images/0he7nz2b/production/39afffc3c842d024c741193b6d7c2780288e6922-1024x768.webp?w=400) | `mainImage` | 1024×768 | Helicopter Services | View from the back seat of two pilots flying on instruments |

### training/night-rating

| Image | Field | Size | Current alt on live site | Alt to add |
| --- | --- | --- | --- | --- |
| [5faba73d9b7f7bf2c580d890261d0d4667d39d43-720x960.webp](https://cdn.sanity.io/images/0he7nz2b/production/244dedbb6070f71a5da823c768c6c0ce69533cde-720x960.webp?w=400) | `body[].images[]` | 720×960 | Helicopter Services | London at night from a helicopter, with Tower Bridge lit up |
| [Night Rating.jpg](https://cdn.sanity.io/images/0he7nz2b/production/2d0ba939e97f3d4d687c3fb8c7685c0501dc8876-1680x419.jpg?w=400) | `mainImage` | 1680×419 | Helicopter Services | Helicopter cockpit instruments glowing during a night flight |
| [09358f7e9d03e8a2e6dfea60cf06a2a8272b71f2-1024x768.webp](https://cdn.sanity.io/images/0he7nz2b/production/39fe5d90efedcdba328a2a06f937fd04fd5e6ae9-1024x768.webp?w=400) | `body[].images[]` | 1024×768 | Helicopter Services | Sunset through the windscreen on a helicopter night rating flight |
| [d7aef13709a95b57b4bad9fc465e17673dd2bc35-1200x899.webp](https://cdn.sanity.io/images/0he7nz2b/production/819e783a423078a51a3e9065f3eadab9145531f5-1200x899.webp?w=400) | `body[].images[]` | 1200×899 | Helicopter Services | Helicopter on the apron at night under a full moon |

### training/pbn

| Image | Field | Size | Current alt on live site | Alt to add |
| --- | --- | --- | --- | --- |
| [Performance-based Navigation - PBN.jpg](https://cdn.sanity.io/images/0he7nz2b/production/0c1a77b8a579dea3aad7d876e7ae7b001cd52096-1200x1200.jpg?w=400) | `mainImage` | 1200×1200 | Helicopter Services | Pilots flying a helicopter towards sea cliffs over turquoise water |
| [9d2b316f0b9d1f88778dc65fa94a1c98e1fb4002-1200x799.webp](https://cdn.sanity.io/images/0he7nz2b/production/d3f70cd646e81ae7f4ce1382411a45f6c513b89d-1200x799.webp?w=400) | `body[].images[]` | 1200×799 | Helicopter Services | Pilots flying a helicopter towards sea cliffs over turquoise water |

### training/private-pilot-licence

| Image | Field | Size | Current alt on live site | Alt to add |
| --- | --- | --- | --- | --- |
| [Trial lessons.jpg](https://cdn.sanity.io/images/0he7nz2b/production/04be44f6d162c9d88189b1b99dc4ab62aeb4f430-1400x1400.jpg?w=400) | `mainImage` | 1400×1400 | Helicopter Services | Student pilot at the controls of a Robinson R22 training helicopter |
| [cec8e55ce28f241ed3ebb33367d56d0af17823ba-1200x800.webp](https://cdn.sanity.io/images/0he7nz2b/production/905d94dd23603a616715c728d90547d2d86607c2-1200x800.webp?w=400) | `body[].images[]` | 1200×800 | Helicopter Services | Robinson R22 training helicopter lifting off from a grass airfield |
| [Local area tour trip.webp](https://cdn.sanity.io/images/0he7nz2b/production/b555e7ff0047c20d9884988ddfb90d7dea2e7a83-1200x800.webp?w=400) | `body[].images[]` | 1200×800 | Helicopter Services | Passengers in a Robinson R44 helicopter landed on grass |

### training/simulator

| Image | Field | Size | Current alt on live site | Alt to add |
| --- | --- | --- | --- | --- |
| [Simulator.jpg](https://cdn.sanity.io/images/0he7nz2b/production/43f82e5118786418324cfa1c8de75e6e93bae80c-1680x419.jpg?w=400) | `mainImage` | 1680×419 | Helicopter Services | Instructor at the FNPT II helicopter simulator control station |
| [0ce9bed5703c10953b30d5f0a1af587327960aa9-1200x800.webp](https://cdn.sanity.io/images/0he7nz2b/production/ec0f523d686580c3e038f2c439c926de610b0283-1200x800.webp?w=400) | `body[].images[]` | 1200×800 | Helicopter Services | Instrument panel inside the FNPT II helicopter simulator |
| [4a408c739a8aff2caba9bb7bf32a96cf82c1ebb1-1024x768.webp](https://cdn.sanity.io/images/0he7nz2b/production/fa947b31163be0ed460253f1323281bc8946d267-1024x768.webp?w=400) | `body[].images[]` | 1024×768 | Helicopter Services | Instructor running a session on the FNPT II helicopter simulator |

### training/training

| Image | Field | Size | Current alt on live site | Alt to add |
| --- | --- | --- | --- | --- |
| [image 20.jpg](https://cdn.sanity.io/images/0he7nz2b/production/0334428a9db7b05ded422a17aec88c8b4d9ecaca-542x305.jpg?w=400) | `service[].image` | 542×305 | Helicopter Services | View from the back seat of two pilots flying a twin-engine helicopter |
| [Trial lessons.jpg](https://cdn.sanity.io/images/0he7nz2b/production/04be44f6d162c9d88189b1b99dc4ab62aeb4f430-1400x1400.jpg?w=400) | `service[].image` | 1400×1400 | Helicopter Services | Student pilot at the controls of a Robinson R22 training helicopter |
| [Performance-based Navigation - PBN.jpg](https://cdn.sanity.io/images/0he7nz2b/production/0c1a77b8a579dea3aad7d876e7ae7b001cd52096-1200x1200.jpg?w=400) | `service[].image` | 1200×1200 | Helicopter Services | Pilots flying a helicopter towards sea cliffs over turquoise water |
| [1c4d91fb7b32ad8d930188a3e9b3fbf41d91d241-1200x900.webp](https://cdn.sanity.io/images/0he7nz2b/production/1fac7c97e90a38e39b3244c59c8708c97db50970-1200x900.webp?w=400) | `service[].image` | 1200×900 | Helicopter Services | Flight instructor and smiling pilot in a helicopter cockpit |
| [Commercial Pilot Licence - CPL.jpeg](https://cdn.sanity.io/images/0he7nz2b/production/2a1e251c313c59c0331ce612fd03b2e11ea72eb9-1964x1964.jpg?w=400) | `service[].image` | 1964×1964 | Helicopter Services | Squirrel helicopter parked on a helipad in open countryside |
| [Simulators.jpg](https://cdn.sanity.io/images/0he7nz2b/production/41ea00ea44457f499c5620fc7aea8245ffa0e227-1024x768.jpg?w=400) | `service[].image` | 1024×768 | Helicopter Services | Instructor running the FNPT II helicopter simulator with a student in the cockpit |
| [0d1853d7f8e948a02e861e3add270fcd8f30b93b-2141x1254.jpeg](https://cdn.sanity.io/images/0he7nz2b/production/5363bb5a21c26e0e5167a54397d80b7a64570c53-1279x1279.jpg?w=400) | `service[].image` | 1279×1279 | Helicopter Services | Red Robinson helicopter flying over water |
| [3e84abd25633cba92f0568c2f4ca3c6bdfed4ac7-1035x1118.webp](https://cdn.sanity.io/images/0he7nz2b/production/71af7b72b19fa64ba8180651f891cb45274476ee-1035x1118.webp?w=400) | `service[].image` | 1035×1118 | Helicopter Services | Helicopter instructors in a classroom briefing |
| [4c6da26af368e4ad0e7057691f9451c572710286-1024x768.jpg](https://cdn.sanity.io/images/0he7nz2b/production/83bdb9102864d0f3bf274c550ff89b860215d2bb-1024x1024.jpg?w=400) | `service[].image` | 1024×1024 | Helicopter Services | Cabri G2 training helicopter hovering above the grass |
| [Advanced flying programme.webp](https://cdn.sanity.io/images/0he7nz2b/production/b0089479789c970d270fcea18b0182e1f90b88b7-1200x900.webp?w=400) | `hero.image` | 1200×900 | Helicopter Services | Helicopter cockpit moving map while flying over a river valley |
| [Advanced flying programme.webp](https://cdn.sanity.io/images/0he7nz2b/production/b0089479789c970d270fcea18b0182e1f90b88b7-1200x900.webp?w=400) | `service[].image` | 1200×900 | Helicopter Services | Helicopter cockpit moving map while flying over a river valley |
| [Night Rating.jpg](https://cdn.sanity.io/images/0he7nz2b/production/b805a5eb639932072386bf4e3d78cb459338f5b9-1024x768.jpg?w=400) | `service[].image` | 1024×768 | Helicopter Services | Sunset through the cockpit windscreen on a night flight |

### training/type-ratings

| Image | Field | Size | Current alt on live site | Alt to add |
| --- | --- | --- | --- | --- |
| [0d1853d7f8e948a02e861e3add270fcd8f30b93b-2141x1254.jpeg](https://cdn.sanity.io/images/0he7nz2b/production/5363bb5a21c26e0e5167a54397d80b7a64570c53-1279x1279.jpg?w=400) | `mainImage` | 1279×1279 | Helicopter Services | Red Robinson helicopter flying over water |

## 2. Sanity images that already have real alt text (21)

No action needed, but worth checking that they're accurate.

| Image | Used in | Current alt on live site |
| --- | --- | --- |
| [AB206 Helicopter.jpg](https://cdn.sanity.io/images/0he7nz2b/production/24de5e6ffa282e84a012bd728f5bb0dd1bda2262-1200x799.jpg?w=400) | fleet/ab206, fleet/fleet | AB206 helicopter |
| [R44 Helicopter.jpg](https://cdn.sanity.io/images/0he7nz2b/production/49dad8bd7da33c5cf518f2df8964a4b78fc94f3d-1200x799.jpg?w=400) | fleet/r44, fleet/fleet | R44 helicopter |
| [special-events.png](https://cdn.sanity.io/images/0he7nz2b/production/4dca79a410ca1f71d1be5a208e07b77c4f96af8c-214x214.png?w=400) | homepage/53d6bf4f-9266-4e3c-b8bd-4834bfca47b5 | Special Events |
| [Tim Piper.webp](https://cdn.sanity.io/images/0he7nz2b/production/53bb08107faed35d369d2d3defa8a794e70f4806-251x258.webp?w=400) | about/faqs | Tim Piper |
| [the-royal-areo-club.png](https://cdn.sanity.io/images/0he7nz2b/production/7aa9dbdc1bfcaad5e3fdbb9561c16906546e861b-749x188.png?w=400) | about/about-us | The Royal Aero Club |
| [AW109.jpg](https://cdn.sanity.io/images/0he7nz2b/production/7d37ddf47efd3de9efa715aa50f6e8c75a2fa3bf-1155x770.jpg?w=400) | fleet/aw109, fleet/fleet | AW109 helicopter |
| [Trial lessons.png](https://cdn.sanity.io/images/0he7nz2b/production/7e358ae7d5f5ad108e11a471e2b275c094d66577-963x963.png?w=400) | homepage/53d6bf4f-9266-4e3c-b8bd-4834bfca47b5 | Helicopter Trial Lessons |
| [6067d4_e1c3bf762139416dbc49862f808570c5~mv2.jpg](https://cdn.sanity.io/images/0he7nz2b/production/90d25b724e3a207a0e3f094d44162615aefbc460-1200x800.jpg?w=400) | fleet/as350, fleet/fleet | AS350 helicopter |
| [Al Gwilt.webp](https://cdn.sanity.io/images/0he7nz2b/production/90f4feb27aed5ea5de57f04a87e3fccbc8fd3990-251x253.webp?w=400) | pilots/captain-al-gwilt | Captain Al Gwilt |
| [R66 Helicopter.webp](https://cdn.sanity.io/images/0he7nz2b/production/a04b00dc82624494da03b1fe643f4dba45e11283-1080x720.webp?w=400) | fleet/r66, fleet/fleet | R66 helicopter |
| [private-pilot-licence.png](https://cdn.sanity.io/images/0he7nz2b/production/a4589b5fe71a078710f751278bd363829c09a9c5-614x614.png?w=400) | homepage/53d6bf4f-9266-4e3c-b8bd-4834bfca47b5 | Private Pilot Licence |
| [Russia Flight.webp](https://cdn.sanity.io/images/0he7nz2b/production/ad28ef0a7c33701473b42ad273dce1bffbd3edb7-700x467.webp?w=400) | training/training, training/flight-examiner-certificates, training/flight-instructor-certificates | Russia flight |
| [AS355 Helicopter.jpg](https://cdn.sanity.io/images/0he7nz2b/production/b23b2125e137a14d778641de2b53f53cd24d2a81-1200x800.jpg?w=400) | fleet/as355, fleet/fleet | AS355 helicopter |
| [R22 Helicopter.jpg](https://cdn.sanity.io/images/0he7nz2b/production/b534b400d343eca3f9efe3dec6ae3f0446455f4c-1200x800.jpg?w=400) | training/private-pilot-licence, fleet/r22, fleet/fleet | R22 helicopter |
| [IRating-1024x768_Fotor.webp](https://cdn.sanity.io/images/0he7nz2b/production/de423cbdfe3f6fec392162a97c2bd3d5fef19285-338x254.webp?w=400) | training/instrument-rating | Flight rating |
| [Richard Boswell photo.webp](https://cdn.sanity.io/images/0he7nz2b/production/dfc2328e3476373cd5836020871ff24e176c1477-251x253.webp?w=400) | pilots/captain-richard-boswell | Captain Richard Boswell |
| [image 39.png](https://cdn.sanity.io/images/0he7nz2b/production/e28eda576a532abe473640b13c0f412abcf779fd-388x398.png?w=400) | training/elcas | Elcas |
| [london millennium dome.png](https://cdn.sanity.io/images/0he7nz2b/production/e6357f125b0ccbd36771d58f98833f246c1b5b6f-364x364.png?w=400) | homepage/53d6bf4f-9266-4e3c-b8bd-4834bfca47b5 | London Sightseeing Tours |
| [Captain Ruth Downey.webp](https://cdn.sanity.io/images/0he7nz2b/production/e93b9efe0aa536d0979a7624ce9865001f676f78-251x253.webp?w=400) | pilots/captain-ruth-downey | Captain Ruth Downey |
| [Local area tours.png](https://cdn.sanity.io/images/0he7nz2b/production/fc2b295dba60c1515c08874ca4697fe12c4bb90d-705x705.png?w=400) | homepage/53d6bf4f-9266-4e3c-b8bd-4834bfca47b5 | Local Area Tours |
| [Instrument-Rating-1024x768_Fotor.webp](https://cdn.sanity.io/images/0he7nz2b/production/fd5a13e26a80e7467e5c013ce5e9d408595f0b3e-341x254.webp?w=400) | training/instrument-rating | Instrument rating |

## 3. Sanity images not used anywhere (40)

No published or draft document uses these, so there's no need for alt text. You can delete them from the media library to tidy up, but check them first: old campaigns sometimes reuse images.

| Image | Size | File size |
| --- | --- | --- |
| [Virtual reality simulator.jpg](https://cdn.sanity.io/images/0he7nz2b/production/d96675f98cfec0b98eb2a5746ee5096052be6873-4608x2184.jpg?w=400) | 4608×2184 | 931KB |
| [Flight Instructor Ratings - FI(H).jpg](https://cdn.sanity.io/images/0he7nz2b/production/75ab06d54dcbb84beed5838b3f00e21c094d0001-1677x419.jpg?w=400) | 1677×419 | 772KB |
| [Cabri G2.jpg](https://cdn.sanity.io/images/0he7nz2b/production/3788697966cb6f8978684274f3343e95d09ebeb6-1300x866.jpg?w=400) | 1300×866 | 418KB |
| [A109 Helicopter.jpg](https://cdn.sanity.io/images/0he7nz2b/production/d7b89de250e265e2510942f1ca37d218be8b8560-1024x682.jpg?w=400) | 1024×682 | 373KB |
| [EC135 Helicopter.jpg](https://cdn.sanity.io/images/0he7nz2b/production/182b80e7cca9468647eec22f81f8acaa3ff8cb37-996x664.jpg?w=400) | 996×664 | 372KB |
| [Virtual Reality Simulator.jpg](https://cdn.sanity.io/images/0he7nz2b/production/a1b90a624145f972a765239b85418e510b62d317-1680x419.jpg?w=400) | 1680×419 | 364KB |
| [photography.jpg](https://cdn.sanity.io/images/0he7nz2b/production/c641809258305eefa28b3b318526e11a512acc29-1200x1600.jpg?w=400) | 1200×1600 | 291KB |
| [Commercial Pilot Licence - CPL(H).jpg](https://cdn.sanity.io/images/0he7nz2b/production/033b8fd2551236dc618016cfdcb9f135ac44672e-1400x1050.jpg?w=400) | 1400×1050 | 263KB |
| [789e8f9cbd7ce18f447376597704a981fb237acc-1200x1600.webp](https://cdn.sanity.io/images/0he7nz2b/production/333c278e9514056967f4464fd48d53bf8cd84fb5-1200x1600.webp?w=400) | 1200×1600 | 261KB |
| [Flight Instructor Ratings.jpg](https://cdn.sanity.io/images/0he7nz2b/production/8bfc3274604722f05053ab670199b6fc1e9e2e28-1400x934.jpg?w=400) | 1400×934 | 251KB |
| [Trial lessons.jpg](https://cdn.sanity.io/images/0he7nz2b/production/a04b1175707b1a2f31ae7392dfa39eda03da70f4-1400x1050.jpg?w=400) | 1400×1050 | 232KB |
| [BOSN door off.jpg](https://cdn.sanity.io/images/0he7nz2b/production/39895c2c04a320fe6dcf807417bd5ea3987792cd-1170x835.jpg?w=400) | 1170×835 | 198KB |
| [EC135 Helicopter.jpg](https://cdn.sanity.io/images/0he7nz2b/production/53dbe3feee3dfb4f71d02173235602b5d911d659-996x664.jpg?w=400) | 996×664 | 194KB |
| [Instrument ratings.jpg](https://cdn.sanity.io/images/0he7nz2b/production/6314191dbd44ef649ab8dd3750ebf2963c5460e8-1200x900.jpg?w=400) | 1200×900 | 189KB |
| [f68bd53e356900bff6462eba36fae1d809eddb77-1400x1050.webp](https://cdn.sanity.io/images/0he7nz2b/production/b0c98d006d959e07b48bc658e35fb8699191465b-1400x1050.webp?w=400) | 1400×1050 | 175KB |
| [3f320fe2f067daa82b5e3bdb9f8260ccc6ff919b-1600x645.jpg](https://cdn.sanity.io/images/0he7nz2b/production/470a21081bd9f233c7b6c5ab58f9ef2d2956883a-1600x645.jpg?w=400) | 1600×645 | 169KB |
| [0d1853d7f8e948a02e861e3add270fcd8f30b93b-2141x1254.webp](https://cdn.sanity.io/images/0he7nz2b/production/8fac4df1f3fdd2738bcede5a455f6a274fa848cb-2000x1171.webp?w=400) | 2000×1171 | 165KB |
| [BOSN battersea 1.jpg](https://cdn.sanity.io/images/0he7nz2b/production/0bb5c107ce1a4cd877fe73bf5e23a8a676111104-330x330.jpg?w=400) | 330×330 | 139KB |
| [B206L Helicopter.jpg](https://cdn.sanity.io/images/0he7nz2b/production/54a2a2ccec18fc9b771823bac8bb2feb743cfe3d-860x573.jpg?w=400) | 860×573 | 135KB |
| [James Berry.jpg](https://cdn.sanity.io/images/0he7nz2b/production/6b0ff97b45d8d6b2718e9d085c7a5132d3acbc7a-696x1504.jpg?w=400) | 696×1504 | 135KB |
| [Private Pilot Licence.webp](https://cdn.sanity.io/images/0he7nz2b/production/9d0854d6fa988d5b535c636676f44f8e8f2c10cd-1680x994.webp?w=400) | 1680×994 | 119KB |
| [Performance-based Navigation - PBN.jpg](https://cdn.sanity.io/images/0he7nz2b/production/9d2b316f0b9d1f88778dc65fa94a1c98e1fb4002-1200x799.jpg?w=400) | 1200×799 | 109KB |
| [image 40.png](https://cdn.sanity.io/images/0he7nz2b/production/d583406f7dd9d80c8516f002cbd67b108a97c4f5-878x258.png?w=400) | 878×258 | 96KB |
| [bdff8ea46a6c9b6f457b0aa1e23b653ee2c75e94-1200x800.webp](https://cdn.sanity.io/images/0he7nz2b/production/e2cca595a55bafcfa4854a18217b280a8c562dde-1200x800.webp?w=400) | 1200×800 | 94KB |
| [Commercial Pilot Licence - CPL.webp](https://cdn.sanity.io/images/0he7nz2b/production/4529ad4558addc3891ad7795792820e8cce23291-1680x915.webp?w=400) | 1680×915 | 94KB |
| [4c6da26af368e4ad0e7057691f9451c572710286-1024x768.jpg](https://cdn.sanity.io/images/0he7nz2b/production/6bad34359b298c39c3c79a861cc0bd152f2980c9-1024x768.jpg?w=400) | 1024×768 | 85KB |
| [73db079e853453ab5f06ad7962a90568f63ba059-4608x2184.webp](https://cdn.sanity.io/images/0he7nz2b/production/43705cbdd4a7a4bb64b21ee7bb77af5b45503283-2000x948.webp?w=400) | 2000×948 | 74KB |
| [8342e7c3bf4c2b99be80e27afb9aef3ab0a69c7b-4608x2184.webp](https://cdn.sanity.io/images/0he7nz2b/production/8591c15bfb792627b38ad4550b8c031552ae0b9e-2000x948.webp?w=400) | 2000×948 | 68KB |
| [nav-copters.webp](https://cdn.sanity.io/images/0he7nz2b/production/d9f6a3d0d0f0c6f918a2b2e90d502051ce7fe044-532x246.webp?w=400) | 532×246 | 64KB |
| [9f8d146b337e375b4b70d18ff46fccea9c11b22f-4481x2177.webp](https://cdn.sanity.io/images/0he7nz2b/production/f7c42ee8f372035b92cf348c67dfdecaa6a0372b-2000x972.webp?w=400) | 2000×972 | 60KB |
| [e3e7a6f1ea535047ae4f79aaf3b30d9a3ab5e2a2-1024x768.webp](https://cdn.sanity.io/images/0he7nz2b/production/eae7fb8ac60e15f2001a1fa3a6b32f1473d389d1-1024x768.webp?w=400) | 1024×768 | 46KB |
| [6bad34359b298c39c3c79a861cc0bd152f2980c9-1024x768.webp](https://cdn.sanity.io/images/0he7nz2b/production/15aa2fcf16b0cd89891e8f8b2c12d9d0c66a40da-1024x768.webp?w=400) | 1024×768 | 46KB |
| [68a6b5af6f89b35e4e0fe614b2539e1bf3528e4a-1639x929.webp](https://cdn.sanity.io/images/0he7nz2b/production/2304b1c517a5c9e9bca0b047680c870a9dcdda0e-1639x929.webp?w=400) | 1639×929 | 32KB |
| [f4fb8f5809a814a1aa550384bd3028b3ff70438a-1000x537.webp](https://cdn.sanity.io/images/0he7nz2b/production/6aaa873ba871892545fcbf3bb6ea5d10b6583be4-1000x537.webp?w=400) | 1000×537 | 27KB |
| [Dave Vasey.webp](https://cdn.sanity.io/images/0he7nz2b/production/4f4992a99d253f98bb1f21a1fe581221a07fe680-251x258.webp?w=400) | 251×258 | 18KB |
| [Captain_Matt_Hart.webp](https://cdn.sanity.io/images/0he7nz2b/production/387758133a34910f4010a909d25ac9a83a2241ee-251x253.webp?w=400) | 251×253 | 17KB |
| [captain-leon-smith.webp](https://cdn.sanity.io/images/0he7nz2b/production/2d2362ddb94363f04ef8ff58d7e91ae38f435725-251x253.webp?w=400) | 251×253 | 14KB |
| [helicopter.jpg](https://cdn.sanity.io/images/0he7nz2b/production/4fb1cb3072227424546e743ca3b961ab07ffb476-452x438.jpg?w=400) | 452×438 | 14KB |
| [Rob Parcell website.webp](https://cdn.sanity.io/images/0he7nz2b/production/ab81c5467255d289e7e80b777a9d42ae58a5d7f3-251x258.webp?w=400) | 251×258 | 14KB |
| [Tom Saunderson.webp](https://cdn.sanity.io/images/0he7nz2b/production/9d6ab5051290e881a305c3ef1e0cb30ee97ee2ab-251x253.webp?w=400) | 251×253 | 6KB |

## 4. Images in `public/` (set in code)

The alt text for these lives in the components, not in Sanity, so I can change it in code if you want.

### Used (61)

| File | Alt on live site | Pages |
| --- | --- | --- |
| `/images/0.jpg` | *(in code but not in server HTML: menus, popups or client-only)* |  |
| `/images/3d-rotate-circle.svg` | 3D helicopter cockpit view | /about-us/the-hangar, /fleet/as355, /fleet/r44 |
| `/images/3d-rotate-Dark.svg` | 3d view of helicopter cockpit | /about-us, /fleet/as355, /fleet/r44 |
| `/images/approvals.svg` | Helicopter Services | /training/advanced-flying-programme, /training/commercial-pilot-licence, /training/flight-examiner-certificates, /training/flight-instructor-certificates, /training/flight-instructor-refresher-seminars, /training/instrument-rating, /training/night-rating, /training/pbn, /training/private-pilot-licence, /training/simulator, /training/type-ratings |
| `/images/bbc.svg` | bbc | / |
| `/images/caa.svg` | Helicopter Services / UK Civil Aviation Authority approved | /, /about-us |
| `/images/caret-left.svg` | Previous slide | / |
| `/images/caret-right.svg` | Helicopter Services | /, /about-us, /fleet, /flights, /flights/airport-transfers, /flights/helicopter-charter, /flights/special-events, /flights/trial-lessons, /industry, /training, /training/commercial-pilot-licence, /training/instrument-rating, /training/private-pilot-licence, /training/type-ratings |
| `/images/caret-right3.svg` | Next slide | / |
| `/images/channel4.svg` | channel4 | / |
| `/images/Check.png` | Option selected | /fleet/ab206, /fleet/as350, /fleet/as355, /fleet/aw109, /fleet/r22, /fleet/r44, /fleet/r66 |
| `/images/check1.svg` | helicopter services accreditations | /about-us/faqs, /about-us/meet-the-team, /about-us/the-hangar, /enquire, /fleet, /fleet/ab206, /fleet/as350, /fleet/as355, /fleet/aw109, /fleet/r22, /fleet/r44, /fleet/r66, /flights, /flights/airport-transfers, /flights/helicopter-charter, /flights/local-area-tours, /flights/london-sightseeing-tours, /flights/special-events, /flights/trial-lessons, /industry, /industry/load-lifting, /industry/photography-filming, /legal/cookies, /legal/privacy, /legal/terms-and-conditions, /training, /training/advanced-flying-programme, /training/commercial-pilot-licence, /training/elcas, /training/flight-examiner-certificates, /training/flight-instructor-certificates, /training/flight-instructor-refresher-seminars, /training/instrument-rating, /training/night-rating, /training/pbn, /training/private-pilot-licence, /training/simulator, /training/type-ratings |
| `/images/checkTwo.svg` | Option not selected | /fleet/ab206, /fleet/as350, /fleet/aw109, /fleet/r22, /fleet/r66 |
| `/images/cockpit.jpg` | *(in code but not in server HTML: menus, popups or client-only)* |  |
| `/images/easa.svg` | Helicopter Services / European Union Aviation Safety Agency approved | /, /about-us |
| `/images/facebook.png` | helicopter services facebook | every page |
| `/images/flipped.jpg` | *(in code but not in server HTML: menus, popups or client-only)* |  |
| `/images/flying.png` | *(in code but not in server HTML: menus, popups or client-only)* |  |
| `/images/grandad-helicopter.png` | *(in code but not in server HTML: menus, popups or client-only)* |  |
| `/images/helciopter-caves.jpg` | *(in code but not in server HTML: menus, popups or client-only)* |  |
| `/images/Heli006.jpg` | *(in code but not in server HTML: menus, popups or client-only)* |  |
| `/images/helicopter-message.svg` | *(in code but not in server HTML: menus, popups or client-only)* |  |
| `/images/icons/CompanyBlue.svg` | Helicopter Services | /, /about-us/faqs, /about-us/meet-the-team, /legal/cookies, /legal/privacy, /legal/terms-and-conditions |
| `/images/icons/CompanyDark.svg` | About helicopter services | / |
| `/images/icons/CompanyWhite.svg` | Helicopter Services | /about-us/the-hangar |
| `/images/icons/FlightsBlue.svg` | Helicopter Services | every page |
| `/images/icons/FlightsDark.svg` | Helicopter flight services | / |
| `/images/icons/FlightsWhite.svg` | Helicopter Services | /fleet, /flights, /flights/airport-transfers, /flights/helicopter-charter, /flights/local-area-tours, /flights/london-sightseeing-tours, /flights/special-events, /flights/trial-lessons |
| `/images/icons/IndustryBlue.svg` | Helicopter Services | /, /industry |
| `/images/icons/IndustryDark.svg` | Helicopter industry flight services | / |
| `/images/icons/IndustryWhite.svg` | Helicopter Services | /industry, /industry/load-lifting, /industry/photography-filming |
| `/images/icons/TrainingBlue.svg` | Helicopter Services | /, /training |
| `/images/icons/TrainingDark.svg` | Helicopter flight training | / |
| `/images/icons/TrainingWhite.svg` | Helicopter Services | /training, /training/advanced-flying-programme, /training/commercial-pilot-licence, /training/elcas, /training/flight-examiner-certificates, /training/flight-instructor-certificates, /training/flight-instructor-refresher-seminars, /training/instrument-rating, /training/night-rating, /training/pbn, /training/private-pilot-licence, /training/simulator, /training/type-ratings |
| `/images/instagram.png` | helicopter services instagram | every page |
| `/images/itv.svg` | itv | / |
| `/images/loadlifting.png` | *(in code but not in server HTML: menus, popups or client-only)* |  |
| `/images/Local area tours.png` | *(in code but not in server HTML: menus, popups or client-only)* |  |
| `/images/LogoDarkVNew.svg` | *(in code but not in server HTML: menus, popups or client-only)* |  |
| `/images/LogoLightV2New.svg` | *(in code but not in server HTML: menus, popups or client-only)* |  |
| `/images/london millennium dome.png` | *(in code but not in server HTML: menus, popups or client-only)* |  |
| `/images/nav-copters.jpg` | *(in code but not in server HTML: menus, popups or client-only)* |  |
| `/images/nav-industry.jpg` | *(in code but not in server HTML: menus, popups or client-only)* |  |
| `/images/nav-training.jpg` | *(in code but not in server HTML: menus, popups or client-only)* |  |
| `/images/open-day-v2.png` | *(in code but not in server HTML: menus, popups or client-only)* |  |
| `/images/opengraph-image.jpg` | *(in code but not in server HTML: menus, popups or client-only)* |  |
| `/images/phone-orange.svg` | phone | every page |
| `/images/planes.jpg` | *(in code but not in server HTML: menus, popups or client-only)* |  |
| `/images/private-pilot-licence.png` | *(in code but not in server HTML: menus, popups or client-only)* |  |
| `/images/ruth2.jpg` | Title Image | /about-us/the-hangar, /fleet |
| `/images/signature.svg` | Signature of Captain Leon Smith | /, /about-us |
| `/images/sky.svg` | sky | / |
| `/images/special-events.png` | *(in code but not in server HTML: menus, popups or client-only)* |  |
| `/images/the-royal-areo-club.png` | *(in code but not in server HTML: menus, popups or client-only)* |  |
| `/images/Trial lessons.png` | *(in code but not in server HTML: menus, popups or client-only)* |  |
| `/images/tripadvisor.svg` | Tripadvisor logo | /, /about-us |
| `/images/trophy-award.png` | *(in code but not in server HTML: menus, popups or client-only)* |  |
| `/images/trophy.png` | *(in code but not in server HTML: menus, popups or client-only)* |  |
| `/images/unflipped.jpg` | *(in code but not in server HTML: menus, popups or client-only)* |  |
| `/videos/hero-poster-mobile.webp` | *(in code but not in server HTML: menus, popups or client-only)* |  |
| `/videos/hero-poster.webp` |  | /, /about-us |

### Not used anywhere (50)

Not referenced in the code and not on any page. Safe to delete after a quick check.

- `/images/3d-icon-2.svg`
- `/images/3d-icon.png`
- `/images/3d-rotate-icon.png`
- `/images/CheckOne.svg`
- `/images/Company.png`
- `/images/Company.svg`
- `/images/Heli004.jpg`
- `/images/Heli005.jpg`
- `/images/Heli006.webp`
- `/images/Industry.png`
- `/images/LogoDark.svg`
- `/images/LogoDarkV1.svg`
- `/images/LogoDarkV2.svg`
- `/images/LogoLight.svg`
- `/images/LogoLightV1.svg`
- `/images/LogoLightV2.svg`
- `/images/Training.png`
- `/images/Virtual reality simulator.png`
- `/images/blue-ocean-helicopter-training.jpg`
- `/images/caret-right2.svg`
- `/images/circle-phone.svg`
- `/images/cockpit.png`
- `/images/cockpit2.png`
- `/images/cockpit33.PNG`
- `/images/cockpit33.webp`
- `/images/envelopeFooter.svg`
- `/images/ezgif-4-d9b45d08be.jpg`
- `/images/five-stars.svg`
- `/images/flyingg.png`
- `/images/grandad.png`
- `/images/helicopter-icon-dark-blue.svg`
- `/images/helicopter-icon-light-blue.svg`
- `/images/helicopter-icon-white.svg`
- `/images/interior001.png`
- `/images/logo.png`
- `/images/london.jpg`
- `/images/maximize.png`
- `/images/nav-flights.jpg`
- `/images/nav-training.webp`
- `/images/open-day.png`
- `/images/phoneFooter.svg`
- `/images/quotes.svg`
- `/images/ruth.png`
- `/images/square-phone.svg`
- `/images/testimonial.png`
- `/images/twitter-image.jpg`
- `/images/vr.jpg`
- `/next.svg`
- `/vercel.svg`
- `/videos/heroVideo.png`

## 5. External images (set in code)

| Image | Alt on live site | Pages |
| --- | --- | --- |
| dynamic-media-cdn.tripadvisor.com/media/photo-o/1c/15/61/08/photo1jpg. | Title Image | /, /about-us |
| dynamic-media-cdn.tripadvisor.com/media/photo-o/1a/f6/f2/7a/default-av | Title Image | /, /about-us |
| dynamic-media-cdn.tripadvisor.com/media/photo-o/1a/f6/ed/00/default-av | Title Image | /, /about-us |
| dynamic-media-cdn.tripadvisor.com/media/photo-f/01/2e/70/64/avatar042. | Title Image | /, /about-us |
| dynamic-media-cdn.tripadvisor.com/media/photo-o/15/50/21/8d/a3303xqpau | Title Image | /, /about-us |
| dynamic-media-cdn.tripadvisor.com/media/photo-o/17/d7/e4/3d/oscarwilde | Title Image | /, /about-us |
| openweathermap.org/img/wn/10n@2x.png | helicopter services weather | every page |
| img.youtube.com/vi/tIEOwYoL3J8/0.jpg | helicopter services youtube video | /about-us/the-hangar |
| img.youtube.com/vi/Vehn3yBpQjk/0.jpg | helicopter services youtube video | /fleet/as355 |
| img.youtube.com/vi/EVIILsZO42U/0.jpg | helicopter services youtube video | /fleet/r44 |
