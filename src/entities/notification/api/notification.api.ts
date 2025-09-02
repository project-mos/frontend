import {
  API_ENDPOINT,
  createJsonRequestInit,
  fetchAPI,
} from "@/shared/api/lib";
import { PostFcmToken } from "./notification.api.type";

export async function postFcmToken(fcmToken: string) {
  const { url, method } = API_ENDPOINT.notification.postFcmToken();

  return await fetchAPI<PostFcmToken>(
    url,
    createJsonRequestInit(method, { fcmToken: fcmToken })
  );
}
