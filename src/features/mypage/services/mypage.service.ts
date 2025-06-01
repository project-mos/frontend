import { API_ENDPOINT } from "@/shared/constants/api-end-point";
import { GetSchedulesResult, GetUserInfoResult, updateUserInfoResult } from "@/shared/types/api/mypage";
import { fetchAPI } from "@/shared/utils/fetch";
import { UseQueryOptions } from "@tanstack/react-query";

// 유저 정보 GET API 호출 함수
export const getUserInfo = async (accessToken?: string): Promise<GetUserInfoResult> => {
  return fetchAPI<GetUserInfoResult>(API_ENDPOINT.user.getUser().url, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

// 유저 정보 쿼리 옵션
export const userInfoQueryOption = (
  accessToken?: string,
  options?: UseQueryOptions<GetUserInfoResult, Error>
): UseQueryOptions<GetUserInfoResult, Error> => ({
  queryKey: ["userInfo", accessToken],
  queryFn: () => getUserInfo(accessToken),
  ...options, 
});

// 유저 정보 수정 PATCH API 호출 함수
export const updateUserInfo = async (
  accessToken: string,
  data: updateUserInfoResult
): Promise<updateUserInfoResult> => {
  return fetchAPI<updateUserInfoResult>(API_ENDPOINT.user.updateUser().url, {
    method: API_ENDPOINT.user.updateUser().method,
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },    
    body: JSON.stringify(data),
  })}

  // 캘린더 일정 조회 //
export const getMySchedules = async (accessToken: string): Promise<GetSchedulesResult[]> => {
  return fetchAPI(API_ENDPOINT.user.getMySchedules().url, {
    credentials: "include",
    method: API_ENDPOINT.user.getMySchedules().method,
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
  });
}
export const MySchedulesQueryOption = (
  accessToken: string,
  options?: UseQueryOptions<GetSchedulesResult[], Error>
): UseQueryOptions<GetSchedulesResult[], Error> => ({
  queryKey: ["myApplyStatus", accessToken],
  queryFn: () => getMySchedules(accessToken),
  enabled: !!accessToken,
  ...options, 
});
