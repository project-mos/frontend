import { getStudy } from "@/entities/study/studies/api/studies.api";
import { staticMetadata } from "@/shared/constants/metadata";

import markdownToTxt from "markdown-to-txt";

import React from "react";

export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  try {
    const { id } = await params;
    const studyDetailData = await getStudy(id);
    const title = studyDetailData.title;
    const keywords = studyDetailData.tags;
    const description = markdownToTxt(studyDetailData.content);

    return {
      ...staticMetadata,
      title,
      description,
      keywords,
      openGraph: {
        title,
        description,
        // 추후 추가해야함
        // url: `${process.env.SITE_URL}`,
        type: "website",
        // 추후 추가해야함
        // images: [{ url: ogImage, alt: title }],
      },
      twitter: {
        title,
        description,
        images: {
          // url: ogImage,
          alt: title,
        },
      },
    };
  } catch (error) {
    console.error(error);
    return staticMetadata;
  }
};

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <AuthInitializerProvider />
      <section className="flex flex-col items-center gap-7">{children}</section>
    </>
  );
};

export default layout;
