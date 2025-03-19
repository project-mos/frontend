import Card from "@/components/atoms/Card";
import Typography from "@/components/atoms/Typography";
import Button from "@/components/atoms/Button";
import { MockNoticeCardApiResult } from "@/app/mock/api/study-room";
import { StudyNoticeCardInterface } from "@/types/api/study-room";

const List = () => {
  const data: StudyNoticeCardInterface[] = MockNoticeCardApiResult;
  return (
    <div className="flex flex-col gap-3">
      {data.map((item) => (
        <div
          key={item.content}
          className="rounded-md border border-mos-gray-100 px-[15px] py-[10px]"
        >
          <Typography.P3 className="text-[16px]">{item.title}</Typography.P3>
          <Typography.P3 className="text-[16px] text-mos-gray-500">
            {item.content}
          </Typography.P3>
          <div className="my-2 border-b border-mos-gray-100"></div>
          <Typography.P3 className="text-[14px] text-mos-gray-500">
            {item.writer}
          </Typography.P3>
        </div>
      ))}
    </div>
  );
};

const NoticeCard = () => {
  return (
    <Card className="col-span-12 h-fit gap-3 tablet:col-span-10">
      <Card.Header className="mb-[10px] justify-between">
        <Typography.SubTitle1>공지사항</Typography.SubTitle1>
        <Button.Solid color="Main" active size="sm">
          <i className="bi bi-plus text-[22px]"></i>
          공지 작성
        </Button.Solid>
      </Card.Header>
      <Card.Content>
        <List />
      </Card.Content>
    </Card>
  );
};

export default NoticeCard;
