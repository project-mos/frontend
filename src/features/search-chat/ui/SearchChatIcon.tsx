import React from "react";
import cn from "@/shared/utils/cn";

interface SearchChatIconProps {
  onClick: () => void;
  isVisible: boolean;
  className?: string;
  isActive?: boolean;
}

/**
 * 채팅방 검색 아이콘 컴포넌트
 * @param onClick 클릭 핸들러
 * @param isVisible 아이콘 표시 여부
 * @param className 추가 CSS 클래스
 * @param isActive 활성 상태 여부
 */
const SearchChatIcon: React.FC<SearchChatIconProps> = ({
  onClick,
  isVisible,
  className,
  isActive = false,
}) => {
  if (!isVisible) return null;

  return (
    <i
      className={cn(
        "bi bi-search text-[18px] cursor-pointer transition-colors",
        isActive
          ? "text-mos-main hover:text-mos-main-700"
          : "text-black hover:text-gray-800",
        className
      )}
      role="button"
      onClick={onClick}
      aria-label="채팅방 검색"
    />
  );
};

export default SearchChatIcon;
