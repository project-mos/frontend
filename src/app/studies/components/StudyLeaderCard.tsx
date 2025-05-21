import Button from "@/shared/components/atoms/Button";
import Card from "@/shared/components/atoms/Card";
import Profile from "@/shared/components/atoms/Profile";
import Typography from "@/shared/components/atoms/Typography";

import profileImg from "@/asset/images/profile_example.jpeg";
import { GetStudyMembersResponse } from "@/shared/types/api/studies";

interface StudyLeaderCardProps {
  data: GetStudyMembersResponse;
}

const StudyLeaderCard = ({ data }: StudyLeaderCardProps) => {
  const findLeader = data.find(
    (item) => item.studyMemberRoleType === "스터디장"
  );

  return (
    <Card className="h-auto">
      <Card.Header className="mb-[15px]">
        <Typography.SubTitle1>스터디장</Typography.SubTitle1>
      </Card.Header>

      <Card.Content className="mb-[20px]">
        <div className="flex items-center gap-[15px]">
          <Profile width={60} height={60} src={profileImg} />
          <div>
            <Typography.P3>{findLeader?.nickname}</Typography.P3>
            {/* <Typography.P3 className="mb-[5px] text-[14px] text-mos-gray-500">
              현직 네카라쿠배 개발자
            </Typography.P3> */}

            <div className="flex items-center ">
              {/* 참여율 표시해줄지  */}
              {Array(5)
                .fill(null)
                .map((item, index) => (
                  <i
                    className="bi bi-star-fill mr-[3px] text-yellow-500"
                    key={index}
                  ></i>
                ))}
              <Typography.P3 className="text-[15px] text-mos-gray-500">
                5
              </Typography.P3>
            </div>
          </div>
        </div>
      </Card.Content>

      <Card.Footer>
        <Button.Icon color="Main" active={true} className="w-full">
          <i className="bi bi-chat-dots"></i>
          메시지 보내기
        </Button.Icon>
      </Card.Footer>
    </Card>
  );
};

export default StudyLeaderCard;
