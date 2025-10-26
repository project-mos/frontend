"use client";

import {
  GetPrivateChatRoomMessagesResponse,
  GetStudyChatRoomMessagesResponse,
  PrivateChatMessage,
  PrivateChatRoom,
  StudyChatMessage,
  StudyChatRoom,
} from "@/entities/chat/api/chat.api.types";
import { useChatNavigation } from "@/features/chat-navigation/model/useChatNavigation";
import {
  ChatErrorState,
  ChatInput,
  ChatItem,
  ChatRoom,
  ChatTab,
  ChatTypeSwitch,
} from "@/features/chat/ui";
import {
  ChatActiveTab,
  ChatRoomType,
  ChatType,
} from "@/features/chat/ui/chat.ui.types";
import NotificationList from "@/features/notification/ui/NotificationList";

import { useSearchChat } from "@/features/search-chat/model/useSearchChat";
import { SearchChatIcon, SearchChatInput } from "@/features/search-chat/ui";
import Card from "@/shared/components/atoms/Card";
import Typography from "@/shared/components/atoms/Typography";
import ActionConfirmModal from "@/shared/components/molecules/ActionConfirmModal";
import useMultiModal from "@/shared/hooks/useMultiModal";
import cn from "@/shared/utils/cn";

import { useDeletePrivateChatRoom } from "@/entities/chat/model/chat.queries";
import { useChatUIStore } from "@/shared/store/useChatUIStore";
import clsx from "clsx";
import { useEffect, useRef, useState } from "react";

import { useAuthStore } from "@/entities/auth/model/auth.store";
import { getNotifications } from "@/entities/notification/api/notification.api";
import { INotification } from "@/entities/notification/api/notification.api.type";
import useChatWebSocket from "@/features/chat/model/useChatWebSocket";
import { InfiniteData } from "@tanstack/react-query";

const CHAT_DELETE_CONFIRM_MODAL_KEY = "chat_delete_confirm";

const Chat = () => {
  const { modal, openModal, closeModal } = useMultiModal();

  const { isLoggedIn } = useAuthStore();

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

  const deletePrivateChatRoomMutation = useDeletePrivateChatRoom();

  // ============================================================================
  // 상태
  // ============================================================================
  const privateChatRoomId = privateChatRoomData?.privateChatRoomId;
  const [isChatOptionOpen, setIsChatOptionOpen] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<ChatActiveTab>("chat");
  const [notifications, setNotifications] = useState<INotification[]>([]);
  const [selectedChatRoom, setSelectedChatRoom] = useState<ChatRoomType | null>(
    null
  );
  const [chatType, setChatType] = useState<ChatType>("private");
  const searchInputRef = useRef<HTMLInputElement>(null);

  // ============================================================================
  // 타입 가드 함수
  // ============================================================================
  const isPrivateChatRoom = (
    room: PrivateChatRoom | StudyChatRoom | undefined
  ): room is PrivateChatRoom => !!room && "privateChatRoomId" in room;
  const isStudyChatRoom = (
    room: PrivateChatRoom | StudyChatRoom | undefined
  ): room is StudyChatRoom => !!room && "studyChatRoomId" in room;

  // ============================================================================
  // 계산된 값
  // ============================================================================
  const currentChatRoom = navigationState.selectedChatRoom;
  const currentChatRoomId = isPrivateChatRoom(currentChatRoom)
    ? currentChatRoom.privateChatRoomId
    : isStudyChatRoom(currentChatRoom)
    ? currentChatRoom.studyChatRoomId
    : privateChatRoomId;

  const {
    chatRoomsState,
    privateChatMessages,
    studyChatMessages,
    isConnected,
    privateChatError,
    publish,
    refetchPrivateChat,
    getPrivateChatRoomMessages,
    getStudyChatRoomMessages,
  } = useChatWebSocket({
    isOpenState,
    currentView: navigationState.currentView,
    currentChatRoomId,
    chatType: chatType,
    isLoggedIn,
  });

  // ============================================================================
  // 검색 관련
  // ============================================================================
  const {
    isSearchMode,
    searchQuery,
    filteredPrivateRooms,
    filteredStudyRooms,
    toggleSearchMode,
    handleSearchChange,
    clearSearch,
  } = useSearchChat(chatRoomsState, chatType);

  // ============================================================================
  // 이펙트
  // ============================================================================
  // 검색 모드 활성화 시 자동 포커스
  useEffect(() => {
    if (isSearchMode && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isSearchMode]);

  // privateChatRoomData가 세팅되면 바로 chatroom으로 이동
  useEffect(() => {
    if (isOpenState && privateChatRoomData) {
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

  // ============================================================================
  // 이벤트 핸들러
  // ============================================================================
  const onButtonClick = () => {
    if (!isOpenState) {
      openChatList();
      resetNavigation();
    } else {
      closeChat();
    }
  };

  const onTabChange = (tab: ChatActiveTab) => {
    setActiveTab(tab);
  };

  const handleChatTypeChange = (type: ChatType) => {
    setChatType(type);
  };

  const handleChatItemClick = (item: ChatRoomType) => {
    console.log("채팅방 클릭:", item);
    navigateToChatRoom(item.data);
  };

  const onDotClick = (item: ChatRoomType) => {
    console.log("채팅방 옵션 클릭:", item);
    setIsChatOptionOpen(true);
    setSelectedChatRoom(item);
  };

  const onChatOutClick = () => {
    openModal(CHAT_DELETE_CONFIRM_MODAL_KEY);
  };

  const handleChatRoomDelete = (item: ChatRoomType | null) => {
    if (!item) {
      console.warn("채팅방 ID가 없습니다.");
      return;
    }

    if (isPrivateChatRoom(item.data)) {
      const id = item.data.privateChatRoomId;
      deletePrivateChatRoomMutation.mutate(`${id}`, {
        onSuccess: () => {
          console.log("채팅방 나가기 성공");
          resetNavigation();
        },
        onError: (error) => {
          console.error("채팅방 나가기 실패:", error);
        },
      });
    }
  };

  const handleBack = () => {
    if (privateChatRoomData && navigationState.currentView === "chatroom") {
      resetNavigation();
    } else {
      navigateBack();
    }
  };

  const handleRetry = () => {
    refetchPrivateChat();
  };

  const handleSendMessage = (message: string) => {
    if (!isConnected || !publish) {
      console.warn("WebSocket이 연결되지 않았습니다.");
      return;
    }

    if (!currentChatRoomId) {
      console.warn("채팅방 ID가 없습니다.");
      return;
    }
    const destination =
      chatType === "private"
        ? `/pub/private-chat-rooms/${currentChatRoomId}/messages`
        : `/pub/studies/chat-rooms/${currentChatRoomId}/messages`;

    const messageData = {
      message: message,
    };

    console.log("메시지 발행:", destination, messageData);
    publish(destination, JSON.stringify(messageData));
  };

  // ============================================================================
  // 알림 관련 함수
  // ============================================================================

  async function getNotificationsFunction() {
    const result = await getNotifications();
    setNotifications(result.notifications);
  }
  const markNotificationAsRead = (notificationId: number) => {
    setNotifications((prev) =>
      prev.map((notification) =>
        notification.notificationId === notificationId
          ? { ...notification, isRead: true }
          : notification
      )
    );
  };

  const handleNotificationAction = (notification: INotification) => {
    switch (notification.type) {
      case "study":
        console.log("스터디 관련 페이지로 이동:", notification.title);
        break;
      case "chat":
        console.log("채팅방으로 이동:", notification.title);
        break;
      case "system":
        console.log("시스템 설정 페이지로 이동:", notification.title);
        break;
      default:
        console.log("알림 확인:", notification.title);
    }
  };

  const handleNotificationClick = (notification: INotification) => {
    if (!notification.isRead) {
      markNotificationAsRead(notification.notificationId);
    }
    handleNotificationAction(notification);
  };

  const handleDeleteNotification = (notificationId: string) => {
    setNotifications((prev) =>
      prev.filter((n) => n.notificationId.toString() !== notificationId)
    );
  };

  useEffect(() => {
    if (isLoggedIn) getNotificationsFunction();
  }, [isLoggedIn]);

  // ============================================================================
  // 유틸리티 함수
  // ============================================================================
  const getUnreadCounts = () => {
    const unreadChatCount = 0;
    const unreadNotificationCount = notifications.filter(
      (notification) => !notification.isRead
    ).length;

    return { unreadChatCount, unreadNotificationCount };
  };

  const getTotalUnreadCount = () => {
    const { unreadChatCount, unreadNotificationCount } = getUnreadCounts();
    return unreadChatCount + unreadNotificationCount;
  };

  const getCurrentChatData = () => {
    if (!currentChatRoomId) return [];
    const apiData =
      chatType === "private"
        ? (getPrivateChatRoomMessages.data as
            | InfiniteData<GetPrivateChatRoomMessagesResponse>
            | undefined)
        : (getStudyChatRoomMessages.data as
            | InfiniteData<GetStudyChatRoomMessagesResponse>
            | undefined);
    const apiMessages =
      apiData?.pages.flatMap(
        (page) => page.content as (PrivateChatMessage | StudyChatMessage)[]
      ) || [];
    const realtimeMessages =
      chatType === "private"
        ? privateChatMessages[currentChatRoomId] || []
        : studyChatMessages[currentChatRoomId] || [];
    const allMessages = [...apiMessages, ...realtimeMessages];
    return allMessages;
  };

  // ============================================================================
  // 렌더링 함수
  // ============================================================================
  const renderCurrentView = () => {
    switch (navigationState.currentView) {
      case "list":
        return (
          <div className="flex flex-col gap-3 p-2">
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
                        chatType === "private"
                          ? isSearchMode && searchQuery
                            ? filteredPrivateRooms
                            : chatRoomsState.filter(isPrivateChatRoom)
                          : []
                      }
                      studyChatRooms={
                        chatType === "study"
                          ? isSearchMode && searchQuery
                            ? filteredStudyRooms
                            : chatRoomsState.filter(isStudyChatRoom)
                          : []
                      }
                      onItemClick={handleChatItemClick}
                      onDotClick={onDotClick}
                    />
                  </div>
                )}
              </>
            )}

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
        return (
          <ChatRoom
            data={getCurrentChatData()}
            onLoadMore={
              chatType === "private"
                ? getPrivateChatRoomMessages.fetchNextPage
                : getStudyChatRoomMessages.fetchNextPage
            }
            hasNextPage={
              chatType === "private"
                ? getPrivateChatRoomMessages.hasNextPage
                : getStudyChatRoomMessages.hasNextPage
            }
            isLoadingMore={
              chatType === "private"
                ? getPrivateChatRoomMessages.isLoading
                : getStudyChatRoomMessages.isLoading
            }
          />
        );

      default:
        return null;
    }
  };

  // ============================================================================
  // 메인 렌더링
  // ============================================================================
  if (!isLoggedIn) return null;
  return (
    <>
      {isOpenState && (
        <Card className="chat fixed bottom-24 right-5 flex h-[600px] w-96 overflow-hidden rounded-3xl bg-white/90 p-0 text-white shadow-lg backdrop-blur">
          <Card.Header className="flex items-center justify-between rounded-t-3xl p-4 text-xl font-semibold text-black">
            {canGoBack() && (
              <i
                className="bi bi-arrow-left cursor-pointer"
                role="button"
                onClick={handleBack}
              />
            )}
            <div className="flex items-center gap-3">
              <Typography.SubTitle1>{getCurrentTitle()}</Typography.SubTitle1>
              {navigationState.currentView === "list" &&
                activeTab === "chat" && (
                  <ChatTypeSwitch
                    chatType={chatType}
                    onChatTypeChange={handleChatTypeChange}
                  />
                )}
            </div>
            <div className="flex items-center gap-2">
              <SearchChatIcon
                onClick={toggleSearchMode}
                isVisible={
                  navigationState.currentView === "list" && activeTab === "chat"
                }
                isActive={isSearchMode}
              />
              <i
                className="bi bi-x cursor-pointer text-[28px]"
                role="button"
                onClick={closeChat}
              />
            </div>
          </Card.Header>

          <Card.Content className="h-full max-h-[480px] overflow-y-auto">
            {renderCurrentView()}
          </Card.Content>

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
          handleChatRoomDelete(selectedChatRoom);
          closeModal(CHAT_DELETE_CONFIRM_MODAL_KEY);
        }}
      />
    </>
  );
};

export default Chat;
