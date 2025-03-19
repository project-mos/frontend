"use client";

import { HTMLAttributes, useEffect, useCallback } from "react";
import { cn } from "@/lib/utils";
import { createPortal } from "react-dom";

export type ModalOnClose = () => void;

export interface TestModalProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  onSuccess?: () => void;
  onClose?: ModalOnClose;
  isOpen: boolean;
}

const TestModal = ({
  className,
  children,
  onClose,
  isOpen,
  ...props
}: TestModalProps) => {
  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      console.log(event);
      if (onClose) {
        if (event.key === "Escape") {
          onClose();
        }
      }
    },
    [onClose]
  );

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("keydown", (event: KeyboardEvent) => {
        handleKeyDown(event);
      });
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, handleKeyDown]);

  if (!isOpen) return null;
  // 포탈 박스 가져오기
  const portalElement = document.getElementById("portal");
  // 포탈 박스 없으면 null
  if (!portalElement) return null;
  // 포탈 박스 있으면 이동
  return createPortal(
    <div
      className="modal fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      role="dialog"
      aria-modal="true"
    >
      <div
        className={cn("rounded-2xl bg-white p-5", className)}
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
        {...props}
      >
        {children}
      </div>
    </div>,
    portalElement
  );
};

interface HeaderProps extends HTMLAttributes<HTMLDivElement> {
  onClose: () => void;
}
const Header = ({ className, children, onClose, ...props }: HeaderProps) => (
  <div
    className={cn("flex items-center justify-between gap-4", className)}
    {...props}
  >
    {children}
    <button className="cursor-pointer" onClick={onClose}>
      <i className="bi bi-x text-[30px] text-mos-gray-300"></i>
    </button>
  </div>
);

const Content = ({
  className,
  children,
  ...props
}: HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("my-4", className)} {...props}>
    {children}
  </div>
);

const Footer = ({
  className,
  children,
  ...props
}: HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("flex justify-center gap-4", className)} {...props}>
    {children}
  </div>
);

TestModal.Header = Header;
TestModal.Content = Content;
TestModal.Footer = Footer;

export default TestModal;
