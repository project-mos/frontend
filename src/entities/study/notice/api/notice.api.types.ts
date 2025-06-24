// 조회, 수정 API 응답 데이터 타입
export interface NoticeResponse {
  studyNoticeId: number;
  title: string;
  content: string;
  pinned: boolean;
  important: boolean;
  createdAt: string;
  modifiedAt: string;
  creatorId: number;
  creatorNickname: string;
  modifierId: number;
  modifierNickname: string;
  studyId: number;
}

// 생성, 수정 API 요청 데이터 타입
export interface NoticeRequest {
  title: string;
  content: string;
  pinned: boolean;
  important: boolean;
}
