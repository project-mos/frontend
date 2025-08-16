import Button from "@/shared/components/atoms/Button";
import Textarea from "@/shared/components/atoms/Textarea";
import React, { useState } from "react";

interface ChatInputProps {
  onSendMessage?: (message: string) => void; // 메시지 전송 콜백 추가
}

const MIN_TEXTAREA_HEIGHT = 40; // 텍스트 영역의 최소 높이 (px)
const HEIGHT_PER_LINE = 24; // 한 줄당 높이 증가량 (px)
const MAX_LINES = 5; // 텍스트 영역의 최대 라인 수 (MIN_TEXTAREA_HEIGHT 포함)
const CHARS_PER_LINE = 32; // 한 줄에 들어가는 최대 문자 수 (줄바꿈 계산 기준)

const ChatInput = ({ onSendMessage }: ChatInputProps) => {
  // 현재 텍스트 영역의 라인 수를 추적합니다. (최소 높이 이후 추가되는 라인 수)
  const [extraLines, setExtraLines] = useState<number>(0);

  // 현재 입력된 메시지 상태를 관리합니다.
  const [message, setMessage] = useState<string>("");

  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const inputValue = event.target.value;
    setMessage(inputValue); // 메시지 상태 업데이트

    // 입력된 텍스트 길이를 기준으로 추가 라인 수를 계산합니다.
    // 최소 한 줄은 기본 높이로 처리되므로, 0보다 큰 경우에만 추가 라인으로 계산합니다.
    const calculatedExtraLines = Math.max(
      0,
      Math.ceil(inputValue.length / CHARS_PER_LINE) - 1
    );

    // 최대 라인 수를 초과하지 않도록 제한합니다.
    // MAX_LINES는 전체 라인 수이므로, extraLines는 MAX_LINES - 1을 넘을 수 없습니다.
    const newExtraLines = Math.min(calculatedExtraLines, MAX_LINES - 1);

    setExtraLines(newExtraLines);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (message.trim()) {
      // 빈 메시지 전송 방지
      console.log("메시지 전송:", message);
      
      // 부모 컴포넌트로 메시지 전달
      onSendMessage?.(message.trim());
      
      setMessage(""); // 메시지 전송 후 입력 필드 초기화
      setExtraLines(0); // 텍스트 영역 높이 초기화
    }
  };

  // 텍스트 영역의 동적인 높이를 계산합니다.
  const textareaDynamicHeight =
    MIN_TEXTAREA_HEIGHT + extraLines * HEIGHT_PER_LINE;

  return (
    <form
      className="flex w-full items-end gap-2 border-gray-200 p-3 text-black"
      onSubmit={handleSubmit}
    >
      <Textarea
        className="w-full resize-none rounded-xl border px-3 py-2 text-sm focus:outline-none"
        placeholder="메시지를 입력하세요..."
        onChange={handleInputChange}
        value={message} // controlled component로 만들기
        style={{
          height: `${textareaDynamicHeight}px`,
        }}
      />
      <Button.Default
        type="submit"
        className="rounded-full bg-mos-main px-3 py-2.5 text-sm text-white disabled:bg-mos-gray-100"
        disabled={!message.trim()} // 메시지가 비어있으면 버튼 비활성화
      >
        <i className="bi bi-send" />
      </Button.Default>
    </form>
  );
};

export default ChatInput;
