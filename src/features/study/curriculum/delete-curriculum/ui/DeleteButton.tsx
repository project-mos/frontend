import useDeleteCurriculum from "@/features/study/curriculum/delete-curriculum/model/useDeleteCurriculum";

export const DeleteButton = ({ sectionId }: { sectionId: number }) => {
  const { deleteCurriculum } = useDeleteCurriculum();
  return (
    <i
      className="bi bi-trash3 cursor-pointer text-mos-coral-500"
      onClick={() => deleteCurriculum(sectionId)}
    />
  );
};
