import { API_ENDPOINT } from "@/shared/constants/api-end-point";
import { CreateStudyScheduleResult, GetMyApplyStatusResult, GetMyJoinedStudiesResult, GetMySchedulesResult, GetUserInfoResult, UpdateUserInfoResult } from "@/shared/types/api/mypage";
import { fetchAPI } from "@/shared/utils/fetch";
import { useMutation, UseMutationOptions, UseQueryOptions } from "@tanstack/react-query";

// 유저 정보 //
export async function getUserInfo(accessToken?: string): Promise<GetUserInfoResult> {
  const {url, method} = API_ENDPOINT.mypage.getUser()

  return await fetchAPI<GetUserInfoResult>(url, {
    credentials: "include",
    method: method,
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

export function userInfoQueryOption(
  accessToken: string,
  options?: UseQueryOptions<GetUserInfoResult, Error>
) {
  return {
    queryKey: ["userInfo", accessToken],
    queryFn: () => getUserInfo(accessToken),
    enabled: !!accessToken,
    ...options, 
  }
};

// 유저 정보 수정 //
export async function updateUserInfo(
  accessToken: string,
  data: UpdateUserInfoResult
) {
  const {url, method} = API_ENDPOINT.mypage.updateUser()

  return await fetchAPI<UpdateUserInfoResult>(url, {
    credentials: "include",
    method: method,
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },    
    body: JSON.stringify(data),
  })
}

export function usePostUserInfo(accessToken: string, options?:UseMutationOptions<UpdateUserInfoResult, Error, unknown>) {
  return useMutation({
    ...options,
    mutationFn: (data: UpdateUserInfoResult) => updateUserInfo(accessToken, data)
  })
}

// 캘린더 일정 조회 //
export async function getMySchedules(accessToken: string): Promise<GetMySchedulesResult[]> {
  const {url, method} = API_ENDPOINT.mypage.getMySchedules()

  return await fetchAPI<GetMySchedulesResult[]>(url, {
    credentials: "include",
    method: method,
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
  });
}

export function mySchedulesQueryOption(
  accessToken: string,
  options?: UseQueryOptions<GetMySchedulesResult[], Error>
) {
  return ({
    queryKey: ["mySchedules"],
    queryFn: () => getMySchedules(accessToken),
    enabled: !!accessToken,
    ...options,
  })
};

// 스터디 일정 생성 //
export async function createStudySchedule(
  accessToken: string,
  studyId: number,
  data: CreateStudyScheduleResult
) {
  const {url, method} = API_ENDPOINT.mypage.createStudySchedule(studyId)

  return await fetchAPI<CreateStudyScheduleResult>(url, {
    credentials: "include",
    method: method,
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },    
    body: JSON.stringify(data),
  })}

export function usePostCreateStudySchedule(accessToken:string, studyId: number, options?:UseMutationOptions<CreateStudyScheduleResult, Error, unknown>) {
  return useMutation({
    ...options,
    mutationFn: (data: CreateStudyScheduleResult) => createStudySchedule(accessToken, studyId, data)
  })
}

// 스터디 일정 수정 //
export async function updateStudySchedule(
  accessToken: string,
  studyId: number,
  studyScheduleId: number,
  data: CreateStudyScheduleResult
) {
  const {url, method} = API_ENDPOINT.mypage.updateStudySchedule(studyId, studyScheduleId)

  return await fetchAPI<CreateStudyScheduleResult>(url, {
    credentials: "include",
    method: method,
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },    
    body: JSON.stringify(data),
  })}

export function useUpdateStudySchedule(accessToken:string, studyId: number, studyScheduleId:number, options?:UseMutationOptions<CreateStudyScheduleResult, Error, unknown>) {
  return useMutation({
    ...options,
    mutationFn: (data: CreateStudyScheduleResult) => updateStudySchedule(accessToken, studyId, studyScheduleId, data)
  })
}
  

// 참여 중인 스터디 //
export async function getMyJoinedStudies(accessToken: string, userId: string): Promise<GetMyJoinedStudiesResult[]> {
  const {url, method} = API_ENDPOINT.mypage.getMyJoinedStudies(userId)

  return await fetchAPI(url, {
    credentials: "include",
    method: method,
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
  });
}

export function myJoinedStudiesQueryOption(
  accessToken: string,
  userId: string,
  options?: UseQueryOptions<GetMyJoinedStudiesResult[], Error>
) {
  return (
    {
      queryKey: ["myJoinedStudies"],
      queryFn: () => getMyJoinedStudies(accessToken, userId),
      enabled: !!accessToken && !!userId,
      ...options, 
    }
  )
};

// 나의 지원 현황 //
export async function getMyApplyStatus(accessToken: string): Promise<GetMyApplyStatusResult[]> {
  const {url, method} = API_ENDPOINT.mypage.getMyApplyStatus()
  
  return await fetchAPI(url, {
    credentials: "include",
    method: method,
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
  });
}

export function myApplyStatusQueryOption(
  accessToken: string,
  options?: UseQueryOptions<GetMyApplyStatusResult[], Error>
) {
  return ({
    queryKey: ["myApplyStatus"],
    queryFn: () => getMyApplyStatus(accessToken),
    enabled: !!accessToken,
    ...options, 
  })
};

