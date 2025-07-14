// 알림 타입
export interface Notification {
  id: string;
  type: "study" | "chat" | "system";
  title: string;
  content: string;
  timestamp: string;
  isRead: boolean;
}

// 알림 mock data
export const notificationMockData: Notification[] = [
  {
    id: "1",
    type: "study",
    title: "새로운 스터디 신청",
    content: "김철수님이 'React 심화 학습' 스터디에 참여 신청했습니다.",
    timestamp: "2025-01-20T10:30:00Z",
    isRead: false,
  },
  {
    id: "2",
    type: "chat",
    title: "새로운 메시지",
    content: "운영자가 메시지를 보냈습니다: '오늘 일정을 확인해주세요.'",
    timestamp: "2025-01-20T09:15:00Z",
    isRead: false,
  },
  {
    id: "3",
    type: "system",
    title: "시스템 알림",
    content: "프로필 정보가 업데이트되었습니다.",
    timestamp: "2025-01-20T08:45:00Z",
    isRead: true,
  },
  {
    id: "4",
    type: "study",
    title: "스터디 일정 변경",
    content: "JavaScript 스터디 일정이 내일 오후 3시로 변경되었습니다.",
    timestamp: "2025-01-19T16:20:00Z",
    isRead: true,
  },
  {
    id: "5",
    type: "chat",
    title: "새로운 채팅 참여자",
    content: "이영희님이 '프론트엔드 개발' 채팅방에 참여했습니다.",
    timestamp: "2025-01-19T14:15:00Z",
    isRead: false,
  },
];
