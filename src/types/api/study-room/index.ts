export interface StudyCurriculumCardInterface {
  step: string;
  title: string;
  content: string;
}

export interface StudyNoticeCardInterface {
  title: string;
  content: string;
  writer: string;
}

export interface StudyManageCardInterface {
  name: string;
  date: string;
  email: string;
  experience: string;
  questionList: { question: string; answer: string }[];
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
  isAttended: boolean;
  studyScheduleId: number;
  StudyScheduleStartDateTime: string;
}
