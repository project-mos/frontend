"use client";
import { useState, useCallback, useEffect } from "react";

const useModal = (initialState = false) => {
  const [isModalOpenState, setIsModalOpenState] = useState(initialState);

  useEffect(() => {
    if (isModalOpenState) {
      // 모달 밖 스크롤 이벤트 방지
      document.body.style.overflow = "hidden";
      window.history.pushState(null, "", window.location.href); // 히스토리 스택 추가
    } else {
      document.body.style.marginRight = "0px";
      document.body.style.overflow = "auto";
    }

    const handlePopState = () => {
      if (isModalOpenState) {
        setIsModalOpenState(false); // 모달 닫기
        window.history.pushState(null, "", window.location.href); // 다시 히스토리 스택 추가
      }
    };
    // 뒤로가기 방지G
    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [isModalOpenState]);

  const openModal = useCallback(() => setIsModalOpenState(true), []);
  const closeModal = useCallback(() => setIsModalOpenState(false), []);
  const toggleModal = useCallback(
    () => setIsModalOpenState((prev) => !prev),
    []
  );

  return { isModalOpenState, openModal, closeModal, toggleModal };
};

export default useModal;
