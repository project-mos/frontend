import { GetSchedulesResponse } from "@/entities/study/schedule/api/userSchedule.api.types";
import {
  SchedulesQueryKey,
  useDeleteStudySchedule,
  usePostStudySchedule,
  usePutStudySchedule,
} from "@/entities/study/schedule/model/schedule.query";
import { ModalOnClose, ModalProps } from "@/shared/components/atoms/Modal";
import { useToast } from "@/shared/hooks/useToast";
import { useMyJoinedStudyStore } from "@/shared/store/useMyJoinedStudyStore";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";

interface NoticeModalProps extends ModalProps {
  onClose: ModalOnClose;
  isModifyMode?: boolean;
  schedulesData?: GetSchedulesResponse[];
}

interface ScheduleData {
  title: string;
  description: string;
  startDateTime: string;
  endDateTime: string;
  studyId?: number;
  studyScheduleId?: number;
}

const useCalendarScheduleForm = ({
  onClose,
  isModifyMode,
  schedulesData,
}: NoticeModalProps) => {
  const queryClient = useQueryClient();
  const methods = useForm<ScheduleData>({
    defaultValues: {
      title: "",
      description: "",
      startDateTime: "",
      endDateTime: "",
    },
    mode: "onChange",
  });
  const { handleSubmit, reset, watch } = methods;
  const { success, error } = useToast();
  const studyId = Number(watch("studyId"));
  const startDateTime = methods.watch("startDateTime");
  const studyScheduleId = Number(watch("studyScheduleId"));
  const [isDelete, setIsDelete] = useState<boolean>(false);
  
  // 내가 참여중인 스터디 데이터
  const myJoinedStudiesData = useMyJoinedStudyStore(
    (state) => state.myJoinedStudiesData
  );

  // 스케줄 선택 옵션
  const scheduleOption = useMemo(() => {
    return myJoinedStudiesData
      ?.filter((item) => item.studyMemberRole === "스터디장")
      .map((item) => ({
        label: item.title,
        value: item.id,
      }));
  }, [myJoinedStudiesData]);

  // 스케줄 일정 선택 옵션
  const studyScheduleOption = useMemo(() => {
    return schedulesData?.map((item) => ({
      label: item.title,
      value: item.studyScheduleId,
    }));
  }, [schedulesData]);

  // 선택한 일정 상세 데이터 추출
  const selectedScheduleData = useMemo(() => {
    return schedulesData?.filter(
      (item) => item.studyScheduleId === studyScheduleId
    )[0];
  }, [schedulesData, studyScheduleId]);

  useEffect(() => {
    if (isModifyMode && selectedScheduleData) {
      // 수정 모달
      methods.reset({
        title: selectedScheduleData.title,
        description: selectedScheduleData.description,
        startDateTime: selectedScheduleData.startDateTime,
        endDateTime: selectedScheduleData.endDateTime,
        studyId: selectedScheduleData.studyId,
        studyScheduleId: selectedScheduleData.studyScheduleId,
      });
    } else if (!isModifyMode && schedulesData && schedulesData.length > 0) {
      // 생성 모달, schedulesData가 있으면 첫 번째 일정의 startDateTime 사용
      const firstStartDateTime = schedulesData[0].startDateTime;
      methods.reset({
        title: "",
        description: "",
        startDateTime: firstStartDateTime,
        endDateTime: "",
      });
    } else if (!isModifyMode) {
      // 생성 모달, schedulesData 없으면 현재 시간
      methods.reset({
        title: "",
        description: "",
        startDateTime: "",
        endDateTime: "",
      });
    }
  }, [isModifyMode, selectedScheduleData, schedulesData, methods]);

  // 일정 생성
  const { mutate: createSchedule, isPending: isCreating } =
    usePostStudySchedule(studyId, {
      onSuccess: () => {
        success("생성되었습니다.");
        queryClient.invalidateQueries({
          queryKey: SchedulesQueryKey,
        });

        reset();
        onClose();
      },
      onError: (err) => {
        error(String(err));
      },
    });

  // 일정 수정
  const { mutate: updateSchedule, isPending: isUpdating } = usePutStudySchedule(
    studyId,
    {
      onSuccess: () => {
        success("수정되었습니다.");
        queryClient.invalidateQueries({
          queryKey: SchedulesQueryKey,
        });

        reset();
        onClose();
      },
      onError: (err) => {
        error(String(err));
      },
    }
  );

  // 일정 삭제
  const { mutate: deleteSchedule, isPending: isDeleting } =
    useDeleteStudySchedule(studyId, {
      onSuccess: () => {
        success("삭제되었습니다.");
        queryClient.invalidateQueries({
          queryKey: SchedulesQueryKey,
        });

        setIsDelete(false);
        reset();
        onClose();
      },
      onError: (err) => {
        error(String(err));
      },
    });

  const onSubmit = (data: ScheduleData) => {
    // 불필요한 필드 제거
    delete data.studyId;
    delete data.studyScheduleId

    // API 호출
    if (isDelete) {
      // 삭제
      deleteSchedule(studyScheduleId);
    } else if (isModifyMode) {
      // 수정
      updateSchedule({ scheduleId: Number(studyScheduleId), data: data });
    } else {
      // 셍성
      createSchedule(data);
    }
  };

  const onClickDeleteBtn = () => {
    setIsDelete(true);
  };

  const onClickCloseBtn = () => {
    reset();
    methods.reset({
      title: "",
      description: "",
      startDateTime: "",
      endDateTime: "",
    });
    onClose();
  };

  return {
    methods,
    handleSubmit,
    onSubmit,
    isCreating,
    isUpdating,
    isDeleting,
    scheduleOption,
    studyScheduleOption,
    startDateTime,
    studyScheduleId,
    onClickDeleteBtn,
    onClickCloseBtn,
    selectedScheduleData,
    isDelete,
  };
};

export default useCalendarScheduleForm;
