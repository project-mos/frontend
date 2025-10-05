import { Method } from "../util/fetcher";

export const notification = {
  postFcmToken: () => ({
    url: `${process.env.NEXT_PUBLIC_BASE_URL}/fcm/tokens`,
    method: Method.POST,
  }),
};
