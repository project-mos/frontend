"use client";
import { useState, useCallback, useEffect } from "react";

const useEnhancedModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      // 모달 밖 스크롤 이벤트 방지
      document.body.style.overflow = "hidden";
      window.history.pushState(null, "", window.location.href); // 히스토리 스택 추가
    } else {
      document.body.style.marginRight = "0px";
      document.body.style.overflow = "auto";
    }

    const handlePopState = () => {
      if (isOpen) {
        setIsOpen(false); // 모달 닫기
        window.history.pushState(null, "", window.location.href); // 다시 히스토리 스택 추가
      }
    };
    // 뒤로가기 방지
    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [isOpen]);

  const openModal = useCallback(() => setIsOpen(true), []);
  const closeModal = useCallback(() => setIsOpen(false), []);
  const toggleModal = useCallback(() => setIsOpen((prev) => !prev), []);

  return { isOpen, openModal, closeModal, toggleModal };
};

export default useEnhancedModal;
