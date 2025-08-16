"use client";
import { useChatUIStore } from "@/shared/store/useChatUIStore";
import { ChatRoomPreview } from "@/entities/chat/lib/mock/chat.mock";
import Button from "@/shared/components/atoms/Button";
import { Tooltip } from "@heroui/tooltip";
import { useGetPrivateChatRoomByUser } from "@/entities/chat/model/chat.queries";
import { GetPrivateChatRoomByUserResponse } from "@/entities/chat/api/chat.api.types";
import { useState } from "react";
import ActionConfirmModal from "@/shared/components/molecules/ActionConfirmModal";

interface MessageToLeaderButtonProps {
  chatRoomPreview: ChatRoomPreview;
  userId: string; // 사용자 ID 추가
}

const MessageToLeaderButton = ({
  chatRoomPreview,
  userId,
}: MessageToLeaderButtonProps) => {
  const openChat = useChatUIStore((s) => s.openChat);
  const [isLoading, setIsLoading] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  
  // 개인 채팅방 조회/생성 쿼리
  const { refetch: getPrivateChatRoom } = useGetPrivateChatRoomByUser(userId, {
    enabled: false, // 수동으로 호출하기 위해 비활성화
  });

  // 성공/실패 핸들러를 별도로 관리
  const handleSuccess = (response: GetPrivateChatRoomByUserResponse) => {
    console.log('개인 채팅방 조회/생성 성공:', response);
    // 채팅방 생성 후 채팅창 열기 (실제 채팅방 데이터도 함께 전달)
    openChat(chatRoomPreview, response);
    setIsLoading(false);
  };

  const handleError = (error: unknown) => {
    console.error('개인 채팅방 조회/생성 실패:', error);
    setErrorMessage('채팅방 생성에 실패했습니다. 다시 시도해주세요.');
    setShowErrorModal(true);
    setIsLoading(false);
  };

  // 버튼 클릭 핸들러
  const handleButtonClick = async () => {
    if (isLoading) return; // 중복 클릭 방지
    
    setIsLoading(true);
    
    try {
      // 개인 채팅방 조회/생성
      const result = await getPrivateChatRoom();
      if (result.data) {
        handleSuccess(result.data);
      }
    } catch (error) {
      handleError(error);
    }
  };

  // 에러 모달 닫기
  const handleCloseErrorModal = () => {
    setShowErrorModal(false);
    setErrorMessage("");
  };
  
  return (
    <>
      <Tooltip
        content="문의하기"
        className="rounded-md bg-mos-main-500 px-3 py-1.5 text-[14px] text-white shadow-md"
        placement="bottom"
      >
        <Button.Icon
          color="Main"
          className="flex-2 w-full"
          onClick={handleButtonClick}
          disabled={isLoading}
        >
          <i className={`bi ${isLoading ? 'bi-hourglass-split' : 'bi-chat-dots'} text-[14px]`} />
        </Button.Icon>
      </Tooltip>

      {/* 에러 모달 */}
      <ActionConfirmModal
        type="danger"
        title="채팅방 생성 실패"
        content={errorMessage}
        buttonLabel="확인"
        isOpen={showErrorModal}
        onClose={handleCloseErrorModal}
        onSuccess={handleCloseErrorModal}
      />
    </>
  );
};

export default MessageToLeaderButton;
