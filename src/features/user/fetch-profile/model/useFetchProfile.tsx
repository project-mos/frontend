import { useUserInfoQueryOption } from "@/entities/user/model/user.queries";
import profileImg from "@/asset/images/defaultProfile.png";

const useFetchProfile = () => {
  // 유저 정보 조회
  const { data: userInfo } = useUserInfoQueryOption();
  const {
    nickname = "이름",
    introduction = "한 줄 소개를 등록해 주세요.",
    imagePath = profileImg,
  } = userInfo || {};

  return { nickname, introduction, imagePath, userInfo };
};

export default useFetchProfile;
