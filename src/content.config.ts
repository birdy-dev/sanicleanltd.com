import { glob } from "astro/loaders";
import { defineCollection, z } from "astro:content";

const service = defineCollection({
	loader: glob({ base: "./src/content/services", pattern: "**/*.{md,mdx}" }),
	schema: ({ image }) =>
		z.object({
			slug: z.string(),
			title: z.string(),
			description: z.string().optional(),
			image: image(),
		}),
});

export const collections = { service };
