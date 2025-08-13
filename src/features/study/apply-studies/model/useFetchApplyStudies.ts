import { useGetMyApplyStatus } from "@/entities/study/join/model/join.query";
import { useApplyStatusStore } from "@/shared/store/useApplyStatusStore";
import { useEffect } from "react";

const useFetchApplyStudies = () => {
  const setAllApplyStatus = useApplyStatusStore(
    (state) => state.setAllApplyStatus
  );

  // 나의 지원 현황 조회
  const { data: myApplyStatusData } = useGetMyApplyStatus();

  useEffect(() => {
    if (myApplyStatusData && setAllApplyStatus) {
      setAllApplyStatus(myApplyStatusData);
    }
  }, [myApplyStatusData, setAllApplyStatus]);

  return { myApplyStatusData };
};

export default useFetchApplyStudies;
