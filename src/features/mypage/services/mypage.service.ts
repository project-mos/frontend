import { API_ENDPOINT } from "@/shared/constants/api-end-point";
import { GetUserInfoResult } from "@/shared/types/api/mypage";
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