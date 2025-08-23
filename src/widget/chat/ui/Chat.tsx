"use client";

import { useChatNavigation } from "@/features/chat-navigation/model/useChatNavigation";
import {
  notificationMockData,
  Notification,
} from "@/entities/notification/lib/mock/notification.mock";
import {
  PrivateChatMessage,
  PrivateChatRoom,
  StudyChatRoom,
} from "@/entities/chat/api/chat.api.types";
import { ChatActiveTab } from "@/features/chat/ui/chat.ui.types";
import NotificationList from "@/features/notification/ui/NotificationList";
import {
  ChatInput,
  ChatItem,
  ChatRoom,
  ChatTab,
  ChatErrorState,
} from "@/features/chat/ui";

import Card from "@/shared/components/atoms/Card";
import Typography from "@/shared/components/atoms/Typography";
import ActionConfirmModal from "@/shared/components/molecules/ActionConfirmModal";
import useMultiModal from "@/shared/hooks/useMultiModal";
import { useSearchChat } from "@/features/search-chat/model/useSearchChat";
import { SearchChatIcon, SearchChatInput } from "@/features/search-chat/ui";
import cn from "@/shared/utils/cn";

import clsx from "clsx";
import React, { useState, useRef, useEffect } from "react";
import { useChatUIStore } from "@/shared/store/useChatUIStore";
import {
  useGetPrivateChatRoom,
  useGetPrivateChatRoomMessages,
} from "@/entities/chat/model/chat.queries";
import { useWebSocket } from "@/shared/hooks/useWebSocket";
import { useAuthStore } from "@/entities/auth/model/auth.store";
import { useGetStudyChatRoom } from "@/entities/chat/model/study-chat.queries";

const CHAT_DELETE_CONFIRM_MODAL_KEY = "chat_delete_confirm";
const CHAT_STATIC_SORT_CONFIRM_MODAL_KEY = "chat_static_sort_confirm";

const Chat = () => {
  const { modal, openModal, closeModal } = useMultiModal();
  const { isLoggedIn } = useAuthStore(); // 로그인 상태 확인

  const {
    navigationState,
    navigateToChatRoom,
    navigateBack,
    getCurrentTitle,
    canGoBack,
    resetNavigation,
  } = useChatNavigation();

  const {
    isOpen: isOpenState,
    closeChat,
    openChatList,
    privateChatRoomData,
    tempChatRoomName,
  } = useChatUIStore();

  const privateChatRoomId = privateChatRoomData?.privateChatRoomId;
  const [isChatOptionOpen, setIsChatOptionOpen] = useState<boolean>(false); // 채팅 옵션 열림 여부
  const [activeTab, setActiveTab] = useState<ChatActiveTab>("chat"); // 현재 탭 상태
  const [notifications, setNotifications] =
    useState<Notification[]>(notificationMockData); // 알림 목록 상태

  // 채팅방별 메시지 상태 (채팅방 ID를 키로 하는 맵)
  const [chatMessages, setChatMessages] = useState<
    Record<number, PrivateChatMessage[]>
  >({});

  // 채팅방 목록 상태 (개인/스터디 혼용, 실시간 업데이트용)
  const [chatRoomsState, setChatRoomsState] = useState<
    (PrivateChatRoom | StudyChatRoom)[]
  >([]);
  const { data: studyChatRooms } = useGetStudyChatRoom({
    enabled: isOpenState,
  });
  console.log("스터디 채팅방 목록:", studyChatRooms);

  // 타입 가드 함수 정의
  const isPrivateChatRoom = (
    room: PrivateChatRoom | StudyChatRoom | undefined
  ): room is PrivateChatRoom => !!room && "privateChatRoomId" in room;
  const isStudyChatRoom = (
    room: PrivateChatRoom | StudyChatRoom | undefined
  ): room is StudyChatRoom => !!room && "studyChatRoomId" in room;

  // 현재 선택된 채팅방 정보 (네비게이션에서 가져오기)
  const currentChatRoom = navigationState.selectedChatRoom;
  // 타입 가드로 개인 채팅방인지 확인하여 ID 추출
  const currentChatRoomId = isPrivateChatRoom(currentChatRoom)
    ? currentChatRoom.privateChatRoomId
    : privateChatRoomId;

  // 개인 채팅방 목록 조회
  const {
    data: privateChatRooms,
    error: privateChatError,
    refetch: refetchPrivateChat,
  } = useGetPrivateChatRoom({
    enabled: isOpenState,
  });
  console.log("채팅방 목록:", privateChatRooms);

  // API에서 받은 초기 개인 채팅방 목록을 상태에 설정
  useEffect(() => {
    if (privateChatRooms) {
      setChatRoomsState(privateChatRooms);
    }
  }, [privateChatRooms]);

  // 개인 채팅방 메시지 조회 (현재 채팅방의 메시지를 조회)
  const { data: privateChatMessages, error: messagesError } =
    useGetPrivateChatRoomMessages(currentChatRoomId?.toString() || "", {
      enabled:
        isOpenState &&
        navigationState.currentView === "chatroom" &&
        !!currentChatRoomId,
    });

  console.log("개인 채팅방 목록:", privateChatRooms, privateChatError?.message);
  console.log("현재 채팅방 메시지:", privateChatMessages);
  console.log("메시지 에러:", messagesError);

  const webSocketUrl = "/ws-stomp";

  const { isConnected, subscribe, publish } = useWebSocket({
    url: webSocketUrl,
    enabled: isOpenState, // 채팅창이 열려있을 때만 연결
    onConnect: () => {
      console.log("채팅 WebSocket 연결됨 - URL:", webSocketUrl);
    },
    onDisconnect: () => {
      console.log("채팅 WebSocket 연결 해제됨 - URL:", webSocketUrl);
    },
    onError: (error) => {
      console.error("채팅 WebSocket 에러:", error);
      console.error("에러 발생 URL:", webSocketUrl);
    },
  });

  // WebSocket 연결 상태 로그
  console.log("WebSocket 연결 상태:", isConnected);

  // 채팅방 업데이트 공통 함수
  const updateChatRoom = <T extends PrivateChatRoom | StudyChatRoom>(
    prevRooms: (PrivateChatRoom | StudyChatRoom)[],
    updatedRoom: T,
    idKey: keyof T
  ) => {
    const existingRoomIndex = prevRooms.findIndex((room) => {
      return (
        idKey in room && room[idKey as keyof typeof room] === updatedRoom[idKey]
      );
    });

    if (existingRoomIndex >= 0) {
      // 기존 채팅방 업데이트 (최신 메시지, 시간 등)
      const updatedRooms = [...prevRooms];
      updatedRooms[existingRoomIndex] = {
        ...(updatedRooms[existingRoomIndex] as T),
        ...updatedRoom,
      } as T;
      return updatedRooms;
    } else {
      // 새로운 채팅방 추가
      return [updatedRoom, ...prevRooms];
    }
  };

  // 사용자 메시지 구독
  useEffect(() => {
    if (isConnected && subscribe) {
      // /user/sub/users 경로로 메시지 구독
      const chatRoomSubscription = subscribe<PrivateChatRoom | StudyChatRoom>(
        "/user/sub/chat-rooms",
        (message) => {
          console.log("받은 채팅방 업데이트: ", message);
          // 타입 가드로 메시지 타입 구분하여 공통 함수 호출
          if ("privateChatRoomId" in message) {
            // PrivateChatRoom 업데이트 처리
            setChatRoomsState((prevRooms) =>
              updateChatRoom(prevRooms, message, "privateChatRoomId")
            );
          } else {
            // StudyChatRoom 업데이트 처리
            setChatRoomsState((prevRooms) =>
              updateChatRoom(prevRooms, message, "studyChatRoomId")
            );
          }
        }
      );
      // /user/sub/errors로 에러메세지 구독
      const errorSubscription = subscribe("/user/sub/errors", (message) => {
        console.log("받은 사용자 메시지: ", message);
        // TODO: 받은 메시지를 채팅 상태에 추가하는 로직 구현
        // 예: setChatMessages(prev => [...prev, message]);
      });

      // 컴포넌트 언마운트 시 구독 해제
      return () => {
        if (chatRoomSubscription) {
          chatRoomSubscription.unsubscribe();
          errorSubscription?.unsubscribe();
        }
      };
    }
  }, [isConnected, subscribe]);

  // 특정 채팅방 구독 (현재 채팅방 또는 MessageToLeaderButton에서 진입한 경우)
  useEffect(() => {
    if (
      isConnected &&
      navigationState.currentView === "chatroom" &&
      currentChatRoomId
    ) {
      const subscription = subscribe<PrivateChatMessage>(
        `/sub/private-chat-rooms/${currentChatRoomId}`,
        (message) => {
          console.log("채팅방 메시지 수신:", message);

          try {
            // // 받은 메시지를 해당 채팅방의 메시지 목록에 추가
            setChatMessages((prev) => ({
              ...prev,
              [currentChatRoomId]: [
                ...(prev[currentChatRoomId] || []),
                message,
              ],
            }));
            console.log(chatMessages);
          } catch (error) {
            console.error("메시지 파싱 오류:", error);
          }
        }
      );

      return () => {
        if (subscription) {
          subscription.unsubscribe();
        }
      };
    }
  }, [
    isConnected,
    navigationState.currentView,
    currentChatRoomId,
    subscribe,
    chatMessages,
  ]);

  // 채팅방 검색 기능
  // 전체 채팅방 목록(개인+스터디)으로 검색
  const {
    isSearchMode,
    searchQuery,
    filteredRooms,
    toggleSearchMode,
    handleSearchChange,
    clearSearch,
  } = useSearchChat(chatRoomsState);

  // 검색 입력창 ref
  const searchInputRef = useRef<HTMLInputElement>(null);

  // 검색 모드 활성화 시 자동 포커스
  useEffect(() => {
    if (isSearchMode && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isSearchMode]);

  // privateChatRoomData가 세팅되면 바로 chatroom으로 이동
  useEffect(() => {
    if (isOpenState && privateChatRoomData) {
      // privateChatRoomData가 있으면 해당 채팅방으로 직접 이동
      console.log("privateChatRoomData:", privateChatRoomData);
      console.log("tempChatRoomName:", tempChatRoomName);

      // PrivateChatRoom 형태로 변환하여 채팅방으로 이동
      const privateChatRoom: PrivateChatRoom = {
        privateChatRoomId: privateChatRoomData.privateChatRoomId,
        chatName:
          tempChatRoomName || `채팅방 ${privateChatRoomData.privateChatRoomId}`,
        lastMessage: "",
        lastMessageAt: new Date().toISOString(),
        unreadCnt: 0,
      };

      navigateToChatRoom(privateChatRoom);
    }
  }, [isOpenState, privateChatRoomData, tempChatRoomName, navigateToChatRoom]);

  // FAB 버튼 클릭 시 채팅창 토글
  const onButtonClick = () => {
    if (!isOpenState) {
      openChatList(); // 채팅 목록만 열기
      resetNavigation();
    } else {
      closeChat();
    }
  };

  // 탭 변경
  const onTabChange = (tab: ChatActiveTab) => {
    setActiveTab(tab);
  };

  // 채팅방 클릭 시 해당 채팅방으로 진입 (ChatRoom 타입 처리)
  const handleChatItemClick = (item: {
    type: "private" | "study";
    data: PrivateChatRoom | StudyChatRoom;
  }) => {
    console.log("채팅방 클릭:", item);

    // 선택된 채팅방으로 이동하여 채팅창 열기
    navigateToChatRoom(item.data);
  };

  // 알림을 읽음 상태로 변경
  const markNotificationAsRead = (notificationId: string) => {
    setNotifications((prev) =>
      prev.map((notification) =>
        notification.id === notificationId
          ? { ...notification, isRead: true }
          : notification
      )
    );
  };

  // 알림 타입별 액션 처리
  const handleNotificationAction = (notification: Notification) => {
    switch (notification.type) {
      case "study":
        console.log("스터디 관련 페이지로 이동:", notification.title);
        // TODO: 스터디 상세 페이지로 라우팅
        break;
      case "chat":
        console.log("채팅방으로 이동:", notification.title);
        // TODO: 해당 채팅방으로 이동
        break;
      case "system":
        console.log("시스템 설정 페이지로 이동:", notification.title);
        // TODO: 시스템 설정 페이지로 라우팅
        break;
      default:
        console.log("알림 확인:", notification.title);
    }
  };

  // 알림 클릭 핸들러
  const handleNotificationClick = (notification: Notification) => {
    // 읽지 않은 알림인 경우에만 읽음 처리
    if (!notification.isRead) {
      markNotificationAsRead(notification.id);
    }

    // 알림 타입별 액션 실행
    handleNotificationAction(notification);
  };

  // 알림 삭제 핸들러
  const handleDeleteNotification = (notificationId: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== notificationId));
  };

  // 미읽은 메시지 및 알림 개수 계산 (추후 api 구현)
  const getUnreadCounts = () => {
    const unreadChatCount = 0; // TODO: 실제 API로 미읽은 메시지 개수 조회
    const unreadNotificationCount = notifications.filter(
      (notification) => !notification.isRead
    ).length;

    return { unreadChatCount, unreadNotificationCount };
  };

  const getTotalUnreadCount = () => {
    const { unreadChatCount, unreadNotificationCount } = getUnreadCounts();
    return unreadChatCount + unreadNotificationCount;
  };

  // 채팅방 타입에 따른 데이터 선택
  const getCurrentChatData = () => {
    if (!currentChatRoomId) return [];

    // API에서 받은 메시지 데이터가 있으면 사용, 없으면 실시간 메시지 사용
    const apiMessages = privateChatMessages?.content || [];
    const realtimeMessages = chatMessages[currentChatRoomId] || [];

    // API 메시지와 실시간 메시지를 합쳐서 반환 (PrivateChatMessage 형태로 통일)
    const allMessages = [
      ...apiMessages, // 이미 PrivateChatMessage 형태
      ...realtimeMessages.map((msg, index) => ({
        privateChatMessageId: Date.now() + index, // 임시 ID
        message: typeof msg === "string" ? msg : msg.message || "",
        messageCreatedAt:
          typeof msg === "string"
            ? new Date().toISOString()
            : msg.messageCreatedAt || new Date().toISOString(),
        userId: typeof msg === "string" ? 0 : msg.userId || 0,
        nickname: typeof msg === "string" ? "" : msg.nickname || "",
      })),
    ];

    return allMessages;
  };

  const onDotClick = () => {
    setIsChatOptionOpen(true);
  };

  const onChatOutClick = () => {
    openModal(CHAT_DELETE_CONFIRM_MODAL_KEY);
  };

  const onChatPinClick = () => {
    openModal(CHAT_STATIC_SORT_CONFIRM_MODAL_KEY);
  };

  const handleBack = () => {
    // privateChatRoomData(즉, MessageToLeaderButton 진입)으로 들어온 경우엔 무조건 초기화
    if (privateChatRoomData && navigationState.currentView === "chatroom") {
      resetNavigation();
    } else {
      navigateBack();
    }
  };

  const renderCurrentView = () => {
    switch (navigationState.currentView) {
      case "list":
        return (
          <div className="flex flex-col gap-3 p-2">
            {/* 채팅방 검색 */}
            {isSearchMode && (
              <div className="px-2">
                <SearchChatInput
                  ref={searchInputRef}
                  value={searchQuery}
                  onChange={handleSearchChange}
                  onClear={clearSearch}
                  className="w-full"
                />
              </div>
            )}

            {/* 채팅방 목록 */}
            {activeTab === "chat" && (
              <>
                {privateChatError ? (
                  <ChatErrorState
                    errorMessage={privateChatError.message}
                    onRetry={handleRetry}
                  />
                ) : (
                  <div className="flex flex-col gap-3 p-2">
                    <ChatItem
                      privateChatRooms={
                        isSearchMode && searchQuery
                          ? filteredRooms.filter(isPrivateChatRoom)
                          : chatRoomsState.filter(isPrivateChatRoom)
                      }
                      studyChatRooms={
                        isSearchMode && searchQuery
                          ? filteredRooms.filter(isStudyChatRoom)
                          : chatRoomsState.filter(isStudyChatRoom)
                      }
                      onItemClick={handleChatItemClick}
                      onDotClick={onDotClick}
                    />
                  </div>
                )}
              </>
            )}

            {/* 알림 리스트 */}
            {activeTab === "notification" && (
              <NotificationList
                notifications={notifications}
                onItemClick={handleNotificationClick}
                onDelete={handleDeleteNotification}
              />
            )}
          </div>
        );

      case "chatroom":
        return <ChatRoom data={getCurrentChatData()} />;

      default:
        return null;
    }
  };

  // 메시지 전송 핸들러
  const handleSendMessage = (message: string) => {
    if (!isConnected || !publish) {
      console.warn("WebSocket이 연결되지 않았습니다.");
      return;
    }

    if (!currentChatRoomId) {
      console.warn("채팅방 ID가 없습니다.");
      return;
    }

    // 현재 채팅방에 따라 적절한 destination 설정
    const destination = `/pub/private-chat-rooms/${currentChatRoomId}/messages`;

    // 메시지 객체 생성
    const messageData = {
      message: message,
    };

    console.log("메시지 발행:", destination, messageData);

    // WebSocket을 통해 메시지 발행
    publish(destination, JSON.stringify(messageData));
  };

  // 재시도 함수
  const handleRetry = () => {
    refetchPrivateChat();
  };

  // 로그인하지 않은 경우 채팅창을 렌더링하지 않음
  if (!isLoggedIn) {
    return null;
  }

  return (
    <>
      {/* 채팅창 카드 */}
      {isOpenState && (
        <Card className="chat fixed bottom-24 right-5 flex h-[600px] w-96 overflow-hidden rounded-3xl bg-white/90 p-0 text-white shadow-lg backdrop-blur">
          {/* 헤더 영역 */}
          <Card.Header className="flex items-center justify-between rounded-t-3xl p-4 text-xl font-semibold text-black">
            {/* 뒤로가기 버튼 */}
            {canGoBack() && (
              <i
                className="bi bi-arrow-left cursor-pointer"
                role="button"
                onClick={handleBack}
              />
            )}
            <Typography.SubTitle1>{getCurrentTitle()}</Typography.SubTitle1>
            <div className="flex items-center gap-2">
              {/* 검색 아이콘 (리스트 화면에서만 표시) */}
              <SearchChatIcon
                onClick={toggleSearchMode}
                isVisible={
                  navigationState.currentView === "list" && activeTab === "chat"
                }
                isActive={isSearchMode}
              />
              {/* 닫기 버튼 */}
              <i
                className="bi bi-x cursor-pointer text-[28px]"
                role="button"
                onClick={closeChat}
              />
            </div>
          </Card.Header>

          {/* 컨텐츠 영역 */}
          <Card.Content className="h-full max-h-[480px] overflow-y-auto">
            {renderCurrentView()}
          </Card.Content>

          {/* 푸터 영역: 채팅 입력창 또는 탭 전환 */}
          <Card.Footer className="rounded-b-3xl">
            {navigationState.currentView === "chatroom" ? (
              <ChatInput onSendMessage={handleSendMessage} />
            ) : (
              navigationState.currentView === "list" && (
                <ChatTab
                  active={activeTab}
                  onChange={onTabChange}
                  unreadChatCount={getUnreadCounts().unreadChatCount}
                  unreadNotificationCount={
                    getUnreadCounts().unreadNotificationCount
                  }
                />
              )
            )}
            {
              <>
                <div
                  className={clsx(
                    "absolute top-0 size-full cursor-pointer rounded-3xl  ",
                    isChatOptionOpen ? "flex bg-black/20" : "hidden"
                  )}
                  onClick={() => setIsChatOptionOpen(false)}
                />
                <ul
                  className={clsx(
                    "absolute  z-10 flex h-20 w-full flex-col justify-center gap-2 rounded-b-3xl rounded-t-2xl bg-white  px-4 transition-all duration-300 ease-in-out",
                    isChatOptionOpen ? "bottom-0 border-t" : "-bottom-20"
                  )}
                >
                  <li
                    className=" cursor-pointer text-mos-gray-500"
                    onClick={onChatPinClick}
                  >
                    <Typography.P3>고정</Typography.P3>
                  </li>
                  <li
                    className="cursor-pointer text-red-500  transition-all"
                    onClick={onChatOutClick}
                  >
                    <Typography.P3>채팅방 나가기</Typography.P3>
                  </li>
                </ul>
              </>
            }
          </Card.Footer>
        </Card>
      )}

      {/* 채팅창 열기 버튼 (FAB) */}
      <div
        className={cn(
          "chat fixed bottom-5 right-5 flex text-white transition-opacity hover:opacity-100",
          isOpenState ? "opacity-100" : "opacity-60"
        )}
        onClick={onButtonClick}
        aria-label={isOpenState ? "채팅창 닫기" : "채팅창 열기"}
        role="button"
      >
        <div className="relative rounded-full border-4 border-white bg-mos-main px-4 py-3 shadow-md">
          <i
            className={clsx(
              "bi text-2xl",
              isOpenState ? "bi-x" : "bi-chat-square-dots-fill"
            )}
          />
          {/* 미읽은 메시지/알림 표시 dot */}
          {getTotalUnreadCount() > 0 && !isOpenState && (
            <div className="absolute -right-1 -top-1 size-3 rounded-full border-2 border-white bg-red-500" />
          )}
        </div>
      </div>
      <ActionConfirmModal
        type="danger"
        title="채팅방 나가기"
        content="정말 채팅방을 나가시겠습니까?"
        buttonLabel="나가기"
        isOpen={modal.get(CHAT_DELETE_CONFIRM_MODAL_KEY)!}
        onClose={() => closeModal(CHAT_DELETE_CONFIRM_MODAL_KEY)}
        onClick={() => {
          setIsChatOptionOpen(false);
          console.log("opne");
        }}
      />
      <ActionConfirmModal
        type="action"
        title="채팅방 고정"
        content="채팅방을 고정하시겠습니까?"
        buttonLabel="고정하기"
        isOpen={modal.get(CHAT_STATIC_SORT_CONFIRM_MODAL_KEY)!}
        onClose={() => closeModal(CHAT_STATIC_SORT_CONFIRM_MODAL_KEY)}
        onClick={() => {
          setIsChatOptionOpen(false);
          console.log("opne");
        }}
      />
    </>
  );
};

export default Chat;
