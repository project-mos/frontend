import CreateStudyForm from "@/features/create-study/form/CreateStudyForm";
import LandingLoginToast from "@/features/landing/components/LandingLoginToast";

const CreateStudyPage = async () => {
  return (
    <div>
      <LandingLoginToast />
      <CreateStudyForm />
    </div>
  );
};

export default CreateStudyPage;
