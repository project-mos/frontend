import CreateStudyForm1 from "@/features/create-study/components/CreateStudyForm1";
import CreateStudyForm2 from "@/features/create-study/components/CreateStudyForm2";

const CreateStudyPage = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) => {
  const step = (await searchParams).step;
  const stepNumber = Number(step);

  if (stepNumber === 2) return <CreateStudyForm2 />;
  return <CreateStudyForm1 />;
};

export default CreateStudyPage;
