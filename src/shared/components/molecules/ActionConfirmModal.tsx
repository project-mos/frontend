import cn from "@/shared/utils/cn";
import Button from "../atoms/Button";
import Modal, { ModalProps } from "../atoms/Modal";
import Typography from "../atoms/Typography";

interface ConfirmModalProps extends ModalProps {
  type: "danger" | "action";
  title: string;
  content: string;
  buttonLabel: string;
  onClose: () => void;
  onSuccess?: () => void;
}

const ActionConfirmModal = ({
  type,
  title,
  content,
  buttonLabel,
  onClose,
  onSuccess,
  ...props
}: ConfirmModalProps) => {
  const danger = type === "danger";

  return (
    <Modal {...props} onClose={onClose} className="w-1/5 min-w-[300px]">
      <Modal.Header onClose={onClose}>
        <div className="flex items-center gap-1">
          {danger && (
            <i className="bi bi-exclamation-triangle text-xl text-red-500" />
          )}
          <Typography.SubTitle1
            className={cn(
              "font-bold",
              danger ? "text-red-500" : "text-mos-main"
            )}
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
        <Button.Solid
          onClick={onSuccess}
          color={danger ? "Red" : "Main"}
          active
          size="sm"
        >
          {buttonLabel}
        </Button.Solid>
      </Modal.Footer>
    </Modal>
  );
};

export default ActionConfirmModal;
