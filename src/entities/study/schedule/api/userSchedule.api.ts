import { createJsonRequestInit, fetchAPI } from "@/shared/api/util/fetcher";

import {
  PostStudyScheduleResponse,
} from "@/entities/study/schedule/api/schedule.api.types";
import { API_ENDPOINT } from "@/shared/api/lib";
import { GetSchedulesResponse, PostUserScheduleRequest, PostUserScheduleResponse } from "./userSchedule.api.types";

// 유저 개인 일정 조회
export async function getUserSchedules(): Promise<GetSchedulesResponse[]> {
  const { url, method } = API_ENDPOINT.schedule.getUserSchedules();

  return await fetchAPI<GetSchedulesResponse[]>(
    url,
    createJsonRequestInit(method)
  );
}

// 개인 일정 생성
export async function postUserSchedule(
  data: PostUserScheduleRequest
) {
  const { url, method } = API_ENDPOINT.schedule.postUserSchedule();

  return await fetchAPI<PostUserScheduleResponse>(
    url,
    createJsonRequestInit(method, data)
  );
}

// 개인 일정 수정
export async function putUserSchedule(
  userScheduleId: number,
  data: PostUserScheduleRequest
) {
  const { url, method } = API_ENDPOINT.schedule.putUserSchedule(
    userScheduleId
  );

  return await fetchAPI<PostUserScheduleRequest>(
    url,
    createJsonRequestInit(method, data)
  );
}

// 개인 일정 삭제
export async function deleteUserSchedule(
  userScheduleId: number
) {
  const { url, method } = API_ENDPOINT.schedule.deleteUserSchedule(
    userScheduleId
  );

  return await fetchAPI<PostStudyScheduleResponse>(
    url,
    createJsonRequestInit(method)
  );
}
