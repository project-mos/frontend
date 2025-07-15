export type MessageType = "text" | "image" | "file";
export type ChatRoomType = "personal" | "group" | "inquiry";

// 채팅방 미리보기 타입
export interface ChatRoomPreview {
  roomId: string;
  roomType: ChatRoomType;
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

// 채팅 유저 타입
export interface ChatUser {
  id: string;
  name: string;
  avatarUrl: string;
  role?: "admin" | "member" | "guest"; // 역할
}

// ✅ 채팅방 목록 mock data (각 타입별 1개씩)
export const chatRoomMockData: ChatRoomPreview[] = [
  // 개인채팅방
  {
    roomId: "personal-1",
    roomType: "personal",
    user: {
      id: "user-kim",
      name: "김민수",
      avatarUrl:
        "https://ui-avatars.com/api/?name=김민수&background=28a745&color=fff&size=40",
    },
    lastMessage: {
      content: "네, 감사합니다! 열심히 해보겠습니다.",
      type: "text",
      timestamp: "2025-04-18T15:30:00Z",
    },
    unreadCount: 2,
  },

  // 그룹채팅방
  {
    roomId: "group-1",
    roomType: "group",
    user: {
      id: "group-react",
      name: "React 스터디",
      avatarUrl:
        "https://ui-avatars.com/api/?name=React&background=61dafb&color=000&size=40",
    },
    lastMessage: {
      content: "김민수: 다음 주 진도 어디까지 하나요?",
      type: "text",
      timestamp: "2025-04-18T14:20:00Z",
    },
    unreadCount: 5,
  },

  // 문의채팅방
  {
    roomId: "inquiry-1",
    roomType: "inquiry",
    user: {
      id: "support-general",
      name: "운영진",
      avatarUrl:
        "https://ui-avatars.com/api/?name=운영진&background=007bff&color=fff&size=40",
    },
    lastMessage: {
      content: "추가로 궁금한 점이 있으시면 언제든지 말씀해주세요.",
      type: "text",
      timestamp: "2025-04-18T09:45:00Z",
    },
    unreadCount: 0,
  },
];

// 채팅 유저 목록 mock data
export const chatUserMockData: ChatUser[] = [
  {
    id: "admin",
    name: "운영자",
    avatarUrl:
      "https://ui-avatars.com/api/?name=운영자&background=007bff&color=fff&size=40",
    role: "admin",
  },
  {
    id: "john123",
    name: "John",
    avatarUrl:
      "https://ui-avatars.com/api/?name=John&background=dc3545&color=fff&size=40",
    role: "member",
  },
  {
    id: "alice",
    name: "Alice",
    avatarUrl:
      "https://ui-avatars.com/api/?name=Alice&background=28a745&color=fff&size=40",
    role: "member",
  },
  {
    id: "bob456",
    name: "Bob",
    avatarUrl:
      "https://ui-avatars.com/api/?name=Bob&background=ffc107&color=000&size=40",
    role: "member",
  },
  {
    id: "charlie789",
    name: "Charlie",
    avatarUrl:
      "https://ui-avatars.com/api/?name=Charlie&background=6f42c1&color=fff&size=40",
    role: "guest",
  },
  {
    id: "diana101",
    name: "Diana",
    avatarUrl:
      "https://ui-avatars.com/api/?name=Diana&background=e83e8c&color=fff&size=40",
    role: "member",
  },
  {
    id: "Jin1130",
    name: "Jin",
    avatarUrl:
      "https://ui-avatars.com/api/?name=Jin&background=20c997&color=fff&size=40",
    role: "member",
  },
];

// ✅ 개인채팅방 대화 mock data (김민수와의 대화)
export const personalChatMockData = [
  {
    isMe: false,
    content: "안녕하세요! 스터디 관련해서 질문이 있어요.",
    profileImage:
      "https://ui-avatars.com/api/?name=김민수&background=28a745&color=fff&size=32",
    nickname: "김민수",
  },
  {
    isMe: true,
    content: "네, 안녕하세요! 무엇을 도와드릴까요?",
  },
  {
    isMe: false,
    content: "다음 주 스터디 시간이 어떻게 되나요?",
    profileImage:
      "https://ui-avatars.com/api/?name=김민수&background=28a745&color=fff&size=32",
    nickname: "김민수",
  },
  {
    isMe: true,
    content: "매주 화요일 오후 7시에 진행됩니다.",
  },
  {
    isMe: false,
    content: "혹시 자료를 미리 받아볼 수 있을까요?",
    profileImage:
      "https://ui-avatars.com/api/?name=김민수&background=28a745&color=fff&size=32",
    nickname: "김민수",
  },
  {
    isMe: true,
    content: "네, 잠시만요. 파일을 보내드릴게요.",
  },
  {
    isMe: true,
    content: "React 기초 학습자료.pdf",
  },
  {
    isMe: false,
    content: "네, 감사합니다! 열심히 해보겠습니다.",
    profileImage:
      "https://ui-avatars.com/api/?name=김민수&background=28a745&color=fff&size=32",
    nickname: "김민수",
  },
];

// ✅ 그룹채팅방 대화 mock data (React 스터디)
export const groupChatMockData = [
  {
    isMe: false,
    content: "안녕하세요! 새로 들어온 김민수입니다.",
    profileImage:
      "https://ui-avatars.com/api/?name=김민수&background=28a745&color=fff&size=32",
    nickname: "김민수",
  },
  {
    isMe: false,
    content: "안녕하세요! 박지영입니다. 잘 부탁드려요~",
    profileImage:
      "https://ui-avatars.com/api/?name=박지영&background=dc3545&color=fff&size=32",
    nickname: "박지영",
  },
  {
    isMe: true,
    content: "환영합니다! 모두 열심히 해봅시다.",
  },
  {
    isMe: false,
    content: "저는 Hook까지 공부했어요!",
    profileImage:
      "https://ui-avatars.com/api/?name=박지영&background=dc3545&color=fff&size=32",
    nickname: "박지영",
  },
  {
    isMe: false,
    content: "저도 useEffect까지 봤습니다!",
    profileImage:
      "https://ui-avatars.com/api/?name=이준호&background=6f42c1&color=fff&size=32",
    nickname: "이준호",
  },
  {
    isMe: true,
    content: "좋습니다! 다음 주는 Context API를 다뤄보겠습니다.",
  },
  {
    isMe: true,
    content: "참고 자료 이미지를 올려드릴게요.",
  },
  {
    isMe: false,
    content: "다음 주 진도 어디까지 하나요?",
    profileImage:
      "https://ui-avatars.com/api/?name=김민수&background=28a745&color=fff&size=32",
    nickname: "김민수",
  },
];

// ✅ 문의채팅방 대화 mock data (운영진과의 대화)
export const inquiryChatMockData = [
  {
    isMe: true,
    content: "안녕하세요! 스터디 등록 관련해서 문의드립니다.",
  },
  {
    isMe: false,
    content: "안녕하세요! 문의해주신 내용을 확인했습니다.",
    profileImage:
      "https://ui-avatars.com/api/?name=운영진&background=007bff&color=fff&size=32",
    nickname: "운영진",
  },
  {
    isMe: true,
    content: "스터디 신청 절차가 어떻게 되나요?",
  },
  {
    isMe: false,
    content: "스터디 신청은 다음과 같은 절차로 진행됩니다.",
    profileImage:
      "https://ui-avatars.com/api/?name=운영진&background=007bff&color=fff&size=32",
    nickname: "운영진",
  },
  {
    isMe: false,
    content: "스터디 신청 가이드.pdf",
    profileImage:
      "https://ui-avatars.com/api/?name=운영진&background=007bff&color=fff&size=32",
    nickname: "운영진",
  },
  {
    isMe: true,
    content: "빠른 답변 감사합니다!",
  },
  {
    isMe: false,
    content: "추가로 궁금한 점이 있으시면 언제든지 말씀해주세요.",
    profileImage:
      "https://ui-avatars.com/api/?name=운영진&background=007bff&color=fff&size=32",
    nickname: "운영진",
  },
];

// ✅ 기본 chat mock data (호환성 유지)
export const chatMockData = personalChatMockData;
