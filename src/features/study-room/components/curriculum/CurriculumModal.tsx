"use client";
import Button from "@/components/atoms/Button";
import Input from "@/components/atoms/Input";
import Modal, { ModalOnClose, ModalProps } from "@/components/atoms/Modal";
import Textarea from "@/components/atoms/Textarea";
import Typography from "@/components/atoms/Typography";
import Label from "@/components/molecules/Label";
import { FormProvider, useForm } from "react-hook-form";

interface CurriculumModalProps extends ModalProps {
  onClose: ModalOnClose;
}

const CurriculumModal = ({ onClose, ...props }: CurriculumModalProps) => {
  const methods = useForm();

  return (
    <FormProvider {...methods}>
      <Modal {...props} onClose={onClose} className="w-[35%]">
        <Modal.Header onClose={onClose}>
          <Typography.Head3>커리큘럼 추가</Typography.Head3>
        </Modal.Header>

        <form>
          <Modal.Content className="flex flex-col gap-5">
            <div className="flex flex-col gap-2">
              <Label label="섹션 *" />
              <Input placeholder="내용을 입력하세요." className="w-full" />
            </div>
            <div className="flex flex-col gap-2">
              <Label label="주제 *" />
              <Input placeholder="주제를 입력하세요." className="w-full" />
            </div>
            <div className="flex flex-col gap-2">
              <Label label="설명 *" />
              <Textarea
                placeholder="설명을 입력하세요."
                className="w-full"
                name="discription"
              />
            </div>
          </Modal.Content>

          <Modal.Footer className="flex justify-end gap-2">
            <Button.Default onClick={onClose}>취소</Button.Default>
            <Button.Solid type="submit" color="Main" active>
              확인
            </Button.Solid>
          </Modal.Footer>
        </form>
      </Modal>
    </FormProvider>
  );
};

export default CurriculumModal;
