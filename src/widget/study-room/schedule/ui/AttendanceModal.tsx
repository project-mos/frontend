import { usePutAttendance } from "@/entities/study/attendance/model/attendance.query";
import Button from "@/shared/components/atoms/Button";
import Modal, {
  ModalOnClose,
  ModalProps,
} from "@/shared/components/atoms/Modal";
import Typography from "@/shared/components/atoms/Typography";
import cn from "@/shared/utils/cn";
import { useState } from "react";

interface AttendanceProps extends ModalProps {
  onClose: ModalOnClose;
  currentStatus?: string;
  studyId: number;
  studyScheduleId: number;
}

const attendanceOptions = [
  {
    value: "출석",
    icon: "bi-person-check",
  },
  {
    value: "사유 결석",
    icon: "bi-check",
  },
  {
    value: "무단 결석",
    icon: "bi-person-x",
  },
  {
    value: "지각",
    icon: "bi-clock",
  },
  {
    value: "조퇴",
    icon: "bi-box-arrow-right",
  },
];

const AttendanceModal = ({
  onClose,
  currentStatus = "출석",
  studyId,
  studyScheduleId,
  ...props
}: AttendanceProps) => {
  const [selectedStatus, setSelectedStatus] = useState(currentStatus);
  const { mutate: updateAttendance } = usePutAttendance(
    selectedStatus,
    studyId
  );

  const handleSelect = (value: string) => {
    setSelectedStatus(value);
  };

  const handleSave = () => {
    console.log("저장된 출석 상태:", selectedStatus);
    // onClose();

    updateAttendance({
      studyId: studyId,
      studyScheduleId: studyScheduleId,
    });
  };

  return (
    <Modal {...props} onClose={onClose} className="w-[400px]">
      <Modal.Header onClose={onClose}>
        <Typography.Head3>출석 상태 수정</Typography.Head3>
      </Modal.Header>
      <Modal.Content>
        {attendanceOptions.map((option) => {
          // const Icon = option.icon;
          const isSelected = selectedStatus === option.value;

          return (
            <div key={option.value} className="mb-3 flex flex-col">
              <button
                onClick={() => handleSelect(option.value)}
                className={cn(
                  "group flex w-full items-center gap-3 rounded-lg border p-3 transition-all duration-200",
                  isSelected
                    ? "border-mos-main bg-mos-main-100 text-white"
                    : "border-gray-200 bg-white text-gray-700 hover:border-gray-300 hover:bg-gray-50"
                )}
              >
                <div
                  className={cn(
                    "rounded-md px-2 py-1 transition-all duration-200",
                    isSelected ? "bg-mos-main/20" : "bg-gray-100"
                  )}
                >
                  <i
                    className={cn(
                      "bi text-xl",
                      option.icon,
                      isSelected ? "text-mos-main" : "text-gray-600"
                    )}
                  />
                </div>
                <span
                  className={cn(
                    "flex-1 text-left text-base font-medium",
                    isSelected ? "text-mos-main" : "text-gray-600"
                  )}
                >
                  {option.value}
                </span>

                <i
                  className={cn(
                    "bi bi-check",
                    isSelected ? "text-mos-main-700" : "text-white"
                  )}
                />
              </button>
            </div>
          );
        })}
      </Modal.Content>
      <Modal.Footer>
        <Button.Ghost color="Gray" onClick={onClose} disabled={false}>
          취소
        </Button.Ghost>
        <Button.Solid
          type="button"
          color="Main"
          active
          onClick={() => {
            handleSave();
          }}
        >
          저장
        </Button.Solid>
      </Modal.Footer>
    </Modal>
  );
};

export default AttendanceModal;
