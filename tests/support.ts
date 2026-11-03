import { test as base, expect } from "@playwright/test";
import * as allure from "allure-js-commons";

// Every end-to-end test uses this `test`, which switches on the safety rules
// below before the page loads. Import from here, never from @playwright/test.

// Anything that could send an email or count as a visitor.
const BLOCKED = [
	/api\.emailjs\.com/, // enquiry emails
	/googletagmanager\.com|google-analytics\.com/, // Google Analytics
	/cdn-cookieyes\.com|log\.cookieyes\.com/, // cookie banner + its logging
	/\/_vercel\/insights|\/_vercel\/speed-insights|vitals\.vercel-insights\.com/, // Vercel analytics
];

type Fixtures = {
	/** Requests to EmailJS the page tried to make (always intercepted, never sent). */
	emailRequests: string[];
};

export const test = base.extend<Fixtures>({
	emailRequests: [
		async ({ page }, use) => {
			const emailRequests: string[] = [];
			await page.route(
				(url) => BLOCKED.some((pattern) => pattern.test(url.href)),
				async (route) => {
					const url = route.request().url();
					if (/api\.emailjs\.com/.test(url)) {
						emailRequests.push(url);
						return route.fulfill({ status: 200, body: "OK (test: nothing was sent)" });
					}
					return route.abort();
				},
			);
			await use(emailRequests);
		},
		{ auto: true },
	],
});

export { expect };

// Groups a spec file in the Allure report.
export function reportGroup(epic: string, feature: string) {
	test.beforeEach(async () => {
		await allure.epic(epic);
		await allure.feature(feature);
	});
}
