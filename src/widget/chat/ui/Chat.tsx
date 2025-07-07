"use client";

import {
  chatMockData,
  chatRoomMockData,
  ChatRoomPreview,
} from "@/entities/chat/lib/mock/chat.mock";
import { ChatActiveTab } from "@/features/chat/ui/chat.ui.types";
import ChatInput from "@/features/chat/ui/ChatInput";
import ChatItem from "@/features/chat/ui/ChatItem";
import ChatRoom from "@/features/chat/ui/ChatRoom";

import Card from "@/shared/components/atoms/Card";
import Typography from "@/shared/components/atoms/Typography";
import cn from "@/shared/utils/cn";

import clsx from "clsx";
import React, { MouseEvent, useState } from "react";

const Chat = () => {
  const [isOpenState, setIsOpenState] = useState<boolean>(false); // 채팅창 열림 여부
  const [isChatOptionOpen, setIsChatOptionOpen] = useState<boolean>(false); // 채팅 옵션 열림 여부
  const [isChatRoom, setIsChatRoomState] = useState<boolean>(false); // 현재 채팅방에 들어가 있는지 여부
  const [activeTab, setActiveTab] = useState<ChatActiveTab>("chat"); // 현재 탭 상태
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
  // const onTabChange = (tab: ActiveTab) => {
  //   setActiveTab(tab);
  //   setIsChatRoomState(false);
  // };

  // 채팅방 클릭 시 해당 채팅방으로 진입
  const onChatListClick = (item: ChatRoomPreview) => {
    setIsChatRoomState(true);
    setActiveTab("chatRoom");
    setSelectItem(item);
  };

  const onDotClick = (event: MouseEvent<HTMLButtonElement>) => {
    console.log(event);
    setIsChatOptionOpen(true);
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
              <ChatRoom data={chatMockData} /> // 채팅방 화면
            ) : (
              <div className="flex flex-col gap-3 p-2">
                {/* 채팅방 리스트 */}
                {
                  // activeTab === "chat" &&
                  chatRoomMockData.map((item, index) => (
                    <ChatItem
                      item={item}
                      key={`${item.roomId}_${index}`}
                      onClick={() => onChatListClick(item)}
                      onDotClick={onDotClick}
                    />
                  ))
                }
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
            {
              isChatRoom && <ChatInput />
              // : (
              //   <ChatTab active={activeTab} onChange={onTabChange} />
              // )}
            }
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
                  <li className=" cursor-pointer text-mos-gray-500">
                    <Typography.P3>고정</Typography.P3>
                  </li>
                  <li className="cursor-pointer text-red-500  transition-all">
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
    </>
  );
};

export default Chat;
