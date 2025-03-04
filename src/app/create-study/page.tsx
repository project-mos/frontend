import Badge from "@/components/atoms/Badge";
import Card from "@/components/atoms/Card";
import Typography from "@/components/atoms/Typography";

const CreateStudyPage = () => {
  return (
    <>
      <div className="flex w-full justify-between items-center">
        <Typography.Head3>스터디 만들기</Typography.Head3>
        <Badge>1/2 단계</Badge>
      </div>

      <Card>
        <Card.Header>
          <Typography.SubTitle1>기본 정보</Typography.SubTitle1>
        </Card.Header>
      </Card>

      <Card>
        <Card.Header>
          <Typography.SubTitle1>진행 방식</Typography.SubTitle1>
        </Card.Header>
      </Card>
    </>
  );
};

export default CreateStudyPage;
