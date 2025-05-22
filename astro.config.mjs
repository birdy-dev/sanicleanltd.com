import { defineConfig } from "astro/config";

import tailwindcss from "@tailwindcss/vite";

import react from "@astrojs/react";

import icon from "astro-icon";

// https://astro.build/config
export default defineConfig({
    site: "https://sanicleanltd.com",
    output: "static",
    security: {
        checkOrigin: false, // This depends on your hosting provider
    },
    integrations: [
        react(),
        icon({ iconDir: "./src/icons" }),
    ],
    image: {
        domains: ["images.unsplash.com"],
    },
    vite: {
        plugins: [tailwindcss()],
    },
});
