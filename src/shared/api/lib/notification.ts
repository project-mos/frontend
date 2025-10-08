import { Method } from "../util/fetcher";

export const notification = {
  postFcmToken: () => ({
    url: `${process.env.NEXT_PUBLIC_BASE_URL}/fcm/tokens`,
    method: Method.POST,
  }),
  getNotifications: () => ({
    url: `${process.env.NEXT_PUBLIC_BASE_URL}/notifications`,
    method: Method.GET,
  }),
  getUnreadNotificationsNum: () => ({
    url: `${process.env.NEXT_PUBLIC_BASE_URL}/notifications/unread`,
    method: Method.GET,
  }),
  postReadNotification: (notificationId: string) => ({
    url: `${process.env.NEXT_PUBLIC_BASE_URL}/notifications/${notificationId}`,
    method: Method.POST,
  }),
};
