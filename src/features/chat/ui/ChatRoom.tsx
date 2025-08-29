import { ChatRoomProps } from "@/features/chat/ui/chat.ui.types";
import ChatBubble from "@/features/chat/ui/ChatBubble";
import Badge from "@/shared/components/atoms/Badge";
import Button from "@/shared/components/atoms/Button";
import { useChatRoom } from "@/features/chat/model/useChatRoom";
import useDecodeToken from "@/shared/hooks/useDecodeToken";
import {
  PrivateChatMessage,
  StudyChatMessage,
} from "@/entities/chat/api/chat.api.types";

import React from "react";

const ChatRoom = ({
  data,
  hasNextPage = false,
  onLoadMore,
  isLoadingMore = false,
}: ChatRoomProps) => {
  const { showDateBadge, currentDate, scrollContainerRef } = useChatRoom({
    data,
  });

  // 메시지 ID 추출 함수
  const getMessageId = (
    item: PrivateChatMessage | StudyChatMessage
  ): number => {
    if ("privateChatMessageId" in item) {
      return item.privateChatMessageId;
    } else {
      return item.studyChatMessageId;
    }
  };

  const sortingData = data.sort((a, b) => getMessageId(a) - getMessageId(b)); // ID 기준 오름차순 정렬

  // 현재 사용자 정보 가져오기
  const currentUser = useDecodeToken();

  return (
    <div className="relative h-full">
      {/* 날짜 뱃지 - position으로 띄움 */}
      <div
        className="absolute left-1/2 top-2 z-10 -translate-x-1/2 opacity-0 transition-all duration-1000 data-[show=true]:opacity-100"
        data-show={showDateBadge}
      >
        <Badge color="Black" className="px-3 py-1 text-[12px]">
          {currentDate}
        </Badge>
      </div>

      {/* 채팅 메시지 리스트 */}
      <div
        ref={scrollContainerRef}
        className="flex h-full flex-col gap-3 overflow-y-auto px-2 pt-3"
      >
        {/* 더보기 버튼 - 채팅창 맨 위에 배치 */}
        {hasNextPage && (
          <div className="flex translate-x-1.5 justify-center">
            <Button.Solid
              onClick={onLoadMore}
              disabled={isLoadingMore}
              className="rounded-full bg-gray-100 px-3 py-1 text-[12px] text-gray-700 hover:bg-gray-200 disabled:cursor-not-allowed disabled:opacity-50"
              size="sm"
              color="Gray"
            >
              {isLoadingMore ? "로딩 중..." : "더보기"}
            </Button.Solid>
          </div>
        )}
        {sortingData // ID 기준 오름차순 정렬
          .map((item, index) => {
            // JSON 형태의 message를 파싱하여 실제 메시지 내용 추출
            let messageContent = item.message;
            try {
              const parsedMessage = JSON.parse(item.message);
              messageContent = parsedMessage.message || item.message;
            } catch {
              // JSON 파싱 실패 시 원본 메시지 사용
              messageContent = item.message;
            }

            // 챗 글자가 19자 이하이면 rounded 스타일로
            const isRoundedStyle = messageContent.length < 20;

            // 현재 사용자 ID와 메시지 작성자 ID 비교하여 isMe 결정
            const isMe = currentUser?.id === item.userId;

            return (
              <ChatBubble
                key={`${getMessageId(item)}_${index}`}
                isMe={isMe}
                profileImage="" // TODO: 필요에 따라 프로필 이미지 추가
                nickname={item.nickname}
                timestamp={item.messageCreatedAt}
                className={isRoundedStyle ? "rounded-full" : "rounded-xl"}
              >
                {messageContent}
              </ChatBubble>
            );
          })}
      </div>
    </div>
  );
};

export default ChatRoom;
