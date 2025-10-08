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

  // return await fetchAPI<GetNotificationsResponse>(url, {
  //   method: method,
  //   credentials: "include",
  //   headers: {
  //     Authorization:
  //       "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJBY2Nlc3NUb2tlbiIsImlkIjoxMSwiZXhwIjoxNzU5NzY2ODg2fQ.TMMCD30KXAKn1hz225SLJ1Zd6VGEnOFNY65ZhadSDvLi1SBihDK0xt4Ua0z_rmHmBXwCZ87rZF1Es-KbdQp93A",
  //   },
  // });

  const result = await fetch(url, {
    method: "GET",
    credentials: "include",
    headers: {
      Authorization:
        "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJBY2Nlc3NUb2tlbiIsImlkIjoxMSwiZXhwIjoxNzU5NzY2ODg2fQ.TMMCD30KXAKn1hz225SLJ1Zd6VGEnOFNY65ZhadSDvLi1SBihDK0xt4Ua0z_rmHmBXwCZ87rZF1Es-KbdQp93A",
    },
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
