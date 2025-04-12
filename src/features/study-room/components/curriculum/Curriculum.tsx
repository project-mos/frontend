import { StudyCurriculumCardInterface } from "@/types/api/study-room";
import Card from "../../../../components/atoms/Card";
import Tag from "../../../../components/atoms/Tag";
import Typography from "../../../../components/atoms/Typography";
import Input from "@/components/atoms/Input";
import Textarea from "@/components/atoms/Textarea";
import { memo, useCallback } from "react";
import { useFormContext } from "react-hook-form";
import ErrorMessage from "@/components/atoms/ErrorMessage";

interface CurriculumProps {
  isModify: boolean;
}

interface CurriculumItemProps {
  index: number;
  curriculum: StudyCurriculumCardInterface;
}

type FormValues = {
  curriculumList: StudyCurriculumCardInterface[];
};

const CurriculumView = ({ index, curriculum }: CurriculumItemProps) => (
  <div className="flex gap-[20px]" key={index}>
    <div>
      <Tag.Main className="flex h-[30px] w-[100px] flex-col text-nowrap pt-[4px]">
        <Typography.P3 className="pt-px font-bold">
          {curriculum.step}
        </Typography.P3>
      </Tag.Main>
      <div
        className="ml-[10px] w-[2px] bg-[#DCDCDC]"
        style={{ height: "calc(75%)" }}
      ></div>
    </div>

    <div className="w-full">
      <Card className="col-span-12 mb-[20px] flex flex-col border-none bg-mos-white-gray-100 shadow-none">
        <Card.Header>
          <Typography.SubTitle1 className="-mt-px mb-[5px] text-[18px]">
            {curriculum.title}
          </Typography.SubTitle1>
        </Card.Header>

        <Card.Content>
          <Typography.P3 className="mb-[10px] text-mos-gray-700">
            {curriculum.content}
          </Typography.P3>
        </Card.Content>
      </Card>
    </div>
  </div>
);

const CurriculumEditView = ({ index, curriculum }: CurriculumItemProps) => {
  // react-hook-form
  const {
    register,
    getValues,
    setValue,
    formState: { errors },
  } = useFormContext<FormValues>();
  const curriculumList = getValues("curriculumList");

  // 커리큘럼 삭제
  const deleteCurriculum = useCallback(
    (id: string) => {
      const updatedList = curriculumList.filter((item) => item.id !== id);
      setValue("curriculumList", updatedList);
    },
    [curriculumList, setValue]
  );

  // step, title, content 중 하나라도 에러가 있으면 true 에러가 없으면 false
  const hasAnyFieldError = (index: number) => {
    const error = errors?.curriculumList?.[index];
    return error?.step || error?.title || error?.content;
  };

  return (
    <div className="flex gap-[5px]">
      <div>
        {/* 카테고리 */}
        <Input
          {...register(`curriculumList.${index}.step`, {
            required: "필수 입력입니다.",
          })}
          defaultValue={curriculum.step}
          className="h-[30px] w-[107px] min-w-0 border border-mos-main"
        />
        <div
          className="ml-[10px] w-[2px] bg-[#DCDCDC]"
          style={{ height: "calc(85%)" }}
        ></div>
      </div>

      <div className="flex w-full">
        <i className="bi bi-arrow-down-up h-6 cursor-grab text-[16px] text-mos-gray-500 hover:text-mos-main active:cursor-grabbing"></i>
        <Card className="mb-[20px] flex h-auto w-full flex-col border border-none bg-mos-white-gray-100 shadow-none">
          <Card.Header className="mb-3 flex w-full">
            {/* 제목 */}
            <Input
              {...register(`curriculumList.${index}.title`, {
                required: "필수 입력입니다.",
              })}
              defaultValue={curriculum.title}
              className="h-[30px] w-[99%]"
            />
            {/* 삭제 아이콘 */}
            <i
              className="bi bi-trash3 cursor-pointer text-mos-coral-500"
              onClick={() => deleteCurriculum(curriculum.id)}
            />
          </Card.Header>

          <Card.Content className="flex flex-col gap-1">
            <div className="mb-6 flex w-full flex-col gap-1">
              {/* 내용 */}
              <Textarea
                {...register(`curriculumList.${index}.content`, {
                  required: "필수 입력입니다.",
                })}
                defaultValue={curriculum.content}
              />
              <ErrorMessage>
                {hasAnyFieldError(index) &&
                  "해당 커리큘럼 항목의 모든 정보를 입력해주세요."}
              </ErrorMessage>
            </div>
          </Card.Content>
        </Card>
      </div>
    </div>
  );
};

const Curriculum = ({ isModify }: CurriculumProps) => {
  const { watch } = useFormContext<{
    curriculumList: StudyCurriculumCardInterface[];
  }>();
  const curriculumList = watch("curriculumList");

  return curriculumList.map((curriculum, index) =>
    isModify ? (
      <CurriculumEditView
        key={curriculum.id}
        index={index}
        curriculum={curriculum}
      />
    ) : (
      <CurriculumView
        key={curriculum.id}
        index={index}
        curriculum={curriculum}
      />
    )
  );
};

export default memo(Curriculum);
