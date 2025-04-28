import { useEffect, useState } from "react";
import cn from "@/shared/utils/cn";

export interface ToastInterface {
  content: string;
  type?: "success" | "info" | "warning" | "error";
  duration?: number;
}

const typeConfig = {
  success: {
    color: "border-toast-success-border bg-toast-success-bg",
    icon: "bi-check-circle-fill",
    title: "Success",
    iconColor: "text-toast-success-border",
  },
  info: {
    color: "border-toast-info-border bg-toast-info-bg",
    icon: "bi-info-circle-fill",
    title: "Info",
    iconColor: "text-toast-info-border",
  },
  warning: {
    color: "border-toast-warning-border bg-toast-warning-bg",
    icon: "bi-exclamation-triangle-fill",
    title: "Warning",
    iconColor: "text-toast-warning-border",
  },
  error: {
    color: "border-toast-error-border bg-toast-error-bg",
    icon: "bi-x-circle-fill",
    title: "Error",
    iconColor: "text-toast-error-border",
  },
};

const Toast = ({
  content,
  type = "success",
  duration = 3000,
}: ToastInterface) => {
  const { color, icon, title, iconColor } = typeConfig[type];
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const showTimer = setTimeout(() => setVisible(true), 100);
    const hideTimer = setTimeout(() => setVisible(false), duration);

    return () => {
      clearTimeout(showTimer);
      clearTimeout(hideTimer);
    };
  }, [duration]);

  return (
    <div
      className={cn(
        "fixed left-1/2 top-5 z-10 w-[350px] -translate-x-1/2 rounded-xl border transition-all duration-500 ease-in-out",
        visible ? "translate-y-0 opacity-100" : "-translate-y-5 opacity-0",
        color
      )}
    >
      <div className="flex items-center gap-3 px-3 py-2">
        <div>
          <i className={cn("bi text-[28px]", icon, iconColor)}></i>
        </div>
        <div className="w-full">
          <p className="text-[16px] font-semibold">{title}</p>
          <p className="mt-[-3px] text-[14px]">{content}</p>
        </div>
        <div>
          <i
            className={cn(
              "bi bi-x text-mos-gray-300, cursor-pointer text-[24px]",
              iconColor
            )}
            onClick={() => setVisible(false)}
          ></i>
        </div>
      </div>
    </div>
  );
};

export default Toast;
