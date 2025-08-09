import { Question } from "@/entities/study/question/api/question.api.type";
import { GetStudyCategoriesResponse } from "../../category/api/category.api.type";

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

export interface BaseStudy {
  id: number;
  title: string;
  content: string;
  category: string;
  recruitmentStartDate: string;
  recruitmentEndDate: string;
  viewCount: number;
  recruitmentStatus: "모집 중" | "모집 완료" | "모집 예정";
  progressStatus: string;
  meetingType: string;
  tags: string[];
  likedCount: number
  isLiked: boolean
}

export interface Study extends BaseStudy {
  currentStudyMembers: number;
  maxStudyMembers: number;
}

export interface GetStudyResponse extends BaseStudy {
  currentStudyMemberCount: number;
  maxStudyMemberCount: number;
  schedule: string;
}

export type GetHotStudiesResponse = Study[];

export type PostStudyRequest = {
  form: StudyForm;
};

export type PatchStudyRequest = {
  form: PatchStudyForm;
  studyId: string;
};

export type StudyForm = {
  title: string;
  category: string;
  maxStudyMemberCount: number;
  recruitmentStartDate: string;
  recruitmentEndDate: string;
  tags: string[];
  meetingType: string;
  schedule: string;
  content: string;
  requirements?: string;
  rules?: { ruleNum: number; content: string }[];
  benefits?: { benefitNum: number; content: string }[];
  applicationQuestions?: Question[];
};

export type PatchStudyForm = {
  title: string;
  category: string;
  maxStudyMemberCount: number;
  recruitmentStartDate: string;
  recruitmentEndDate: string;
  tags: string[];
  meetingType: string;
  schedule: string;
  content: string;
  requirements?: string;
};

export type PostStudyResponse = {
  studyId: number;
};

export type UploadImageRequest = {
  file: File;
};

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
  recruitmentStatus: "모집 중" | "모집 완료" | "모집 예정";
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

// Study 지원하기
export type PostStudyJoin = {
  studyQuestionId: number;
  answer: string;
}[];

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

// Study 커리큘럼 조회
export type GetStudyCurriculumResponse = {
  id: number;
  title: string;
  content: string;
  sectionId: number;
};

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

// 스터디 멤버 조회
export type GetStudyMembersResponse = {
  userId: number;
  nickname: string;
  studyMemberRoleType: "스터디장" | "스터디원";
  lastAttendanceDate: string;
  participationRate: number;
}[];

export type GetStudyJoinsRequest = "대기" | "탈락" | "승낙" | "취소" | "";

export type GetStudyJoinsResponse = StudyJoin[];

export type StudyJoin = {
  studyId: number;
  title: string;
  category: GetStudyCategoriesResponse["categories"];
  studyJoinId: number;
  studyJoinStatus: "PENDING" | "APPROVED" | "REJECTED" | "CANCELED";
};
