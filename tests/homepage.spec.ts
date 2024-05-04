import { expect, test } from "@playwright/test";

//Variables

// URL List
const homeUrl = "http://localhost:3000/";
const trainingUrl = homeUrl + "training";
const industryUrl = homeUrl + "industry";
const flightsUrl = homeUrl + "flights";
const aboutUsUrl = homeUrl + "about-us";
const fleetUrl = aboutUsUrl + "helicopter-fleet";
const enquireUrl = homeUrl + "helicopter-fleet";

// Manually set timeout for page loading - 3s
const pageLoadTimeout = 3000;

// 1. E2E - https://nextjs.org/docs/app/building-your-application/testing/playwright
// 2. COMPONENT UNIT TESTING - https://nextjs.org/docs/app/building-your-application/testing/jest

// Tests

test("Verify Header Options", async ({ page }) => {
	await page.goto(homeUrl);
	// await page.click('[data-id="headerOptionHome"]');

	// Verifying Home button
	await page.waitForSelector('[data-id="headerOptionTraining"]');
	await page.click('[data-id="headerOptionTraining"]');

	// Verifying Training button
	await page.waitForSelector('[data-id="headerOptionTraining"]');
	await page.click('[data-id="headerOptionTraining"]');
	await page.waitForTimeout(pageLoadTimeout);
	await expect(page).toHaveURL(trainingUrl);

	// // Verifying Industry button
	// await page.waitForSelector('[data-id="headerOptionIndustry"]');
	// await page.click('[data-id="headerOptionIndustry"]');
	// await page.waitForTimeout(pageLoadTimeout);
	// await expect(page).toHaveURL(industryUrl);

	// // Verifying Flights button
	// await page.waitForSelector('[data-id="headerOptionFlights"]');
	// await page.click('[data-id="headerOptionFlights"]');
	// await page.waitForTimeout(pageLoadTimeout);
	// await expect(page).toHaveURL(flightsUrl);

	// // Verifying Fleet button
	// await page.waitForSelector('[data-id="headerOptionFleet"]');
	// await page.click('[data-id="headerOptionFleet"]');
	// await page.waitForTimeout(pageLoadTimeout);
	// await expect(page).toHaveURL(fleetUrl);

	// // Verifying About us button
	// await page.waitForSelector('[data-id="headerOptionAboutUs"]');
	// await page.click('[data-id="headerOptionAboutUs"]');
	// await page.waitForTimeout(pageLoadTimeout);
	// await expect(page).toHaveURL(aboutUsUrl);

	// // Verifying Enquire button
	// await page.waitForSelector('[data-id="headerOptionEnquire"]');
	// await page.click('[data-id="headerOptionEnquire"]');
	// await page.waitForTimeout(pageLoadTimeout);
	// await expect(page).toHaveURL(enquireUrl);
});

// test("Verify menu option's item lists (On Hover)", async ({ page }) => {
// 	await page.goto(homeUrl);

// 	// DRE

// 	await page.click('[data-id="headerOptionTraining"]');
// 	// Find the element you want to hover over
// 	const menuButton = await page.locator('[data-id="headerOptionTraining"]');
// 	// Hover over the element
// 	await menuButton.hover('[data-id="trainingPrivatePilotLicense"]');

// 	// Now, you can interact with the opened menu list - For example,  check if specific menu items are visible
// 	// Wait for the menu item to be visible
// 	// await page.waitForSelector('[data-id="menuItem"]');
// 	// // Assert that the menu item is visible
// 	// const menuItem = await page.locator('[data-id="trainingPrivatePilotLicense"]');
// 	// await expect(menuItem).toBeVisible();

// 	// await expect(page).toHaveURL('http://yourappurl.com/dashboard');
// 	// await page.fill('input[name="username"]', 'testuser');
// 	// await page.fill('input[name="password"]', 'password');
// 	// await page.click('text=Submit');
// });

// test("has title", async ({ page }) => {
// 	await page.goto("http://localhost:3000/");

// 	// Expect a title "to contain" a substring.
// 	await expect(page).toHaveTitle(/Helicopter Services/);
// });

// test("get started link", async ({ page }) => {
// 	await page.goto("http://localhost:3000/");

// 	// Click the get started link.
// 	await page.getByRole("link", { name: "Get started" }).click();

// 	// Expects page to have a heading with the name of Installation.
// 	await expect(page.getByRole("heading", { name: "Installation" })).toBeVisible();
// });

// test("Validate Enquiry form page", async ({ page }) => {
// 	await page.goto("http://localhost:3000/");
// 	// await page.click('[data-id="headerOptionHome"]');
// 	// await page.fill('input[name="username"]', 'testuser');
// 	// await page.fill('input[name="password"]', 'password');
// 	// await page.click('text=Submit');
// 	// await expect(page).toHaveURL('http://yourappurl.com/dashboard');
// });
