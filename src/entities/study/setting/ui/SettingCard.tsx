"use client";

import {
  deleteStudy,
  leaveStudy,
} from "@/features/studies/services/studies.service";
import Button from "@/shared/components/atoms/Button";
import Card from "@/shared/components/atoms/Card";
import Typography from "@/shared/components/atoms/Typography";
import ActionConfirmModal from "@/shared/components/molecules/ActionConfirmModal";
import URL from "@/shared/constants/URL";
import useMultiModal from "@/shared/hooks/useMultiModal";
import { useToast } from "@/shared/hooks/useToast";
import { useRouter } from "next/navigation";

const SettingCard = ({ studyId }: { studyId: string }) => {
  const router = useRouter();
  const toast = useToast();
  const { modal, openModal, closeModal } = useMultiModal();

  const handleLeaveButton = async () => {
    try {
      await leaveStudy(studyId);
      localStorage.setItem("leave", "true");
      closeModal("leave");
      router.push(URL.MYPAGE);
    } catch (e) {
      console.log("error", e);
      closeModal("leave");
      toast.error(`${e}`);
    }
  };

  const handleDeleteButton = async () => {
    try {
      await deleteStudy(studyId);
      localStorage.setItem("delete", "true");
      closeModal("delete");
      router.push(URL.MYPAGE);
    } catch (e) {
      console.log("error", e);
      closeModal("delete");
      toast.error(`${e}`);
    }
  };

  const handleEditButton = async () => {
    router.push(URL.STUDY.EDIT(studyId));
    closeModal("edit");
  };

  return (
    <>
      <Card className="col-span-12 h-fit gap-4 tablet:col-span-9 laptop:col-span-10">
        <Card.Header className="flex items-center justify-between">
          <Typography.SubTitle1>설정</Typography.SubTitle1>
        </Card.Header>
        <Card.Content>
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between rounded-md border border-mos-gray-100 p-5">
              <div>
                <Typography.P1 className="font-bold">알림 설정</Typography.P1>
                <Typography.P3 className="text-[14px] text-mos-gray-700">
                  해당 스터디의 알림을 설정합니다.
                </Typography.P3>
              </div>
            </div>
            <Typography.P1 className="mt-3 font-bold text-mos-gray-700">
              관리자 설정
            </Typography.P1>
            <div className="flex items-center justify-between rounded-md border border-mos-gray-100 p-5">
              <div>
                <Typography.P1 className="font-bold">스터디 수정</Typography.P1>
                <Typography.P3 className="text-[14px] text-mos-gray-700">
                  스터디 정보를 수정합니다.
                </Typography.P3>
              </div>
              <Button.Ghost
                onClick={() => openModal("edit")}
                color="Gray"
                active
              >
                수정하기
              </Button.Ghost>
            </div>
            <div className="flex items-center justify-between rounded-md border border-mos-gray-100 p-5">
              <div>
                <Typography.P1 className="font-bold">
                  스터디 삭제하기
                </Typography.P1>
                <Typography.P3 className="text-[14px] text-mos-gray-700">
                  해당 스터디를 삭제합니다. 이 설정은 되돌릴 수 없습니다.
                </Typography.P3>
              </div>
              <Button.Ghost
                onClick={() => openModal("delete")}
                color="Red"
                active
              >
                삭제하기
              </Button.Ghost>
            </div>
            <Typography.P1 className="mt-3 font-bold text-mos-gray-700">
              Danger Zone
            </Typography.P1>
            <div className="flex items-center justify-between rounded-md border border-mos-gray-100 p-5">
              <div>
                <Typography.P1 className="font-bold">
                  스터디 나가기
                </Typography.P1>
                <Typography.P3 className="text-[14px] text-mos-gray-700">
                  해당 스터디에서 탈퇴합니다. 이 설정은 되돌릴 수 없습니다.
                </Typography.P3>
              </div>
              <Button.Ghost
                onClick={() => openModal("leave")}
                color="Red"
                active
              >
                나가기
              </Button.Ghost>
            </div>
          </div>
        </Card.Content>
      </Card>
      <ActionConfirmModal
        isOpen={modal.get("leave")!}
        onClose={() => closeModal("leave")}
        type="danger"
        content="정말 스터디에서 탈퇴하시겠습니까?"
        title="탈퇴하기"
        buttonLabel="탈퇴하기"
        onSuccess={handleLeaveButton}
      />
      <ActionConfirmModal
        isOpen={modal.get("delete")!}
        onClose={() => closeModal("delete")}
        type="danger"
        content="정말 해당 스터디를 삭제하시겠습니까?"
        title="삭제하기"
        buttonLabel="삭제하기"
        onSuccess={handleDeleteButton}
      />
      <ActionConfirmModal
        isOpen={modal.get("edit")!}
        onClose={() => closeModal("edit")}
        type="action"
        content="해당 스터디를 수정하시겠습니까?"
        title="수정하기"
        buttonLabel="수정하기"
        onSuccess={handleEditButton}
      />
    </>
  );
};

export default SettingCard;
