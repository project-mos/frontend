export type MessageType = "text" | "image" | "file";
// 채팅방 미리보기 타입
export interface ChatRoomPreview {
  roomId: string;
  user: {
    id: string;
    name: string;
    avatarUrl: string;
  };
  lastMessage: {
    content: string;
    type: MessageType;
    timestamp: string;
  };
  unreadCount: number;
}

// ✅ 예시 mock data
export const chatRoomMockData: ChatRoomPreview[] = [
  {
    roomId: "room-1",
    user: {
      id: "admin",
      name: "운영자",
      avatarUrl: "https://placekitten.com/80/80",
    },
    lastMessage: {
      content: "이미지를 보냈습니다.",
      type: "image",
      timestamp: "2025-04-18T14:30:00Z",
    },
    unreadCount: 2,
  },
  {
    roomId: "room-2",
    user: {
      id: "john123",
      name: "John",
      avatarUrl: "https://placekitten.com/81/81",
    },
    lastMessage: {
      content: "방금 전송한 파일 확인해줘.",
      type: "file",
      timestamp: "2025-04-18T13:00:00Z",
    },
    unreadCount: 0,
  },
  {
    roomId: "room-3",
    user: {
      id: "alice",
      name: "Alice",
      avatarUrl: "https://placekitten.com/82/82",
    },
    lastMessage: {
      content: "점심 먹었어요?",
      type: "text",
      timestamp: "2025-04-18T11:45:00Z",
    },
    unreadCount: 5,
  },
];

// mockChatData.ts 또는 직접 컴포넌트에 삽입
export const chatMockData = [
  {
    isMe: false,
    content: "안녕하세요! 무엇을 도와드릴까요?",
  },
  {
    isMe: true,
    content: "네, 안녕하세요. 몇 가지 질문이 있어서요.",
  },
  {
    isMe: false,
    content:
      "궁금한 점이 있다면 언제든지 말씀해주세요. 최선을 다해 답변해 드리겠습니다.",
  },
  {
    isMe: true,
    content: "혹시 서비스 이용 방법에 대해 자세히 알려주실 수 있나요?",
  },
  {
    isMe: false,
    content:
      "물론입니다. 저희 서비스는 크게 세 가지 단계로 이용하실 수 있습니다. 첫째...",
  },
  {
    isMe: true,
    content: "아, 그렇군요! 이해가 잘 됩니다. 감사합니다.",
  },
  {
    isMe: false,
    content: "천만에요! 더 궁금한 점 있으시면 언제든지 다시 질문해주세요.",
  },
];
