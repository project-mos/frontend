import {
  PostUserScheduleRequest,
  PostUserScheduleResponse,
} from "@/entities/study/schedule/api/userSchedule.api.types";
import {
  useDeleteUserSchedule,
  usePutUserSchedule,
  UserSchedulesQueryKey,
  useUserSchedule,
} from "@/entities/study/schedule/model/userSchedule.query";
import { ModalOnClose, ModalProps } from "@/shared/components/atoms/Modal";
import { useToast } from "@/shared/hooks/useToast";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";

interface NoticeModalProps extends ModalProps {
  onClose: ModalOnClose;
  isModifyMode?: boolean;
  schedulesData?: PostUserScheduleResponse[];
}

interface UserScheduleData {
  id: number;
  title: string;
  description: string;
  startDateTime: string;
  endDateTime: string;
}

const useUserCalendarScheduleForm = ({
  onClose,
  isModifyMode,
  schedulesData,
}: NoticeModalProps) => {
  const queryClient = useQueryClient();
  const methods = useForm<UserScheduleData>({
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
  // const studyId = Number(watch("studyId"));
  const startDateTime = methods.watch("startDateTime");
  const studyScheduleId = Number(watch("id"));
  const [isDelete, setIsDelete] = useState<boolean>(false);

  // 스케줄 일정 선택 옵션
  const userScheduleOption = useMemo(() => {
    return schedulesData?.map((item) => ({
      label: item.title,
      value: item.id,
    }));
  }, [schedulesData]);

  // 선택한 일정 상세 데이터 추출
  const selectedScheduleData = useMemo(() => {
    return schedulesData?.filter((item) => item.id === studyScheduleId)[0];
  }, [schedulesData, studyScheduleId]);

  useEffect(() => {
    if (isModifyMode && selectedScheduleData) {
      // 수정 모달
      methods.reset({
        id: selectedScheduleData.id,
        title: selectedScheduleData.title,
        description: selectedScheduleData.description,
        startDateTime: selectedScheduleData.startDateTime,
        endDateTime: selectedScheduleData.endDateTime,
      });
    } else if (!isModifyMode && schedulesData && schedulesData.length > 0) {
      // 생성 모달, schedulesData가 있으면 첫 번째 일정의 startDateTime 사용
      const firstStartDateTime = schedulesData[0].startDateTime;
      methods.reset({
        id: 0,
        title: "",
        description: "",
        startDateTime: firstStartDateTime,
        endDateTime: "",
      });
    } else if (!isModifyMode) {
      // 생성 모달, schedulesData 없으면 현재 시간
      methods.reset({
        id: 0,
        title: "",
        description: "",
        startDateTime: "",
        endDateTime: "",
      });
    }
  }, [isModifyMode, selectedScheduleData, schedulesData, methods]);

  // 개인 일정 생성
  const { mutate: createSchedule, isPending: isCreating } = useUserSchedule({
    onSuccess: () => {
      success("생성되었습니다.");
      queryClient.invalidateQueries({
        queryKey: UserSchedulesQueryKey,
      });

      reset();
      onClose();
    },
    onError: (err) => {
      error(String(err));
    },
  });

  // 개인 일정 수정
  const { mutate: updateSchedule, isPending: isUpdating } = usePutUserSchedule(
    studyScheduleId,
    {
      onSuccess: () => {
        success("수정되었습니다.");
        queryClient.invalidateQueries({
          queryKey: UserSchedulesQueryKey,
        });

        reset();
        onClose();
      },
      onError: (err) => {
        error(String(err));
      },
    }
  );

  // 개인 일정 삭제
  const { mutate: deleteSchedule, isPending: isDeleting } =
    useDeleteUserSchedule(studyScheduleId, {
      onSuccess: () => {
        success("삭제되었습니다.");
        queryClient.invalidateQueries({
          queryKey: UserSchedulesQueryKey,
        });

        setIsDelete(false);
        reset();
        onClose();
      },
      onError: (err) => {
        error(String(err));
      },
    });

  const onSubmit = (data: PostUserScheduleRequest) => {
    delete data.id;

    if (isDelete) {
      deleteSchedule(studyScheduleId);
    } else if (isModifyMode) {
      updateSchedule({
        userScheduleId: Number(studyScheduleId),
        data: data,
      });
    } else {
      createSchedule(data);
    }
  };

  const onClickDeleteBtn = () => {
    setIsDelete(true);
  };

  const onClickCloseBtn = () => {
    methods.reset({
      id: 0,
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
    userScheduleOption,
    startDateTime,
    studyScheduleId,
    onClickDeleteBtn,
    onClickCloseBtn,
    selectedScheduleData,
    isDelete,
  };
};

export default useUserCalendarScheduleForm;
