import {
  getAttendances,
  patchAttendances,
  postAttendance,
  putAttendance,
} from "@/entities/study/attendance/api/attendance.api";
import {
  AttendanceRequest,
  GetAttendancesRequest,
} from "@/entities/study/attendance/api/attendance.api.type";
import { useToast } from "@/shared/hooks/useToast";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { StudyScheduleQueryKey } from "../../schedule/model/schedule.query";

// Query Key 생성 함수
export const AttendancesQueryKey = (studyId: number) => [
  "study",
  "attendances",
  studyId,
];

// 출석 조회
export const useGetAttendances = ({ studyId }: GetAttendancesRequest) => {
  return useQuery({
    queryKey: AttendancesQueryKey(Number(studyId)),
    queryFn: () => getAttendances({ studyId }),
    enabled: !!studyId,
    retry: false,
  });
};

// 출석 등록
export const usePostAttendance = ({ studyId }: GetAttendancesRequest) => {
  const toast = useToast();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: AttendanceRequest) => postAttendance(data),
    onSuccess: (_data, variables) => {
      toast.success("출석처리되었습니다.");
      queryClient.invalidateQueries({
        queryKey: AttendancesQueryKey(variables.studyId),
      });
      queryClient.invalidateQueries({
        queryKey: StudyScheduleQueryKey(studyId),
      });
      
    },
  });
};

// 출석 수정 (PUT)
export const usePutAttendance = (selectedStatus: string, studyId: number) => {
  const toast = useToast();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: AttendanceRequest) =>
      putAttendance({ ...data, selectedStatus }),
    onSuccess: (_data, variables) => {
      toast.success("수정되었습니다.");
      queryClient.invalidateQueries({
        queryKey: AttendancesQueryKey(variables.studyId),
      });
      queryClient.invalidateQueries({
        queryKey: StudyScheduleQueryKey(studyId),
      });
    },
  });
};

// 조기 퇴장 (PATCH)
export const usePatchAttendances = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: AttendanceRequest) => patchAttendances(data),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({
        queryKey: AttendancesQueryKey(variables.studyId),
      });
    },
  });
};
