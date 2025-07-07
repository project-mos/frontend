import { GetCurriculumResponse } from "@/entities/study/curriculum/api/curriculum.api.type";
import {
  API_ENDPOINT,
  createJsonRequestInit,
  fetchAPI,
} from "@/shared/api/lib";

// 커리큘럼 조회
export async function getCurriculum(
  studyId: number
): Promise<GetCurriculumResponse[]> {
  const { url, method } = API_ENDPOINT.curriculums.getCurriculums(studyId);

  return await fetchAPI(url, {
    credentials: "include",
    method,
  });
}

// 커리큘럼 수정
export async function postCurriculum(
  studyId: number,
  data: GetCurriculumResponse[]
) {
  const { url, method } = API_ENDPOINT.curriculums.postCurriculums(studyId);

  return await fetchAPI<GetCurriculumResponse[]>(
    url,
    createJsonRequestInit(method, data)
  );
}
