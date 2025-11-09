"use client";

import { useParams } from "next/navigation";
import { useGetQuestions } from "@/entities/study/question/model/question.query";
import StudyApplicationFormCard from "@/features/study/study-application/ui/StudyApplicationFormCard";

export default function StudyApplyPage() {
  const { id } = useParams() as { id: string };
  const { data: questionData } = useGetQuestions(id);

  if (!questionData) return <div>로딩 중...</div>;

  return (
    <div className="flex min-h-screen">
      <StudyApplicationFormCard
        studyId={id}
        data={questionData}
        setIsApplyVisible={() => window.close()} // 새창 닫기 버튼용
      />
    </div>
  );
}
