import { Method } from "@/shared/api/util/fetcher";

export const schedule = {
  getSchedules: () => ({
    url: `${process.env.NEXT_PUBLIC_BASE_URL}/study-schedules`,
    method: Method.GET,
  }),
  postStudySchedule: (studyId: number) => ({
    url: `${process.env.NEXT_PUBLIC_BASE_URL}/studies/${studyId}/schedules`,
    method: Method.POST,
  }),
  putStudySchedule: (studyId: number, studyScheduleId: number) => ({
    url: `${process.env.NEXT_PUBLIC_BASE_URL}/studies/${studyId}/study-schedules/${studyScheduleId}`,
    method: Method.PATCH,
  }),
  deleteStudySchedule: (studyId: number, studyScheduleId: number) => ({
    url: `${process.env.NEXT_PUBLIC_BASE_URL}/studies/${studyId}/study-schedules/${studyScheduleId}`,
    method: Method.DELETE,
  }),
  getStudySchedule: (studyId: number) => ({
    url: `${process.env.NEXT_PUBLIC_BASE_URL}/studies/${studyId}/schedules`,
    method: Method.GET,
  }),
};
