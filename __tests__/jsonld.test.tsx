import { render } from "@testing-library/react";
import { faqDefaults } from "@/lib/faq-defaults";
import { faqJsonLd, getFaqs } from "@/lib/faqs";
import {
	JsonLd,
	breadcrumbJsonLd,
	courseJsonLd,
	courseWorkload,
	sectionBreadcrumbs,
	websiteJsonLd,
} from "@/lib/jsonld";
import { client } from "@/lib/sanity";
import * as allure from "allure-js-commons";

// Groups these tests in the Allure report (pnpm test:report).
beforeEach(async () => {
	await allure.epic("Search engines (SEO)");
	await allure.feature("Structured data builders (lib/jsonld.tsx, lib/faqs.ts)");
});

// The functions that build the JSON-LD (hidden data for Google). What the
// real pages output is checked end to end in tests/structured-data.spec.ts.

const SITE = "https://www.helicopterservices.co.uk";

const scriptOf = (data: object | object[]) => {
	const { container } = render(<JsonLd data={data} />);
	return container.querySelector('script[type="application/ld+json"]') as HTMLScriptElement;
};

describe("JsonLd (the <script> tag)", () => {
	it("outputs the data as JSON Google can read", () => {
		const data = { "@context": "https://schema.org", "@type": "Thing", name: "R44" };
		expect(JSON.parse(scriptOf(data).innerHTML)).toEqual(data);
	});

	it("takes a list of blocks", () => {
		const data = [{ "@type": "A" }, { "@type": "B" }];
		expect(JSON.parse(scriptOf(data).innerHTML)).toEqual(data);
	});

	// Negative: text from Sanity must not be able to end the script tag early
	// (that would break the page, or let someone inject HTML).
	it("escapes '<' so '</script>' in the text can't break out of the tag", () => {
		const data = { name: 'Evil </script><img src=x onerror="alert(1)"> <!-- x' };
		const script = scriptOf(data);
		expect(script.innerHTML).not.toMatch(/<\/script|<img|<!--/i);
		expect(script.innerHTML).toContain("\\u003c/script>");
		// ...and the text still reads back exactly as written.
		expect(JSON.parse(script.innerHTML)).toEqual(data);
	});
});

describe("breadcrumbJsonLd", () => {
	const crumbs = breadcrumbJsonLd([
		{ name: "Fleet", path: "/fleet" },
		{ name: "Robinson R44", path: "/fleet/r44" },
	]);

	it("always starts at Home, then follows the crumbs given", () => {
		expect(crumbs["@type"]).toBe("BreadcrumbList");
		expect(crumbs.itemListElement.map((c) => [c.position, c.name, c.item])).toEqual([
			[1, "Home", `${SITE}/`],
			[2, "Fleet", `${SITE}/fleet`],
			[3, "Robinson R44", `${SITE}/fleet/r44`],
		]);
	});

	it("every crumb is a ListItem with a full live-site address", () => {
		for (const crumb of crumbs.itemListElement) {
			expect(crumb["@type"]).toBe("ListItem");
			expect(crumb.item.startsWith(`${SITE}/`)).toBe(true);
		}
	});

	it("with no crumbs it's just Home", () => {
		expect(breadcrumbJsonLd([]).itemListElement).toHaveLength(1);
	});
});

describe("sectionBreadcrumbs", () => {
	it("Home › Section › Page", () => {
		const names = sectionBreadcrumbs(
			{ name: "Training", path: "/training" },
			{ title: "Night Rating", path: "/training/night-rating" },
		).itemListElement.map((c) => c.name);
		expect(names).toEqual(["Home", "Training", "Night Rating"]);
	});

	it("a section with no page of its own (Legal) is left out: Home › Page", () => {
		const items = sectionBreadcrumbs({ name: "Legal" }, { title: "Privacy", path: "/legal/privacy" }).itemListElement;
		expect(items.map((c) => c.name)).toEqual(["Home", "Privacy"]);
		expect(items[1].item).toBe(`${SITE}/legal/privacy`);
	});

	it("a page with no title falls back to the section name, never an empty crumb", () => {
		const items = sectionBreadcrumbs({ name: "Fleet", path: "/fleet" }, { path: "/fleet/r22" }).itemListElement;
		expect(items[2].name).toBe("Fleet");
	});
});

describe("courseJsonLd", () => {
	const course = courseJsonLd({
		title: "Night Rating",
		description: "Fly at night.",
		path: "/training/night-rating",
	});

	it("names the course, this page and the business running it", () => {
		expect(course).toMatchObject({
			"@type": "Course",
			name: "Night Rating",
			description: "Fly at night.",
			url: `${SITE}/training/night-rating`,
			provider: { "@id": `${SITE}/#business`, name: "Helicopter Services" },
		});
	});

	it("is taught on site at White Waltham", () => {
		expect(course.hasCourseInstance).toMatchObject({
			"@type": "CourseInstance",
			courseMode: "onsite",
			location: { name: "White Waltham Airfield", address: { postalCode: "SL6 3NJ" } },
		});
	});

	it("is marked as a paid course, with no amount (prices vary)", () => {
		expect(course.offers).toEqual([{ "@type": "Offer", category: "Paid" }]);
	});

	it("includes the course length when it's set in Sanity", () => {
		const ppl = courseJsonLd({ title: "PPL", path: "/training/ppl", hours: 45 });
		expect(ppl.hasCourseInstance).toMatchObject({ courseWorkload: "PT45H" });
	});

	// Negative: no length set, or a value that can't be right, leaves the field out.
	it.each([
		["not set", undefined],
		["null from Sanity", null],
		["zero", 0],
		["negative", -5],
		["not a number", Number.NaN],
		["infinite", Number.POSITIVE_INFINITY],
	])("leaves the course length out when it's %s", (_label, hours) => {
		const c = courseJsonLd({ title: "PPL", path: "/training/ppl", hours });
		expect(c.hasCourseInstance).not.toHaveProperty("courseWorkload");
		expect(JSON.stringify(c)).not.toMatch(/undefined|null|NaN/);
	});

	it("with no description it still gives one, never blank", () => {
		const fallback = courseJsonLd({ title: "PBN", path: "/training/pbn" });
		expect(fallback.description).toBe("PBN at Helicopter Services, White Waltham Airfield.");
		expect(courseJsonLd({ title: "PBN", description: "", path: "/training/pbn" }).description).toBe(
			fallback.description,
		);
	});
});

describe("courseWorkload (course length for Google)", () => {
	it.each([
		[45, "PT45H"],
		[1.5, "PT1H30M"],
		[0.5, "PT30M"],
		[150, "PT150H"],
		[10.25, "PT10H15M"],
	])("%s hours -> %s", (hours, expected) => {
		expect(courseWorkload(hours)).toBe(expected);
	});

	it.each([undefined, null, 0, -1, 0.001, Number.NaN])("%s -> left out", (hours) => {
		expect(courseWorkload(hours)).toBeUndefined();
	});
});

describe("websiteJsonLd (site name in Google results)", () => {
	it("names the site and points at the homepage", () => {
		expect(websiteJsonLd()).toEqual({
			"@context": "https://schema.org",
			"@type": "WebSite",
			"@id": `${SITE}/#website`,
			name: "Helicopter Services",
			url: `${SITE}/`,
			inLanguage: "en-GB",
			publisher: { "@id": `${SITE}/#business` },
		});
	});
});

describe("faqJsonLd", () => {
	it("turns each FAQ into a Question with its Answer", () => {
		const data = faqJsonLd([{ question: "Is flying safe?", answer: "Yes." }]);
		expect(data).toEqual({
			"@context": "https://schema.org",
			"@type": "FAQPage",
			mainEntity: [
				{ "@type": "Question", name: "Is flying safe?", acceptedAnswer: { "@type": "Answer", text: "Yes." } },
			],
		});
	});

	it("keeps the order of the list", () => {
		const names = faqJsonLd(faqDefaults).mainEntity.map((q) => q.name);
		expect(names).toEqual(faqDefaults.map((f) => f.question));
	});
});

// The FAQ page and its Google data come from getFaqs, so they never go blank.
describe("getFaqs (the list used by the FAQ page and its data)", () => {
	it("uses the Sanity list, skipping half-filled entries", async () => {
		vi.spyOn(client, "fetch").mockResolvedValue([
			{ question: "Q1?", answer: "A1" },
			{ question: "  ", answer: "no question" },
			{ question: "No answer?", answer: "" },
		] as never);
		expect(await getFaqs()).toEqual([{ question: "Q1?", answer: "A1" }]);
	});

	it.each([
		["empty in Sanity", []],
		["not set in Sanity", null],
		["only half-filled entries", [{ question: "Q?", answer: " " }]],
	])("falls back to the built-in list when %s", async (_label, value) => {
		vi.spyOn(client, "fetch").mockResolvedValue(value as never);
		expect(await getFaqs()).toEqual(faqDefaults);
	});

	it("falls back to the built-in list when Sanity can't be reached", async () => {
		vi.spyOn(console, "error").mockImplementation(() => {});
		vi.spyOn(client, "fetch").mockRejectedValue(new Error("offline"));
		expect(await getFaqs()).toEqual(faqDefaults);
	});
});
