import { defineConfig } from "@rsbuild/core";
import { pluginReact } from "@rsbuild/plugin-react";

export default defineConfig({
  html: {
    title: "simplicity",
  },
  tools: {
    rspack: {
      module: {
        rules: [
          {
            test: /\.less$/,
            use: [
              {
                loader: "less-loader",
                options: {},
              },
            ],
            type: "css/auto",
          },
        ],
      },
      resolve: {
        alias: {
          "@": "/src",
        },
      },
    },
  },
  plugins: [pluginReact()],
});
