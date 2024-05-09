import { expect, test } from "@playwright/test";
import {
	homeUrl,
	enquiryUrl,
	email,
	name,
	enquiryMessage,
	enquiryTitleContent,
	emailFieldLabel,
	emailFieldText,
	nameFieldLabel,
	nameFieldText,
	enquiryFieldLabel,
	enquiryFieldText,
	enquiryButtonContent,
	successToaster,
	blackFont,
	redFont,
	emailErrorMessage,
	nameErrorMessage,
	enquiryErrorMessage,
} from "./helpers/test-variables.spec";

test("Verifying Enquiry Form components", async ({ page }) => {
	// Verifying user journey starting from Home page - TODO: @Andre to update when nav menu is complete
	// await page.goto(homeUrl);
	// await page.getByTestId("navMenuEnquire").click();

	// Verifying Navigation Menu options - TODO: @Andre to update when nav menu is complete
	// await expect(page).toHaveURL(enquiryUrl);
	await page.goto(enquiryUrl);
	// await expect(page.getByTestId("logo")).toBeVisible();
	// await expect(page.getByTestId("navMenuTraining")).toBeVisible();
	// await expect(page.getByTestId("navMenuIndustry")).toBeVisible();
	// await expect(page.getByTestId("navMenuFlights")).toBeVisible();
	// await expect(page.getByTestId("navMenuFleet")).toBeVisible();
	// await expect(page.getByTestId("navMenuAboutUs")).toBeVisible();
	// await expect(page.getByTestId("navMenuEnquire")).toBeVisible();

	// Verifying the page title
	await expect(page.getByTestId("enquiryTitle")).toHaveText(enquiryTitleContent);
	// Testing the Email field
	await expect(page.getByTestId("emailLabel")).toHaveText(emailFieldLabel);
	const emailPLaceholder = await page.getByTestId("emailField");
	const emailPlaceholderText = await emailPLaceholder.getAttribute("placeholder");
	await expect(emailPlaceholderText).toBe(emailFieldText);
	await page.getByTestId("emailField").fill(email);
	// Testing the Name field
	await expect(page.getByTestId("nameLabel")).toHaveText(nameFieldLabel);
	const namePlaceholder = await page.getByTestId("nameField");
	const namePlaceholderText = await namePlaceholder.getAttribute("placeholder");
	await expect(namePlaceholderText).toBe(nameFieldText);
	await page.getByTestId("nameField").fill(name);
	// Testing the Enquiry field
	await expect(page.getByTestId("enquiryLabel")).toHaveText(enquiryFieldLabel);
	const enquiryPlaceholder = page.getByTestId("enquiryField");
	await expect(enquiryPlaceholder).toHaveAttribute("placeholder", enquiryFieldText);
	await page.getByTestId("enquiryField").fill(enquiryMessage);
	// Testing the Enquiry Button
	const enquiryButton = await page.getByTestId("submitEnquiryButton").textContent();
	await expect(enquiryButtonContent).toBe(enquiryButton);
	await page.getByTestId("submitEnquiryButton").click();
	// Testing the Successful toaster
	await expect(page.getByTestId("toastDescription")).toBeVisible();
	await expect(page.getByTestId("toastDescription")).toHaveText(successToaster);
});

test("Validating enquiry form error handling", async ({ page }) => {
	await page.goto(enquiryUrl);

	const labels = ["emailLabel", "nameLabel", "enquiryLabel"];

	// Checking default style for form labels
	for (const label of labels) {
		const selectedLabel = await page.getByTestId(label);

		// Get the computed style of the element
		const labelStyle = await selectedLabel.evaluate(element => {
			const style = window.getComputedStyle(element);
			return {
				color: style.getPropertyValue("color"),
			};
		});
		await expect(labelStyle.color).toBe(blackFont);
	}

	// Triggering invalid enquiry submission to trigger errors
	await page.getByTestId("submitEnquiryButton").click();

	// Testing mandatory data
	// Verifying "invalid" style is applied for form labels
	for (const label of labels) {
		const selectedLabel = await page.getByTestId(label);

		// Getting the computed style of the element
		const labelStyle = await selectedLabel.evaluate(element => {
			const style = window.getComputedStyle(element);
			return {
				color: style.getPropertyValue("color"),
			};
		});
		await expect(labelStyle.color).toBe(redFont);
	}

	// Verifying expected error messages are displayed with the correct style
	const errorMessages = [emailErrorMessage, nameErrorMessage, enquiryErrorMessage];

	for (const errorMessage of errorMessages) {
		const selectedMessage = await page.locator(`text=${errorMessage}`);
		await expect(selectedMessage.isVisible()).resolves.toBe(true);

		// Get the computed color of the element
		const messageColour = await selectedMessage.evaluate(element => {
			const style = window.getComputedStyle(element);
			return style.color;
		});
		expect(messageColour).toEqual(redFont);
	}

	// TODO: update locator for validation messages instead of using TEXT

	// TODO: add tests for footer validation (at least component level not individual component elements)
});
