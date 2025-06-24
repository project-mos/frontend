import { GetStudyMembersResponse } from "@/entities/study/member/api/member.api.types";
import {
  API_ENDPOINT,
  createJsonRequestInit,
  fetchAPI,
} from "@/shared/api/lib";

export async function getMembers(studyId: string) {
  const response = await fetchAPI<GetStudyMembersResponse>(
    API_ENDPOINT.members.getMembers(studyId).url,
    { credentials: "include" }
  );
  return response;
}

export async function deleteMember(studyId: string) {
  const { url, method } = API_ENDPOINT.members.deleteMember(studyId);
  return await fetchAPI(url, createJsonRequestInit(method));
}
