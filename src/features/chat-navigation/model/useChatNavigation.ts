import { useState, useCallback } from "react";
import { PrivateChatRoom, StudyChatRoom } from "@/entities/chat/api/chat.api.types";
import { NavigationState, NavigationStackItem } from "../lib/navigation.types";

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

  const navigateToChatRoom = useCallback((chatData: PrivateChatRoom | StudyChatRoom) => {
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
        selectedChatRoom:
          previousItem.view === "chatroom"
            ? (previousItem.data as PrivateChatRoom | StudyChatRoom)
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
    navigateToChatRoom,
    navigateBack,
    resetNavigation,
  };
};
