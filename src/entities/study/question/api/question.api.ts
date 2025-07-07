import { GetQuestionsResponse } from "@/entities/study/question/api/question.api.type";
import { API_ENDPOINT, fetchAPI } from "@/shared/api/lib";

export async function getQuestions(studyId: string) {
  const response = await fetchAPI<GetQuestionsResponse>(
    API_ENDPOINT.questions.getQuestions(studyId).url,
    { credentials: "include" }
  );
  return response;
}
