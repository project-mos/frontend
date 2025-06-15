import { UseQueryOptions, QueryKey, useMutation, UseMutationOptions } from "@tanstack/react-query";
import { GetCurriculumResult } from "../types/curriculum.api";
import { API_ENDPOINT } from "@/shared/constants/api-end-point";
import { fetchAPI } from "@/shared/utils/fetch";

// 커리큘럼 조회
export async function getCurriculumsByStudy(
  accessToken: string,
  studyId: string
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
  studyId: string,
  options?: Omit<UseQueryOptions<GetCurriculumResult[], Error, GetCurriculumResult[], QueryKey>, "queryKey" | "queryFn">
) {
  return {
    queryKey: ["study_room_curriculum",studyId],
    queryFn: () => getCurriculumsByStudy(accessToken, studyId),
    suspense: true, // Suspense 활성화
    ...options,
  };
}

// 커리큘럼 수정
export async function updateCurriculum(studyId:number, data:GetCurriculumResult[]) {
  const { url, method } = API_ENDPOINT.curriculums.postCurriculums(studyId)

  return await fetchAPI<GetCurriculumResult[]>(url, {
    credentials: "include",
    method: method,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data)
  })
}

export function useUpdateCurriculum(studyId: number, options?: UseMutationOptions<GetCurriculumResult[], Error, unknown>) {
  return useMutation({
    ...options,
    mutationFn: (data: GetCurriculumResult[]) => updateCurriculum(studyId, data)
  })
}