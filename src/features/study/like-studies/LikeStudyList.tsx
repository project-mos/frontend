import { Study } from "@/entities/study/studies/api/studies.api.type";
import Tag from "@/shared/components/atoms/Tag";
import Typography from "@/shared/components/atoms/Typography";
import URL from "@/shared/constants/URL";
import { useRouter } from "next/navigation";
import MetaLike from "../landing/ui/MetaLike";
import { useEffect, useState } from "react";
import { getStudies } from "@/entities/study/studies/api/studies.api";

const LikeStudyList = () => {
  const [likedStudiesData, setLikedStudiesData] = useState<Study[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchAllStudies = async () => {
      try {
        // 내가 좋아요 누른 모든 스터디 가져오기
        const allResponse = await getStudies({
          page: "1",
          liked: true,
        });

        setLikedStudiesData(allResponse.studies);
      } catch (error) {
        console.error(error);
      }
    };
    fetchAllStudies();
  }, []);

  if (likedStudiesData.length === 0) {
    return (
      <div className="flex h-[200px] items-center justify-center">
        <Typography.P3>좋아요한 스터디가 없습니다.</Typography.P3>
      </div>
    );
  }
  return (
    <>
      {likedStudiesData.map((data) => (
        <div
          key={data.id}
          className="mb-[20px] flex cursor-pointer flex-col gap-[10px] rounded-[10px] border border-mos-gray-100 p-[20px] transition-colors duration-200 hover:border-mos-main-500 active:bg-gray-50"
          onClick={() => router.push(URL.STUDY.DETAIL(data.id))}
        >
          <div className="flex justify-between">
            <div className="flex gap-2">
              <Tag.Blue>{data.category}</Tag.Blue>
            </div>
            <div className="flex gap-2">
              {data.tags.map((item) => (
                <Tag.Green key={item}>#{item}</Tag.Green>
              ))}
            </div>
          </div>
          <Typography.Head3 className="text-[20px]">
            {data.title}
          </Typography.Head3>
          <Typography.P1 className="line-clamp-2 text-[20px]">
            {data.content}
          </Typography.P1>

          <div className="flex items-end justify-between">
            <div className="flex items-center gap-[10px]">
              <MetaLike
                studyId={data.id}
                studyIds={[data.id]}
                disabled={true}
              />
            </div>
            <div className="flex items-center">
              <i className="bi bi-chevron-right text-xl text-mos-gray-500"></i>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default LikeStudyList;
