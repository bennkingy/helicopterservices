import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { media, mediaAssetSource } from "sanity-plugin-media";
import { structureTool } from "sanity/structure";
import { schemaTypes } from "./schemaTypes";

export default defineConfig({
	name: "default",
	title: "Helicopter Services",
	projectId: "0he7nz2b",
	dataset: "production",
	plugins: [structureTool(), visionTool(), media()],
	form: {
		image: {
			assetSources: () => [mediaAssetSource],
		},
		// Optionally, handle file fields similarly if needed
		file: {
			assetSources: (previousAssetSources) => {
				return previousAssetSources.filter(
					(assetSource) => assetSource === mediaAssetSource,
				);
			},
		},
	},
	schema: {
		types: schemaTypes,
	},
});
