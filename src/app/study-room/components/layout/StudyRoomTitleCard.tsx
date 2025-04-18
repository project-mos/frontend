import Card from "@/shared/components/atoms/Card";
import Tag from "@/shared/components/atoms/Tag";
import Typography from "@/shared/components/atoms/Typography";

const StudyRoomTitleCard = () => {
  return (
    <Card className="col-span-12 justify-between gap-2 tablet:col-span-8">
      <Card.Header className="flex-col gap-3">
        <Tag.Blue bold border>
          프로그래밍
        </Tag.Blue>
        <div className="flex flex-col gap-1">
          <Typography.Head3>알고리즘 스터디</Typography.Head3>
          <Typography.P3 className="text-mos-gray-500">
            매주 화요일 오후 8시에 진행되며, 스터디 전 자료를 미리 읽어와 주시기
            바랍니다.
          </Typography.P3>
        </div>
      </Card.Header>

      <Card.Footer className="flex-col gap-1">
        <div className="flex justify-between">
          <Typography.P3 className="text-mos-gray-500">진행율</Typography.P3>
          <Typography.P3 className="text-mos-gray-500">50%</Typography.P3>
        </div>

        <div className="h-3 w-full rounded-full bg-gray-100 dark:bg-gray-700">
          <div
            className="h-3 w-1/2 rounded-full bg-mos-main-500"
            // style="width: 45%"
          ></div>
        </div>
      </Card.Footer>
    </Card>
  );
};

export default StudyRoomTitleCard;
