export type {
  EditRuleRequest,
  EditRuleResponse,
  EditStudyRule,
  GetStudyRulesResponse,
  StudyRule,
} from "@/entities/study/overview/api/rules.api.type";

import { createJsonRequestInit, fetchAPI } from "@/shared/api/util/fetcher";

import { API_ENDPOINT } from "@/shared/api/lib";

import {
  GetStudyBenefitsResponse,
  PostBenefitRequest,
  PostBenefitResponse,
} from "@/entities/study/overview/api/benefits.api.type";

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
