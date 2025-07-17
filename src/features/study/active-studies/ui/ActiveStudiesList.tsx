import Tag from "@/shared/components/atoms/Tag";
import Typography from "@/shared/components/atoms/Typography";
import Meta from "@/shared/components/molecules/Meta";
import URL from "@/shared/constants/URL";
import { useRouter } from "next/navigation";
import useFetchActiveStudies from "@/features/study/active-studies/model/useFetchActiveStudies";

const StudyList = ({ userId }: { userId: number }) => {
  const router = useRouter();

  const { myJoinedStudiesData } = useFetchActiveStudies(userId!);

  if (!myJoinedStudiesData || myJoinedStudiesData.length === 0) {
    return (
      <div className="flex h-[200px] items-center justify-center">
        <Typography.P3>참여중인 스터디가 없습니다.</Typography.P3>
      </div>
    );
  }

  return (
    <>
      {myJoinedStudiesData.map((data) => (
        <div
          key={data.id}
          className="mb-[20px] flex cursor-pointer flex-col gap-[10px] rounded-[10px] border border-mos-gray-100 p-[20px] transition-colors duration-200 hover:border-mos-main-500 active:bg-gray-50"
          onClick={() =>
            router.push(URL.STUDY_ROOM.DETAIL_SCHEDULE(`${data.id}`))
          }
        >
          <div className="flex justify-between">
            <div className="flex gap-2">
              <Tag.Blue>{data.category}</Tag.Blue>
            </div>

            <div className="flex gap-2">
              {data.studyMemberRole === "스터디장" ? (
                <Tag.Green>{data.studyMemberRole}</Tag.Green>
              ) : (
                <Tag.Blue>{data.studyMemberRole}</Tag.Blue>
              )}
            </div>
          </div>
          <Typography.Head3 className="text-[20px]">
            {data.title}
          </Typography.Head3>
          <div className="flex items-end justify-between">
            <div className="flex items-center gap-[10px]">
              <div className="flex flex-col gap-1 mobile:flex-row">
                <Meta icon="person">
                  {data.currentStudyMembers} / {data.maxStudyMembers}
                </Meta>
                <span className="hidden mobile:inline-block">
                  &nbsp;•&nbsp;
                </span>
                <Meta icon="calendar">{data.schedule}</Meta>
              </div>
            </div>
            <div className="flex items-center ">
              <i className="bi bi-chevron-right text-xl text-mos-gray-500"></i>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default StudyList;
