// Study 다 건 조회 request
export type GetStudiesRequest = {
  page?: string;
  size?: string;
  sort?: string;
  category?: string;
  meetType?: string;
  recruitmentStatus?: string;
  progressStatus?: string;
  liked?: boolean;
};
// Study 다 건 조회 result
export type GetStudiesResponse = {
  totalStudies: number;
  currentPage: number;
  totalPages: number;
  studies: Study[];
};

export type GetHotStudiesResult = Study[];
// Study 다 건 조회
export interface Study {
  id: number;
  title: string;
  category: string;
  meetingType: string;
  progressStatus: string;
  recruitmentStatus: "모집 중" | "모집 완료";
  recruitmentEndDate: string;
  currentStudyMembers: number;
  maxStudyMembers: number;
  viewCount: number;
  tags: string[];
}

// Study 상세조회
export interface GetStudyDetailResponse {
  id: number;
  title: string;
  content: string;
  currentStudyMemberCount: number;
  maxStudyMemberCount: number;
  category: string;
  schedule: string;
  recruitmentStartDate: string;
  recruitmentEndDate: string;
  viewCount: number;
  recruitmentStatus: string;
  progressStatus: string;
  meetingType: string;
  tags: string[];
}
// study 참여 요건(단건 조회)
export interface GetStudyRequirementResponse {
  id: number;
  requirementNum: number;
  content: string;
}
// study 참여 요건(다건 조회)

export type GetStudyRequirementsResponse = GetStudyRequirementResponse[];

export interface GetStudyRuleResponse {
  id: number;
  ruleNum: number;
  content: string;
}
export type GetStudyRulesResponse = GetStudyRuleResponse[];

export type GetStudyBenefitResponse = {
  id: number;
  benefitNum: number;
  content: string;
};
export type GetStudyBenefitsResponse = GetStudyBenefitResponse[];

export type GetCategories = {
  categories: ["프로그래밍", "독서", "어학", "자격증", "취미", "고시/공무원"];
};
