import { useState, useCallback } from "react";
import { PrivateChatRoom } from "@/entities/chat/api/chat.api.types";
import {
  NavigationState,
  NavigationStackItem,
  StudyInquiryRoom,
} from "../lib/navigation.types";

export const useChatNavigation = () => {
  const [navigationState, setNavigationState] = useState<NavigationState>({
    currentView: "list",
    stack: [{ view: "list", title: "채팅방" }],
  });

  // 현재 네비게이션 아이템 getter
  const getCurrentNavItem = () => {
    return navigationState.stack[navigationState.stack.length - 1];
  };

  // 이전 네비게이션 아이템 getter
  const getPreviousNavItem = () => {
    return navigationState.stack[navigationState.stack.length - 2];
  };

  // 네비게이션 헬퍼 함수들
  const isAtRoot = () => navigationState.stack.length === 1;
  const getCurrentTitle = () => getCurrentNavItem()?.title || "채팅방";
  const canGoBack = () => navigationState.stack.length > 1;

  const navigateToStudyInquiry = useCallback((studyData: StudyInquiryRoom) => {
    const newNavItem: NavigationStackItem = {
      view: "study-inquiry",
      title: `${studyData.studyName} 문의`,
      data: studyData,
    };

    setNavigationState((prev) => ({
      ...prev,
      currentView: "study-inquiry",
      selectedStudy: studyData,
      stack: [...prev.stack, newNavItem],
    }));
  }, []);

  const navigateToChatRoom = useCallback((chatData: PrivateChatRoom) => {
    const newNavItem: NavigationStackItem = {
      view: "chatroom",
      title: chatData.chatName, // 채팅방 이름 사용
      data: chatData,
    };

    setNavigationState((prev) => ({
      ...prev,
      currentView: "chatroom",
      selectedChatRoom: chatData,
      stack: [...prev.stack, newNavItem],
    }));
  }, []);

  const navigateBack = useCallback(() => {
    setNavigationState((prev) => {
      console.log("Stack length:", prev.stack.length);
      // 루트에서는 뒤로가기 불가
      if (prev.stack.length <= 1) return prev;

      const newStack = [...prev.stack];
      newStack.pop();
      const previousItem = newStack[newStack.length - 1];

      return {
        ...prev,
        currentView: previousItem.view,
        stack: newStack,
        selectedStudy:
          previousItem.view === "study-inquiry"
            ? (previousItem.data as StudyInquiryRoom)
            : undefined,
        selectedChatRoom:
          previousItem.view === "chatroom"
            ? (previousItem.data as PrivateChatRoom)
            : undefined,
      };
    });
  }, []);

  const resetNavigation = useCallback(() => {
    setNavigationState({
      currentView: "list",
      stack: [{ view: "list", title: "채팅방" }],
    });
  }, []);

  return {
    // 상태
    navigationState,

    // 헬퍼 함수들
    getCurrentNavItem,
    getPreviousNavItem,
    getCurrentTitle,
    canGoBack,
    isAtRoot,

    // 네비게이션 액션들
    navigateToStudyInquiry,
    navigateToChatRoom,
    navigateBack,
    resetNavigation,
  };
};
