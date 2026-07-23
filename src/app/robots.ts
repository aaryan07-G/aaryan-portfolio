import type { MetadataRoute } from "next";
import { seo } from "@/data/seo";

const siteUrl = seo.siteUrl;

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
