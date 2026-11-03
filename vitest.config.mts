import { fileURLToPath } from "node:url";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";

// Unit and component tests: pnpm test:unit (once) or pnpm test:watch.
// Playwright end-to-end tests live in tests/ and run with pnpm test.
export default defineConfig({
	plugins: [react()],
	resolve: { alias: { "@": fileURLToPath(new URL("./", import.meta.url)) } },
	test: {
		environment: "jsdom",
		globals: true, // describe / it / expect / vi without importing them
		setupFiles: ["./vitest.setup.ts"],
		include: ["__tests__/**/*.test.{ts,tsx}", "lib/**/*.test.ts"],
		restoreMocks: true,
		// "default" prints to the terminal; Allure collects results for the report.
		reporters: [
			"default",
			// For the Azure DevOps "Tests" tab.
			["junit", { outputFile: "./reports/junit/unit.xml" }],
			[
				"allure-vitest/reporter",
				{
					resultsDir: "./allure-results",
					globalLabels: [{ name: "layer", value: "Unit and component tests" }],
				},
			],
		],
		coverage: { provider: "v8", reportsDirectory: "coverage" },
	},
});
