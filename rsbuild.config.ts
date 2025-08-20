import { defineConfig } from "@rsbuild/core";
import { pluginReact } from "@rsbuild/plugin-react";

export default defineConfig({
  html: {
    title: "simplicity",
  },
  tools: {
    rspack: {
      resolve: {
        alias: {
          "@": "/src",
        },
      },
    },
  },
  plugins: [pluginReact()],
});
