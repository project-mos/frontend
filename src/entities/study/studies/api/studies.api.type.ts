import { Question } from "@/entities/study/question/api/question.api.types";

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
  requirements: string;
  rules: { ruleNum: number; content: string }[];
  benefits: { benefitNum: number; content: string }[];
  applicationQuestions: Question[];
};

export type PostStudyResponse = {
  studyId: number;
};

export type UploadImageRequest = {
  file: File;
};
