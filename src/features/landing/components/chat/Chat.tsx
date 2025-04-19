"use client";

import ChatInput from "@/features/landing/components/chat/ChatInput";
import ChatRoom from "@/features/landing/components/chat/ChatRoom";
import ChatTab from "@/features/landing/components/chat/ChatTab";
import Button from "@/shared/components/atoms/Button";
import Card from "@/shared/components/atoms/Card";
import Typography from "@/shared/components/atoms/Typography";
import cn from "@/shared/utils/cn";
import { formatDate } from "@/shared/utils/date";
import clsx from "clsx";
import React, { HTMLAttributes, useState } from "react";

// 탭 타입 정의
export type ActiveTab = "chat" | "notices" | "chatRoom";
type MessageType = "text" | "image" | "file";

// 채팅방 미리보기 타입
interface ChatRoomPreview {
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
const chatRoomMockData: ChatRoomPreview[] = [
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

const Chat = () => {
  const [isOpenState, setIsOpenState] = useState<boolean>(false); // 채팅창 열림 여부
  const [isChatRoom, setIsChatRoomState] = useState<boolean>(false); // 현재 채팅방에 들어가 있는지 여부
  const [activeTab, setActiveTab] = useState<ActiveTab>("chat"); // 현재 탭 상태
  const [selectItem, setSelectItem] = useState<ChatRoomPreview>(); // 선택한 채팅방 정보

  // 헤더 타이틀 설정
  const title =
    activeTab === "chat"
      ? "채팅방"
      : activeTab === "chatRoom"
      ? selectItem?.user.name
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
  const onTabChange = (tab: ActiveTab) => {
    setActiveTab(tab);
    setIsChatRoomState(false);
  };

  // 채팅방 클릭 시 해당 채팅방으로 진입
  const onChatListClick = (item: ChatRoomPreview) => {
    setIsChatRoomState(true);
    setActiveTab("chatRoom");
    setSelectItem(item);
  };

  return (
    <>
      {/* 채팅창 카드 */}
      {isOpenState && (
        <Card className="chat fixed bottom-24 right-5 flex h-[600px] w-96 rounded-3xl bg-white/90 p-0 text-white shadow-lg backdrop-blur">
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
              <ChatRoom /> // 채팅방 화면
            ) : (
              <div className="flex flex-col gap-3 p-2">
                {/* 채팅방 리스트 */}
                {activeTab === "chat" &&
                  chatRoomMockData.map((item, index) => (
                    <ChatItem
                      item={item}
                      key={`${item.roomId}_${index}`}
                      onClick={() => onChatListClick(item)}
                    />
                  ))}
                {/* 알림 탭 (미완성) */}
                {activeTab === "notices" && (
                  <div className="text-black">
                    <h3 className="mb-2 font-bold">알림</h3>
                    <p>알림 내용이 여기에 표시됩니다.</p>
                  </div>
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
    </>
  );
};

interface ChatItemProps extends HTMLAttributes<HTMLDivElement> {
  item: ChatRoomPreview;
}

// 채팅방 미리보기 아이템
const ChatItem = ({ item, ...props }: ChatItemProps) => {
  return (
    <div
      className="group flex cursor-pointer items-center justify-between gap-3 rounded-md p-2 text-black transition hover:bg-gray-100 active:bg-gray-200"
      {...props}
    >
      <div className="flex items-center gap-2">
        {/* 프로필 이미지 */}
        <div className="size-12 rounded-full bg-red-200" />
        <div className="flex flex-col">
          {/* 사용자 이름 + 시간 */}
          <div className="flex items-center gap-2">
            <Typography.P1 className="font-bold">
              {item.user.name}
            </Typography.P1>
            <Typography.P1 className="text-[12px] font-light text-gray-400">
              {formatDate("MM:DD", item.lastMessage.timestamp)}
            </Typography.P1>
          </div>
          {/* 최근 메시지 내용 */}
          <Typography.P1 className="text-[12px]">
            {item.lastMessage.content}
          </Typography.P1>
        </div>
      </div>

      {/* 옵션 버튼 (3 dots) */}
      <div className="mr-2">
        <Button.Icon color="Gray" className="border-none">
          <i className="bi bi-three-dots" />
        </Button.Icon>
      </div>
    </div>
  );
};

export default Chat;
