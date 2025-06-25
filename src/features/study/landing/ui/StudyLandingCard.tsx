import Card from "@/shared/components/atoms/Card";
import Tag from "@/shared/components/atoms/Tag";
import Typography from "@/shared/components/atoms/Typography";
import Meta from "@/shared/components/molecules/Meta";

import CustomMdxRemote from "@/shared/components/system/CustomMdxRemote";
import Link from "next/link";
import URL from "@/shared/constants/URL";
import { StudyLandingCardProps } from "@/features/study/landing/ui/landing.ui.types";

const StudyLandingCard = ({
  data,
  className,
  ...props
}: StudyLandingCardProps) => {
  // 최대 6개까지만 보여주고, 각 태그 문자열은 최대 5글자까지만 잘라서 출력
  const renderTags = () => {
    return data.tags.slice(0, 6).map((tag, index) => {
      const trimmed = tag.length > 5 ? `${tag.slice(0, 5)}…` : tag;
      return <Tag.Detail key={index}>#{trimmed}</Tag.Detail>;
    });
  };
  return (
    <Link
      href={`${URL.STUDY.DETAIL(data.id)}`}
      className="flex justify-center "
    >
      <Card
        className={`flex h-[300px] w-full cursor-pointer flex-col justify-between ${
          className ?? ""
        }`}
        {...props}
      >
        <Card.Header className="flex-col gap-2">
          <div className="flex justify-between">
            <div className="flex gap-[4.5px]">
              <Tag.Green bold>{data.category}</Tag.Green>
              <Tag.Blue bold>{data.meetingType}</Tag.Blue>
            </div>
            {data.recruitmentStatus === "모집 중" ? (
              <Tag.Green bold border={false}>
                모집중
              </Tag.Green>
            ) : (
              <Tag.Gray bold border={false}>
                모집 완료
              </Tag.Gray>
            )}
          </div>
          <Typography.Head3 className="truncate">{data.title}</Typography.Head3>

          <div className="flex flex-col gap-1">
            <Meta icon="calendar" className="text-sm text-black">
              {data.recruitmentStartDate} ~ {data.recruitmentEndDate}
            </Meta>
          </div>
        </Card.Header>
        <Card.Content className="">
          <div className="h-[50px] max-w-full truncate text-mos-gray-700">
            <CustomMdxRemote content={data.content} preview />
          </div>
        </Card.Content>
        <div className="flex flex-wrap gap-[5px]">{renderTags()}</div>
        <Card.Footer className="flex justify-between">
          <div className="flex gap-1  text-mos-gray-300">
            <Meta icon="person">
              {data.currentStudyMembers}/{data.maxStudyMembers}명
            </Meta>
          </div>
          <div className="flex gap-1 text-mos-gray-300">
            <Meta icon="eye">{data.viewCount}</Meta>
          </div>
        </Card.Footer>
      </Card>
    </Link>
  );
};

export default StudyLandingCard;
