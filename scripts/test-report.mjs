// Runs every test and builds the combined Allure report.
//
//   pnpm test:report                         unit tests + build the site + end-to-end tests
//   E2E_BASE_URL=https://… pnpm test:report  end-to-end tests against a deployed site (no build)
//   SKIP_E2E=1 pnpm test:report              unit tests only
//   SKIP_BUILD=1 pnpm test:report            reuse the last `pnpm build`
//
// The report is written to allure-report/ (open it with `pnpm report:open`).
// It always gets built, even when tests fail, so failures can be read in it;
// the script still exits with an error so the nightly pipeline is marked red.
import { spawnSync } from "node:child_process";
import { rmSync } from "node:fs";

const run = (label, command) => {
	console.log(`\n▶ ${label}\n  $ ${command}\n`);
	return spawnSync(command, { stdio: "inherit", shell: true }).status === 0;
};

rmSync("allure-results", { recursive: true, force: true });
const results = {};

results.unit = run("Unit and component tests (Vitest)", "pnpm exec vitest run");

if (!process.env.SKIP_E2E) {
	const local = !process.env.E2E_BASE_URL;
	const built = !local || process.env.SKIP_BUILD || run("Building the site", "pnpm build");
	results.e2e = built && run("End-to-end tests (Playwright)", "pnpm exec playwright test");
}

// Start from an empty folder so an old report is never left behind.
rmSync("allure-report", { recursive: true, force: true });
results.report = run("Building the Allure report", "pnpm exec allure generate");

console.log("\nResults:", results);
console.log("Open the report with: pnpm report:open\n");
process.exit(Object.values(results).every(Boolean) ? 0 : 1);
