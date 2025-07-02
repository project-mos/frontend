import { GetStudyMembersResponse } from "@/entities/study/member/api/member.api.type";
import { GetStudyBenefitsResponse } from "@/entities/study/overview/api/benefits.api.type";
import { GetStudyRulesResponse } from "@/entities/study/overview/api/rules.api.type";
import { GetStudyRequirementsResponse } from "@/entities/study/requirement/api/requirement.api.type";
import { GetStudyResponse } from "@/entities/study/studies/api/studies.api.type";

export interface StudiesDescriptionCardProps {
  studyDetailData: GetStudyResponse;
  requirementsData: GetStudyRequirementsResponse;
  rulesData: GetStudyRulesResponse;
  benefitsData: GetStudyBenefitsResponse;
  membersData: GetStudyMembersResponse;
}
