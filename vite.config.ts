// @lovable.dev/vite-tanstack-config (MIT, on npm) is a wrapper around the Vite plugins this app
// needs: tanstackStart, viteReact, tailwindcss, tsConfigPaths, Nitro (build only), the @ path
// alias, VITE_* env injection and React/TanStack dedupe. Do not add those plugins again here, or
// they will be registered twice. Extra Vite options go in defineConfig({ vite: { ... } }).
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  // Pin the Nitro preset: Cloudflare Pages sets CF_PAGES, which makes Nitro auto-select
  // `cloudflare-pages` and breaks the prerender step. The static output is identical.
  nitro: { preset: "cloudflare-module" },
  tanstackStart: {
    // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
    // nitro/vite builds from this
    server: { entry: "server" },
    prerender: { enabled: true, crawlLinks: false },
  },
});
