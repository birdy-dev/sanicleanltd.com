import node from "@astrojs/node";
import { defineConfig } from "astro/config";

import tailwindcss from '@tailwindcss/vite';


// https://astro.build/config
export default defineConfig({
	site: "https://change.me",
	output: "static",
	adapter: node({ mode: "standalone" }),
	security: {
		checkOrigin: false, // This depends on your hosting provider
	},
	integrations: [],
	vite: {
		plugins: [tailwindcss()],
	},
});
