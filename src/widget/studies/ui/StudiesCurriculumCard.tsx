import { GetCurriculumResponse } from "@/entities/study/curriculum/api/curriculum.api.type";

import Card from "@/shared/components/atoms/Card";
import Tag from "@/shared/components/atoms/Tag";
import Typography from "@/shared/components/atoms/Typography";

interface StudiesCurriculumCardProps {
  data: GetCurriculumResponse[];
}

const StudiesCurriculumCard = ({ data }: StudiesCurriculumCardProps) => {
  const hasData = data.length > 0;
  return (
    <>
      {hasData && (
        <Card className="mt-[-40px] flex w-[85%] flex-col border-none shadow-none outline-none sm-mobile:w-full ">
          <Card.Header className="mb-[30px] border-t pt-8">
            <Typography.SubTitle1 className="font-semibold">
              커리큘럼
            </Typography.SubTitle1>
          </Card.Header>
          <Card.Content>
            {data.map((curriculum) => {
              return (
                <div className="flex gap-[20px]" key={curriculum.sectionId}>
                  <div>
                    <Tag.Main className="flex flex-col text-nowrap">
                      <Typography.P3 className="pt-px font-bold">
                        {curriculum.sectionId}주차
                      </Typography.P3>
                    </Tag.Main>

                    {/* 동적으로 Card.Content 높이에 맞춰서 height 조정 */}
                    <div
                      className="ml-[10px] w-[2px] bg-[#DCDCDC]"
                      style={{ height: "calc(70% + 10px)" }}
                    ></div>
                  </div>

                  <div className="col-span-12 mb-[20px] flex w-full flex-col rounded-lg border-none bg-mos-white-gray-100 p-[15px] shadow-none">
                    <Typography.SubTitle1 className="mb-[5px] text-[18px]">
                      {curriculum.title}
                    </Typography.SubTitle1>
                    <Typography.P3 className="mb-[10px] text-mos-gray-700">
                      {curriculum.content}
                    </Typography.P3>
                    {/* <div className="flex gap-[50px]"> */}
                    {/* {curriculum.task.map((task) => (
                  <Typography.P3 className="text-[14px] font-bold" key={task}>
                    {task}
                  </Typography.P3>
                ))} */}
                    {/* </div> */}
                  </div>
                </div>
              );
            })}
          </Card.Content>
        </Card>
      )}
    </>
  );
};

export default StudiesCurriculumCard;
