export interface GetRecruitmentChatRoomResponse {
  content: Content[]
  lastElementId: number
  hasNext: boolean
}

export interface Content {
  recruitmentChatMessageId: number
  message: string
  messageCreatedAt: string
  userId: number
  nickname: string
}

// 모집 채팅방 생성 응답 타입
export interface PostRecruitmentChatRoomResponse {
  recruitmentChatRoomId: string // "1" 이런 단어
}
