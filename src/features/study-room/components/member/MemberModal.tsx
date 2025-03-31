"use client";
import Button from "@/components/atoms/Button";
import Modal, { ModalOnClose, ModalProps } from "@/components/atoms/Modal";
import Profile from "@/components/atoms/Profile";
import Typography from "@/components/atoms/Typography";
import profileImg from "../../../../app/asset/images/profile_example.jpeg";
import { StudyMemberAttendanceInterface } from "@/types/api/study-room";

// interface AttendanceRecord {
//   date: string;
//   status: "출석" | "지각" | "결석";
// }

interface MemberModalProps extends ModalProps {
  onClose: ModalOnClose;
  data?: StudyMemberAttendanceInterface;
}

const MemberModal = ({ onClose, data, ...props }: MemberModalProps) => {
  return (
    <Modal {...props} onClose={onClose}>
      <Modal.Header onClose={onClose}>
        <Typography.Head3>출석 기록</Typography.Head3>
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
                        {record.StudyScheduleStartDateTime}
                      </td>
                      <td className="p-2 text-center">
                        {record.isAttended === true && (
                          <span className="text-green-600">✔ 출석</span>
                        )}
                        {/* {record.status === "지각" && (
                      <span className="text-yellow-600">⚠ 지각</span>
                    )} */}
                        {record.isAttended === false && (
                          <span className="text-red-600">✖ 결석</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        ) : (
          <>no data</>
        )}
      </Modal.Content>

      <Modal.Footer className="flex justify-end gap-2">
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
