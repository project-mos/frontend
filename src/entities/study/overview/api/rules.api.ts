export type {
  EditRuleRequest,
  EditRuleResponse,
  EditStudyRule,
  GetStudyRulesResponse,
  StudyRule,
} from "@/entities/study/overview/api/rules.api.type";

import { createJsonRequestInit, fetchAPI } from "@/shared/api/util/fetcher";

import {
  EditRuleRequest,
  EditRuleResponse,
  GetStudyRulesResponse,
  StudyRule,
} from "@/entities/study/overview/api/rules.api.type";
import { API_ENDPOINT } from "@/shared/api/lib";

export async function getRules(studyId: StudyRule["id"]) {
  const response = await fetchAPI<GetStudyRulesResponse>(
    API_ENDPOINT.rules.getStudyRules(studyId).url
  );
  return response;
}

export async function editRules({ studyId, rules }: EditRuleRequest) {
  const { url, method } = API_ENDPOINT.rules.postStudyRules(studyId);
  return await fetchAPI<EditRuleResponse>(
    url,
    createJsonRequestInit(method, rules)
  );
}
