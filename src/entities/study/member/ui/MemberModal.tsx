"use client";

import profileImg from "@/asset/images/defaultProfile.png";
import { StudyMemberAttendanceInterface } from "@/features/study-room/types/study-room.type";
import Button from "@/shared/components/atoms/Button";
import Modal, {
  ModalOnClose,
  ModalProps,
} from "@/shared/components/atoms/Modal";
import Profile from "@/shared/components/atoms/Profile";
import Typography from "@/shared/components/atoms/Typography";
import { useToast } from "@/shared/hooks/useToast";
import { mandateMember } from "../api/member.api";

export interface MemberModalProps extends ModalProps {
  onClose: ModalOnClose;
  studyId: string;
  data?: StudyMemberAttendanceInterface;
}

const MemberModal = ({
  onClose,
  studyId,
  data,
  ...props
}: MemberModalProps) => {
  const toast = useToast();

  const onDelete = () => {
    console.log("onDelete");
    onClose();
  };

  const onMandate = async (studyMemberId: string) => {
    // 확인 모달 띄우기
    try {
      await mandateMember(studyId, studyMemberId);
      toast.success("스터디장 위임이 완료되었습니다.");
    } catch (e) {
      toast.error(`${e}`);
    }
  };

  const formatDate = (isoString: string): string => {
    const date = new Date(isoString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");

    return `${year}-${month}-${day} ${hours}:${minutes}`;
  };

  return (
    <Modal {...props} onClose={onClose}>
      <Modal.Header onClose={onClose}>
        <Typography.Head3>멤버 상세보기</Typography.Head3>
      </Modal.Header>

      <Modal.Content className="flex flex-col items-center gap-4 p-4">
        {/* 프로필 정보 */}
        {data ? (
          <>
            <Profile width={80} height={80} src={profileImg} />
            <Typography.SubTitle1>{data.nickname}</Typography.SubTitle1>
            {/* <Typography.P3 className="text-[14px]">📧 {email}</Typography.P3> */}
            {/* <Typography.P3 className="text-[14px]">📚 {experience}</Typography.P3> */}

            {/* 출석률 */}
            <div className="w-full border-t pt-3 text-center">
              <Typography.SubTitle1>
                출석률: {data.attendanceRate}%
              </Typography.SubTitle1>
            </div>

            {/* 출석 기록 리스트 */}
            <div className="max-h-60 w-full overflow-y-auto rounded-md border p-3">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="p-2">날짜</th>
                    <th className="p-2">출석 상태</th>
                  </tr>
                </thead>
                <tbody>
                  {data.attendanceRes.map((record, index) => (
                    <tr key={index} className="border-b">
                      <td className="p-2 text-center">
                        {formatDate(record.studyScheduleStartDateTime)}
                      </td>
                      <td className="p-2 text-center">
                        <Typography.P2>{record.attendanceStatus}</Typography.P2>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        ) : (
          <Typography.SubTitle1 className="text-mos-gray-500">
            멤버 상세 정보가 존재하지 않습니다.
          </Typography.SubTitle1>
        )}
      </Modal.Content>

      <Modal.Footer className="flex justify-end gap-2">
        <Button.Solid
          color="Blue"
          active
          className="text-[14px]"
          onClick={() => onMandate(data!.studyMemberId.toString())}
        >
          스터디장 위임
        </Button.Solid>
        <Button.Solid
          color="Red"
          active
          className="text-[14px]"
          onClick={onDelete}
        >
          탈퇴
        </Button.Solid>
        <Button.Solid
          color="Main"
          active
          className="text-[14px]"
          onClick={onClose}
        >
          확인
        </Button.Solid>
      </Modal.Footer>
    </Modal>
  );
};

export default MemberModal;
