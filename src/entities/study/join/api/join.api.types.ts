import { GetStudyCategoriesResponse } from "@/shared/types/api/studies";

// Study 지원하기
export type PostJoin = {
  studyQuestionId: number;
  answer: string;
}[];

export type JoinsRequest = "대기" | "탈락" | "승낙" | "취소";

export type GetJoinsResponse = Join[];

export type Join = {
  studyId: number;
  title: string;
  category: GetStudyCategoriesResponse["categories"];
  studyJoinId: number;
  studyJoinStatus: "PENDING" | "APPROVED" | "REJECTED" | "CANCELED";
};

export interface GetMyJoinedResponse {
  id: number;
  title: string;
  category: string;
  meetingType: string;
  progressStatus: string;
  participationStatus: string;
  currentStudyMembers: number;
  maxStudyMembers: number;
  schedule: string;
  studyMemberRole: string;
  tags: string[];
}

export interface GetMyApplyStatusResponse {
  studyId: number;
  title: string;
  category: string;
  studyJoinId: number;
  studyJoinStatus: string;
  createdAt: string;
}

export interface GetStudyApplicantResponse {
  studyJoinId: number;
  createdAt: string;
  userId: number;
  nickname: string;
  questionAnswerResList: { question: string; answer: string }[];
}
