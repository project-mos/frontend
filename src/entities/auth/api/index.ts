import {
  GetAccessTokenResponse,
  RequestLogin,
} from "@/entities/auth/api/types";
import {
  API_ENDPOINT,
  createJsonRequestInit,
  fetchAPI,
} from "@/shared/api/lib";

export default async function OAuthLogin({ code, provider }: RequestLogin) {
  const { url, method } = API_ENDPOINT.auth.signIn();
  const response = await fetchAPI(
    url,
    createJsonRequestInit(method, JSON.stringify({ code, provider }))
  );
  return response;
}

// Refresh 토큰 기반 Access 토큰 재발급
export async function getRefreshAuth() {
  await fetchAPI(API_ENDPOINT.auth.getRefreshAuth().url, {
    credentials: "include",
  });
}

// Access 토큰 확인 (읽기모드)
export async function getAccessToken() {
  const response = await fetchAPI<GetAccessTokenResponse>(
    API_ENDPOINT.auth.getAccessToken().url
  );
  return response;
}
