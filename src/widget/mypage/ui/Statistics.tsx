"use client";
import Card from "@/shared/components/atoms/Card";
import Typography from "@/shared/components/atoms/Typography";
import { useApplyStatusStore } from "@/shared/store/useApplyStatusStore";
import { useMyJoinedStudyStore } from "@/shared/store/useMyJoinedStudyStore";

const Statistics = () => {
  const allApplyStatus = useApplyStatusStore((state) => state.allApplyStatus);
  const myStudiesStats = useMyJoinedStudyStore(
    (state) => state.myJoinedStudiesData
  );

  return (
    <Card>
      <Card.Header>
        <Typography.P1 className="text-[20px]">활동 통계</Typography.P1>
      </Card.Header>
      <Card.Content>
        <div className="flex gap-3 py-[40px]">
          <div className="flex w-[50%] flex-col items-center border-r border-mos-gray-700 pr-3">
            <Typography.Head2>{myStudiesStats?.length}</Typography.Head2>
            <Typography.P1 className="text-mos-gray-300">
              참여 스터디
            </Typography.P1>
          </div>
          <div className="flex w-[50%] flex-col items-center">
            <Typography.Head2>{allApplyStatus?.length}</Typography.Head2>
            <Typography.P1 className="text-mos-gray-300">
              지원 현황
            </Typography.P1>
          </div>
        </div>
      </Card.Content>
    </Card>
  );
};

export default Statistics;
