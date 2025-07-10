import { Metadata } from "next";

export const title = "StudyMos - 스터디 모집부터 관리까지 한번에";
export const description =
  "스터디 모집, 참여, 관리를 한 곳에서! 커리큘럼 관리, 일정 조율, 멤버 소통까지 효율적인 스터디 운영을 위한 올인원 플랫폼입니다.";
export const keywords = [
  "스터디",
  "스터디 모집",
  "스터디 관리",
  "온라인 스터디",
  "스터디 플랫폼",
  "스터디 매칭",
  "커리큘럼 관리",
  "스터디 일정",
  "스터디 멤버",
  "학습 관리",
  "StudyMos",
  "스터디모스",
];

export const ogImage = "/asset/thumbnail.png";

export const staticMetadata: Metadata = {
  title,
  description,
  keywords: keywords,
  icons: [
    {
      rel: "icon",
      type: "image/png",
      sizes: "32x32",
      url: "/favicon/favicon-32x32.png",
    },
    {
      rel: "icon",
      type: "image/png",
      sizes: "16x16",
      url: "/favicon/favicon-16x16.png",
    },
  ],
  openGraph: {
    title,
    description,
    // 추후 추가해야함
    // url: `${process.env.SITE_URL}`,
    type: "website",
    images: [{ url: ogImage, alt: title }],
  },
  verification: {
    //   추후 추가해야함
    google: process.env.GOOGLE_VERIFICATION,
    other: {
      "naver-site-verification": process.env.NAVER_VERIFICATION!,
    },
  },
  twitter: {
    title,
    description,
    images: {
      url: ogImage,
      alt: title,
    },
  },
};
