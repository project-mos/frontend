import { Dispatch, HTMLAttributes, SetStateAction } from "react";
import { cn } from "@/lib/utils";

interface ModalProps extends HTMLAttributes<HTMLDivElement> {
  setIsOpenModal?: Dispatch<SetStateAction<boolean>>;
  classNaem?: string;
}

const Modal = ({
  setIsOpenModal,
  className,
  children,
  ...props
}: ModalProps) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div
        className={cn("rounded-2xl bg-white p-[20px]", className)}
        {...props}
      >
        <div className="flex h-[22px] items-center justify-end">
          <button
            className="cursor-pointer"
            onClick={() => setIsOpenModal && setIsOpenModal(false)}
          >
            <i className="bi bi-x text-[30px] text-mos-gray-300"></i>
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};

const Content = ({ className, children, ...props }: ModalProps) => {
  return (
    <div className={cn("my-[20px]", className)} {...props}>
      {children}
    </div>
  );
};

const Button = ({ className, children, ...props }: ModalProps) => {
  return (
    <div className={cn("flex justify-center gap-[10px]", className)} {...props}>
      {children}
    </div>
  );
};

Modal.Content = Content;
Modal.Button = Button;

export default Modal;
