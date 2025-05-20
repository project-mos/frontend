"use client";
import { FormProvider, useForm } from "react-hook-form";

import Button from "@/shared/components/atoms/Button";
import Card from "@/shared/components/atoms/Card";
import Input from "@/shared/components/atoms/Input";
import Typography from "@/shared/components/atoms/Typography";

const ChatCard = () => {
  const methods = useForm<FormData>();

  return (
    <FormProvider {...methods}>
      <Card className="col-span-12 min-h-[500px] gap-4 tablet:col-span-9 laptop:col-span-10 ">
        <Card.Header className="flex items-center justify-between">
          <Typography.SubTitle1>채팅</Typography.SubTitle1>
          <Button.Solid color="Main" active size="sm">
            <i className="bi bi-camera-video"></i>
            화상회의 시작
          </Button.Solid>
        </Card.Header>
        <Card.Content className="min-h-[75%] rounded-md border bg-mos-white-gray-100">
          <div className="bg-mos-white-gray-100"></div>
        </Card.Content>
        <Card.Footer className="relative">
          <Input className="w-full pr-14" />
          <Button.Icon className="absolute right-0 h-full rounded-l-none border-mos-main bg-mos-main px-4 text-white">
            <i className="bi bi-send"></i>
          </Button.Icon>
        </Card.Footer>
      </Card>
    </FormProvider>
  );
};

export default ChatCard;
