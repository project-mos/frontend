// hooks/useToast.ts

import { useToastStore } from "@/shared/store/useToastStore";

export const useToast = () => {
  const addToast = useToastStore((state) => state.addToast);

  const showToast = (
    content: string,
    type: "success" | "error" | "warning" | "info",
    duration = 3000
  ) => {
    addToast({ content, type, duration });
  };

  return {
    success: (content: string, duration?: number) =>
      showToast(content, "success", duration),
    error: (content: string, duration?: number) =>
      showToast(content, "error", duration),
    warning: (content: string, duration?: number) =>
      showToast(content, "warning", duration),
    info: (content: string, duration?: number) =>
      showToast(content, "info", duration),
  };
};
