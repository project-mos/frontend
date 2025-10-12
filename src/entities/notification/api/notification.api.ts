import {
  API_ENDPOINT,
  createJsonRequestInit,
  fetchAPI,
} from "@/shared/api/lib";
import {
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
  const { url } = API_ENDPOINT.notification.getNotifications();

  const result = await fetch(url, {
    method: "GET",
    credentials: "include",
  });

  console.log(await result.json());
}

export async function getUnreadNotificationsNum() {
  const { url, method } = API_ENDPOINT.notification.getUnreadNotificationsNum();

  return await fetchAPI<GetUnreadNotificationsNumResponse>(url, {
    method: method,
  });
}

export async function postReadNotification(notificationId: string) {
  const { url, method } =
    API_ENDPOINT.notification.postReadNotification(notificationId);

  return await fetchAPI<INotification>(url, { method: method });
}
