import { useQuery } from "@tanstack/react-query";
import { getQuestions } from "@/entities/study/question/api/question.api";
import { GetQuestionsResponse } from "@/entities/study/question/api/question.api.types";

// 쿼리 키 생성 함수
export const QuestionsQueryKey = (studyId: string) => [
  "study",
  "questions",
  studyId,
];

// 스터디 질문 목록 조회 훅
export const useGetQuestions = (studyId: string) => {
  return useQuery<GetQuestionsResponse>({
    queryKey: QuestionsQueryKey(studyId),
    queryFn: () => getQuestions(studyId),
    enabled: !!studyId,
    retry: false,
  });
};
