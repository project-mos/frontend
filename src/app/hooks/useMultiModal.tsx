"use client";
import { useState, useCallback } from "react";

const useMultiModal = () => {
  const [modal, setModal] = useState(new Map<string, boolean>());

  const openModal = useCallback((id: string) => {
    setModal((prev) => new Map(prev).set(id, true));
  }, []);

  const closeModal = useCallback((id: string) => {
    setModal((prev) => {
      const newModals = new Map(prev);
      newModals.delete(id);
      return newModals;
    });
  }, []);

  const toggleModal = useCallback((id: string) => {
    setModal((prev) => {
      const newModals = new Map(prev);
      newModals.set(id, !prev.get(id));
      return newModals;
    });
  }, []);

  return {
    modal,
    openModal,
    closeModal,
    toggleModal,
  };
};

export default useMultiModal;
