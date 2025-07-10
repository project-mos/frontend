import type { MetadataRoute } from "next";

//https://www.youtube.com/watch?v=w29phXIag-4
export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Google's limit is 50,000 URLs per sitemap

  return [
    // Home Page
    {
      url: `${process.env.SITE_URL}`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1.0,
    },
  ];
}
