import { Method } from "@/shared/api/util/fetcher";

export const attendance = {
  attendance: (studyId: string, studyScheduleId: string) => ({
    url: `${process.env.NEXT_PUBLIC_BASE_URL}/studies/${studyId}/schedules/${studyScheduleId}/attendances`,
    method: Method.POST,
  }),
  editAttendance: (studyId: string, studyScheduleId: string) => ({
    url: `${process.env.NEXT_PUBLIC_BASE_URL}/studies/${studyId}/schedules/${studyScheduleId}/attendances`,
    method: Method.PUT,
  }),
  getAttendances: (studyId: string) => ({
    url: `${process.env.NEXT_PUBLIC_BASE_URL}/studies/${studyId}/members/attendances`,
    method: Method.GET,
  }),
  earlyLeave: (studyId: string, studyScheduleId: string) => ({
    url: `${process.env.NEXT_PUBLIC_BASE_URL}/studies/${studyId}/schedules/${studyScheduleId}/attendances/early-leave`,
    method: Method.PATCH,
  }),
};
