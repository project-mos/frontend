"use client";
import Button from "@/components/atoms/Button";
import Modal, { ModalOnClose, ModalProps } from "@/components/atoms/Modal";
import Profile from "@/components/atoms/Profile";
import Typography from "@/components/atoms/Typography";
import profileImg from "../../../../app/asset/images/profile_example.jpeg";
import { StudyManageCardInterface } from "@/types/api/study-room";

interface CurriculumModalProps extends ModalProps {
  onClose: ModalOnClose;
  data: StudyManageCardInterface;
}

const InfoModal = ({ onClose, data, ...props }: CurriculumModalProps) => {
  const onClickCloseBtn = () => {
    onClose();
  };

  return (
    <Modal {...props} onClose={onClickCloseBtn} className="w-[22%]">
      <Modal.Header onClose={onClickCloseBtn}>
        <Typography.Head3>지원자 상세 정보</Typography.Head3>
      </Modal.Header>

      <Modal.Content>
        <div className="mb-3 flex gap-6">
          <div>
            <Profile
              width={80}
              height={80}
              src={profileImg}
              className="rounded-md"
            />
          </div>
          <div className="w-full">
            <div className="mb-4">
              <Typography.SubTitle1 className="text-[18px]">
                {data.name}
              </Typography.SubTitle1>
              <Typography.P3 className="text-[16px]">
                📧 {data.email}
              </Typography.P3>
              <Typography.P3 className="text-[16px]">
                📚 {data.experience}
              </Typography.P3>
            </div>
          </div>
        </div>

        {data.questionList.map((list) => (
          <div className="mb-5" key={list.question}>
            <Typography.P3 className="mb-2 text-[18px] text-blue-800">
              {list.question}
            </Typography.P3>
            <div className="w-full rounded-lg border border-sky-200 bg-sky-50 px-4 py-2">
              <Typography.P3 className="text-[16px] text-mos-gray-700">
                {list.answer}
              </Typography.P3>
            </div>
          </div>
        ))}
      </Modal.Content>

      <Modal.Footer className="flex justify-end gap-2">
        <div className="flex gap-2">
          <Button.Solid color="Gray" active className="text-[14px]">
            차단
          </Button.Solid>
          <Button.Solid color="Main" active className="text-[14px]">
            승인
          </Button.Solid>
        </div>
      </Modal.Footer>
    </Modal>
  );
};

export default InfoModal;
