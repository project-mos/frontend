import { Metadata } from "next";
import CreateStudyForm from "@/features/create-study/form/CreateStudyForm";

export const metadata: Metadata = {
  title: "스터디 생성 - StudyMos",
  description:
    "새로운 스터디를 만들고 함께 학습할 멤버들을 모집하세요. 커리큘럼 설정부터 멤버 모집까지 쉽고 빠르게 스터디를 시작할 수 있습니다.",
  keywords: [
    "스터디 생성",
    "스터디 모집",
    "새 스터디",
    "스터디 만들기",
    "온라인 스터디",
  ],
  openGraph: {
    title: "스터디 생성 - StudyMos",
    description: "새로운 스터디를 만들고 함께 학습할 멤버들을 모집하세요.",
    type: "website",
  },
};

const CreateStudyPage = async () => {
  return <CreateStudyForm />;
};

export default CreateStudyPage;
