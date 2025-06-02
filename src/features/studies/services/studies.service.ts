import {
  GetStudyBenefitsResponse,
  GetStudyCurriculumsResponse,
  GetStudyDetailResponse,
  GetStudyJoinsRequest,
  GetStudyJoinsResponse,
  GetStudyMembersResponse,
  GetStudyQuestionsResponse,
  GetStudyRequirementsResponse,
  GetStudyRulesResponse,
  PostStudyJoin,
} from "@/features/studies/types/studies.api";
import { API_ENDPOINT } from "@/shared/constants/api-end-point";

import { fetchAPI } from "@/shared/utils/fetch";
import { fetchData } from "@/shared/utils/fetcher";
import {
  useMutation,
  UseMutationOptions,
  useQuery,
} from "@tanstack/react-query";

export async function getStudy(id: string) {
  const response = await fetchData<GetStudyDetailResponse>({
    endpoint: API_ENDPOINT.study.getStudy(id),
  });
  return response;
}

export async function getRequirements(studyId: string) {
  const response = await fetchData<GetStudyRequirementsResponse>({
    endpoint: API_ENDPOINT.requirement.getRequirement(studyId),
  });
  return response;
}
export async function getRules(studyId: string) {
  const response = await fetchData<GetStudyRulesResponse>({
    endpoint: API_ENDPOINT.rules.getStudyRules(studyId),
  });
  return response;
}

export async function getBenefits(studyId: string) {
  const response = await fetchData<GetStudyBenefitsResponse>({
    endpoint: API_ENDPOINT.benefits.getStudyBenefits(studyId),
  });
  return response;
}

export async function getCurriculums(studyId: string) {
  const response = await fetchAPI<GetStudyCurriculumsResponse>(
    API_ENDPOINT.curriculums.getCurriculums(studyId).url
  );
  return response;
}

export async function getQuestions(studyId: string) {
  const response = await fetchAPI<GetStudyQuestionsResponse>(
    API_ENDPOINT.questions.getQuestions(studyId).url,
    { credentials: "include" }
  );
  return response;
}
export async function getMembers(studyId: string) {
  const response = await fetchAPI<GetStudyMembersResponse>(
    API_ENDPOINT.members.getMembers(studyId).url,
    { credentials: "include" }
  );
  return response;
}
export async function getJoins({
  studyJoinStatus,
  accessToken,
}: {
  studyJoinStatus?: GetStudyJoinsRequest;
  accessToken: string;
}) {
  const response = await fetchAPI<GetStudyJoinsResponse>(
    API_ENDPOINT.join.getJoins(studyJoinStatus).url,
    {
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken || ""}`,
      },
    }
  );
  return response;
}

export async function postJoin(
  studyId: string,
  data: PostStudyJoin,
  accessToken?: string
): Promise<PostStudyJoin> {
  const { url, method } = API_ENDPOINT.join.postJoin(studyId);

  return await fetchAPI<PostStudyJoin>(url, {
    credentials: "include",
    body: JSON.stringify(data),
    method,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken || ""}`,
    },
  });
}

export async function patchJoin(
  studyId: string,
  studyJoinId: string,
  accessToken?: string
) {
  const { url, method } = API_ENDPOINT.join.patchJoin(studyId, studyJoinId);
  return await fetchAPI(url, {
    method,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken || ""}`,
    },
  });
}

// getQuestions React Query 훅
export function useQuestions(studyId: string, enabled: boolean) {
  return useQuery({
    queryKey: ["questions", studyId],
    queryFn: () => getQuestions(studyId),
    staleTime: 10000,
    enabled,
  });
}
// postJoin React Query 훅
export function usePostJoin({
  studyId,
  options,
  accessToken,
}: {
  studyId: string;
  options?: UseMutationOptions<PostStudyJoin, Error, PostStudyJoin, unknown>;
  accessToken?: string;
}) {
  return useMutation({
    ...options,
    mutationFn: (data: PostStudyJoin) => postJoin(studyId, data, accessToken),
  });
}

// patchJoin React Query 훅
export function usePatchJoin({
  studyId,
  studyJoinId,
  accessToken,
  options,
}: {
  studyId: string;
  studyJoinId: string;
  options?: UseMutationOptions<unknown, Error, unknown, unknown>;
  accessToken?: string;
}) {
  console.log(studyId, studyJoinId, accessToken, options);
  return useMutation({
    ...options,
    mutationFn: () => patchJoin(studyId, studyJoinId, accessToken),
  });
}

export function useGetJoins({
  studyJoinStatus,
  accessToken,
}: {
  studyJoinStatus?: GetStudyJoinsRequest;
  accessToken: string;
}) {
  return useQuery({
    queryKey: ["joins", studyJoinStatus],
    queryFn: () => getJoins({ studyJoinStatus, accessToken }),
    staleTime: 3600,
    enabled: !!accessToken,
    retry: false,
  });
}
