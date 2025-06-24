import { Method } from "@/shared/api/util/fetcher";

export const auth = {
  signIn: () => ({
    url: `${process.env.NEXT_PUBLIC_BASE_URL}/oauth2/login`,
    method: Method.POST,
  }),
  getRefreshAuth: () => ({
    url: `${process.env.NEXT_PUBLIC_BASE_URL}/users/tokens`,
    method: Method.GET,
  }),
  getAccessToken: () => ({
    url: `/api/cookie`,
    method: Method.GET,
  }),
};
