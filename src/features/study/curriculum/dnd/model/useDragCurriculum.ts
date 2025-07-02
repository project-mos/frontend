import { useRef } from "react";
import { useDrag, useDrop } from "react-dnd";

const ItemType = "CURRICULUM_ITEM";

const useDragCurriculum = (
  index: number,
  moveItem: (dragIndex: number, hoverIndex: number) => void
) => {
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

  return {
    ref,
    isDragging,
  };
};

export default useDragCurriculum;
