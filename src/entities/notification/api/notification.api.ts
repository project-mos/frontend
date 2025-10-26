import {
  API_ENDPOINT,
  createJsonRequestInit,
  fetchAPI,
} from "@/shared/api/lib";
import {
  GetNotificationsResponse,
  GetUnreadNotificationsNumResponse,
  INotification,
  PostFcmTokenResponse,
} from "./notification.api.type";

export async function postFcmToken(fcmToken: string) {
  const { url, method } = API_ENDPOINT.notification.postFcmToken();

  return await fetchAPI<PostFcmTokenResponse>(
    url,
    createJsonRequestInit(method, { fcmToken: fcmToken })
  );
}

export async function getNotifications() {
  const { url, method } = API_ENDPOINT.notification.getNotifications();

  return await fetchAPI<GetNotificationsResponse>(url, {
    credentials: "include",
    method: method,
  });
}

export async function getUnreadNotificationsNum() {
  const { url, method } = API_ENDPOINT.notification.getUnreadNotificationsNum();

  return await fetchAPI<GetUnreadNotificationsNumResponse>(url, {
    credentials: "include",
    method: method,
  });
}

export async function postReadNotification(notificationId: string) {
  const { url, method } =
    API_ENDPOINT.notification.postReadNotification(notificationId);

  return await fetchAPI<INotification>(url, {
    credentials: "include",
    method: method,
  });
}
