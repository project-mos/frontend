import {
  PrivateChatMessage,
  PrivateChatRoom,
  StudyChatMessage,
  StudyChatRoom,
} from "@/entities/chat/api/chat.api.types";
import {
  useGetPrivateChatRoom,
  useGetPrivateChatRoomMessages,
} from "@/entities/chat/model/chat.queries";
import {
  useGetStudyChatRoom,
  useGetStudyChatRoomMessages,
} from "@/entities/chat/model/study-chat.queries";
import { ChatNavigationView } from "@/features/chat-navigation/lib/navigation.types";
import { ChatType } from "@/features/chat/ui";
import { useWebSocket } from "@/shared/hooks/useWebSocket";
import { useEffect, useState } from "react";

interface UseChatWebSocketProps {
  isOpenState: boolean; // 채팅 UI가 열려있는지 상태
  currentView: ChatNavigationView; // 현재 채팅 네비게이션 뷰
  currentChatRoomId?: number; // 현재 선택된 채팅방 ID
  chatType: ChatType; // 채팅 타입 (private | study)
  isLoggedIn: boolean;
}

/**
 * 채팅 WebSocket 연결 및 실시간 메시지 관리를 위한 커스텀 훅
 * - 실시간 메시지 수신 및 상태 관리
 * - 채팅방 목록 실시간 업데이트
 * - WebSocket 연결 상태 관리
 */
const useChatWebSocket = ({
  isOpenState,
  currentView,
  currentChatRoomId,
  chatType,
  isLoggedIn,
}: UseChatWebSocketProps) => {
  // 개인 채팅 메시지 상태 관리 (채팅방 ID별로 메시지 저장)
  const [privateChatMessages, setPrivateChatMessages] = useState<
    Record<number, PrivateChatMessage[]>
  >({});

  // 스터디 채팅 메시지 상태 관리 (채팅방 ID별로 메시지 저장)
  const [studyChatMessages, setStudyChatMessages] = useState<
    Record<number, StudyChatMessage[]>
  >({});

  // 채팅방 목록 상태 관리 (개인 + 스터디 채팅방 통합)
  const [chatRoomsState, setChatRoomsState] = useState<
    (PrivateChatRoom | StudyChatRoom)[]
  >([]);

  const getPrivateChatRoomMessages = useGetPrivateChatRoomMessages(
    `${currentChatRoomId}` || "",
    {
      enabled:
        isLoggedIn &&
        isOpenState &&
        currentView === "chatroom" &&
        chatType === "private" &&
        !!currentChatRoomId,
    }
  );

  const getStudyChatRoomMessages = useGetStudyChatRoomMessages(
    `${currentChatRoomId}` || "",
    {
      enabled:
        isLoggedIn &&
        isOpenState &&
        currentView === "chatroom" &&
        chatType === "study" &&
        !!currentChatRoomId,
    }
  );

  // 개인 채팅방 목록 조회
  const {
    data: privateChatRooms,
    error: privateChatError,
    refetch: refetchPrivateChat,
  } = useGetPrivateChatRoom({
    enabled: isOpenState && isLoggedIn,
  });

  // 스터디 채팅방 목록 조회

  const { data: studyChatRooms, refetch: refetchStudyChat } =
    useGetStudyChatRoom({
      enabled: isOpenState && isLoggedIn,
    });

  // WebSocket 연결 설정
  const { isConnected, subscribe, publish } = useWebSocket({
    url: "/ws-stomp",
    enabled: isOpenState && isLoggedIn,
    onConnect: () => {
      console.log("채팅 WebSocket 연결됨 - URL:", "/ws-stomp");
    },
    onDisconnect: () => {
      console.log("채팅 WebSocket 연결 해제됨 - URL:", "/ws-stomp");
    },
    onError: (error) => {
      console.error("채팅 WebSocket 에러:", error);
      console.error("에러 발생 URL:", "/ws-stomp");
    },
  });

  // 채팅방 목록 실시간 업데이트 구독
  useEffect(() => {
    if (!isConnected || !subscribe) return;

    // 채팅방 목록 변경사항 구독
    const chatRoomSubscription = subscribe<PrivateChatRoom | StudyChatRoom>(
      "/user/sub/chat-rooms",
      (message) => {
        console.log("받은 채팅방 메시지: ", message);

        // 메시지 타입에 따라 채팅방 목록 업데이트
        if ("privateChatRoomId" in message) {
          setChatRoomsState((prevRooms) =>
            updateChatRoom(prevRooms, message, "privateChatRoomId")
          );
        } else {
          setChatRoomsState((prevRooms) =>
            updateChatRoom(prevRooms, message, "studyChatRoomId")
          );
        }
      }
    );

    // 에러 메시지 구독
    const errorSubscription = subscribe("/user/sub/errors", (message) => {
      console.log("받은 사용자 에러 메시지: ", message);
    });

    // 컴포넌트 언마운트 시 구독 해제
    return () => {
      chatRoomSubscription?.unsubscribe();
      errorSubscription?.unsubscribe();
    };
  }, [isConnected, subscribe]);

  // 특정 채팅방의 실시간 메시지 구독
  useEffect(() => {
    if (!isConnected || currentView !== "chatroom" || !currentChatRoomId)
      return;

    // 채팅 타입에 따른 구독 URL 결정
    const subscriptionUrl =
      chatType === "private"
        ? `/sub/private-chat-rooms/${currentChatRoomId}`
        : `/sub/study-chat-rooms/${currentChatRoomId}`;

    console.log("채팅방 구독 URL:", subscriptionUrl);

    const subscription = subscribe<PrivateChatMessage | StudyChatMessage>(
      subscriptionUrl,
      (message) => {
        try {
          // 채팅 타입에 따라 메시지 상태 업데이트
          if (chatType === "private") {
            setPrivateChatMessages((prev) => ({
              ...prev,
              [currentChatRoomId]: [
                ...(prev[currentChatRoomId] || []),
                message as PrivateChatMessage,
              ],
            }));
          } else if (chatType === "study") {
            setStudyChatMessages((prev) => ({
              ...prev,
              [currentChatRoomId]: [
                ...(prev[currentChatRoomId] || []),
                message as StudyChatMessage,
              ],
            }));
          }
        } catch (error) {
          console.error("메시지 파싱 오류:", error);
        }
      }
    );

    // 채팅방 변경 시 구독 해제
    return () => {
      subscription?.unsubscribe();
    };
  }, [isConnected, currentView, currentChatRoomId, subscribe, chatType]);

  // 채팅방 목록 초기 데이터 설정
  useEffect(() => {
    if (privateChatRooms) {
      setChatRoomsState(privateChatRooms);
    }
    if (studyChatRooms) {
      setChatRoomsState((prevRooms) => [...prevRooms, ...studyChatRooms]);
    }
  }, [privateChatRooms, studyChatRooms]);

  // 사용자 메시지 구독 (채팅 리스트에서 실시간 메시지 내용 수신)
  useEffect(() => {
    if (!isConnected || !subscribe) return;

    // 사용자별 채팅방 목록 변경사항 구독
    const userChatRoomSubscription = subscribe<PrivateChatRoom | StudyChatRoom>(
      "/user/sub/chat-rooms",
      (message) => {
        console.log("받은 사용자 채팅방 메시지: ", message);

        // 메시지 타입에 따라 채팅방 목록 업데이트
        if ("privateChatRoomId" in message) {
          setChatRoomsState((prevRooms) =>
            updateChatRoom(prevRooms, message, "privateChatRoomId")
          );
        } else {
          setChatRoomsState((prevRooms) =>
            updateChatRoom(prevRooms, message, "studyChatRoomId")
          );
        }
      }
    );

    // 사용자 에러 메시지 구독
    const userErrorSubscription = subscribe("/user/sub/errors", (message) => {
      console.log("받은 사용자 에러 메시지: ", message);
    });

    // 컴포넌트 언마운트 시 구독 해제
    return () => {
      userChatRoomSubscription?.unsubscribe();
      userErrorSubscription?.unsubscribe();
    };
  }, [isConnected, subscribe]);

  useEffect(() => {
    // 리스트 화면일 때만, 그리고 채팅이 열려있고 로그인된 경우에만 수동 리패치
    if (currentView === "list" && isOpenState && isLoggedIn) {
      refetchPrivateChat();
      refetchStudyChat();
    }
  }, [
    currentView,
    isOpenState,
    isLoggedIn,
    refetchPrivateChat,
    refetchStudyChat,
  ]);

  return {
    isConnected,

    privateChatMessages,
    studyChatMessages,
    chatRoomsState,

    getStudyChatRoomMessages,
    getPrivateChatRoomMessages,

    privateChatError,
    refetchPrivateChat,

    subscribe,
    publish,
  };
};

export default useChatWebSocket;

/**
 * 채팅방 목록에서 특정 채팅방을 업데이트하는 유틸리티 함수
 * @param prevRooms - 기존 채팅방 목록
 * @param updatedRoom - 업데이트할 채팅방 정보
 * @param idKey - 채팅방 ID를 식별하는 키
 * @returns 업데이트된 채팅방 목록
 */
const updateChatRoom = <T extends PrivateChatRoom | StudyChatRoom>(
  prevRooms: (PrivateChatRoom | StudyChatRoom)[],
  updatedRoom: T,
  idKey: keyof T
) => {
  // 기존 채팅방이 있는지 확인
  const existingRoomIndex = prevRooms.findIndex((room) => {
    return (
      idKey in room && room[idKey as keyof typeof room] === updatedRoom[idKey]
    );
  });

  if (existingRoomIndex >= 0) {
    // 기존 채팅방이 있으면 업데이트
    const updatedRooms = [...prevRooms];
    updatedRooms[existingRoomIndex] = {
      ...(updatedRooms[existingRoomIndex] as T),
      ...updatedRoom,
    } as T;
    return updatedRooms;
  } else {
    // 새로운 채팅방이면 목록 맨 앞에 추가
    return [updatedRoom, ...prevRooms];
  }
};
