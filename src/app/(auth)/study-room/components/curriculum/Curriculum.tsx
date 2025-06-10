import { memo, useCallback, useRef } from "react";
import { useFormContext } from "react-hook-form";

import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import { StudyCurriculumCardInterface } from "@/features/study-room/types/study-room.type";
import Card from "@/shared/components/atoms/Card";
import Input from "@/shared/components/atoms/Input";
import Tag from "@/shared/components/atoms/Tag";
import Textarea from "@/shared/components/atoms/Textarea";
import Typography from "@/shared/components/atoms/Typography";

const ItemType = "CURRICULUM_ITEM";

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
    (id: number) => {
      const updatedList = curriculumList.filter((item) => item.id !== id);
      setValue("curriculumList", updatedList);
    },
    [curriculumList, setValue]
  );

  // step, title, content 중 하나라도 에러가 있으면 true 에러가 없으면 false
  const hasAnyFieldError = (index: number) => {
    const error = errors?.curriculumList?.[index];
    return error?.sectionId || error?.title || error?.content;
  };

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
            {/* 삭제 아이콘 */}
            <i
              className="bi bi-trash3 cursor-pointer text-mos-coral-500"
              onClick={() => deleteCurriculum(curriculum.id!)}
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
              <Typography.Error>
                {hasAnyFieldError(index) &&
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
}: CurriculumItemProps & {
  moveItem: (dragIndex: number, hoverIndex: number) => void;
}) => {
  // DnD를 연결할 대상
  const ref = useRef<HTMLDivElement>(null);

  // 해당 항목이 드롭 대상이 되도록 설정
  const [, drop] = useDrop({
    accept: ItemType,
    // 이 항목이 드래그된 요소가 위에 올라왔을 때 반응할 수 있도록 설정
    hover(item: { index: number }, monitor) {
      if (!ref.current) return;
      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) return; // 위치가 그대로면 무시

      //  마우스 위치 계산
      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset!.y - hoverBoundingRect.top;

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) return;
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) return;

      // 위 조건을 통과하면 실제로 moveItem 호출해서 순서 바꿈
      moveItem(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });

  // 해당 항목이 드래그 가능한 항목이 되도록 설정
  const [{ isDragging }, drag] = useDrag({
    type: ItemType,
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(), // isDragging: 드래그 항목의 투명도 조절 기능
    }),
  });

  drag(drop(ref));

  return (
    <div ref={ref} style={{ opacity: isDragging ? 0.5 : 1 }}>
      <CurriculumEditView index={index} curriculum={curriculum} />
    </div>
  );
};

const Curriculum = ({ isModify }: CurriculumProps) => {
  const { watch, setValue } = useFormContext<{
    curriculumList: StudyCurriculumCardInterface[];
  }>();
  const curriculumList = watch("curriculumList");

  // dnd 아이템 이동
  // dragIndex: 드래그한 아이템의 인덱스 (클릭한 항목)
  // hoverIndex: 드래그한 아이템을 놓을 목표 인덱스
  const moveItem = (dragIndex: number, hoverIndex: number) => {
    const updatedList = [...curriculumList];
    const [draggedItem] = updatedList.splice(dragIndex, 1); // draggedItem: 기존 배열에서 이동시킬 아이템을 뽑아옴
    updatedList.splice(hoverIndex, 0, draggedItem); // 기존 배열의 hoverIndex 위치에 draggedItem을 삽입
    setValue("curriculumList", updatedList);
  };

  const renderItem = (
    curriculum: StudyCurriculumCardInterface,
    index: number
  ) =>
    isModify ? (
      <DraggableCurriculumEditView
        key={curriculum.id}
        index={index}
        curriculum={curriculum}
        moveItem={moveItem}
      />
    ) : (
      <CurriculumView
        key={curriculum.id}
        index={index}
        curriculum={curriculum}
      />
    );

  return (
    <DndProvider backend={HTML5Backend}>
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
