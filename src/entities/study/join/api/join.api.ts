import {
  GetMyApplyStatusResponse,
  GetJoinsResponse,
  PostJoin,
  JoinsRequest,
} from "@/entities/study/join/api/join.api.types";

import {
  API_ENDPOINT,
  createJsonRequestInit,
  fetchAPI,
} from "@/shared/api/lib";

export async function getJoins(studyJoinStatus: JoinsRequest) {
  const { url, method } = API_ENDPOINT.join.getJoins(studyJoinStatus);
  const response = await fetchAPI<GetJoinsResponse>(
    url,
    createJsonRequestInit(method)
  );
  return response;
}

export async function postJoin(
  studyId: string,
  data: PostJoin
): Promise<PostJoin> {
  const { url, method } = API_ENDPOINT.join.postJoin(studyId);
  return await fetchAPI<PostJoin>(url, createJsonRequestInit(method, data));
}

export async function patchJoin(studyId: string, studyJoinId: string) {
  const { url, method } = API_ENDPOINT.join.patchJoin(studyId, studyJoinId);
  return await fetchAPI(url, createJsonRequestInit(method));
}

// 참여 중인 스터디 //
export async function getMyJoinedStudies(
  userId: number
): Promise<GetJoinsResponse[]> {
  const { url, method } = API_ENDPOINT.join.getMyJoinedStudies(userId);

  return await fetchAPI(url, createJsonRequestInit(method));
}

// 나의 지원 현황 //
export async function getMyApplyStatus(): Promise<GetMyApplyStatusResponse[]> {
  const { url, method } = API_ENDPOINT.join.getMyApplyStatus();

  return await fetchAPI(url, createJsonRequestInit(method));
}
