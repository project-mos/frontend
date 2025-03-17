"use client";
import Button from "@/components/atoms/Button";
import Card from "@/components/atoms/Card";
import Input from "@/components/atoms/Input";
import Typography from "@/components/atoms/Typography";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";

const ChatCard = () => {
  const methods = useForm<FormData>();

  return (
    <FormProvider {...methods}>
      <Card className="col-span-12 gap-4 tablet:col-span-10">
        <Card.Header className="flex items-center justify-between">
          <Typography.SubTitle1>채팅</Typography.SubTitle1>
          <Button.Solid color="Main" active>
            <i className="bi bi-camera-video"></i>
            화상회의 시작
          </Button.Solid>
        </Card.Header>
        <Card.Content className="min-h-[75%] rounded-md border bg-mos-white-gray-100">
          <div className="bg-mos-white-gray-100"></div>
        </Card.Content>
        <Card.Footer className="relative">
          <Input className="w-full px-3" />
          <Button.Icon className="absolute right-0 h-full rounded-l-none border-mos-main bg-mos-main text-white">
            <i className="bi bi-send"></i>
          </Button.Icon>
        </Card.Footer>
      </Card>
    </FormProvider>
  );
};

export default ChatCard;
