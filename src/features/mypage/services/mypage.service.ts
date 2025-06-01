import { API_ENDPOINT } from "@/shared/constants/api-end-point";
import { GetMyApplyStatusResult, GetMyJoinedStudiesResult, GetUserInfoResult, UpdateUserInfoResult } from "@/shared/types/api/mypage";
import { fetchAPI } from "@/shared/utils/fetch";
import { UseQueryOptions } from "@tanstack/react-query";

// 유저 정보 //
export const getUserInfo = async (accessToken?: string): Promise<GetUserInfoResult> => {
  return fetchAPI<GetUserInfoResult>(API_ENDPOINT.user.getUser().url, {
    credentials: "include",
    method: API_ENDPOINT.user.getUser().method,
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
  ...options, 
});

// 유저 정보 수정 //
export const updateUserInfo = async (
  accessToken: string,
  data: UpdateUserInfoResult
): Promise<UpdateUserInfoResult> => {
  return fetchAPI<UpdateUserInfoResult>(API_ENDPOINT.user.updateUser().url, {
    credentials: "include",
    method: API_ENDPOINT.user.updateUser().method,
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },    
    body: JSON.stringify(data),
  })}

// 참여 중인 스터디 //
export const getMyJoinedStudies = async (accessToken: string, userId: string): Promise<GetMyJoinedStudiesResult[]> => {
  return fetchAPI(API_ENDPOINT.user.getMyJoinedStudies(userId).url, {
    credentials: "include",
    method: API_ENDPOINT.user.getMyJoinedStudies(userId).method,
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
  return fetchAPI(API_ENDPOINT.user.getMyApplyStatus().url, {
    credentials: "include",
    method: API_ENDPOINT.user.getMyApplyStatus().method,
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
  queryKey: ["myApplyStatus", accessToken],
  queryFn: () => getMyApplyStatus(accessToken),
  ...options, 
});