import { API_ENDPOINT, fetchAPI } from "@/shared/api/lib";
import { PostFcmToken } from "./notification.api.type";

export async function postFcmToken() {
  const { url, method } = API_ENDPOINT.notification.postFcmToken();

  return await fetchAPI<PostFcmToken>(url, {
    credentials: "include",
    method: method,
  });
}
