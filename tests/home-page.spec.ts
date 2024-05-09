import { expect, test } from "@playwright/test";
import {
	homeUrl,
	trainingUrl,
	industryUrl,
	flightsUrl,
	fleetUrl,
	aboutUsUrl,
	enquiryUrl,
} from "./helpers/test-variables.spec";
import { Menu } from "lucide-react";

// Tests

// test("Verifying NavBar, Home & Landing Pages", async ({ page }) => {			TODO: @andre to update tests when home page is ready
// 	await page.goto(homeUrl);

// 	// Verifying Home button & page
// 	// await page.getByTestId("navMenuHome").check();

// 	// Verifying Training button & page
// 	await page.getByTestId("navMenuTraining").click();
// 	await expect(page).toHaveURL(trainingUrl);

// 	// Verifying Industry button & page
// 	await page.getByTestId("navMenuIndustry").click();
// 	await expect(page).toHaveURL(industryUrl);

// 	// Verifying Flights button & page
// 	await page.getByTestId("navMenuFlights").click();
// 	await expect(page).toHaveURL(flightsUrl);

// 	// Verifying Fleet button
// 	await page.getByTestId("navMenuFleet").click();
// 	await expect(page).toHaveURL(fleetUrl);

// 	// Verifying About us button
// 	await page.getByTestId("navMenuAboutUs").click();
// 	await expect(page).toHaveURL(aboutUsUrl);

// 	// Verifying Enquire button
// 	await page.getByTestId("navMenuEnquire").click();
// 	await expect(page).toHaveURL(enquiryUrl);
// });
