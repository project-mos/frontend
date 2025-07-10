export interface StudyDetailPageProps {
  params: Promise<{ id: string }>;
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

export interface BenefitInterface {
  benefitNum: number;
  content: string;
}

export interface RuleInterface {
  ruleNum: number;
  content: string;
}
