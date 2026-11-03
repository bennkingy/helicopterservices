import { defineConfig, devices } from "@playwright/test";

// End-to-end tests: real browsers clicking through the real site.
//   pnpm test:e2e                 builds nothing; starts `pnpm start` (run `pnpm build` first)
//   E2E_BASE_URL=https://… pnpm test:e2e   test a deployed site instead
// Results go to the Allure report (pnpm test:report) and playwright-report/.
//
// SAFETY (tests/support.ts): every test blocks EmailJS and analytics,
// so no email is sent and visitor stats stay clean.
const baseURL = process.env.E2E_BASE_URL || "http://localhost:3000";
const startLocalServer = !process.env.E2E_BASE_URL;

export default defineConfig({
	testDir: "./tests",
	fullyParallel: true,
	forbidOnly: !!process.env.CI,
	retries: process.env.CI ? 2 : 0,
	workers: process.env.CI ? 2 : undefined,
	timeout: 60_000,
	reporter: [
		["list"],
		["html", { open: "never" }],
		// For the Azure DevOps "Tests" tab.
		["junit", { outputFile: "./reports/junit/e2e.xml" }],
		[
			"allure-playwright",
			{
				resultsDir: "./allure-results",
				globalLabels: [{ name: "layer", value: "End-to-end tests (real browser)" }],
			},
		],
	],
	use: {
		baseURL,
		trace: "on-first-retry",
		screenshot: "only-on-failure",
		video: "retain-on-failure",
	},
	// Tests tagged @desktop or @phone only run (and only appear in the report)
	// on that device, so they don't show up as "skipped" on the other one.
	projects: [
		{ name: "Desktop", use: { ...devices["Desktop Chrome"] }, grepInvert: /@phone/ },
		{ name: "Phone", use: { ...devices["Pixel 7"] }, grepInvert: /@desktop/ },
	],
	webServer: startLocalServer
		? { command: "pnpm start", url: baseURL, reuseExistingServer: true, timeout: 120_000 }
		: undefined,
});
