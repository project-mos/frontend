import { createJsonRequestInit, fetchAPI } from "@/shared/api/util/fetcher";

import {
  EditRulesResponse,
  GetStudyRulesResponse,
} from "@/entities/study/overview/api/rules.api.type";
import { EditRulesRequest } from "@/features/study-room/types/study-room.api";
import { API_ENDPOINT } from "@/shared/api/lib";

export async function getRules(studyId: string) {
  const response = await fetchAPI<GetStudyRulesResponse>(
    API_ENDPOINT.rules.getStudyRules(studyId).url
  );
  return response;
}

export async function editRules({ studyId, rules }: EditRulesRequest) {
  const { url, method } = API_ENDPOINT.rules.postStudyRules(studyId);
  return await fetchAPI<EditRulesResponse>(
    url,
    createJsonRequestInit(method, rules)
  );
}
