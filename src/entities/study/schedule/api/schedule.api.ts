export type {
  EditRuleRequest,
  EditRuleResponse,
  EditStudyRule,
  GetStudyRulesResponse,
  StudyRule,
} from "@/entities/study/overview/api/rules.api.type";

import { createJsonRequestInit, fetchAPI } from "@/shared/api/util/fetcher";

import {
  GetSchedulesResponse,
  PostStudyScheduleResponse,
} from "@/entities/study/schedule/api/schedule.api.types";
import { GetStudySchedule } from "@/features/study-room/types/study-room.api";
import { API_ENDPOINT } from "@/shared/api/lib";

// 스터디 전체 일정 조회
export async function getSchedules(): Promise<GetSchedulesResponse[]> {
  const { url, method } = API_ENDPOINT.schedule.getSchedules();

  return await fetchAPI<GetSchedulesResponse[]>(
    url,
    createJsonRequestInit(method)
  );
}
// 스터디 상세 일정 조회
export async function getStudySchedule(studyId: number) {
  const { url, method } = API_ENDPOINT.schedule.getStudySchedule(studyId);

  return await fetchAPI<GetStudySchedule[]>(url, {
    method: method,
    credentials: "include",
  });
}

// 스터디 일정 생성
export async function postStudySchedule(
  studyId: number,
  data: PostStudyScheduleResponse
) {
  const { url, method } = API_ENDPOINT.schedule.postStudySchedule(studyId);

  return await fetchAPI<PostStudyScheduleResponse>(
    url,
    createJsonRequestInit(method, data)
  );
}

// 스터디 일정 수정
export async function putStudySchedule(
  studyId: number,
  studyScheduleId: number,
  data: PostStudyScheduleResponse
) {
  const { url, method } = API_ENDPOINT.schedule.putStudySchedule(
    studyId,
    studyScheduleId
  );

  return await fetchAPI<PostStudyScheduleResponse>(
    url,
    createJsonRequestInit(method, data)
  );
}

// 스터디 일정 삭제
export async function deleteStudySchedule(
  studyId: number,
  studyScheduleId: number
) {
  const { url, method } = API_ENDPOINT.schedule.deleteStudySchedule(
    studyId,
    studyScheduleId
  );

  return await fetchAPI<PostStudyScheduleResponse>(
    url,
    createJsonRequestInit(method)
  );
}
