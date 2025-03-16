import Button from "@/components/atoms/Button";
import Card from "@/components/atoms/Card";
import Typography from "@/components/atoms/Typography";

interface ContentAdderBoxProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  buttonText: string;
  description: string;
  setIsInputBoxOpened: React.Dispatch<React.SetStateAction<boolean>>;
}

const ContentAdderBox = ({
  buttonText,
  description,
  setIsInputBoxOpened,
}: ContentAdderBoxProps) => {
  return (
    <Card>
      <Card.Content className="m-auto gap-[20px] py-[30px]">
        <Typography.P1 className="text-center text-[15px] text-mos-gray-700">
          {description}
        </Typography.P1>
        <Button.Default
          onClick={() => setIsInputBoxOpened(true)}
          active
          type="button"
          className="m-auto"
        >
          <i className="bi bi-plus"></i>
          {buttonText}
        </Button.Default>
      </Card.Content>
    </Card>
  );
};

export default ContentAdderBox;
