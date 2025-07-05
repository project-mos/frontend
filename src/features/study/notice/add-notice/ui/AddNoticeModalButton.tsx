import Button from "@/shared/components/atoms/Button";

export const AddNoticeModalButton = ({ onClick }: { onClick: () => void }) => {
  return (
    <Button.Solid color="Main" active size="sm" onClick={onClick}>
      <i className="bi bi-plus text-[22px]"></i>
      공지 작성
    </Button.Solid>
  );
};
