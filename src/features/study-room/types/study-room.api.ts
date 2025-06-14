import {
  BenefitInterface,
  RuleInterface,
  StudyMemberAttendanceInterface,
} from "./study-room.type";

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

export type GetAttendancesResponse = StudyMemberAttendanceInterface;

export interface GetStudySchedule {
  studyScheduleId: number;
  title: string;
  description: string;
  startDateTime: string;
  endDateTime: string;
  studyId: number;
  studyCurriculumResList: StudyCurriculumResList[];
}

export interface StudyCurriculumResList {
  studyCurriculumId: number;
  sectionId: number;
  title: string;
  content: string;
}

export interface UploadMaterialsRequest {
  file: File;
  studyId: string;
}
