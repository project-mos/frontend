import Button from "@/shared/components/atoms/Button";

export const AddNoticeButton = ({
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
      등록
    </Button.Solid>
  );
};
