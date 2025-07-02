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
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

// Query Key 생성 함수
export const AttendancesQueryKey = (studyId: string) => [
  "study",
  "attendances",
  studyId,
];

// 출석 조회
export const useGetAttendances = ({ studyId }: GetAttendancesRequest) => {
  return useQuery({
    queryKey: AttendancesQueryKey(studyId),
    queryFn: () => getAttendances({ studyId }),
    enabled: !!studyId,
    retry: false,
  });
};

// 출석 등록
export const usePostAttendance = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: AttendanceRequest) => postAttendance(data),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({
        queryKey: AttendancesQueryKey(variables.studyId),
      });
    },
  });
};

// 출석 수정 (PUT)
export const usePutAttendance = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: AttendanceRequest) => putAttendance(data),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({
        queryKey: AttendancesQueryKey(variables.studyId),
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
