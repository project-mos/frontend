import { type MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
      },
    ],
    //   sitemap 추가해야함
    sitemap: `${process.env.SITE_URL}/sitemap.xml`,
    host: process.env.SITE_URL,
  };
}
