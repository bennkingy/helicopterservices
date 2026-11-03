import { fileURLToPath } from "node:url";
import type { StorybookConfig } from "@storybook/nextjs";
import remarkGfm from "remark-gfm";
import type { Compiler } from "webpack";

// main.ts is an ES module in Storybook 10, so no __dirname.
const fromHere = (file: string) => fileURLToPath(new URL(file, import.meta.url));
const root = fromHere("../").replace(/[\\/]$/, "");

// Real files swapped for mocks, so every component renders offline with
// fixture data (no Sanity or email calls). Matched on the
// resolved file path, so it works however the file is imported
// ("@/lib/sanity", "./sanity", "../lib/sanity"...).
const swaps: Record<string, string> = {
	"lib/sanity.ts": "mocks/sanity.ts",
	"app/components/GMap.tsx": "mocks/gmap.tsx",
};
const normalise = (p: string) => p.replace(/\\/g, "/").toLowerCase();
const swapTable = new Map(
	Object.entries(swaps).map(([real, mock]) => [normalise(`${root}/${real}`), fromHere(`./${mock}`)]),
);

class MockModulesPlugin {
	apply(compiler: Compiler) {
		compiler.hooks.normalModuleFactory.tap("MockModulesPlugin", (factory) => {
			factory.hooks.beforeResolve.tap("MockModulesPlugin", (data) => {
				// "server-only" throws in the browser; it has nothing to do here.
				if (data.request === "server-only") data.request = fromHere("./mocks/empty.ts");
			});
			factory.hooks.afterResolve.tap("MockModulesPlugin", (data) => {
				const mock = swapTable.get(normalise(data.createData.resource || ""));
				if (mock) {
					data.createData.resource = mock;
					data.createData.userRequest = mock;
					data.createData.request = mock;
				}
			});
		});
	}
}

const config: StorybookConfig = {
	stories: [
		"./*.mdx",
		"../app/**/*.stories.@(ts|tsx)",
		"../components/**/*.stories.@(ts|tsx)",
	],
	addons: [
		{
			name: "@storybook/addon-docs",
			// GitHub-style tables and checklists in the .mdx docs pages.
			options: { mdxPluginOptions: { mdxCompileOptions: { remarkPlugins: [remarkGfm] } } },
		},
		"@storybook/addon-a11y",
		// Visual Tests panel: screenshots every story in Chromatic's cloud and
		// shows what changed since the last approved version.
		"@chromatic-com/storybook",
		// Visual page builder tab (Puck) for trying page layouts from these
		// components. Built for Storybook 9; on trial here with Storybook 10.
		"storybook-page-builder",
	],
	framework: { name: "@storybook/nextjs", options: {} },
	// Lets async server components (Footer, Navbar...) render.
	features: { experimentalRSC: true },
	staticDirs: ["../public"],
	env: (config) => ({
		...config,
		// Google's public reCAPTCHA test key (always passes) so the enquiry form renders.
		NEXT_PUBLIC_RECAPTCHA_SITE_KEY:
			process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || "6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI",
	}),
	webpackFinal: async (config) => {
		config.plugins = [...(config.plugins || []), new MockModulesPlugin()];
		return config;
	},
};

export default config;
