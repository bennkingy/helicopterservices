// Builds Storybook into public/storybook so the live site serves it at
// /storybook (kept out of search engines by the X-Robots-Tag header in
// next.config.mjs). Runs before `next build` on Vercel: see vercel.json.
//
// Storybook copies the whole of public/ into its output (staticDirs). The
// site already serves those files at the same paths (/images/..., /videos/...),
// so they're left out of the copy instead of being deployed twice.
import { execSync } from "node:child_process";
import { cpSync, existsSync, readdirSync, rmSync } from "node:fs";
import { delimiter, join, resolve } from "node:path";

const out = "storybook-static";
const target = join("public", "storybook");

rmSync(target, { recursive: true, force: true });
// Local binaries on the PATH, as when run through a package.json script.
const PATH = [resolve("node_modules", ".bin"), process.env.PATH].join(delimiter);
execSync(`storybook build -o ${out} --quiet`, { stdio: "inherit", env: { ...process.env, PATH } });

const fromPublic = new Set(readdirSync("public"));
for (const entry of readdirSync(out)) {
	if (fromPublic.has(entry)) continue;
	// Source maps would publish the source code, so they stay out.
	cpSync(join(out, entry), join(target, entry), {
		recursive: true,
		filter: (src) => !src.endsWith(".map"),
	});
}
if (!existsSync(join(target, "index.html"))) {
	throw new Error("Storybook build has no index.html");
}
console.log(`Storybook copied to ${target}`);
