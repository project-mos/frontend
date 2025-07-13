import { type MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.SITE_URL || "https://studymos.com";

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // 크롤링하지 않을 페이지들
        disallow: ["/api/", "/test/", "/redirect/"],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}
