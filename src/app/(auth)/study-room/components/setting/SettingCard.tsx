"use client";

import Button from "@/shared/components/atoms/Button";
import Card from "@/shared/components/atoms/Card";
import Typography from "@/shared/components/atoms/Typography";

const SettingCard = () => {
  return (
    <Card className="col-span-12 h-fit gap-4 tablet:col-span-9 laptop:col-span-10">
      <Card.Header className="flex items-center justify-between">
        <Typography.SubTitle1>설정</Typography.SubTitle1>
      </Card.Header>
      <Card.Content>
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between rounded-md border border-mos-gray-100 p-5">
            <div>
              <Typography.P1 className="font-bold">스터디 나가기</Typography.P1>
              <Typography.P3 className="text-[14px] text-mos-gray-700">
                이 스터디에서 탈퇴합니다.
              </Typography.P3>
            </div>
            <Button.Ghost color="Red" active>
              스터디 나가기
            </Button.Ghost>
          </div>
          <div className="flex items-center justify-between rounded-md border border-mos-gray-100 p-5">
            <div>
              <Typography.P1 className="font-bold">알림 설정</Typography.P1>
              <Typography.P3 className="text-[14px] text-mos-gray-700">
                해당 스터디의 알림을 설정합니다.
              </Typography.P3>
            </div>
          </div>
        </div>
      </Card.Content>
    </Card>
  );
};

export default SettingCard;
