import { Method } from "@/shared/api/util/fetcher";

export const user = {
  getUser: () => ({
    url: `${process.env.NEXT_PUBLIC_BASE_URL}/users`,
    method: Method.GET,
  }),
  updateUser: () => ({
    url: `${process.env.NEXT_PUBLIC_BASE_URL}/users`,
    method: Method.PATCH,
  }),
  updateProfileImg: () => ({
    url: `${process.env.NEXT_PUBLIC_BASE_URL}/users/images`,
    method: Method.PATCH,
  }),
};
