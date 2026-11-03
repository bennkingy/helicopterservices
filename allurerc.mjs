import { defineConfig } from "allure";

// Combined test report (unit + end-to-end) for the client.
//   pnpm test:report       run every test, then build the report
//   pnpm report:open       open the last report in your browser
// The nightly Azure pipeline (azure-pipelines-nightly.yml) runs the same thing.
export default defineConfig({
	name: "Helicopter Services: test report",
	output: "./allure-report",
	resultsDir: ["./allure-results"],
	// Keeps a running history so the report shows trends night by night.
	historyPath: "./allure-history/history.jsonl",
	historyLimit: 60,
	plugins: {
		awesome: {
			options: {
				reportName: "Helicopter Services: test report",
				reportLanguage: "en",
				// Unit vs end-to-end first, then by area of the site, then feature.
				groupBy: ["layer", "epic", "feature"],
				singleFile: false,
			},
		},
	},
});
