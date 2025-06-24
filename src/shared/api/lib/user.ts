import { Method } from "@/shared/api/util/fetcher";

export const user = {
  getUser: () => ({
    url: `${process.env.NEXT_PUBLIC_BASE_URL}/users`,
    method: Method.GET,
  }),
  patchUser: () => ({
    url: `${process.env.NEXT_PUBLIC_BASE_URL}/users`,
    method: Method.PATCH,
  }),
  patchProfileImg: () => ({
    url: `${process.env.NEXT_PUBLIC_BASE_URL}/users/images`,
    method: Method.PATCH,
  }),
};
