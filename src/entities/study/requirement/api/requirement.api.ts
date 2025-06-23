import { GetStudyRequirementsResponse } from "@/entities/study/requirement/api/requirement.api.types";
import { API_ENDPOINT, fetchAPI } from "@/shared/api/lib";

export async function getRequirements(studyId: string) {
  const response = await fetchAPI<GetStudyRequirementsResponse>(
    API_ENDPOINT.requirement.getRequirement(studyId).url
  );
  return response;
}
