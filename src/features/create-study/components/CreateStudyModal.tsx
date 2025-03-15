import Button from "@/components/atoms/Button";
import Modal from "@/components/atoms/Modal";
import Typography from "@/components/atoms/Typography";
import React from "react";

interface CreateStudyModalProps {
  title: string;
  descriptions: string[];
  setIsOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  confirmFunction: () => void;
}
const CreateStudyModal = ({
  title,
  descriptions,
  setIsOpenModal,
  confirmFunction,
}: CreateStudyModalProps) => {
  return (
    <Modal setIsOpenModal={setIsOpenModal}>
      <Modal.Content className="mb-[40px] flex w-[300px] flex-col gap-3 text-center">
        <Typography.Head3>{title}</Typography.Head3>
        {descriptions.map((description, index) => (
          <Typography.P3 key={index}>{description}</Typography.P3>
        ))}
      </Modal.Content>
      <Modal.Button>
        <Button.Solid active color="Main" onClick={confirmFunction}>
          확인
        </Button.Solid>
        <Button.Solid active color="Gray" onClick={() => setIsOpenModal(false)}>
          취소
        </Button.Solid>
      </Modal.Button>
    </Modal>
  );
};

export default CreateStudyModal;
