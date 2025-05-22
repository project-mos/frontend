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

// 인기 Study 다 건 조회
export type GetHotStudiesResponse = Study[];
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

// Study 상세 조회
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
  recruitmentStatus: "모집 중" | "모집 완료";
  progressStatus: string;
  meetingType: string;
  tags: string[];
}
// study 참여 요건 조회
export interface GetStudyRequirementResponse {
  id: number;
  requirementNum: number;
  content: string;
}

export type GetStudyRequirementsResponse = GetStudyRequirementResponse[];

// Study 규칙 조회
export interface GetStudyRuleResponse {
  id: number;
  ruleNum: number;
  content: string;
}
export type GetStudyRulesResponse = GetStudyRuleResponse[];

// Study 카테고리 조회
export type GetStudyBenefitResponse = {
  id: number;
  benefitNum: number;
  content: string;
};

export type GetStudyBenefitsResponse = GetStudyBenefitResponse[];

// Study 카테고리 조회
export type GetStudyCategoriesResponse = {
  categories: ["프로그래밍", "독서", "어학", "자격증", "취미", "고시/공무원"];
};

// Study 커리큘럼 조회
export type GetStudyCurriculumResponse = {
  id: number;
  title: string;
  content: string;
  sectionId: number;
};

export type GetStudyCurriculumsResponse = GetStudyCurriculumResponse[];

// Study 질문 조회
export type GetStudyQuestionResponse = {
  id: number;
  questionNum: number;
  question: string;
  type: "객관식" | "주관식";
  options: string[];
  required: boolean;
};

export type GetStudyQuestionsResponse = GetStudyQuestionResponse[];
// Study 지원하기
export type PostStudyJoin = {
  studyQuestionId: number;
  answer: string;
}[];

// 스터디 멤버 조회
export type GetStudyMembersResponse = {
  userId: number;
  nickname: string;
  studyMemberRoleType: "스터디장" | "스터디원";
  lastAttendanceDate: string;
  participationRate: number;
}[];
