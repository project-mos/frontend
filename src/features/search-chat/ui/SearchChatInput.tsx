import React, { forwardRef } from "react";
import Input from "@/shared/components/atoms/Input";
import cn from "@/shared/utils/cn";

interface SearchChatInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClear?: () => void;
  placeholder?: string;
  className?: string;
}

/**
 * 채팅방 검색 입력 컴포넌트
 * @param value 검색어 값
 * @param onChange 검색어 변경 핸들러
 * @param onClear 검색어 초기화 핸들러
 * @param placeholder 플레이스홀더 텍스트
 * @param className 추가 CSS 클래스
 */
const SearchChatInput = forwardRef<HTMLInputElement, SearchChatInputProps>(
  (
    {
      value,
      onChange,
      onClear,
      placeholder = "채팅방을 검색하세요...",
      className,
    },
    ref
  ) => {
    return (
      <div className={cn("relative", className)}>
        <Input
          ref={ref}
          type="text"
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          icon={<i className="bi bi-search" />}
          className="w-full pr-10"
        />
        {/* 검색어 초기화 버튼 */}
        {value && onClear && (
          <button
            onClick={onClear}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
            aria-label="검색어 초기화"
          >
            <i className="bi bi-x text-[16px]" />
          </button>
        )}
      </div>
    );
  }
);

SearchChatInput.displayName = "SearchChatInput";

export default SearchChatInput;
