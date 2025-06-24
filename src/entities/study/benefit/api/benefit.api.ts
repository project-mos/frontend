export type {
  EditRuleResponse,
  EditRuleRequest,
  EditStudyRule,
  StudyRule,
  GetStudyRulesResponse,
} from "@/entities/study/rule/api/rules.api.types";

import { createJsonRequestInit, fetchAPI } from "@/shared/api/util/fetcher";

import { API_ENDPOINT } from "@/shared/api/lib";

import {
  GetStudyBenefitsResponse,
  PostBenefitRequest,
  PostBenefitResponse,
} from "@/entities/study/benefit/api/benefit.api.types";

export async function getBenefits(studyId: string) {
  const response = await fetchAPI<GetStudyBenefitsResponse>(
    API_ENDPOINT.benefits.getStudyBenefits(studyId).url
  );
  return response;
}

export async function postBenefit({ studyId, benefits }: PostBenefitRequest) {
  const { url, method } = API_ENDPOINT.benefits.postStudyBenefits(studyId);

  return await fetchAPI<PostBenefitResponse[]>(
    url,
    createJsonRequestInit(method, benefits)
  );
}
