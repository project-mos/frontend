import {
  GetRecruitmentChatRoomResponse,
  PostRecruitmentChatRoomResponse,
} from "@/entities/chat/api/recruitment-chat.api.types";
import { API_ENDPOINT, fetchAPI } from "@/shared/api/lib";

// 모집글 채팅방 생성
export async function postRecruitmentChatRoom(studyId: number) {
  const { url, method } = API_ENDPOINT.recruitmentChat.postRecruitmentChatRoom(studyId);

  return await fetchAPI<PostRecruitmentChatRoomResponse>(url, {
    credentials: "include",
    method: method,
  });
}

// 모집글 채팅 조회
export async function getRecruitmentChatRoom(recruitmentChatRoomId: number) {
  const { url, method } = API_ENDPOINT.recruitmentChat.getRecruitmentChatRoom(recruitmentChatRoomId);

  return await fetchAPI<GetRecruitmentChatRoomResponse>(url, {
    credentials: "include",
    method: method,
  });
}
