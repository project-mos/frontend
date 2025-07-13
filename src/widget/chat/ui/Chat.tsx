"use client";

import {
  chatMockData,
  chatRoomMockData,
  chatUserMockData,
  ChatRoomPreview,
  ChatUser,
} from "@/entities/chat/lib/mock/chat.mock";
import { ChatActiveTab } from "@/features/chat/ui/chat.ui.types";
import ChatInput from "@/features/chat/ui/ChatInput";
import ChatItem from "@/features/chat/ui/ChatItem";
import ChatRoom from "@/features/chat/ui/ChatRoom";
import ChatTab from "@/features/chat/ui/ChatTab";
import ChatUserItem from "@/features/chat/ui/ChatUserItem";

import Card from "@/shared/components/atoms/Card";
import Typography from "@/shared/components/atoms/Typography";
import ActionConfirmModal from "@/shared/components/molecules/ActionConfirmModal";
import useMultiModal from "@/shared/hooks/useMultiModal";
import cn from "@/shared/utils/cn";

import clsx from "clsx";
import React, { MouseEvent, useState } from "react";

const CHAT_DELETE_CONFIRM_MODAL_KEY = "chat_delete_confirm";
const CHAT_STATIC_SORT_CONFIRM_MODAL_KEY = "chat_static_sort_confirm";

const Chat = () => {
  const { modal, openModal, closeModal } = useMultiModal();

  const [isOpenState, setIsOpenState] = useState<boolean>(false); // 채팅창 열림 여부
  const [isChatOptionOpen, setIsChatOptionOpen] = useState<boolean>(false); // 채팅 옵션 열림 여부
  const [isChatRoom, setIsChatRoomState] = useState<boolean>(false); // 현재 채팅방에 들어가 있는지 여부
  const [activeTab, setActiveTab] = useState<ChatActiveTab>("chat"); // 현재 탭 상태
  const [selectItem, setSelectItem] = useState<ChatRoomPreview>(); // 선택한 채팅방 정보

  // 헤더 타이틀 설정
  const title =
    isChatRoom && selectItem
      ? selectItem.user.name
      : activeTab === "chat"
      ? "채팅방"
      : activeTab === "user" && "유저";

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
    setActiveTab("user");
    setSelectItem(item);
  };

  // 유저와 채팅 시작
  const onChatStart = (user: ChatUser) => {
    // 채팅방으로 이동하고 선택한 유저 정보 저장(미리 생성)
    const userChatRoom: ChatRoomPreview = {
      roomId: `chat-${user.id}`,
      user: {
        id: user.id,
        name: user.name,
        avatarUrl: user.avatarUrl,
      },
      lastMessage: {
        content: "",
        type: "text",
        timestamp: new Date().toISOString(),
      },
      unreadCount: 0,
    };

    setSelectItem(userChatRoom);
    setIsChatRoomState(true);
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
            {/* 닫기 버튼 */}
            <i
              className="bi bi-x text-[28px]"
              role="button"
              onClick={onButtonClick}
            />
          </Card.Header>

          {/* 컨텐츠 영역 */}
          <Card.Content className="h-full max-h-[480px] overflow-y-auto">
            {isChatRoom ? (
              <ChatRoom
                data={
                  selectItem?.roomId.startsWith("chat-") ? [] : chatMockData
                }
              /> // 새로운 채팅방이면 빈 배열, 기존 채팅방이면 기존 데이터
            ) : (
              <div className="flex flex-col gap-3 p-2">
                {/* 채팅방 리스트 */}
                {activeTab === "chat" &&
                  chatRoomMockData.map((item, index) => (
                    <ChatItem
                      item={item}
                      key={`${item.roomId}_${index}`}
                      onClick={() => onChatListClick(item)}
                      onDotClick={(event) => {
                        onDotClick(event, item);
                      }}
                    />
                  ))}
                {/* 유저 탭 */}
                {activeTab === "user" && (
                  <>
                    {chatUserMockData.map((user, index) => (
                      <ChatUserItem
                        key={`${user.id}_${index}`}
                        user={user}
                        onChatStart={onChatStart}
                      />
                    ))}
                  </>
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
              isOpenState ? "bi-x" : "bi-chat-dots"
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
