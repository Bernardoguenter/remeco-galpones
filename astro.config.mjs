// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import vercel from "@astrojs/vercel";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import partytown from "@astrojs/partytown";

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
    assetsInclude: [
      "**/*.jpg",
      "**/*.jpeg",
      "**/*.png",
      "**/*.webp",
      "**/*.avif",
      "**/*.svg",
    ],
    resolve: {
      alias: {
        "@components": "/src/components",
        "@actions": "/src/actions",
        "@helpers": "/src/helpers",
        "@layouts": "/src/layouts",
        "@lib": "/src/lib",
        "@pages": "/src/pages",
        "@styles": "/src/styles",
        "@assets": "/src/assets",
        "@config": "/src/config",
      },
    },
  },

  output: "server",
  prefetch: {
    prefetchAll: true,
  },
  adapter: vercel({
    imageService: true,
  }),
  site: "https://galponesremeco.com/",
  integrations: [
    react(),
    sitemap(),
    partytown({ config: { forward: ["dataLayer.push", "gtag"] } }),
  ],
});
