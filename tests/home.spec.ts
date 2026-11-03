import { expect, reportGroup, test } from "./support";

reportGroup("Website basics", "Homepage");

test("homepage loads with one main heading, in British English", async ({ page }) => {
	await page.goto("/");
	await expect(page).toHaveTitle(/Helicopter Services/);
	await expect(page.locator("html")).toHaveAttribute("lang", "en-GB");
	await expect(page.locator("h1")).toHaveCount(1);
	await expect(page.locator("h1")).toBeVisible();
});

// Desktop only: on phones the status is inside the menu.
test("header shows today's opening status", { tag: "@desktop" }, async ({ page }) => {
	await page.goto("/");
	await expect(
		page.getByText(/^(Open today|Open tomorrow|Open on|Open now|By appointment)/).first(),
	).toBeVisible();
});

test("hero video waits until the page has loaded", async ({ page }) => {
	const videoRequestsBeforeLoad: string[] = [];
	let loaded = false;
	page.on("load", () => {
		loaded = true;
	});
	page.on("request", (request) => {
		if (request.url().includes(".mp4") && !loaded) videoRequestsBeforeLoad.push(request.url());
	});
	await page.goto("/");
	expect(videoRequestsBeforeLoad).toEqual([]);
	// …and it does load afterwards.
	await expect
		.poll(async () => page.locator("video").evaluate((v: HTMLVideoElement) => v.currentSrc), { timeout: 15_000 })
		.toContain(".mp4");
});
