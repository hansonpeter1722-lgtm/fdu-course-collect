import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import tailwindcss from "@tailwindcss/vite";

const base = process.env.PUBLIC_BASE_PATH || "/";
if (!base.startsWith("/") || /[?#]/.test(base))
  throw new Error("PUBLIC_BASE_PATH 必须是以 / 开头的路径");

export default defineConfig({
  output: "static",
  base: `${base.replace(/\/+$/, "")}/`,
  trailingSlash: "always",
  integrations: [react()],
  vite: { plugins: [tailwindcss()] },
  devToolbar: { enabled: false },
});
