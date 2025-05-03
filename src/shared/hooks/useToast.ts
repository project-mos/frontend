// hooks/useToast.ts

import { useToastStore } from "@/shared/store/useToastStore";

export const useToast = () => {
  const addToast = useToastStore((state) => state.addToast);

  const showToast = (
    content: string,
    type: "success" | "error" | "warning" | "info"
  ) => {
    addToast({ content, type });
  };

  return {
    success: (content: string) => showToast(content, "success"),
    error: (content: string) => showToast(content, "error"),
    warning: (content: string) => showToast(content, "warning"),
    info: (content: string) => showToast(content, "info"),
  };
};
