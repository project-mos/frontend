import { API_ENDPOINT, fetchAPI } from "@/shared/api/lib";
import {
  GetStudyChatRoomResponse,
  GetStudyChatRoomMessagesResponse,
} from "@/entities/chat/api/chat.api.types";

// 스터디 채팅방 목록 조회
export async function getStudyChatRoom() {
  const { url, method } = API_ENDPOINT.studyChat.getStudyChatRoom();

  return await fetchAPI<GetStudyChatRoomResponse>(url, {
    credentials: "include",
    method,
  });
}

// 스터디 채팅방 메시지 조회 (무한 스크롤)
export async function getStudyChatRoomMessages(
  studyChatRoomId: string,
  lastElementId?: number,
  size: number = 10
) {
  // 방어 코드: 잘못된 인자 방지
  if (!studyChatRoomId) {
    throw new Error("유효하지 않은 스터디/채팅방 ID");
  }

  const { url, method } = API_ENDPOINT.studyChat.getStudyChatRoomMessages(
    studyChatRoomId,
    lastElementId,
    size
  );

  return await fetchAPI<GetStudyChatRoomMessagesResponse>(url, {
    credentials: "include",
    method,
  });
}
