// components/ToastRenderer.tsx

import Toast from "@/shared/components/molecules/Toast";
import { useToastStore } from "@/shared/store/useToastStore";

const ToastRenderer = () => {
  const { toasts } = useToastStore();

  return (
    <div className="fixed bottom-4 right-4 z-20 space-y-2">
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          content={toast.content}
          type={toast.type}
          duration={toast.duration || 3000}
        />
      ))}
    </div>
  );
};

export default ToastRenderer;
