import { expect, test } from "@playwright/test";

//Variables

// URL List
const homeUrl = "http://localhost:3000/";
const trainingUrl = homeUrl + "training";
const aboutUsUrl = homeUrl + "about-us";
const enquireUrl = homeUrl + "helicopter-fleet";

// Manually set timeout for page loading - 3s
const pageLoadTimeout = 3000;

// 1. E2E - https://nextjs.org/docs/app/building-your-application/testing/playwright
// 2. COMPONENT UNIT TESTING - https://nextjs.org/docs/app/building-your-application/testing/jest

// Tests

test("Verify Header Options", async ({ page }) => {
	await page.goto(trainingUrl);

	await page.click('[data-id=""]');

	await page.waitForSelector('[data-id="headerOptionTraining"]');
	await page.click('[data-id="headerOptionTraining"]');
});
