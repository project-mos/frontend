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
  attendanceRes: Attendance[];
  attendanceRate: number;
}[];

export interface Attendance {
  attendanceId: number;
  attendanceStatus: string;
  studyScheduleId: number;
  studyScheduleStartDateTime: string;
}
