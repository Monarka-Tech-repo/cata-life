import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    // Static export has no image-optimization server.
    unoptimized: true,
  },
  trailingSlash: true,
};

export default nextConfig;
