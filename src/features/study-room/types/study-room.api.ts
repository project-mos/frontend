import { BenefitInterface, RuleInterface } from "./study-room.type";

/* study overview */
export type EditBenefitRequest = {
  studyId: string;
  benefits: BenefitInterface[];
};

export type EditBenefitResponse = {
  benefitNum: number;
  content: string;
};

export type EditRuleRequest = {
  studyId: string;
  rules: RuleInterface[];
};

export type EditRuleResponse = {
  ruleNum: number;
  content: string;
};

/* study attendance */
export type AttendanceRequest = {
  studyId: string;
  studyScheduleId: string;
};

export type GetAttendancesRequest = {
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
