import { API_ENDPOINT } from "@/shared/constants/api-end-point";
import {
  GetStudyBenefitsResponse,
  GetStudyDetailResponse,
  GetStudyRequirementsResponse,
  GetStudyRulesResponse,
} from "@/shared/types/api/studies";
import { fetchData } from "@/shared/utils/fetcher";

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
