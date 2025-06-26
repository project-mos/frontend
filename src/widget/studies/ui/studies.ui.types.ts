import { GetStudyMembersResponse } from "@/entities/study/member/api/member.api.types";
import { GetStudyBenefitsResponse } from "@/entities/study/overview/api/benefits.api.types";
import { GetStudyRulesResponse } from "@/entities/study/overview/api/rules.api.types";
import { GetStudyRequirementsResponse } from "@/entities/study/requirement/api/requirement.api.types";
import { GetStudyResponse } from "@/entities/study/studies/api/studies.api.type";

export interface StudiesDescriptionCardProps {
  studyDetailData: GetStudyResponse;
  requirementsData: GetStudyRequirementsResponse;
  rulesData: GetStudyRulesResponse;
  benefitsData: GetStudyBenefitsResponse;
  membersData: GetStudyMembersResponse;
}
