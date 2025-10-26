import { API_ENDPOINT, createJsonRequestInit, fetchAPI } from "@/shared/api/lib";
import { LateTimeSettingRequest, LateTimeSettingResponse, NoticeSettingRequest, SettingsResponse } from "@/entities/study/setting/api/setting.api.types";

export async function deleteStudy(studyId: string) {
  const { url, method } = API_ENDPOINT.study.deleteStudy(studyId);

  return await fetchAPI(url, {
    credentials: "include",
    method: method,
    headers: {
      "Content-Type": "application/json",
    },
  });
}

export async function leaveStudy(studyId: string) {
  const { url, method } = API_ENDPOINT.members.deleteMember(studyId);

  return await fetchAPI(url, {
    credentials: "include",
    method: method,
    headers: {
      "Content-Type": "application/json",
    },
  });
}

// 유저 스터디 설정 조회
export async function userStudySettings(studyId: number): Promise<SettingsResponse> {
  const { url, method } = API_ENDPOINT.study.getUserStudySettings(Number(studyId));

   return await fetchAPI(url, createJsonRequestInit(method))
}

// 유저별 중요 공지 노출 여부 설정
export async function userStudyNoticeSettings(studyId: number, data: NoticeSettingRequest): Promise<SettingsResponse> {
  const { url, method } = API_ENDPOINT.study.putUserStudyNoticeSettings(Number(studyId));

   return await fetchAPI(url, createJsonRequestInit(method, data))
}

// 스터디별 지각 기준, 결석 기준 시간 조회
export async function getStudyLateTimeSettings(studyId: number): Promise<LateTimeSettingResponse> {
  const { url, method } = API_ENDPOINT.study.getUserStudyLateTimeSettings(Number(studyId));

   return await fetchAPI(url, createJsonRequestInit(method))
}

// 스터디별 지각 기준, 결석 기준 시간 설정
export async function userStudyLateTimeSettings(studyId: number, data: LateTimeSettingRequest): Promise<SettingsResponse> {
  const { url, method } = API_ENDPOINT.study.patchUserStudyLateTimeSettings(Number(studyId));

   return await fetchAPI(url, createJsonRequestInit(method, data))
}
