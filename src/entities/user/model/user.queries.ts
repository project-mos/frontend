import {
  GetUserInfoResult,
  UpdateProfileImgResult,
  UpdateUserInfoResult,
} from "@/shared/types/api/mypage";
import {
  useMutation,
  UseMutationOptions,
  useQuery,
  UseQueryOptions,
} from "@tanstack/react-query";
import {
  getUserInfo,
  updateProfileImg,
  updateUserInfo,
} from "@/entities/user/api/user.api";

export function useUserInfo(
  options?: Omit<
    UseQueryOptions<GetUserInfoResult, Error>,
    "queryKey" | "queryFn"
  >
) {
  return useQuery({
    ...options,
    queryFn: () => getUserInfo(),
    queryKey: ["userInfo"],
  });
}

export function useUpdateUserInfo(
  options?: UseMutationOptions<UpdateUserInfoResult, Error, unknown>
) {
  return useMutation({
    ...options,
    mutationFn: (data: UpdateUserInfoResult) => updateUserInfo(data),
  });
}

export function useUpdateProfileImg(
  options?: UseMutationOptions<UpdateProfileImgResult, Error, unknown>
) {
  return useMutation({
    ...options,
    mutationFn: (data: UpdateProfileImgResult) => updateProfileImg(data),
  });
}
