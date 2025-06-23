import { StudyRule } from "@/entities/study/rule/api/rules.api.types";

export interface StudyDetailPageProps {
  params: Promise<{ id: string }>;
}

/* study curriculum */
export interface StudyCurriculumCardInterface {
  id?: number;
  sectionId: number;
  title: string;
  content: string;
}

/* study notice */
export interface StudyNoticeCardInterface {
  id: number;
  title: string;
  content: string;
  writer: string;
  isImportantNoticeChecked: boolean;
  isPinned: boolean;
}

/* study manage */
export interface StudyManageCardInterface {
  name: string;
  date: string;
  email: string;
  experience: string;
  questionList: { question: string; answer: string }[];
}

/* study member */
export interface StudyMemberInterface {
  userId: number;
  nickname: string;
  studyMemberRoleType: "스터디장" | "스터디원";
  lastAttendanceDate: string;
  participationRate: number;
}

export interface StudyMemberAttendanceInterface {
  studyMemberId: number;
  userId: number;
  nickname: string;
  attendanceRes: Attendance[];
  attendanceRate: number;
}

export interface Attendance {
  attendanceId: number;
  attendanceStatus: string;
  studyScheduleId: number;
  studyScheduleStartDateTime: string;
}

/* study overview */
export type RuleInterface = Omit<StudyRule, "id">;

export interface BenefitInterface {
  benefitNum: number;
  content: string;
}
