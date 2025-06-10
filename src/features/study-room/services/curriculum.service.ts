import { UseQueryOptions, QueryKey } from "@tanstack/react-query";
import { GetCurriculumResult } from "../types/curriculum.api";
import { API_ENDPOINT } from "@/shared/constants/api-end-point";
import { fetchAPI } from "@/shared/utils/fetch";

// 커리큘럼 조회
export async function getCurriculumsByStudy(
  accessToken: string,
  studyId: number
): Promise<GetCurriculumResult[]> {
  const { url, method } = API_ENDPOINT.curriculums.getCurriculums(studyId);

  return await fetchAPI(url, {
    credentials: "include",
    method: method,
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
  });
}

export function curriculumQueryOption(
  accessToken: string,
  studyId: number,
  options?: Omit<UseQueryOptions<GetCurriculumResult[], Error, GetCurriculumResult[], QueryKey>, "queryKey" | "queryFn">
) {
  return {
    queryKey: ["study_room_curriculum",studyId],
    queryFn: () => getCurriculumsByStudy(accessToken, studyId),
    suspense: true, // Suspense 활성화
    ...options,
  };
}