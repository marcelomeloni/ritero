import { MetadataRoute } from "next";
import { CAFES } from "@/data/cafes";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://ritero.com.br";

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/cafes`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/onde-comprar`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
  ];

  const productRoutes: MetadataRoute.Sitemap = CAFES.map((cafe) => ({
    url: `${baseUrl}/cafes/${cafe.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  return [...staticRoutes, ...productRoutes];
}
