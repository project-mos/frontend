import Tag from "@/shared/components/atoms/Tag";
import Typography from "@/shared/components/atoms/Typography";
import URL from "@/shared/constants/URL";
import { useRouter } from "next/navigation";
import useFetchApplyStudies from "@/features/study/apply-studies/model/useFetchApplyStudies";

const tagColors: Record<string, keyof typeof Tag> = {
  스터디장: "Green",
  스터디원: "Blue",
  검토중: "Pink",
  승인됨: "Gray",
  대기: "Green",
  승낙: "Blue",
  탈락: "Gray",
  취소: "Pink",
};

const ApplyList = () => {
  const router = useRouter();

  const { myApplyStatusData } = useFetchApplyStudies();

  if (!myApplyStatusData || myApplyStatusData.length === 0) {
    return (
      <div className="flex h-[200px] items-center justify-center">
        <Typography.P3>지원중인 스터디가 없습니다.</Typography.P3>
      </div>
    );
  }
  return (
    <>
      {myApplyStatusData.map((data) => {
        const statusTagMapping =
          data.studyJoinStatus === "PENDING" ? "검토중" : data.studyJoinStatus;
        // 동적으로 Tag 컴포넌트 선택
        const CategoryTagComponent = Tag[tagColors[data.category] || "Green"];
        const StatusTagComponent =
          Tag[tagColors[data.studyJoinStatus] || "Green"];

        return (
          <div
            key={data.studyId}
            className="mb-[20px] flex cursor-pointer flex-col gap-[10px] rounded-[10px] border border-mos-gray-100 p-[20px] transition-colors duration-200 hover:border-mos-main-500 active:bg-gray-50"
            onClick={() =>
              router.push(URL.STUDY_ROOM.DETAIL_SCHEDULE(`${data.studyId}`))
            }
          >
            <div className="flex justify-between">
              {/* 카테고리 태그 */}
              <CategoryTagComponent border={true} key={data.category}>
                {data.category}
              </CategoryTagComponent>
              {/* 스터디 상태 태그 */}
              <StatusTagComponent border={true} key={data.studyJoinStatus}>
                {statusTagMapping}
              </StatusTagComponent>
            </div>
            <Typography.Head3 className="text-[20px]">
              {data.title}
            </Typography.Head3>
            <div className="flex items-end justify-between">
              <div className="flex items-center gap-[10px]">
                <Typography.P3>
                  지원일 : {data.createdAt.split("T")[0]}
                </Typography.P3>
              </div>
              <div className="flex items-center ">
                <i className="bi bi-chevron-right text-xl text-mos-gray-500"></i>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default ApplyList;
