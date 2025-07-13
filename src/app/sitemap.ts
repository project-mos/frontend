import type { MetadataRoute } from "next";

//https://www.youtube.com/watch?v=w29phXIag-4
export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Google's limit is 50,000 URLs per sitemap
  const baseUrl = process.env.SITE_URL || "https://studymos.com";

  return [
    // 홈페이지
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1.0,
    },
    // 스터디 목록 페이지
    {
      url: `${baseUrl}/studies`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    // 스터디 생성 페이지
    {
      url: `${baseUrl}/create-study`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    // 마이페이지
    {
      url: `${baseUrl}/mypage`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.7,
    },
  ];
}
