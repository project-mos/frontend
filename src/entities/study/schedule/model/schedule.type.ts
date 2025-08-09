import { ModalOnClose, ModalProps } from "@/shared/components/atoms/Modal";
import { GetSchedulesResponse } from "@/entities/study/schedule/api/schedule.api.types";

export interface NoticeModalProps extends ModalProps {
  onClose: ModalOnClose;
  isModifyMode?: boolean;
  schedulesData?: GetSchedulesResponse[];
}

export interface ScheduleData {
  title: string;
  description: string;
  startDateTime: string;
  endDateTime: string;
  studyId?: number;
  studyScheduleId?: number;
}
