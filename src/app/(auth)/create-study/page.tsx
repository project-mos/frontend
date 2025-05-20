import CreateStudyForm from "@/features/create-study/form/CreateStudyForm";
import { cookies } from "next/headers";

const CreateStudyPage = async () => {
  const cookieStore = cookies();
  const accessToken = (await cookieStore).get("access-token")?.value;

  return <CreateStudyForm accessToken={accessToken} />;
};

export default CreateStudyPage;
