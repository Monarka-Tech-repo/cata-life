import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    // Static export has no image-optimization server.
    unoptimized: true,
  },
  trailingSlash: true,
  experimental: {
    // Each language has its own root layout, so unmatched URLs need a
    // standalone 404 page (app/global-not-found.tsx).
    globalNotFound: true,
  },
};

export default nextConfig;
