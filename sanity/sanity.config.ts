import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { media } from "sanity-plugin-media";
import { structureTool } from "sanity/structure";
import { schemaTypes } from "./schemaTypes";

export default defineConfig({
	name: "default",
	title: "hs",
	projectId: "0he7nz2b",
	dataset: "production",
	plugins: [structureTool(), visionTool(), media()],
	schema: {
		types: schemaTypes,
	},
});
