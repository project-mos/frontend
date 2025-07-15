export type MessageType = "text" | "image" | "file";
export type ChatRoomType = "personal" | "group" | "inquiry" | "study-inquiry";

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

  // 스터디 문의채팅방
  {
    roomId: "study-inquiry-nextjs",
    roomType: "study-inquiry",
    user: {
      id: "study-nextjs",
      name: "Next.js 스터디 문의",
      avatarUrl:
        "https://ui-avatars.com/api/?name=Next.js&background=000000&color=fff&size=40",
    },
    lastMessage: {
      content: "이재현: 과제 제출 방법이 궁금해요",
      type: "text",
      timestamp: "2025-04-18T16:30:00Z",
    },
    unreadCount: 3,
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
    timestamp: "2025-04-18T09:30:00Z",
  },
  {
    isMe: true,
    content: "네, 안녕하세요! 무엇을 도와드릴까요?",
    timestamp: "2025-04-18T09:31:00Z",
  },
  {
    isMe: false,
    content: "다음 주 스터디 시간이 어떻게 되나요?",
    profileImage:
      "https://ui-avatars.com/api/?name=김민수&background=28a745&color=fff&size=32",
    nickname: "김민수",
    timestamp: "2025-04-18T09:32:00Z",
  },
  {
    isMe: true,
    content: "매주 화요일 오후 7시에 진행됩니다.",
    timestamp: "2025-04-18T09:33:00Z",
  },
  {
    isMe: false,
    content: "혹시 자료를 미리 받아볼 수 있을까요?",
    profileImage:
      "https://ui-avatars.com/api/?name=김민수&background=28a745&color=fff&size=32",
    nickname: "김민수",
    timestamp: "2025-04-18T09:34:00Z",
  },
  {
    isMe: true,
    content: "네, 잠시만요. 파일을 보내드릴게요.",
    timestamp: "2025-04-18T09:35:00Z",
  },
  {
    isMe: true,
    content: "React 기초 학습자료.pdf",
    timestamp: "2025-04-18T09:36:00Z",
  },
  {
    isMe: false,
    content: "네, 감사합니다! 열심히 해보겠습니다.",
    profileImage:
      "https://ui-avatars.com/api/?name=김민수&background=28a745&color=fff&size=32",
    nickname: "김민수",
    timestamp: "2025-04-18T15:30:00Z",
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
    timestamp: "2025-04-18T10:00:00Z",
  },
  {
    isMe: false,
    content: "안녕하세요! 박지영입니다. 잘 부탁드려요~",
    profileImage:
      "https://ui-avatars.com/api/?name=박지영&background=dc3545&color=fff&size=32",
    nickname: "박지영",
    timestamp: "2025-04-18T10:01:00Z",
  },
  {
    isMe: true,
    content: "환영합니다! 모두 열심히 해봅시다.",
    timestamp: "2025-04-18T10:02:00Z",
  },
  {
    isMe: false,
    content: "저는 Hook까지 공부했어요!",
    profileImage:
      "https://ui-avatars.com/api/?name=박지영&background=dc3545&color=fff&size=32",
    nickname: "박지영",
    timestamp: "2025-04-18T10:03:00Z",
  },
  {
    isMe: false,
    content: "저도 useEffect까지 봤습니다!",
    profileImage:
      "https://ui-avatars.com/api/?name=이준호&background=6f42c1&color=fff&size=32",
    nickname: "이준호",
    timestamp: "2025-04-18T10:04:00Z",
  },
  {
    isMe: true,
    content: "좋습니다! 다음 주는 Context API를 다뤄보겠습니다.",
    timestamp: "2025-04-18T10:05:00Z",
  },
  {
    isMe: true,
    content: "참고 자료 이미지를 올려드릴게요.",
    timestamp: "2025-04-18T10:06:00Z",
  },
  {
    isMe: false,
    content: "다음 주 진도 어디까지 하나요?",
    profileImage:
      "https://ui-avatars.com/api/?name=김민수&background=28a745&color=fff&size=32",
    nickname: "김민수",
    timestamp: "2025-04-18T14:20:00Z",
  },
];

// ✅ 문의채팅방 대화 mock data (운영진과의 대화)
export const inquiryChatMockData = [
  {
    isMe: true,
    content: "안녕하세요! 스터디 등록 관련해서 문의드립니다.",
    timestamp: "2025-04-18T09:00:00Z",
  },
  {
    isMe: false,
    content: "안녕하세요! 문의해주신 내용을 확인했습니다.",
    profileImage:
      "https://ui-avatars.com/api/?name=운영진&background=007bff&color=fff&size=32",
    nickname: "운영진",
    timestamp: "2025-04-18T09:01:00Z",
  },
  {
    isMe: true,
    content: "스터디 신청 절차가 어떻게 되나요?",
    timestamp: "2025-04-18T09:02:00Z",
  },
  {
    isMe: false,
    content: "스터디 신청은 다음과 같은 절차로 진행됩니다.",
    profileImage:
      "https://ui-avatars.com/api/?name=운영진&background=007bff&color=fff&size=32",
    nickname: "운영진",
    timestamp: "2025-04-18T09:03:00Z",
  },
  {
    isMe: false,
    content: "스터디 신청 가이드.pdf",
    profileImage:
      "https://ui-avatars.com/api/?name=운영진&background=007bff&color=fff&size=32",
    nickname: "운영진",
    timestamp: "2025-04-18T09:04:00Z",
  },
  {
    isMe: true,
    content: "빠른 답변 감사합니다!",
    timestamp: "2025-04-18T09:05:00Z",
  },
  {
    isMe: false,
    content: "추가로 궁금한 점이 있으시면 언제든지 말씀해주세요.",
    profileImage:
      "https://ui-avatars.com/api/?name=운영진&background=007bff&color=fff&size=32",
    nickname: "운영진",
    timestamp: "2025-04-18T09:45:00Z",
  },
];

// ✅ 스터디 문의 채팅방 대화 mock data (이재현과의 대화)
export const studyInquiryChatMockData = [
  {
    isMe: false,
    content: "안녕하세요! Next.js 스터디 관련해서 문의드립니다.",
    profileImage:
      "https://ui-avatars.com/api/?name=이재현&background=fd7e14&color=fff&size=32",
    nickname: "이재현",
    timestamp: "2025-04-18T16:00:00Z",
  },
  {
    isMe: true,
    content: "안녕하세요! 무엇을 도와드릴까요?",
    timestamp: "2025-04-18T16:01:00Z",
  },
  {
    isMe: false,
    content: "과제 제출 방법이 궁금해요",
    profileImage:
      "https://ui-avatars.com/api/?name=이재현&background=fd7e14&color=fff&size=32",
    nickname: "이재현",
    timestamp: "2025-04-18T16:30:00Z",
  },
  {
    isMe: true,
    content: "GitHub 저장소에 push 후 PR 생성해주시면 됩니다.",
    timestamp: "2025-04-18T16:31:00Z",
  },
  {
    isMe: false,
    content: "PR 생성 방법을 잘 모르겠어요.",
    profileImage:
      "https://ui-avatars.com/api/?name=이재현&background=fd7e14&color=fff&size=32",
    nickname: "이재현",
    timestamp: "2025-04-18T16:32:00Z",
  },
  {
    isMe: true,
    content: "가이드 문서를 보내드릴게요.",
    timestamp: "2025-04-18T16:33:00Z",
  },
  {
    isMe: true,
    content: "PR 생성 가이드.pdf",
    timestamp: "2025-04-18T16:34:00Z",
  },
];

// ✅ 스터디 문의 상세 mock data
export const studyInquiryMockData = {
  studyId: "study-nextjs",
  studyName: "Next.js 스터디",
  inquiries: [
    {
      userId: "user-jaehyun",
      userName: "이재현",
      userAvatar:
        "https://ui-avatars.com/api/?name=이재현&background=fd7e14&color=fff&size=40",
      roomId: "chat-study-nextjs-jaehyun",
      lastMessage: {
        content: "과제 제출 방법이 궁금해요",
        type: "text" as const,
        timestamp: "2025-04-18T16:30:00Z",
      },
      unreadCount: 2,
      inquiryDate: "2025-04-15T09:00:00Z",
      inquiryStatus: "active" as const,
    },
    {
      userId: "user-minji",
      userName: "박민지",
      userAvatar:
        "https://ui-avatars.com/api/?name=박민지&background=dc3545&color=fff&size=40",
      roomId: "chat-study-nextjs-minji",
      lastMessage: {
        content: "감사합니다!",
        type: "text" as const,
        timestamp: "2025-04-18T12:00:00Z",
      },
      unreadCount: 0,
      inquiryDate: "2025-04-16T14:00:00Z",
      inquiryStatus: "resolved" as const,
    },
    {
      userId: "user-sunghoon",
      userName: "최성훈",
      userAvatar:
        "https://ui-avatars.com/api/?name=최성훈&background=28a745&color=fff&size=40",
      roomId: "chat-study-nextjs-sunghoon",
      lastMessage: {
        content: "스터디 시간 변경 가능한가요?",
        type: "text" as const,
        timestamp: "2025-04-18T11:00:00Z",
      },
      unreadCount: 1,
      inquiryDate: "2025-04-17T10:00:00Z",
      inquiryStatus: "pending" as const,
    },
  ],
  createdAt: "2025-04-01T09:00:00Z",
  updatedAt: "2025-04-18T16:30:00Z",
};

// ✅ 기본 chat mock data (호환성 유지)
export const chatMockData = personalChatMockData;
