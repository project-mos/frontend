"use client";

import Button from "@/shared/components/atoms/Button";
import Modal, {
  ModalOnClose,
  ModalProps,
} from "@/shared/components/atoms/Modal";
import Profile from "@/shared/components/atoms/Profile";
import Typography from "@/shared/components/atoms/Typography";

import profileImg from "@/asset/images/defaultProfile.png";
import { useToast } from "@/shared/hooks/useToast";
import { approveApplicant, rejectApplicant } from "../api/join.api";
import { StudyManageCardInterface } from "../api/join.api.type";

interface CurriculumModalProps extends ModalProps {
  onClose: ModalOnClose;
  data: StudyManageCardInterface;
  studyId: string;
  status: string;
}

const InfoModal = ({
  onClose,
  data,
  studyId,
  status,
  ...props
}: CurriculumModalProps) => {
  const toast = useToast();
  const onClickCloseBtn = () => {
    onClose();
  };

  async function approveApplicantFunction(studyJoinId: string) {
    await approveApplicant(studyId, studyJoinId);
    toast.success("지원 승인이 완료되었습니다.");
    onClose();
    window.location.reload();
  }

  async function rejectApplicantFunction(studyJoinId: string) {
    await rejectApplicant(studyId, studyJoinId);
    toast.success("지원 거절이 완료되었습니다.");
    onClose();
    window.location.reload();
  }

  return (
    <Modal {...props} onClose={onClickCloseBtn}>
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
                {data.nickname}
              </Typography.SubTitle1>
            </div>
          </div>
        </div>

        {data.questionAnswerResList.map((list) => (
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
        {status === "대기" && (
          <div className="flex gap-2">
            <Button.Solid
              onClick={() =>
                rejectApplicantFunction(data.studyJoinId.toString())
              }
              color="Gray"
              active
              className="text-[14px]"
            >
              거절
            </Button.Solid>
            <Button.Solid
              onClick={() =>
                approveApplicantFunction(data.studyJoinId.toString())
              }
              color="Main"
              active
              className="text-[14px]"
            >
              승인
            </Button.Solid>
          </div>
        )}
        {(status === "승인" || status === "거절") && (
          <Button.Solid color="Main">
            이미 지원 {status} 된 유저입니다.
          </Button.Solid>
        )}
        {status === "취소" && (
          <Button.Solid color="Main">지원을 취소한 유저입니다.</Button.Solid>
        )}
      </Modal.Footer>
    </Modal>
  );
};

export default InfoModal;
