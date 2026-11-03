import { expect, reportGroup, test } from "./support";

reportGroup("Website basics", "Navigation and main pages");

const sections = ["/training", "/flights", "/industry", "/fleet", "/about-us", "/enquire"];

for (const path of sections) {
	test(`${path} opens with a main heading`, async ({ page }) => {
		const response = await page.goto(path);
		expect(response?.status()).toBeLessThan(400);
		const heading = page.locator("h1").first();
		await expect(heading).toBeVisible();
		await expect(heading).not.toHaveText("");
	});
}

test("a page that doesn't exist shows the 404 page", async ({ page }) => {
	const response = await page.goto("/this-page-does-not-exist");
	expect(response?.status()).toBe(404);
});

test("desktop menu links to the training pages", { tag: "@desktop" }, async ({ page }) => {
	await page.goto("/");
	await page.getByRole("link", { name: "Training", exact: true }).first().click();
	await expect(page).toHaveURL(/\/training$/);
});

test("phone menu opens with the keyboard (screen-reader users)", { tag: "@phone" }, async ({ page }) => {
	await page.goto("/flights");
	const button = page.getByRole("button", { name: "Open navigation menu" });
	await button.focus();
	await page.keyboard.press("Enter");
	const menu = page.getByRole("dialog");
	await expect(menu.getByText("Training", { exact: true })).toBeVisible();
	await expect(menu.getByText("+44 1494 513 166")).toBeVisible();
});
