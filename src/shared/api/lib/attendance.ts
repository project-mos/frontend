import { Method } from "@/shared/api/util/fetcher";

export const attendances = {
  // (전 api 명) attendance
  postAttendances: (studyId: string, studyScheduleId: string) => ({
    url: `${process.env.NEXT_PUBLIC_BASE_URL}/studies/${studyId}/schedules/${studyScheduleId}/attendances`,
    method: Method.POST,
  }),
  // (전 api 명) editAttendance
  putAttendances: (studyId: string, studyScheduleId: string) => ({
    url: `${process.env.NEXT_PUBLIC_BASE_URL}/studies/${studyId}/schedules/${studyScheduleId}/attendances`,
    method: Method.PUT,
  }),
  getAttendances: (studyId: string) => ({
    url: `${process.env.NEXT_PUBLIC_BASE_URL}/studies/${studyId}/members/attendances`,
    method: Method.GET,
  }),
  // (전 api 명) earlyLeave
  patchAttendances: (studyId: string, studyScheduleId: string) => ({
    url: `${process.env.NEXT_PUBLIC_BASE_URL}/studies/${studyId}/schedules/${studyScheduleId}/attendances/early-leave`,
    method: Method.PATCH,
  }),
};
