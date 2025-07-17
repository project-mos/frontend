import { useGetMyJoinedStudies } from "@/entities/study/join/model/join.query";
import { useMyJoinedStudyStore } from "@/shared/store/useMyJoinedStudyStore";
import { useEffect } from "react";

const useFetchActiveStudies = (userId: number) => {
  const setMyJoinedStudiesData = useMyJoinedStudyStore(
    (state) => state.setMyJoinedStudiesData
  );

  // 참여 중인 스터디 조회
  const { data: myJoinedStudiesData } = useGetMyJoinedStudies(userId!);

  // store
  useEffect(() => {
    if (myJoinedStudiesData) {
      setMyJoinedStudiesData(myJoinedStudiesData);
    }
  }, [myJoinedStudiesData, setMyJoinedStudiesData]);

  return { myJoinedStudiesData };
};

export default useFetchActiveStudies;
