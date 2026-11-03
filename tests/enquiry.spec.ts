import { expect, reportGroup, test } from "./support";

// The enquiry form in a real browser. NO EMAIL IS SENT: tests/support.ts
// intercepts every request to EmailJS, and these tests never pass reCAPTCHA.
reportGroup("Enquiries", "Enquiry form (in the browser)");

test("an empty form shows what's missing and sends nothing", async ({ page, emailRequests }) => {
	await page.goto("/enquire");
	await page.getByRole("button", { name: /submit enquiry/i }).click();
	await expect(page.getByText("Please enter your name")).toBeVisible();
	await expect(page.getByText("Please enter a valid email address")).toBeVisible();
	await expect(page.getByText("Please enter your message")).toBeVisible();
	expect(emailRequests).toEqual([]);
});

test("accepts UK phone numbers the way people type them", async ({ page }) => {
	await page.goto("/enquire");
	for (const number of ["+44 1494 513 166", "07700 900123", "(01494) 513166"]) {
		await page.getByLabel("Contact number").fill(number);
		await page.getByRole("button", { name: /submit enquiry/i }).click();
		await expect(page.getByText(/valid contact number|can only contain digits/)).toHaveCount(0);
	}
});

test("won't send until the reCAPTCHA is done", async ({ page, emailRequests }) => {
	await page.goto("/enquire");
	await page.getByLabel("Name").fill("Nightly Test");
	await page.getByLabel("Email").fill("nightly-test@helicopter-fan.co.uk");
	await page.getByLabel("Contact number").fill("07700 900123");
	await page.getByLabel("Message").fill("Automated test. Please ignore. (Never actually sent.)");

	// The form uses a browser alert; answer it as soon as it appears.
	let alertText = "";
	page.once("dialog", async (dialog) => {
		alertText = dialog.message();
		await dialog.dismiss();
	});
	await page.getByRole("button", { name: /submit enquiry/i }).click();
	await expect.poll(() => alertText).toBe("Please complete the reCAPTCHA.");
	expect(emailRequests).toEqual([]);
});

test("pre-selects the service page the visitor came from", async ({ page }) => {
	await page.goto("/flights/trial-lessons");
	// Wait until the site has noted this page (a real visitor would take longer).
	await page.waitForFunction(() => sessionStorage.getItem("hs:currentPath") === "/flights/trial-lessons");
	await page.goto("/enquire");
	await expect(page.getByRole("radio", { name: "Flights" })).toBeChecked();
	await expect(page.getByText("Which flights service?")).toBeVisible();
});
