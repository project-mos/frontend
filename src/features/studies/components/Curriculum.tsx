import { StudyCurriculumInterface } from "@/types/api/studies/detail";
import { StudyCurriculumCardInterface } from "@/types/api/study-room";
import { MockCurriculumCardApiResult } from "@/app/mock/api/study-room";
import Card from "../../../components/atoms/Card";
import Tag from "../../../components/atoms/Tag";
import Typography from "../../../components/atoms/Typography";
import Input from "@/components/atoms/Input";
import Textarea from "@/components/atoms/Textarea";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";

interface CurriculumProps {
  isModify?: boolean;
  isAddingCurriculum?: boolean;
  setIsAddingCurriculum?: Dispatch<SetStateAction<boolean>>;
}

interface CurriculumItemProps {
  index: number;
  curriculum: StudyCurriculumInterface | StudyCurriculumCardInterface;
}

interface CurriculumEditProps extends CurriculumItemProps {
  handleDeleteCurriculum: (id: string) => void;
}

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
        style={{ height: "calc(70%)" }}
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

        {"task" in curriculum && (
          <Card.Footer>
            <div className="flex gap-[50px]">
              {curriculum.task?.map((task) => (
                <Typography.P3 className="text-[14px] font-bold" key={task}>
                  {task}
                </Typography.P3>
              ))}
            </div>
          </Card.Footer>
        )}
      </Card>
    </div>
  </div>
);

const CurriculumEditView = ({
  index,
  curriculum,
  handleDeleteCurriculum,
}: CurriculumEditProps) => {
  const { register } = useFormContext();

  return (
    <div className="flex gap-[20px]">
      <div>
        <Input
          {...register(`curriculumList.${index}.step`)}
          defaultValue={curriculum.step}
          className="h-[30px] w-[107px] min-w-0 border border-mos-main"
        />
        <div
          className="ml-[10px] w-[2px] bg-[#DCDCDC]"
          style={{ height: "calc(70%)" }}
        ></div>
      </div>

      <div className="w-full">
        <Card className="col-span-12 mb-[20px] flex flex-col border-none bg-mos-white-gray-100 shadow-none">
          <Card.Header>
            <Input
              {...register(`curriculumList.${index}.title`)}
              defaultValue={curriculum.title}
              className="mb-2 h-[30px] w-[99%]"
            />
            <i
              className="bi bi-trash3 cursor-pointer text-mos-coral-500"
              onClick={() =>
                handleDeleteCurriculum(
                  (curriculum as StudyCurriculumCardInterface).id
                )
              }
            />
          </Card.Header>

          <Card.Content>
            <Textarea
              {...register(`curriculumList.${index}.content`)}
              defaultValue={curriculum.content}
            />
          </Card.Content>
        </Card>
      </div>
    </div>
  );
};

const Curriculum = ({
  isModify,
  isAddingCurriculum,
  setIsAddingCurriculum,
}: CurriculumProps) => {
  const [curriculumList, setCurriculumList] = useState<
    StudyCurriculumCardInterface[]
  >(MockCurriculumCardApiResult);

  const { setValue } = useFormContext();

  useEffect(() => {
    if (isAddingCurriculum) {
      handleAddCurriculum();
      setIsAddingCurriculum?.(false);
    }
  }, [isAddingCurriculum]);

  const handleAddCurriculum = () => {
    setCurriculumList((prev) => [
      ...prev,
      { id: crypto.randomUUID(), step: "", title: "", content: "" },
    ]);
  };

  const handleDeleteCurriculum = (id: string) => {
    setCurriculumList((prev) => {
      const updatedList = prev.filter((item) => item.id !== id);
      setValue("curriculumList", updatedList); // react-hook-form의 상태도 동기화
      return updatedList;
    });
  };

  return curriculumList.map((curriculum, index) =>
    isModify ? (
      <CurriculumEditView
        key={curriculum.id}
        index={index}
        curriculum={curriculum}
        handleDeleteCurriculum={handleDeleteCurriculum}
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

export default Curriculum;
