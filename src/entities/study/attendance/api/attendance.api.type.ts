/* study attendance */
export type AttendanceRequest = {
  studyId: number;
  studyScheduleId: number;
  selectedStatus?: string;
};

export type GetAttendancesRequest = {
  studyId: number;
};

export type GetAttendancesResponse = {
  studyMemberId: number;
  userId: number;
  nickname: string;
  attendanceRes: Attendance[];
  attendanceRate: number;
};

export interface Attendance {
  attendanceId: number;
  attendanceStatus: string;
  studyScheduleId: number;
  studyScheduleStartDateTime: string;
}
