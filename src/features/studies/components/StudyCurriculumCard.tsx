import { MockStudyCurriculumApiResult } from "@/app/mock/api/studies";
import Card from "@/components/atoms/Card";
import Tag from "@/components/atoms/Tag";
import Typography from "@/components/atoms/Typography";
import { StudyCurriculumInterface } from "@/types/api/studies/detail";

interface CurriculumProps {
  data: StudyCurriculumInterface[];
}

const StudyCurriculumCard = () => {
  return (
    <Card className="col-span-8 flex flex-col">
      <Card.Header className="mb-[20px]">
        <Typography.SubTitle1>커리큘럼</Typography.SubTitle1>
      </Card.Header>
      <Card.Content>
        <Curriculum data={MockStudyCurriculumApiResult} />
      </Card.Content>
    </Card>
  );
};

const Curriculum = ({ data }: CurriculumProps) => {
  return (
    <>
      {data.map((curriculum) => {
        return (
          <div className="flex gap-[20px]" key={curriculum.step}>
            <div>
              <Tag.Main className="flex flex-col text-nowrap">
                <Typography.P3 className="pt-px font-bold">
                  {curriculum.step}
                </Typography.P3>
              </Tag.Main>

              {/* 동적으로 Card.Content 높이에 맞춰서 height 조정 */}
              <div
                className="ml-[10px] w-[2px] bg-[#DCDCDC]"
                style={{ height: "calc(70% + 10px)" }}
              ></div>
            </div>

            <div className="col-span-12 mb-[20px] flex w-full flex-col border-none bg-mos-white-gray-100 p-[15px] shadow-none">
              <Typography.SubTitle1 className="mb-[5px] text-[18px]">
                {curriculum.title}
              </Typography.SubTitle1>
              <Typography.P3 className="mb-[10px] text-mos-gray-700">
                {curriculum.content}
              </Typography.P3>
              <div className="flex gap-[50px]">
                {curriculum.task.map((task) => (
                  <Typography.P3 className="text-[14px] font-bold" key={task}>
                    {task}
                  </Typography.P3>
                ))}
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default StudyCurriculumCard;
