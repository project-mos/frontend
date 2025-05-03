// components/ToastRenderer.tsx

import Toast from "@/shared/components/molecules/Toast";
import { useToastStore } from "@/shared/store/useToastStore";

const ToastRenderer = () => {
  const { toasts } = useToastStore();

  return (
    <div className="fixed bottom-4 right-4 z-20 space-y-2">
      {toasts.map((toast, index) => (
        <Toast
          key={toast.id}
          content={toast.content}
          type={toast.type}
          index={index}
        />
      ))}
    </div>
  );
};

export default ToastRenderer;
