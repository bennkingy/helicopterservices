// Structured data (schema.org JSON-LD) helpers for Google rich results.
// The site-wide LocalBusiness block lives in app/layout.tsx.
import { SITE_NAME, SITE_URL } from "./seo";

export function JsonLd({ data }: { data: object | object[] }) {
	return (
		<script
			type="application/ld+json"
			// biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD
			dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
		/>
	);
}

type Crumb = { name: string; path: string };

// Home > Section > Page. Pass the crumbs after Home.
export function breadcrumbJsonLd(crumbs: Crumb[]) {
	const all = [{ name: "Home", path: "/" }, ...crumbs];
	return {
		"@context": "https://schema.org",
		"@type": "BreadcrumbList",
		itemListElement: all.map((crumb, index) => ({
			"@type": "ListItem",
			position: index + 1,
			name: crumb.name,
			item: `${SITE_URL}${crumb.path}`,
		})),
	};
}

// Breadcrumbs for a /section/slug page.
export function sectionBreadcrumbs(
	section: { name: string; path?: string },
	page: { title?: string; path: string },
) {
	const crumbs: Crumb[] = [];
	if (section.path) crumbs.push({ name: section.name, path: section.path });
	crumbs.push({ name: page.title || section.name, path: page.path });
	return breadcrumbJsonLd(crumbs);
}

// The site itself, on the homepage only. Google uses it to choose the site
// name shown in search results.
export function websiteJsonLd() {
	return {
		"@context": "https://schema.org",
		"@type": "WebSite",
		"@id": `${SITE_URL}/#website`,
		name: SITE_NAME,
		url: `${SITE_URL}/`,
		inLanguage: "en-GB",
		publisher: { "@id": `${SITE_URL}/#business` },
	};
}

// Hours -> ISO 8601 duration ("PT45H"). Anything that isn't a positive number
// (not set in Sanity, 0, typo) gives undefined, so the field is left out.
export function courseWorkload(hours?: number | null) {
	if (typeof hours !== "number" || !Number.isFinite(hours)) return undefined;
	const minutes = Math.round(hours * 60);
	if (minutes <= 0) return undefined;
	const h = Math.floor(minutes / 60);
	const m = minutes % 60;
	return `PT${h ? `${h}H` : ""}${m ? `${m}M` : ""}`; // 45 -> PT45H, 1.5 -> PT1H30M
}

// Training courses (PPL, CPL, IR...) so they can appear in Google's course listings.
// `hours` (Sanity: "Course length") is only included when it's set.
export function courseJsonLd(course: {
	title: string;
	description?: string;
	path: string;
	hours?: number | null;
}) {
	const workload = courseWorkload(course.hours);
	return {
		"@context": "https://schema.org",
		"@type": "Course",
		name: course.title,
		description: course.description || `${course.title} at ${SITE_NAME}, White Waltham Airfield.`,
		url: `${SITE_URL}${course.path}`,
		provider: {
			"@type": "Organization",
			"@id": `${SITE_URL}/#business`,
			name: SITE_NAME,
			sameAs: SITE_URL,
		},
		// Paid course; prices vary, so no amount is given.
		offers: [{ "@type": "Offer", category: "Paid" }],
		hasCourseInstance: {
			"@type": "CourseInstance",
			courseMode: "onsite",
			...(workload ? { courseWorkload: workload } : {}),
			location: {
				"@type": "Place",
				name: "White Waltham Airfield",
				address: {
					"@type": "PostalAddress",
					addressLocality: "Maidenhead",
					postalCode: "SL6 3NJ",
					addressCountry: "GB",
				},
			},
		},
	};
}
