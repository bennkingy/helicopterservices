import { expect, reportGroup, test } from "./support";

reportGroup("Search engines (SEO)", "Pages Google can find");

// Same as SITE_URL in lib/seo.ts (not imported: that file pulls in Sanity).
const SITE_URL = "https://www.helicopterservices.co.uk";

// Every URL Google is given must answer 200 itself: a redirect, 404 or error
// in the sitemap wastes Google's crawl and shows up in Search Console.
// Redirects are not followed, so a URL that 301s somewhere else fails.
test("every URL in the sitemap returns 200 (no redirects)", { tag: "@desktop" }, async ({ request, baseURL }) => {
	test.setTimeout(180_000);
	const sitemapResponse = await request.get("/sitemap.xml");
	expect(sitemapResponse.status(), "sitemap.xml itself").toBe(200);
	const locs = Array.from((await sitemapResponse.text()).matchAll(/<loc>([^<]+)<\/loc>/g), (m) => m[1].trim());
	expect(locs.length).toBeGreaterThan(20);

	const problems: string[] = [];
	const seen = new Set<string>();
	for (const loc of locs) {
		const url = new URL(loc);
		// Sitemap URLs point at the live site (https + www), not localhost or a preview.
		if (url.origin !== SITE_URL) problems.push(`${loc}: should start with ${SITE_URL}`);
		if (seen.has(url.pathname)) problems.push(`${loc}: listed twice`);
		seen.add(url.pathname);

		// Fetched from the site under test (localhost or E2E_BASE_URL).
		const response = await request.get(new URL(url.pathname + url.search, baseURL).href, { maxRedirects: 0 });
		if (response.status() !== 200) {
			const to = response.headers().location;
			problems.push(`${url.pathname}: status ${response.status()}${to ? ` -> ${to}` : ""}`);
		}
	}
	expect(problems, problems.join("\n")).toEqual([]);
});

// Fetches the sitemap and checks every page in it has a title and canonical
// link (desktop run only; the pages are the same on phones).
test("every page in the sitemap loads, with a title and canonical link", { tag: "@desktop" }, async ({ request, baseURL }) => {
	test.setTimeout(180_000);
	const sitemap = await (await request.get("/sitemap.xml")).text();
	const urls = Array.from(sitemap.matchAll(/<loc>([^<]+)<\/loc>/g), (m) => new URL(m[1]).pathname);
	expect(urls.length).toBeGreaterThan(20);

	const problems: string[] = [];
	for (const path of urls) {
		const response = await request.get(new URL(path, baseURL).href);
		const html = await response.text();
		if (response.status() !== 200) problems.push(`${path}: status ${response.status()}`);
		else if (!/<title>[^<]+<\/title>/.test(html)) problems.push(`${path}: no <title>`);
		else if (!/<link rel="canonical"/.test(html)) problems.push(`${path}: no canonical link`);
	}
	expect(problems, problems.join("\n")).toEqual([]);
});

// Structured data (JSON-LD) is checked page by page in structured-data.spec.ts.
