"use client";

import {
  chatMockData,
  chatRoomMockData,
  ChatRoomPreview,
  personalChatMockData,
  groupChatMockData,
  inquiryChatMockData,
  studyInquiryMockData,
} from "@/entities/chat/lib/mock/chat.mock";
import { useChatNavigation } from "@/features/chat-navigation/model/useChatNavigation";
import StudyInquiryList from "@/features/study-inquiry/ui/StudyInquiryList";
import {
  notificationMockData,
  Notification,
} from "@/entities/notification/lib/mock/notification.mock";
import { ChatActiveTab } from "@/features/chat/ui/chat.ui.types";
import NotificationList from "@/features/notification/ui/NotificationList";
import ChatInput from "@/features/chat/ui/ChatInput";
import ChatItem from "@/features/chat/ui/ChatItem";
import ChatRoom from "@/features/chat/ui/ChatRoom";
import ChatTab from "@/features/chat/ui/ChatTab";

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

const CHAT_DELETE_CONFIRM_MODAL_KEY = "chat_delete_confirm";
const CHAT_STATIC_SORT_CONFIRM_MODAL_KEY = "chat_static_sort_confirm";

const Chat = () => {
  const { modal, openModal, closeModal } = useMultiModal();
  const {
    navigationState,
    navigateToStudyInquiry,
    navigateToChatRoom,
    navigateBack,
    getCurrentTitle,
    canGoBack,
    resetNavigation,
  } = useChatNavigation();

  const {
    isOpen: isOpenState,
    closeChat,
    openChat,
    targetChatRoom,
  } = useChatUIStore();
  const [isChatOptionOpen, setIsChatOptionOpen] = useState<boolean>(false); // 채팅 옵션 열림 여부
  const [activeTab, setActiveTab] = useState<ChatActiveTab>("chat"); // 현재 탭 상태
  const [notifications, setNotifications] =
    useState<Notification[]>(notificationMockData); // 알림 목록 상태

  // 채팅방 검색 기능
  const {
    isSearchMode,
    searchQuery,
    filteredRooms,
    toggleSearchMode,
    handleSearchChange,
    clearSearch,
  } = useSearchChat(chatRoomMockData);

  // 검색 입력창 ref
  const searchInputRef = useRef<HTMLInputElement>(null);

  // 검색 모드 활성화 시 자동 포커스
  useEffect(() => {
    if (isSearchMode && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isSearchMode]);

  // targetChatRoom이 세팅되면 바로 chatroom으로 이동
  useEffect(() => {
    if (isOpenState && targetChatRoom) {
      navigateToChatRoom(targetChatRoom);
    }
  }, [isOpenState, targetChatRoom]);

  // FAB 버튼 클릭 시 채팅창 토글
  const onButtonClick = () => {
    if (!isOpenState) {
      openChat(undefined); // 채팅창만 열고, 채팅방 진입은 안함
      resetNavigation();
    } else {
      closeChat();
    }
  };

  // 탭 변경
  const onTabChange = (tab: ChatActiveTab) => {
    setActiveTab(tab);
  };

  // 채팅방 클릭 시 해당 채팅방으로 진입
  const handleChatItemClick = (item: ChatRoomPreview) => {
    if (item.roomType === "study-inquiry") {
      navigateToStudyInquiry(studyInquiryMockData);
    } else {
      navigateToChatRoom(item);
    }
  };

  // 스터디 문의 사용자 클릭 시 채팅방으로 진입
  const handleInquiryClick = (roomId: string) => {
    // roomId를 기반으로 채팅방 데이터 생성(임시)
    const chatData: ChatRoomPreview = {
      roomId,
      roomType: "personal",
      user: {
        id: "user-jaehyun",
        name: "이재현",
        avatarUrl:
          "https://ui-avatars.com/api/?name=이재현&background=fd7e14&color=fff&size=40",
      },
      lastMessage: {
        content: "과제 제출 방법이 궁금해요",
        type: "text",
        timestamp: "2025-04-18T16:30:00Z",
      },
      unreadCount: 2,
    };
    navigateToChatRoom(chatData);
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
    const unreadChatCount = chatRoomMockData.reduce(
      (total, room) => total + room.unreadCount,
      0
    );
    const unreadNotificationCount = notifications.filter(
      (notification) => !notification.isRead
    ).length;

    return { unreadChatCount, unreadNotificationCount };
  };

  const getTotalUnreadCount = () => {
    const { unreadChatCount, unreadNotificationCount } = getUnreadCounts();
    return unreadChatCount + unreadNotificationCount;
  };

  // 채팅방 타입에 따른 mock data 선택
  const getCurrentChatData = () => {
    if (!navigationState.selectedChatRoom) return chatMockData;

    switch (navigationState.selectedChatRoom.roomType) {
      case "personal":
        return personalChatMockData;
      case "group":
        return groupChatMockData;
      case "inquiry":
        return inquiryChatMockData;
      default:
        return chatMockData;
    }
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
    // targetChatRoom(즉, MessageToLeaderButton 진입)으로 들어온 경우엔 무조건 초기화
    if (targetChatRoom && navigationState.currentView === "chatroom") {
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
              <div className="flex flex-col gap-3 p-2">
                {(isSearchMode ? filteredRooms : chatRoomMockData).map(
                  (item, index) => (
                    <ChatItem
                      item={item}
                      key={`${item.roomId}_${index}`}
                      onClick={() => handleChatItemClick(item)}
                      onDotClick={onDotClick}
                    />
                  )
                )}
              </div>
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

      case "study-inquiry":
        return (
          <StudyInquiryList
            inquiries={navigationState.selectedStudy!.inquiries}
            onInquiryClick={handleInquiryClick}
          />
        );

      case "chatroom":
        return <ChatRoom data={getCurrentChatData()} />;

      default:
        return null;
    }
  };

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
                className="bi bi-x text-[28px] cursor-pointer"
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
              <ChatInput />
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
            <div className="absolute -top-1 -right-1 size-3 rounded-full bg-red-500 border-2 border-white" />
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
