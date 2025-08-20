import { useState, useMemo, useCallback } from "react";
import { PrivateChatRoom } from "@/entities/chat/api/chat.api.types";
import { filterChatRooms, isValidSearchQuery } from "../lib/filterChatRooms";

interface UseSearchChatReturn {
  isSearchMode: boolean;
  searchQuery: string;
  filteredRooms: PrivateChatRoom[];
  hasSearchResults: boolean;
  toggleSearchMode: () => void;
  handleSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  clearSearch: () => void;
}

/**
 * 채팅방 검색 기능을 위한 커스텀 훅
 * @param chatRooms 원본 채팅방 목록
 * @returns 검색 상태와 제어 함수들
 */
export const useSearchChat = (
  chatRooms: PrivateChatRoom[]
): UseSearchChatReturn => {
  const [isSearchMode, setIsSearchMode] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");

  // 검색 결과 필터링 (메모이제이션)
  const filteredRooms = useMemo(() => {
    if (!isSearchMode || !isValidSearchQuery(searchQuery)) {
      return chatRooms;
    }
    return filterChatRooms(chatRooms, searchQuery);
  }, [chatRooms, searchQuery, isSearchMode]);

  // 검색 결과 존재 여부
  const hasSearchResults = useMemo(() => {
    return filteredRooms.length > 0;
  }, [filteredRooms]);

  // 검색 모드 토글
  const toggleSearchMode = useCallback(() => {
    setIsSearchMode((prev) => !prev);
    // 검색 모드 해제 시 검색어 초기화
    if (isSearchMode) {
      setSearchQuery("");
    }
  }, [isSearchMode]);

  // 검색어 변경 핸들러
  const handleSearchChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchQuery(e.target.value);
    },
    []
  );

  // 검색어 초기화
  const clearSearch = useCallback(() => {
    setSearchQuery("");
  }, []);

  return {
    isSearchMode,
    searchQuery,
    filteredRooms,
    hasSearchResults,
    toggleSearchMode,
    handleSearchChange,
    clearSearch,
  };
};
