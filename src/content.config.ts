import { glob } from "astro/loaders";
import { defineCollection, z } from "astro:content";

const service = defineCollection({
	loader: glob({ base: "./src/content/services", pattern: "**/*.{md,mdx}" }),
	schema: z.object({
		slug: z.string(),
		title: z.string(),
		description: z.string().optional(),
	}),
});

export const collections = { service };
