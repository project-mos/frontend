import { GetStudiesRequest } from "@/shared/types/api/studies";
import { Method } from "../utils/fetcher";

export const API_ENDPOINT = {
  auth: {
    // 로그인
    signIn: () => {
      return {
        url: `${process.env.MOS_API_BASE_URL}/oauth2/login`, // 임시 URL
        method: Method.POST,
      };
    },
    // 토큰 재발급
    refreshAuth: () => {
      return {
        url: `${process.env.MOS_API_BASE_URL}/auth/token-refresh`, // 임시 URL
        method: Method.POST,
      };
    },
  },
  user: {
    // 유저 정보 조회
    getUser: (id: number) => {
      return {
        url: `${process.env.MOS_API_BASE_URL}/user/${id}`, // 임시 URL
        method: Method.GET,
      };
    },
    // 유저 정보 수정
    updateUser: (id: number) => {
      return {
        url: `${process.env.MOS_API_BASE_URL}/user/${id}`, // 임시 URL
        method: Method.PATCH,
      };
    },
  },
  studies: {
    getStudies: ({
      page = "1",
      size = "12",
      sort = "createAt,desc",
      category,
      meetType,
      recruitmentStatus,
      progressStatus,
      liked,
    }: GetStudiesRequest) => {
      const params = new URLSearchParams({
        page: page.toString(),
        size: size.toString(),
        sort,
      });

      if (category) params.append("category", category);
      if (meetType) params.append("meetingType", meetType);
      if (recruitmentStatus)
        params.append("recruitmentStatus", recruitmentStatus);
      if (progressStatus) params.append("progressStatus", progressStatus);
      if (liked !== undefined) params.append("liked", liked.toString());

      const url = `/studies?${params.toString()}`;
      return {
        url,
        method: Method.GET,
      };
    },
    getHotStudies: () => {
      const url = "/studies/hots";
      return {
        url,
        method: Method.GET,
      };
    },
  },
  // 필요에 따라 추가
};
