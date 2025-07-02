import { memo } from "react";
import { FieldError, useFormContext } from "react-hook-form";

import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import Card from "@/shared/components/atoms/Card";
import Input from "@/shared/components/atoms/Input";
import Tag from "@/shared/components/atoms/Tag";
import Textarea from "@/shared/components/atoms/Textarea";
import Typography from "@/shared/components/atoms/Typography";
import { StudyCurriculumCardInterface } from "@/entities/study/curriculum/model/curriculum.types";
import useDragCurriculum from "@/features/study/curriculum/dnd/model/useDragCurriculum";
import Button from "@/shared/components/atoms/Button";
import useAddCurriculum from "@/features/study/curriculum/add-curriculum/model/useAddCurriculum";
import { DeleteButton } from "@/features/study/curriculum/delete-curriculum/ui/DeleteButton";
import useUpdateCurriculum from "@/features/study/curriculum/update-curriculum/model/useUpdateCurriculum";
import { AddButton } from "@/features/study/curriculum/add-curriculum/ui/AddButton";

interface CurriculumProps {
  studyId: number;
}

interface CurriculumItemProps {
  index: number;
  curriculum: StudyCurriculumCardInterface;
  studyId: number;
  hasAnyFieldError?: (index: number) => FieldError | undefined;
}

const CurriculumView = ({ index, curriculum }: CurriculumItemProps) => (
  <div className="flex gap-[20px]" key={index}>
    <div>
      <Tag.Main className="flex h-[30px] w-[100px] flex-col text-nowrap pt-[4px]">
        <Typography.P3 className="pt-px font-bold">
          {curriculum.sectionId}
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

const CurriculumEditView = ({
  index,
  curriculum,
  hasAnyFieldError,
}: CurriculumItemProps) => {
  const { register } = useFormContext();

  return (
    <div className="flex gap-[5px]">
      <div>
        {/* 카테고리 */}
        <Input
          {...register(`curriculumList.${index}.sectionId`, {
            required: "필수 입력입니다.",
          })}
          defaultValue={curriculum.sectionId}
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
            {/* 삭제 버튼 */}
            <DeleteButton sectionId={curriculum.sectionId!} />
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
              <Typography.Error>
                {hasAnyFieldError!(index) &&
                  "해당 커리큘럼 항목의 모든 정보를 입력해주세요."}
              </Typography.Error>
            </div>
          </Card.Content>
        </Card>
      </div>
    </div>
  );
};

const DraggableCurriculumEditView = ({
  index,
  curriculum,
  moveItem,
  studyId,
  hasAnyFieldError,
}: CurriculumItemProps & {
  moveItem: (dragIndex: number, hoverIndex: number) => void;
}) => {
  const { ref, isDragging } = useDragCurriculum(index, moveItem);

  return (
    <div ref={ref} style={{ opacity: isDragging ? 0.5 : 1 }}>
      <CurriculumEditView
        index={index}
        curriculum={curriculum}
        studyId={studyId}
        hasAnyFieldError={hasAnyFieldError}
      />
    </div>
  );
};

const Curriculum = ({ studyId }: CurriculumProps) => {
  const {
    setIsCreateState,
    curriculumList,
    isValidCurriculum,
    hasAnyFieldError,
  } = useAddCurriculum();

  const { isModifyState, setIsModifyState, moveItem } = useUpdateCurriculum();

  const renderItem = (
    curriculum: StudyCurriculumCardInterface,
    index: number
  ) =>
    isModifyState ? (
      <DraggableCurriculumEditView
        key={curriculum.sectionId}
        index={index}
        curriculum={curriculum}
        moveItem={moveItem}
        studyId={studyId}
        hasAnyFieldError={hasAnyFieldError}
      />
    ) : (
      <CurriculumView
        key={curriculum.sectionId}
        index={index}
        curriculum={curriculum}
        studyId={studyId}
      />
    );

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="mb-4 flex items-center justify-between">
        <Typography.SubTitle1>커리큘럼</Typography.SubTitle1>
        <div className="flex gap-2">
          {isModifyState && <AddButton />}

          <Button.Solid
            color="Main"
            className="h-[30px] text-[14px]"
            onClick={() => {
              setIsCreateState(true);
              setIsModifyState((prev) => !prev);
            }}
            type={isModifyState ? "button" : "submit"}
            active={isValidCurriculum}
          >
            {curriculumList.length === 0
              ? "등록"
              : isModifyState
              ? "저장"
              : "수정"}
          </Button.Solid>
        </div>
      </div>
      {curriculumList.length === 0 && (
        <div className="flex h-[480px] items-center justify-center">
          <Typography.P3 className="text-center">
            등록된 커리큘럼이 없습니다.
          </Typography.P3>
        </div>
      )}
      {curriculumList.map((curriculum, index) => renderItem(curriculum, index))}
    </DndProvider>
  );
};

export default memo(Curriculum);
