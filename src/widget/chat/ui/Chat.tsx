"use client";

import {
  chatMockData,
  chatRoomMockData,
  ChatRoomPreview,
} from "@/entities/chat/lib/mock/chat.mock";
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
import React, { MouseEvent, useState, useRef, useEffect } from "react";

const CHAT_DELETE_CONFIRM_MODAL_KEY = "chat_delete_confirm";
const CHAT_STATIC_SORT_CONFIRM_MODAL_KEY = "chat_static_sort_confirm";

const Chat = () => {
  const { modal, openModal, closeModal } = useMultiModal();

  const [isOpenState, setIsOpenState] = useState<boolean>(false); // 채팅창 열림 여부
  const [isChatOptionOpen, setIsChatOptionOpen] = useState<boolean>(false); // 채팅 옵션 열림 여부
  const [isChatRoom, setIsChatRoomState] = useState<boolean>(false); // 현재 채팅방에 들어가 있는지 여부
  const [activeTab, setActiveTab] = useState<ChatActiveTab>("chat"); // 현재 탭 상태
  const [selectItem, setSelectItem] = useState<ChatRoomPreview>(); // 선택한 채팅방 정보
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

  // 헤더 타이틀 설정
  const title =
    isChatRoom && selectItem
      ? selectItem.user.name
      : activeTab === "chat"
      ? "채팅방"
      : "알림";

  // FAB 버튼 클릭 시 채팅창 토글
  const onButtonClick = () => {
    setIsOpenState(!isOpenState);
  };

  // 채팅방 → 목록으로 돌아가기
  const onChatBackButtonClick = () => {
    setIsChatRoomState(false);
    setActiveTab("chat");
  };

  // 탭 변경
  const onTabChange = (tab: ChatActiveTab) => {
    setActiveTab(tab);
    setIsChatRoomState(false);
  };

  // 채팅방 클릭 시 해당 채팅방으로 진입
  const onChatListClick = (item: ChatRoomPreview) => {
    setIsChatRoomState(true);
    setSelectItem(item);
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

  const onDotClick = (
    event: MouseEvent<HTMLButtonElement>,
    item: ChatRoomPreview
  ) => {
    setIsChatOptionOpen(true);
    setSelectItem(item);
  };

  const onChatOutClick = () => {
    openModal(CHAT_DELETE_CONFIRM_MODAL_KEY);
  };

  const onChatPinClick = () => {
    openModal(CHAT_STATIC_SORT_CONFIRM_MODAL_KEY);
  };

  return (
    <>
      {/* 채팅창 카드 */}
      {isOpenState && (
        <Card className="chat fixed bottom-24 right-5 flex h-[600px] w-96 overflow-hidden rounded-3xl bg-white/90 p-0 text-white shadow-lg backdrop-blur">
          {/* 헤더 영역 */}
          <Card.Header className="flex items-center justify-between rounded-t-3xl p-4 text-xl font-semibold text-black">
            {/* 채팅방 안에 있을 경우 뒤로가기 버튼 표시 */}
            {isChatRoom && (
              <i
                className="bi bi-arrow-left"
                role="button"
                onClick={onChatBackButtonClick}
              />
            )}
            <Typography.SubTitle1>{title}</Typography.SubTitle1>
            <div className="flex items-center gap-2">
              {/* 검색 아이콘 (채팅 탭에서만 표시) */}
              <SearchChatIcon
                onClick={toggleSearchMode}
                isVisible={!isChatRoom && activeTab === "chat"}
                isActive={isSearchMode}
              />
              {/* 닫기 버튼 */}
              <i
                className="bi bi-x text-[28px]"
                role="button"
                onClick={onButtonClick}
              />
            </div>
          </Card.Header>

          {/* 컨텐츠 영역 */}
          <Card.Content className="h-full max-h-[480px] overflow-y-auto">
            {isChatRoom ? (
              <ChatRoom data={chatMockData} />
            ) : (
              <div className="flex flex-col gap-3 p-2">
                {/* 채팅방 리스트 */}
                {activeTab === "chat" && (
                  <div className="flex flex-col gap-3">
                    {/* 검색 입력창 */}
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
                    <div className="flex flex-col gap-3 p-2">
                      {(isSearchMode ? filteredRooms : chatRoomMockData).map(
                        (item, index) => (
                          <ChatItem
                            item={item}
                            key={`${item.roomId}_${index}`}
                            onClick={() => onChatListClick(item)}
                            onDotClick={(event) => {
                              onDotClick(event, item);
                            }}
                          />
                        )
                      )}
                    </div>
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
            )}
          </Card.Content>

          {/* 푸터 영역: 채팅 입력창 또는 탭 전환 */}
          <Card.Footer className="rounded-b-3xl">
            {isChatRoom ? (
              <ChatInput />
            ) : (
              <ChatTab active={activeTab} onChange={onTabChange} />
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
        <div className="rounded-full border-4 border-white bg-mos-main px-4 py-3 shadow-md">
          <i
            className={clsx(
              "bi text-2xl",
              isOpenState ? "bi-x" : "bi-chat-square-dots-fill"
            )}
          />
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
