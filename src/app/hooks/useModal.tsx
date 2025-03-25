"use client";
import { useState, useCallback } from "react";

const useModal = (initialState = false) => {
  // 추후 기능 추가 예정
  const [modal, setModalState] = useState(initialState);

  const openModal = useCallback(() => setModalState(true), []);
  const closeModal = useCallback(() => setModalState(false), []);
  const toggleModal = useCallback(() => setModalState((prev) => !prev), []);

  return { modal, openModal, closeModal, toggleModal };
};

export default useModal;
