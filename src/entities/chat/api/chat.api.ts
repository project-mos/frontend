import {
  GetPrivateChatRoomResponse,
  GetPrivateChatRoomByUserResponse,
  GetPrivateChatRoomMessagesResponse,
} from "@/entities/chat/api/chat.api.types";
import { API_ENDPOINT, fetchAPI } from "@/shared/api/lib";

// 나의 개인 채팅방 조회
export async function getPrivateChatRoom() {
  const { url, method } = API_ENDPOINT.chat.getPrivateChatRoom();

  return await fetchAPI<GetPrivateChatRoomResponse>(url, {
    credentials: "include",
    method: method,
  });
}

// 개인 채팅방 생성 및 유무 조회 (통합)
export async function getPrivateChatRoomByUser(userId: string) {
  const { url, method } = API_ENDPOINT.chat.getPrivateChatRoomByUser(userId);

  return await fetchAPI<GetPrivateChatRoomByUserResponse>(url, {
    credentials: "include",
    method: method,
  });
}

// 개인 채팅방 메시지 조회
export async function getPrivateChatRoomMessages(
  privateChatRoomId: string,
  lastElementId?: number
) {
  const { url, method } = API_ENDPOINT.chat.getPrivateChatRoomMessages(
    privateChatRoomId,
    lastElementId
  );

  return await fetchAPI<GetPrivateChatRoomMessagesResponse>(url, {
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
