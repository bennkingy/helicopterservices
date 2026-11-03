import { type APIRequestContext, request as playwrightRequest } from "@playwright/test";
import { openingHoursJsonLd } from "../lib/opening-hours";
import { getOpeningHours } from "../lib/opening-hours-sanity";
import { expect, reportGroup, test } from "./support";

// Structured data (JSON-LD): the hidden, labelled data each page gives Google
// so it can show richer search results (business details, breadcrumbs,
// courses, FAQs). Every page in the sitemap is checked.
//
// Each test has one step per page in the report; a failing page is marked red
// with a list of what's wrong, and the other pages are still checked.
// The pages are fetched as HTML (what Google reads), so desktop only.

reportGroup("Search engines (SEO)", "Structured data for Google (JSON-LD)");
// In order, one worker (pages fetched once); a failure doesn't skip the rest.
test.describe.configure({ mode: "default" });

// Same as SITE_URL in lib/seo.ts (not imported: that file pulls in Sanity).
const SITE_URL = "https://www.helicopterservices.co.uk";
const BUSINESS_ID = `${SITE_URL}/#business`;

// URL section -> breadcrumb name. Legal has no landing page, so no middle crumb.
const SECTIONS: Record<string, string | null> = {
	training: "Training",
	industry: "Industry",
	flights: "Flights",
	fleet: "Fleet",
	"about-us": "About us",
	legal: null,
};

// The only schema.org types the site uses, and where each one belongs.
const ALLOWED_TYPES = ["WebSite", "LocalBusiness", "BreadcrumbList", "Course", "FAQPage"];

// Hosts JSON-LD may link to. Anything else (localhost, a preview URL, the
// non-www domain) means a wrong address leaked into what Google is given.
const ALLOWED_HOSTS = [
	"www.helicopterservices.co.uk",
	"schema.org",
	"cdn.sanity.io",
	"www.facebook.com",
	"www.instagram.com",
];

type Json = Record<string, any>;
type Page = { path: string; html: string; text: string; h1: string; blocks: Json[]; parseErrors: string[] };

let api: APIRequestContext;
let sitemapPaths: string[] = [];
const pages: Page[] = [];

const decode = (s: string) =>
	s
		.replace(/&#x27;|&#39;/g, "'")
		.replace(/&quot;/g, '"')
		.replace(/&lt;/g, "<")
		.replace(/&gt;/g, ">")
		.replace(/&nbsp;/g, " ")
		.replace(/&amp;/g, "&");
const visibleText = (html: string) =>
	decode(
		html
			.replace(/<script[\s\S]*?<\/script>/g, " ")
			.replace(/<style[\s\S]*?<\/style>/g, " ")
			.replace(/<[^>]+>/g, " "),
	).replace(/\s+/g, " ");
const squash = (s: string) => s.replace(/\s+/g, " ").trim();

test.beforeAll(async ({}, testInfo) => {
	test.setTimeout(180_000);
	api = await playwrightRequest.newContext({ baseURL: testInfo.project.use.baseURL });
	const sitemap = await (await api.get("/sitemap.xml")).text();
	sitemapPaths = Array.from(sitemap.matchAll(/<loc>([^<]+)<\/loc>/g), (m) => new URL(m[1].trim()).pathname);

	for (const path of sitemapPaths) {
		const html = await (await api.get(path)).text();
		const blocks: Json[] = [];
		const parseErrors: string[] = [];
		const scripts = Array.from(html.matchAll(/<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g));
		for (const [, raw] of scripts) {
			try {
				blocks.push(...[JSON.parse(raw)].flat());
			} catch (error) {
				parseErrors.push(`not valid JSON (${(error as Error).message}): ${raw.slice(0, 80)}…`);
			}
		}
		const h1 = squash(visibleText((html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/) || [])[1] || ""));
		pages.push({ path, html, text: visibleText(html), h1, blocks, parseErrors });
	}
});

test.afterAll(async () => {
	await api?.dispose();
});

const ofType = (page: Page, type: string) => page.blocks.filter((b) => b["@type"] === type);
const pageUrl = (path: string) => `${SITE_URL}${path === "/" ? "/" : path}`;
const sectionOf = (path: string) => path.split("/")[1] ?? "";
const depth = (path: string) => path.split("/").filter(Boolean).length;

// Runs `check` for every page as its own report step; problems are soft
// failures so every page is checked and listed.
async function eachPage(
	filter: (page: Page) => boolean,
	check: (page: Page) => string[] | Promise<string[]>,
) {
	const selected = pages.filter(filter);
	expect(selected.length, "pages to check").toBeGreaterThan(0);
	for (const page of selected) {
		await test.step(page.path, async () => {
			const problems = await check(page);
			expect.soft(problems, `${page.path}\n${problems.join("\n")}`).toEqual([]);
		});
	}
}

// Every string and number anywhere in a block, with its location.
function walk(value: unknown, at = ""): [string, unknown][] {
	if (Array.isArray(value)) return value.flatMap((item, i) => walk(item, `${at}[${i}]`));
	if (value && typeof value === "object") {
		return Object.entries(value).flatMap(([key, item]) => walk(item, at ? `${at}.${key}` : key));
	}
	return [[at, value]];
}

test("every page's structured data is valid, and only uses known types", { tag: "@desktop" }, async () => {
	await test.info().attach("structured-data-by-page.json", {
		body: JSON.stringify(Object.fromEntries(pages.map((p) => [p.path, p.blocks])), null, 2),
		contentType: "application/json",
	});
	expect(pages.length).toBeGreaterThan(20);

	await eachPage(
		() => true,
		(page) => {
			const problems = [...page.parseErrors];
			for (const block of page.blocks) {
				const type = block["@type"];
				if (block["@context"] !== "https://schema.org") problems.push(`${type}: @context is ${block["@context"]}`);
				if (!ALLOWED_TYPES.includes(type)) problems.push(`unexpected type ${JSON.stringify(type)}`);
				for (const [at, value] of walk(block)) {
					const where = `${type}.${at}`;
					if (typeof value === "string") {
						if (!value.trim()) problems.push(`${where} is empty`);
						if (/^(undefined|null|NaN|\[object Object\])$/.test(value)) problems.push(`${where} is "${value}"`);
					} else if (typeof value === "number") {
						if (!Number.isFinite(value)) problems.push(`${where} is ${value}`);
					} else if (value === null || value === undefined) {
						problems.push(`${where} is ${value}`);
					}
				}
			}
			return problems;
		},
	);
});

test("links in structured data point at real pages on the live site", { tag: "@desktop" }, async () => {
	const known = new Set(sitemapPaths);
	const assets = new Map<string, number>(); // site file URL -> status, fetched once each

	await eachPage(
		() => true,
		async (page) => {
			const problems: string[] = [];
			for (const block of page.blocks) {
				for (const [at, value] of walk(block)) {
					if (typeof value !== "string" || !/^https?:\/\//.test(value)) continue;
					const where = `${block["@type"]}.${at}`;
					const url = new URL(value);
					if (url.protocol !== "https:") problems.push(`${where}: not https (${value})`);
					if (!ALLOWED_HOSTS.includes(url.host)) {
						problems.push(`${where}: unexpected address ${url.host} (${value})`);
						continue;
					}
					if (url.host !== new URL(SITE_URL).host) continue;
					if (/\.\w{2,4}$/.test(url.pathname)) {
						// A file (logo, image): it must exist.
						if (!assets.has(url.pathname)) assets.set(url.pathname, (await api.get(url.pathname)).status());
						if (assets.get(url.pathname) !== 200) {
							problems.push(`${where}: ${url.pathname} returns ${assets.get(url.pathname)}`);
						}
					} else if (url.pathname !== "/" && !known.has(url.pathname)) {
						problems.push(`${where}: ${url.pathname} isn't in the sitemap`);
					}
				}
			}
			return problems;
		},
	);
});

test("every page describes the business (LocalBusiness), the same way", { tag: "@desktop" }, async () => {
	const home = pages.find((p) => p.path === "/");
	expect(home, "homepage in the sitemap").toBeTruthy();
	const reference = home ? ofType(home, "LocalBusiness")[0] : undefined;

	await test.step("business details are right (checked on the homepage)", async () => {
		expect(reference, "LocalBusiness on the homepage").toBeTruthy();
		const b = reference as Json;
		expect(b["@id"]).toBe(BUSINESS_ID);
		expect(b.name).toBe("Helicopter Services");
		expect(b.url).toBe(SITE_URL);
		expect(b.description?.length).toBeGreaterThan(50);
		expect(b.telephone).toMatch(/^\+44\d{10}$/);
		// The phone number Google is given is the one on the site.
		expect(home?.html).toContain(`tel:${b.telephone}`);
		expect(b.email).toMatch(/^[^@\s]+@helicopterservices\.co\.uk$/);
		expect(b.address).toMatchObject({ "@type": "PostalAddress", addressCountry: "GB" });
		expect(b.address.postalCode).toMatch(/^[A-Z]{1,2}\d[A-Z\d]? \d[A-Z]{2}$/);
		expect(b.address.streetAddress && b.address.addressLocality).toBeTruthy();
		// Somewhere in the UK.
		expect(b.geo.latitude).toBeGreaterThan(49.8);
		expect(b.geo.latitude).toBeLessThan(60.9);
		expect(b.geo.longitude).toBeGreaterThan(-8.7);
		expect(b.geo.longitude).toBeLessThan(1.8);
		for (const link of b.sameAs ?? []) expect(link).toMatch(/^https:\/\//);
		// Left out on purpose (see app/layout.tsx): Google doesn't allow review
		// stars for a business's own or Tripadvisor reviews.
		expect(b, "no review score (aggregateRating)").not.toHaveProperty("aggregateRating");
		expect(b, "no reviews").not.toHaveProperty("review");
	});

	await test.step("opening hours match the hours the site shows (Sanity, else lib/opening-hours.ts)", async () => {
		// Weekdays with set hours, grouped by time; by-appointment days aren't given to Google.
		const key = (spec: Json) => `${spec.opens}-${spec.closes}`;
		const asMap = (specs: Json[]) =>
			Object.fromEntries(specs.map((spec) => [key(spec), [spec.dayOfWeek].flat().sort()]));
		const expected = openingHoursJsonLd(await getOpeningHours());
		expect(asMap(reference?.openingHoursSpecification ?? [])).toEqual(asMap(expected));
	});

	await eachPage(
		() => true,
		(page) => {
			const found = ofType(page, "LocalBusiness");
			if (found.length !== 1) return [`${found.length} LocalBusiness blocks (should be 1)`];
			return JSON.stringify(found[0]) === JSON.stringify(reference) ? [] : ["differs from the homepage's"];
		},
	);
});

test("the homepage tells Google the site's name (WebSite)", { tag: "@desktop" }, async () => {
	const home = pages.find((p) => p.path === "/");
	const found = home ? ofType(home, "WebSite") : [];
	expect(found, "one WebSite block on the homepage").toHaveLength(1);
	expect(found[0]).toMatchObject({
		"@id": `${SITE_URL}/#website`,
		name: "Helicopter Services",
		url: `${SITE_URL}/`,
		inLanguage: "en-GB",
		publisher: { "@id": BUSINESS_ID },
	});
	// The name Google is given is the one in the page title.
	expect(home?.html).toMatch(/<title>[^<]*Helicopter Services[^<]*<\/title>/);
});

test("pages below a section have breadcrumbs: Home › Section › Page", { tag: "@desktop" }, async () => {
	const known = new Set(sitemapPaths);
	await eachPage(
		(page) => depth(page.path) >= 2,
		(page) => {
			const found = ofType(page, "BreadcrumbList");
			if (found.length !== 1) return [`${found.length} BreadcrumbList blocks (should be 1)`];
			const items: Json[] = found[0].itemListElement ?? [];
			const problems: string[] = [];
			const section = sectionOf(page.path);
			const sectionName = SECTIONS[section];
			const expectedLength = sectionName === null ? 2 : 3;

			if (!(section in SECTIONS)) problems.push(`unknown section /${section}`);
			if (items.length !== expectedLength) problems.push(`${items.length} crumbs (should be ${expectedLength})`);
			items.forEach((item, i) => {
				if (item["@type"] !== "ListItem") problems.push(`crumb ${i + 1} is ${item["@type"]}`);
				if (item.position !== i + 1) problems.push(`crumb ${i + 1} has position ${item.position}`);
				if (!item.name?.trim()) problems.push(`crumb ${i + 1} has no name`);
				const path = item.item ? new URL(item.item).pathname : "";
				if (path !== "/" && !known.has(path)) problems.push(`crumb ${i + 1} links to ${item.item}, not in the sitemap`);
			});
			const [first, second] = items;
			const last = items[items.length - 1];
			if (first?.name !== "Home" || first?.item !== `${SITE_URL}/`) problems.push(`first crumb is ${JSON.stringify(first)}`);
			if (sectionName && (second?.name !== sectionName || second?.item !== `${SITE_URL}/${section}`)) {
				problems.push(`middle crumb is ${second?.name} -> ${second?.item} (should be ${sectionName} -> /${section})`);
			}
			if (last?.item !== pageUrl(page.path)) problems.push(`last crumb links to ${last?.item}, not this page`);
			if (last?.name === "Home" || last?.name === sectionName) problems.push(`last crumb is named "${last?.name}"`);
			return problems;
		},
	);
});

test("the homepage has no breadcrumbs (it's the top)", { tag: "@desktop" }, async () => {
	const home = pages.find((p) => p.path === "/");
	expect(home && ofType(home, "BreadcrumbList")).toEqual([]);
});

test("every training page describes its course (Course)", { tag: "@desktop" }, async () => {
	await eachPage(
		(page) => sectionOf(page.path) === "training" && depth(page.path) === 2,
		(page) => {
			const found = ofType(page, "Course");
			if (found.length !== 1) return [`${found.length} Course blocks (should be 1)`];
			const c = found[0];
			const problems: string[] = [];
			if (squash(c.name ?? "") !== page.h1) problems.push(`name "${c.name}" doesn't match the page heading "${page.h1}"`);
			if ((c.description ?? "").length < 50) problems.push(`description too short: "${c.description}"`);
			if (c.description === `${c.name} at Helicopter Services, White Waltham Airfield.`) {
				problems.push("description is the generic fallback: add an SEO description to this page in Sanity");
			}
			if (c.url !== pageUrl(page.path)) problems.push(`url is ${c.url}, not this page`);
			if (c.provider?.["@id"] !== BUSINESS_ID) problems.push(`provider @id is ${c.provider?.["@id"]}`);
			if (c.provider?.name !== "Helicopter Services") problems.push(`provider name is ${c.provider?.name}`);
			const instance = c.hasCourseInstance;
			if (instance?.["@type"] !== "CourseInstance") problems.push("no CourseInstance");
			if (!["onsite", "online", "blended"].includes(instance?.courseMode)) problems.push(`courseMode is ${instance?.courseMode}`);
			if (!instance?.location?.address?.postalCode) problems.push("course location has no postcode");
			// Paid course, no amount (prices vary).
			const offers: Json[] = c.offers ?? [];
			if (offers.length !== 1 || offers[0]["@type"] !== "Offer" || offers[0].category !== "Paid") {
				problems.push(`offers is ${JSON.stringify(c.offers)} (should be one Offer with category "Paid")`);
			}
			// Course length: optional (only when set in Sanity), but must be a real duration.
			if ("courseWorkload" in (instance ?? {}) && !/^PT(?=\d)(\d+H)?(\d+M)?$/.test(instance.courseWorkload ?? "")) {
				problems.push(`courseWorkload is ${JSON.stringify(instance.courseWorkload)} (should be like "PT45H")`);
			}
			return problems;
		},
	);
});

test("the FAQ page gives Google the questions and answers visitors can read", { tag: "@desktop" }, async () => {
	await eachPage(
		(page) => page.path === "/about-us/faqs",
		(page) => {
			const found = ofType(page, "FAQPage");
			if (found.length !== 1) return [`${found.length} FAQPage blocks (should be 1)`];
			const questions: Json[] = found[0].mainEntity ?? [];
			const problems: string[] = [];
			if (questions.length < 3) problems.push(`only ${questions.length} questions`);
			const names = questions.map((q) => squash(q.name ?? ""));
			if (new Set(names).size !== names.length) problems.push("the same question is listed twice");
			questions.forEach((q, i) => {
				const label = `question ${i + 1} ("${q.name}")`;
				if (q["@type"] !== "Question") problems.push(`${label} is ${q["@type"]}`);
				if (q.acceptedAnswer?.["@type"] !== "Answer") problems.push(`${label} has no Answer`);
				const answer = squash(q.acceptedAnswer?.text ?? "");
				if (answer.length < 20) problems.push(`${label} has a very short answer`);
				// Google only allows FAQ data for questions and answers on the page.
				if (!page.text.includes(squash(q.name ?? ""))) problems.push(`${label} isn't on the page`);
				if (!page.text.includes(answer)) problems.push(`${label}: its answer isn't on the page`);
			});
			return problems;
		},
	);
});

// Negative checks: rich-result data on the wrong page is ignored at best and
// a Search Console warning at worst.
test("each kind of data only appears on the pages it belongs to", { tag: "@desktop" }, async () => {
	await eachPage(
		() => true,
		(page) => {
			const problems: string[] = [];
			const isCourse = sectionOf(page.path) === "training" && depth(page.path) === 2;
			const count = (type: string) => ofType(page, type).length;
			if (!isCourse && count("Course")) problems.push("Course data on a page that isn't a training course");
			if (page.path !== "/about-us/faqs" && count("FAQPage")) problems.push("FAQ data outside the FAQ page");
			if (page.path !== "/" && count("WebSite")) problems.push("WebSite data outside the homepage");
			return problems;
		},
	);
});
