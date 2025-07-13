import React from "react";
import { Metadata } from "next";

import { getStudy } from "@/entities/study/studies/api/studies.api";
import ImportantNoticeBar from "@/widget/study-room/notice/ui/ImportantNoticeBar";
import StudyRoomSideBarCard from "@/features/study-room/component/StudyRoomSideBarCard";
import StudyRoomTitleCard from "@/features/study-room/component/StudyRoomTitleCard";
import Grid from "@/shared/components/atoms/Grid";
import ScheduleIntendedCard from "@/widget/study-room/schedule/ui/ScheduleIntendedCard";

interface StudyRoomLayoutProps {
  children: React.ReactNode;
  params: Promise<{ id: string }>;
}

// 동적 메타데이터 생성
export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;

  try {
    const studyDetailData = await getStudy(id);

    return {
      title: `${studyDetailData.title} - StudyMos`,
      description: `${studyDetailData.title} 스터디룸에서 멤버들과 소통하고 학습하세요. 공지사항, 커리큘럼, 채팅 등 다양한 기능을 이용할 수 있습니다.`,
      keywords: [
        "스터디룸",
        "스터디 관리",
        "스터디 멤버",
        "온라인 스터디",
        studyDetailData.title,
      ],
      openGraph: {
        title: `${studyDetailData.title} - StudyMos`,
        description: `${studyDetailData.title} 스터디룸에서 멤버들과 소통하고 학습하세요.`,
        type: "website",
      },
    };
  } catch {
    // 에러 발생 시 기본 메타데이터 반환
    return {
      title: "스터디룸 - StudyMos",
      description: "스터디룸에서 멤버들과 소통하고 학습하세요.",
      keywords: ["스터디룸", "스터디 관리", "온라인 스터디"],
    };
  }
}

const layout = async ({ children, params }: StudyRoomLayoutProps) => {
  const { id } = await params;
  const studyDetailData = await getStudy(id);

  return (
    <>
      <ImportantNoticeBar studyId={Number(id)} />
      <Grid cols={12} gap={5}>
        <StudyRoomTitleCard data={studyDetailData} />
        <ScheduleIntendedCard />
        <StudyRoomSideBarCard />
        {children}
      </Grid>
    </>
  );
};

export default layout;
