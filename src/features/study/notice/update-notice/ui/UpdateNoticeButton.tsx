import Button from "@/shared/components/atoms/Button";

export const UpdateNoticeButton = ({
  isActiveBtn,
  disabled,
}: {
  isActiveBtn: boolean;
  disabled: boolean;
}) => {
  return (
    <Button.Solid
      type="submit"
      color="Main"
      active={isActiveBtn}
      disabled={disabled}
    >
      수정
    </Button.Solid>
  );
};
