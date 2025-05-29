import { BenefitInterface, RuleInterface } from "./study-room.type";

export type EditBenefitRequest = {
  token: string;
  studyId: string;
  benefits: BenefitInterface[];
};

export type EditBenefitResponse = {
  benefitNum: number;
  content: string;
};

export type EditRuleRequest = {
  token: string;
  studyId: string;
  rules: RuleInterface[];
};

export type EditRuleResponse = {
  ruleNum: number;
  content: string;
};

export type AttendanceRequest = {
  token: string;
  studyId: string;
  studyScheduleId: string;
};

export type GetAttendancesRequest = {
  token: string;
  studyId: string;
};

export type GetAttendancesResponse = {
  studyMemberId: number;
  userId: number;
  nickname: string;
  attendanceRes: {
    attendanceId: number;
    isAttended: boolean;
    studyScheduleId: number;
    StudyScheduleStartDateTime: string;
  }[];
  attendanceRate: number;
};
