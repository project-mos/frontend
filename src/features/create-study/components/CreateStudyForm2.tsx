"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { FormProvider, useForm } from "react-hook-form";
import dynamic from "next/dynamic";
import Badge from "@/components/atoms/Badge";
import Typography from "@/components/atoms/Typography";
import Card from "@/components/atoms/Card";
import Label from "./Label";

const Editor = dynamic(() => import("@/components/atoms/MDXEditor"), {
  ssr: false,
});

const CreateStudyForm2 = () => {
  const methods = useForm<FormData>();
  const router = useRouter();
  const [contents, setContents] = useState<string>("");

  const onSubmit = (data: FormData) => {
    console.log("data", data);
    router.push("/create-study?step=2");
  };

  return (
    <div className="m-auto flex w-full max-w-[800px] flex-col gap-[20px] tablet:w-[85%]">
      <div className="flex w-full items-center justify-between">
        <Typography.Head3>스터디 만들기</Typography.Head3>
        <Badge>2/3 단계</Badge>
      </div>
      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit(onSubmit)}
          className="flex flex-col gap-[30px]"
        >
          <Card>
            <Card.Header className="mb-[30px]">
              <Typography.SubTitle1>스터디 설명</Typography.SubTitle1>
            </Card.Header>
            <Card.Content className="flex flex-col gap-[15px]">
              <Label htmlFor="editor" label="스터디 소개" required />
              <div
                aria-labelledby="editor-label"
                className="rounded-md border border-mos-gray-500"
              >
                <Editor
                  className="h-[500px]"
                  markdown={contents}
                  placeholder="스터디의 목표, 진행 방식, 기대 효과 등을 자세히 설명해주세요."
                  onChange={(value: string) => {
                    setContents(value);
                  }}
                />
              </div>
            </Card.Content>
          </Card>
          <input type="submit" onSubmit={() => onSubmit} />
        </form>
      </FormProvider>
    </div>
  );
};

export default CreateStudyForm2;
