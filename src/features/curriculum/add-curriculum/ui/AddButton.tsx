import Button from "@/shared/components/atoms/Button";
import useAddCurriculum from "@/features/curriculum/add-curriculum/model/useAddCurriculum";

export const AddButton = () => {
  const { addCurriculum } = useAddCurriculum();

  return (
    <Button.Ghost
      color="Main"
      active
      className="h-[30px] p-0 pl-1.5 pr-3 text-[14px]"
      onClick={addCurriculum}
      type="button"
    >
      <i className="bi bi-plus text-[22px]"></i>
      커리큘럼 추가
    </Button.Ghost>
  );
};
