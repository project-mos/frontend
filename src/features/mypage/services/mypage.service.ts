import { API_ENDPOINT } from "@/shared/constants/api-end-point";
import { CreateStudyScheduleResult, GetMyApplyStatusResult, GetMyJoinedStudiesResult, GetMySchedulesResult, GetUserInfoResult, UpdateUserInfoResult } from "@/shared/types/api/mypage";
import { fetchAPI } from "@/shared/utils/fetch";
import { useMutation, UseMutationOptions, UseQueryOptions } from "@tanstack/react-query";

// 유저 정보 //
export const getUserInfo = async (accessToken?: string): Promise<GetUserInfoResult> => {
  return await fetchAPI<GetUserInfoResult>(API_ENDPOINT.mypage.getUser().url, {
    credentials: "include",
    method: API_ENDPOINT.mypage.getUser().method,
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};
export const userInfoQueryOption = (
  accessToken: string,
  options?: UseQueryOptions<GetUserInfoResult, Error>
): UseQueryOptions<GetUserInfoResult, Error> => ({
  queryKey: ["userInfo", accessToken],
  queryFn: () => getUserInfo(accessToken),
  enabled: !!accessToken,
  ...options, 
});

// 유저 정보 수정 //
export const updateUserInfo = async (
  accessToken: string,
  data: UpdateUserInfoResult
): Promise<UpdateUserInfoResult> => {
  return await fetchAPI<UpdateUserInfoResult>(API_ENDPOINT.mypage.updateUser().url, {
    credentials: "include",
    method: API_ENDPOINT.mypage.updateUser().method,
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },    
    body: JSON.stringify(data),
  })}

// 캘린더 일정 조회 //
export const getMySchedules = async (accessToken: string): Promise<GetMySchedulesResult[]> => {
  return await fetchAPI<GetMySchedulesResult[]>(API_ENDPOINT.mypage.getMySchedules().url, {
    credentials: "include",
    method: API_ENDPOINT.mypage.getMySchedules().method,
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
  });
}
export const mySchedulesQueryOption = (
  accessToken: string,
  options?: UseQueryOptions<GetMySchedulesResult[], Error>
): UseQueryOptions<GetMySchedulesResult[], Error> => ({
  queryKey: ["mySchedules"],
  queryFn: () => getMySchedules(accessToken),
  enabled: !!accessToken,
  ...options,
});

// 스터디 일정 생성 //
export const createStudySchedule = async (
  accessToken: string,
  studyId: number,
  data: CreateStudyScheduleResult
): Promise<CreateStudyScheduleResult> => {
  return await fetchAPI<CreateStudyScheduleResult>(API_ENDPOINT.mypage.createStudySchedule(studyId).url, {
    credentials: "include",
    method: API_ENDPOINT.mypage.createStudySchedule(studyId).method,
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },    
    body: JSON.stringify(data),
  })}
export const usePostCreateStudySchedule = ({accessToken, studyId, options}:{accessToken:string, studyId: number, options?:UseMutationOptions<CreateStudyScheduleResult, Error, unknown>}) => {
  return useMutation({
    ...options,
    mutationFn: (data: CreateStudyScheduleResult) => createStudySchedule(accessToken, studyId, data)
  })
}
  

// 참여 중인 스터디 //
export const getMyJoinedStudies = async (accessToken: string, userId: string): Promise<GetMyJoinedStudiesResult[]> => {
  return await fetchAPI(API_ENDPOINT.mypage.getMyJoinedStudies(userId).url, {
    credentials: "include",
    method: API_ENDPOINT.mypage.getMyJoinedStudies(userId).method,
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
  });
}
export const myJoinedStudiesQueryOption = (
  accessToken: string,
  userId: string,
  options?: UseQueryOptions<GetMyJoinedStudiesResult[], Error>
): UseQueryOptions<GetMyJoinedStudiesResult[], Error> => ({
  queryKey: ["myJoinedStudies"],
  queryFn: () => getMyJoinedStudies(accessToken, userId),
  enabled: !!accessToken && !!userId,
  ...options, 
});

// 나의 지원 현황 //
export const getMyApplyStatus = async (accessToken: string): Promise<GetMyApplyStatusResult[]> => {
  return await fetchAPI(API_ENDPOINT.mypage.getMyApplyStatus().url, {
    credentials: "include",
    method: API_ENDPOINT.mypage.getMyApplyStatus().method,
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
  });
}
export const myApplyStatusQueryOption = (
  accessToken: string,
  options?: UseQueryOptions<GetMyApplyStatusResult[], Error>
): UseQueryOptions<GetMyApplyStatusResult[], Error> => ({
  queryKey: ["myApplyStatus"],
  queryFn: () => getMyApplyStatus(accessToken),
  enabled: !!accessToken,
  ...options, 
});

