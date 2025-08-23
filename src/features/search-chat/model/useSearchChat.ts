import { useState, useMemo, useCallback } from "react";
import {
  PrivateChatRoom,
  StudyChatRoom,
} from "@/entities/chat/api/chat.api.types";
import { ChatType } from "@/features/chat/ui/chat.ui.types";
import { filterChatRooms, isValidSearchQuery } from "../lib/filterChatRooms";

interface UseSearchChatReturn {
  isSearchMode: boolean;
  searchQuery: string;
  filteredPrivateRooms: PrivateChatRoom[];
  filteredStudyRooms: StudyChatRoom[];
  hasSearchResults: boolean;
  toggleSearchMode: () => void;
  handleSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  clearSearch: () => void;
}

/**
 * 채팅방 검색 기능을 위한 커스텀 훅
 * @param chatRooms 원본 채팅방 목록 (개인/스터디 혼용)
 * @param chatType 현재 선택된 채팅 타입
 * @returns 검색 상태와 제어 함수들
 */
export const useSearchChat = (
  chatRooms: (PrivateChatRoom | StudyChatRoom)[],
  chatType: ChatType
): UseSearchChatReturn => {
  const [isSearchMode, setIsSearchMode] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");

  // 타입별 채팅방 분리
  const { privateChatRooms, studyChatRooms } = useMemo(() => {
    const privateRooms = chatRooms.filter(
      (room): room is PrivateChatRoom => "privateChatRoomId" in room
    );
    const studyRooms = chatRooms.filter(
      (room): room is StudyChatRoom => "studyChatRoomId" in room
    );
    return { privateChatRooms: privateRooms, studyChatRooms: studyRooms };
  }, [chatRooms]);

  // 검색 결과 필터링 (메모이제이션)
  const { filteredPrivateRooms, filteredStudyRooms } = useMemo(() => {
    if (!isSearchMode || !isValidSearchQuery(searchQuery)) {
      return {
        filteredPrivateRooms: privateChatRooms,
        filteredStudyRooms: studyChatRooms,
      };
    }

    const filteredPrivate = filterChatRooms(
      privateChatRooms,
      searchQuery
    ) as PrivateChatRoom[];
    const filteredStudy = filterChatRooms(
      studyChatRooms,
      searchQuery
    ) as StudyChatRoom[];

    return {
      filteredPrivateRooms: filteredPrivate,
      filteredStudyRooms: filteredStudy,
    };
  }, [privateChatRooms, studyChatRooms, searchQuery, isSearchMode]);

  // 검색 결과 존재 여부 (현재 선택된 타입 기준)
  const hasSearchResults = useMemo(() => {
    if (chatType === "private") {
      return filteredPrivateRooms.length > 0;
    } else {
      return filteredStudyRooms.length > 0;
    }
  }, [filteredPrivateRooms, filteredStudyRooms, chatType]);

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
    filteredPrivateRooms,
    filteredStudyRooms,
    hasSearchResults,
    toggleSearchMode,
    handleSearchChange,
    clearSearch,
  };
};
