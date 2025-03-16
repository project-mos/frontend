import Card from "@/components/atoms/Card";
import Typography from "@/components/atoms/Typography";
import Button from "@/components/atoms/Button";
import { MockManageCardApiResult } from "@/app/mock/api/study-room";
import { StudyManageCardInterface } from "@/types/api/study-room";

const List = () => {
  const data: StudyManageCardInterface[] = MockManageCardApiResult;
  return (
    <div className="flex flex-col gap-3">
      {data.map((list) => (
        <div
          key={list.date}
          className="rounded-md bg-mos-white-gray-100 px-[20px] py-[15] "
        >
          <div className="mb-3 flex justify-between">
            {/* 지원자, 지원일시 */}
            <div>
              <Typography.P3 className="text-[16px]">{list.name}</Typography.P3>
              <Typography.P3 className="text-[14px] text-mos-gray-500">
                {list.date}
              </Typography.P3>
            </div>

            {/* 버튼 */}
            <div className="flex gap-2">
              <Button.Solid
                color="Green"
                active
                className="h-[30px] p-0 px-2 text-[14px]"
              >
                승인
              </Button.Solid>
              <Button.Solid
                color="Red"
                active
                className="h-[30px] p-0 px-2 text-[14px]"
              >
                차단
              </Button.Solid>
            </div>
          </div>

          {/* 질의응답 */}
          <div className="flex flex-col gap-3 rounded-md bg-white px-[15px] py-[10]">
            {list.questionList.map((questionList) => (
              <div key={questionList.answer}>
                <Typography.P3 className="text-[16px]">
                  {questionList.question}
                </Typography.P3>
                <Typography.P3 className="text-[16px] text-mos-gray-500">
                  {questionList.answer}
                </Typography.P3>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

const ManageCard = () => {
  return (
    <Card className="col-span-12 h-fit gap-3 tablet:col-span-10">
      <Card.Header className="mb-[10px] justify-between">
        <Typography.SubTitle1>지원자 목록</Typography.SubTitle1>
      </Card.Header>
      <Card.Content>
        <List />
      </Card.Content>
    </Card>
  );
};

export default ManageCard;
