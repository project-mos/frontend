import { GetStudyScheduleResponse } from "@/entities/study/schedule/api/schedule.api.types";
import { GetStudySchedule } from "@/features/study-room/types/study-room.api";

export type ScheduleType = "upcoming" | "past" | "ongoing";

export interface ScheduleListProps {
  scheduleData?: GetStudyScheduleResponse[];
  type: ScheduleType;
  isAdmin?: boolean;
  date: number;
  handleEdit?: (id: number) => void;
  handleDelete?: (id: number) => void;
  onClick?: (id: number) => void;
}

export interface ScheduleSessionCardProps {
  data: GetStudySchedule;
  className?: string;
  handleEdit?: (id: number) => void;
  handleDelete?: (id: number) => void;
  onClick?: (id: number) => void;
}

export interface ScheduleCardProps {
  title: string;
  onAdd?: () => void;
  children: React.ReactNode;
  isAdmin: boolean;
}
