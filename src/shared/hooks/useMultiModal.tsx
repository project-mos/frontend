"use client";
import { useState, useCallback, useEffect } from "react";

const useMultiModal = () => {
  const [modalState, setModalState] = useState(new Map<string, boolean>());

  const openModal = useCallback((id: string) => {
    setModalState((prev) => new Map(prev).set(id, true));
  }, []);

  const closeModal = useCallback((id: string) => {
    setModalState((prev) => {
      const newModals = new Map(prev);
      newModals.delete(id);
      return newModals;
    });
  }, []);

  const toggleModal = useCallback((id: string) => {
    setModalState((prev) => {
      const newModals = new Map(prev);
      newModals.set(id, !prev.get(id));
      return newModals;
    });
  }, []);
  // useEffect로 모든 모달 상태를 관리
  useEffect(() => {
    const isAnyModalOpen = Array.from(modalState.values()).some(
      (state) => state
    );

    // 모달이 열리면 스크롤 방지 및 히스토리 스택 처리
    if (isAnyModalOpen) {
      document.body.style.overflow = "hidden";
      window.history.pushState(null, "", window.location.href);
    } else {
      document.body.style.marginRight = "0px";
      document.body.style.overflow = "auto";
    }

    const handlePopState = () => {
      if (isAnyModalOpen) {
        setModalState((prev) => {
          const newModals = new Map(prev);
          newModals.forEach((_, key) => newModals.set(key, false)); // 모든 모달 닫기
          return newModals;
        });
        window.history.pushState(null, "", window.location.href);
      }
    };

    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [modalState]); // modalState가 변경될 때마다 실행

  return {
    modal: modalState,
    openModal,
    closeModal,
    toggleModal,
  };
};

export default useMultiModal;
