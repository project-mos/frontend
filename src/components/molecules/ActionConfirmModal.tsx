import { cn } from "@/lib/utils";
import Button from "../atoms/Button";
import Modal, { ModalProps } from "../atoms/Modal";
import Typography from "../atoms/Typography";

interface ConfirmModalProps extends ModalProps {
  type: "danger" | "action";
  title: string;
  content: string;
  buttonLabel: string;
  onClose: () => void;
}

const ActionConfirmModal = ({
  type,
  title,
  content,
  buttonLabel,
  onClose,
  ...props
}: ConfirmModalProps) => {
  const danger = type === "danger";

  return (
    <Modal {...props} onClose={onClose} className="w-[18%]">
      <Modal.Header onClose={onClose}>
        <div className="flex items-center gap-1">
          <i
            className={cn(
              "bi bi-exclamation-triangle text-xl",
              danger ? "text-red-500" : "text-blue-500"
            )}
          />
          <Typography.SubTitle1
            className={danger ? "text-red-500" : "text-blue-500"}
          >
            {title}
          </Typography.SubTitle1>
        </div>
      </Modal.Header>
      <Modal.Content>
        <Typography.P3>{content}</Typography.P3>
      </Modal.Content>
      <Modal.Footer>
        <Button.Solid onClick={onClose} color="Gray" size="sm">
          취소
        </Button.Solid>
        <Button.Solid color={danger ? "Red" : "Blue"} active size="sm">
          {buttonLabel}
        </Button.Solid>
      </Modal.Footer>
    </Modal>
  );
};

export default ActionConfirmModal;
