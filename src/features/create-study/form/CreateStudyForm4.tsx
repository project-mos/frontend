"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useFormContext } from "react-hook-form";

import Button from "@/shared/components/atoms/Button";
import Card from "@/shared/components/atoms/Card";
import Tag from "@/shared/components/atoms/Tag";
import Typography from "@/shared/components/atoms/Typography";

import { StudyForm } from "@/entities/study/studies/api/studies.api.type";
import URL from "@/shared/constants/URL";
import MDEditor from "@uiw/react-md-editor";

const CreateStudyForm4 = () => {
  const { watch } = useFormContext<StudyForm>();
  const formData = watch();
  const router = useRouter();

  const handleCompleteButton = () => {
    localStorage.removeItem("studyForm");
    router.replace(URL.HOME);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="m-auto flex w-full flex-col gap-[20px] tablet:w-[85%]">
      <div className="flex flex-col  gap-3">
        <Card className="p-6">
          {/* <Card.Header className="mb-4 flex items-center justify-center">
          <Typography.Head3>스터디 생성 미리보기</Typography.Head3>
        </Card.Header> */}
          <Card.Content className="flex flex-col gap-4">
            <div>
              <Typography.SubTitle1 className="text-mos-gray-500">
                {formData.category}
              </Typography.SubTitle1>
              <Typography.Head2>{formData.title}</Typography.Head2>

              <div className="mb-4 mt-3 flex gap-2">
                {formData.tags?.map((tag, idx) => (
                  <Tag.Default key={idx}>
                    <Typography.P3>{tag}</Typography.P3>
                  </Tag.Default>
                ))}
              </div>
              <div className="flex flex-col gap-2">
                <Typography.P3>
                  <i className="bi bi-people mr-3" /> 모집 인원:{" "}
                  {formData.maxStudyMemberCount}명
                </Typography.P3>
                <Typography.P3>
                  <i className="bi bi-calendar mr-3" /> 모집 기간:{" "}
                  {formData.recruitmentStartDate} -{" "}
                  {formData.recruitmentEndDate}
                </Typography.P3>
                <Typography.P3>
                  <i className="bi bi-globe-americas mr-3" /> 진행 방식:{" "}
                  {formData.meetingType}
                </Typography.P3>
                <Typography.P3>
                  <i className="bi bi-clock mr-3" /> 진행 시간:{" "}
                  {formData.schedule}
                </Typography.P3>
              </div>
            </div>

            <MDEditor.Markdown source={formData.content} className="py-10" />

            <div className="flex flex-col gap-4">
              <div>
                <Typography.SubTitle1>참여 요건</Typography.SubTitle1>
                <p>{formData.requirements}</p>
              </div>

              <div className="flex flex-col gap-2">
                <Typography.SubTitle1>혜택</Typography.SubTitle1>
                <div>
                  {formData.benefits?.map((benefit) => (
                    <p key={benefit.benefitNum}>{benefit.content}</p>
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <Typography.SubTitle1>규칙 </Typography.SubTitle1>
                <div>
                  {formData.rules?.map((rule) => (
                    <p key={rule.ruleNum}>{rule.content}</p>
                  ))}
                </div>
              </div>
            </div>

            <Typography.SubTitle1>질문</Typography.SubTitle1>
            <div className="flex flex-col gap-2">
              {formData.applicationQuestions &&
              formData.applicationQuestions.length > 0 ? (
                formData.applicationQuestions?.map((question, index) => (
                  <div key={index} className="rounded-md border p-3">
                    <Typography.P1>
                      <strong>질문 {index + 1}</strong>{" "}
                      <span className="mr-2">
                        {question.required ? "*" : ""}
                      </span>
                      : {question.question}{" "}
                      <span className="text-[13px] text-mos-gray-300">
                        ({question.type})
                      </span>
                    </Typography.P1>

                    {question.options && question.options.length > 0 && (
                      <div className="mt-4">
                        <ul className="ml-4 flex list-disc flex-col gap-2">
                          {question.options.map((option, idx) => (
                            <li key={idx}>{option || "입력 없음"}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                ))
              ) : (
                <p>질문이 없습니다.</p>
              )}
            </div>
          </Card.Content>
        </Card>
        <Button.Solid
          active
          color="Main"
          className="m-auto w-[300px]"
          type="button"
          onClick={() => handleCompleteButton()}
        >
          완료
        </Button.Solid>
      </div>
    </div>
  );
};

export default CreateStudyForm4;
