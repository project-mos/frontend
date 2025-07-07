import { createJsonRequestInit, fetchAPI } from "@/shared/api/util/fetcher";

import { API_ENDPOINT } from "@/shared/api/lib";

import {
  AttendanceRequest,
  GetAttendancesRequest,
  GetAttendancesResponse,
} from "@/entities/study/attendance/api/attendance.api.type";

/* study room attendance */
export async function getAttendances({ studyId }: GetAttendancesRequest) {
  const { url, method } = API_ENDPOINT.attendances.getAttendances(studyId);

  return await fetchAPI<GetAttendancesResponse[]>(url, {
    credentials: "include",
    method: method,
    headers: {
      "Content-Type": "application/json",
    },
  });
}

export async function postAttendance({
  studyId,
  studyScheduleId,
}: AttendanceRequest) {
  const { url, method } = API_ENDPOINT.attendances.postAttendances(
    studyId,
    studyScheduleId
  );

  return await fetchAPI(url, createJsonRequestInit(method, null));
}

export async function putAttendance({
  studyId,
  studyScheduleId,
}: AttendanceRequest) {
  const { url, method } = API_ENDPOINT.attendances.putAttendances(
    studyId,
    studyScheduleId
  );

  return await fetchAPI(url, createJsonRequestInit(method, null));
}

export async function patchAttendances({
  studyId,
  studyScheduleId,
}: AttendanceRequest) {
  const { url, method } = API_ENDPOINT.attendances.patchAttendances(
    studyId,
    studyScheduleId
  );

  return await await fetchAPI(url, createJsonRequestInit(method, null));
}
