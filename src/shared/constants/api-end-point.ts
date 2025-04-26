import { Method } from "../utils/fetcher";

export const API_ENDPOINT = {
  auth: {
    // 로그인
    signIn: () => {
      return {
        url:`${process.env.MOS_API_BASE_URL}/oauth2/login`, // 임시 URL
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
        url:`${process.env.MOS_API_BASE_URL}/user/${id}`, // 임시 URL
        method: Method.GET,
      };
    },
    // 유저 정보 수정
    updateUser: (id: number) => {
      return {
        url:`${process.env.MOS_API_BASE_URL}/user/${id}`, // 임시 URL
        method: Method.PATCH,
      };
    }
  }

  // 필요에 따라 추가
};
