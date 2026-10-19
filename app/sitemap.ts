import type { MetadataRoute } from "next";
import { SITE, SPORTS } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const paths = ["/", "/programmes", ...SPORTS.map((s) => `/programmes/${s.slug}`), "/coaches", "/about"];
  return paths.map((p) => ({
    url: SITE.url + (p === "/" ? "" : p),
    lastModified: now,
    priority: p === "/" ? 1 : p === "/programmes" ? 0.9 : 0.8,
  }));
}
