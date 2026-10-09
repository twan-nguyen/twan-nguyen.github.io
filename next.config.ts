import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // GitHub Pages only serves static files, so build to the `out` folder.
  output: "export",
  // Empty for a `<username>.github.io` repo; set by the Pages workflow otherwise.
  basePath: process.env.PAGES_BASE_PATH,
  // The default image loader needs a server, which static export does not have.
  images: { unoptimized: true },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
