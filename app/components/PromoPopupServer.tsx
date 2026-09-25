import { client, urlFor } from "@/lib/sanity";
import PromoPopup, { type Popup } from "./PromoPopup";

// Loads popup adverts that haven't ended yet. The popup component checks the
// dates again in the browser, so a cached page never shows one early or late.
export default async function PromoPopupServer() {
	let popups: any[] = [];
	try {
		popups = await client.fetch(
			`*[_type == "promoPopup" && enabled != false && defined(image.asset) && dateTime(endDate) > dateTime(now()) && !(_id in path("drafts.**"))] | order(startDate asc){
				_id,
				title,
				startDate,
				endDate,
				showOn,
				link,
				ctaLabel,
				ctaText,
				delaySeconds,
				"image": image{
					asset,
					crop,
					hotspot,
					"alt": coalesce(alt, asset->altText),
					"dimensions": asset->metadata.dimensions
				}
			}`,
		);
	} catch (error) {
		console.error("Failed to load popup adverts", error);
	}
	if (!popups.length) return null;

	const items: Popup[] = popups.map((popup) => {
		const natural = popup.image.dimensions || { width: 800, height: 1000 };
		const width = Math.min(800, natural.width);
		return {
			id: popup._id,
			startDate: popup.startDate,
			endDate: popup.endDate,
			showOn: popup.showOn === "all" ? "all" : "homepage",
			link: popup.link || null,
			ctaLabel: popup.ctaLabel || null,
			ctaText: popup.ctaText || null,
			delaySeconds: popup.delaySeconds ?? 4,
			image: {
				src: urlFor(popup.image).width(width * 2).auto("format").url(),
				alt: popup.image.alt || popup.title || "Helicopter Services",
				width,
				height: Math.round((width * natural.height) / natural.width),
			},
		};
	});

	return <PromoPopup popups={items} />;
}
