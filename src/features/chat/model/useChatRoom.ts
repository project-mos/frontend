import { useState, useRef, useEffect } from "react";
import { PrivateChatMessage } from "@/entities/chat/api/chat.api.types";
import { formatDate } from "@/shared/utils/date";

interface UseChatRoomProps {
  data: PrivateChatMessage[];
}

export const useChatRoom = ({ data }: UseChatRoomProps) => {
  const [showDateBadge, setShowDateBadge] = useState(false); // 날짜 뱃지 표시 여부
  const [currentDate, setCurrentDate] = useState(""); // 현재 표시할 날짜
  const scrollContainerRef = useRef<HTMLDivElement>(null); // 스크롤 컨테이너 참조
  const fadeTimeoutRef = useRef<NodeJS.Timeout | null>(null); // 페이드 아웃 타이머

  // 스크롤 이벤트 처리
  useEffect(() => {
    const handleScroll = () => {
      if (data.length === 0) return;

      // 현재 날짜 설정 (첫 번째 메시지 기준)
      const firstMessage = data[0];
      if (firstMessage.messageCreatedAt) {
        setCurrentDate(formatDate("YYYY-MM-DD", firstMessage.messageCreatedAt));
        setShowDateBadge(true);

        // 기존 타이머 클리어
        if (fadeTimeoutRef.current) {
          clearTimeout(fadeTimeoutRef.current);
        }

        // 1초 후 서서히 사라지게 함
        fadeTimeoutRef.current = setTimeout(() => {
          setShowDateBadge(false);
        }, 1000);
      }
    };

    const scrollContainer = scrollContainerRef.current;
    if (scrollContainer) {
      scrollContainer.addEventListener("scroll", handleScroll);
      return () => scrollContainer.removeEventListener("scroll", handleScroll);
    }
  }, [data]);

  // 컴포넌트 언마운트 시 타이머 클리어
  useEffect(() => {
    return () => {
      if (fadeTimeoutRef.current) {
        clearTimeout(fadeTimeoutRef.current);
      }
    };
  }, []);

  return {
    showDateBadge,
    currentDate,
    scrollContainerRef,
  };
};
