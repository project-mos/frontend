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

  // 유저 개인 일정 조회
  getUserSchedules: () => ({
    url: `${process.env.NEXT_PUBLIC_BASE_URL}/user-schedules`,
    method: Method.GET,
  }),
  // 개인 일정 생성
  postUserSchedule: () => ({
    url: `${process.env.NEXT_PUBLIC_BASE_URL}/user-schedules`,
    method: Method.POST,
  }),
  // 개인 일정 수정
  putUserSchedule: (userScheduleId: number) => ({
    url: `${process.env.NEXT_PUBLIC_BASE_URL}/user-schedules/${userScheduleId}`,
    method: Method.PATCH,
  }),
  // 개인 일정 삭제
   deleteUserSchedule: (userScheduleId: number) => ({
    url: `${process.env.NEXT_PUBLIC_BASE_URL}/user-schedules/${userScheduleId}`,
    method: Method.DELETE,
  }),
};
