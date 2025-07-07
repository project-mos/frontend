import { GetStudyCategoriesResponse } from "@/shared/types/api/studies";

// Study 지원하기
export type PostJoin = {
  studyQuestionId: number;
  answer: string;
}[];

export type JoinsRequest = "대기" | "탈락" | "승낙" | "취소" | "";

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
  studyJoinStatus: string;
  questionAnswerResList: QuestionResInterface[];
}

export interface QuestionResInterface {
  studyQuestionId: number;
  question: string;
  questionNum: number;
  questionType: "주관식" | "객관식";
  questionAnswerId: number;
  answer: string;
}

export interface StudyManageCardInterface {
  studyJoinId: number;
  userId: number;
  nickname: string;
  createdAt: string;
  questionAnswerResList: QuestionResInterface[];
}
