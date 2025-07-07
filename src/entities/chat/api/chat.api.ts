import {
  GetPrivateChatRoomResponse,
  postPrivateChatRoomResponse,
} from "@/entities/chat/api/chat.api.types";
import { API_ENDPOINT, fetchAPI } from "@/shared/api/lib";

// 개인 채팅방 조회
export async function getPrivateChatRoom() {
  const { url, method } = API_ENDPOINT.chat.getPrivateChatRoom();

  return await fetchAPI<GetPrivateChatRoomResponse>(url, {
    credentials: "include",
    method: method,
  });
}

// 개인 채팅방 유무 조회(검색)
export async function getSearchPrivateChatRoom() {
  const { url, method } = API_ENDPOINT.chat.getSearchPrivateChatRoom();

  return await fetchAPI<number>(url, {
    credentials: "include",
    method: method,
  });
}

// 개인 채팅방 생성하기
export async function postPrivateChatRoom() {
  const { url, method } = API_ENDPOINT.chat.postPrivateChatRoom();

  return await fetchAPI<postPrivateChatRoomResponse>(url, {
    credentials: "include",
    method: method,
  });
}

// 개인 채팅방 입장하기
export async function postEnterPrivateChatRoom(privateChatRoomId: string) {
  const { url, method } =
    API_ENDPOINT.chat.postEnterPrivateChatRoom(privateChatRoomId);

  return await fetchAPI(url, {
    credentials: "include",
    method: method,
  });
}

// 개인 채팅방 퇴장하기
export async function deletePrivateChatRoom(privateChatRoomId: string) {
  const { url, method } =
    API_ENDPOINT.chat.deletePrivateChatRoom(privateChatRoomId);

  return await fetchAPI(url, {
    credentials: "include",
    method: method,
  });
}
