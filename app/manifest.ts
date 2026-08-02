import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteConfig.name,
    short_name: "CATA",
    description: siteConfig.description,
    start_url: "/",
    display: "standalone",
    background_color: "#f2ede8",
    theme_color: "#b8442a",
    icons: [
      {
        src: "/icon.png",
        sizes: "256x256",
        type: "image/png",
      },
    ],
  };
}
