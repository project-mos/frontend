import {
  GetUserInfoResponse,
  PutProfileImgResponse,
  PutUserInfoResponse,
} from "@/entities/user/api/user.api.type";
import {
  API_ENDPOINT,
  createJsonRequestInit,
  fetchAPI,
} from "@/shared/api/lib";

// 유저 정보 //
export async function getUserInfo(): Promise<GetUserInfoResponse> {
  const { url, method } = API_ENDPOINT.user.getUser();

  return await fetchAPI<GetUserInfoResponse>(url, {
    credentials: "include",
    method: method,
  });
}
// 유저 정보 수정 //
export async function updateUserInfo(data: PutUserInfoResponse) {
  const { url, method } = API_ENDPOINT.user.patchUser();

  return await fetchAPI<PutUserInfoResponse>(
    url,
    createJsonRequestInit(method, data)
  );
}

// 유저 프로필 이미지 수정 //
export async function updateProfileImg(data: PutProfileImgResponse) {
  const { url, method } = API_ENDPOINT.user.patchProfileImg();

  // FormData 생성
  const formData = new FormData();
  formData.append("file", data.file);
  formData.append("type", data.type);

  return await fetchAPI<PutProfileImgResponse>(url, {
    credentials: "include",
    method: method,
    body: formData,
  });
}
