import { createJsonRequestInit, fetchAPI } from "@/shared/api/util/fetcher";

import { API_ENDPOINT } from "@/shared/api/lib";

import {
  EditBenefitRequest,
  EditBenefitResponse,
  GetStudyBenefitsResponse,
} from "@/entities/study/overview/api/benefits.api.type";

export async function getBenefits(studyId: string) {
  const response = await fetchAPI<GetStudyBenefitsResponse>(
    API_ENDPOINT.benefits.getStudyBenefits(studyId).url
  );
  return response;
}

export async function editBenefits({ studyId, benefits }: EditBenefitRequest) {
  const { url, method } = API_ENDPOINT.benefits.postStudyBenefits(studyId);

  return await fetchAPI<EditBenefitResponse[]>(
    url,
    createJsonRequestInit(method, benefits)
  );
}
