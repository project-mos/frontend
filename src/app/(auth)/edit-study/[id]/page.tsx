import { getStudy } from "@/entities/study/studies/api/studies.api";
import EditStudyForm from "@/features/edit-study/form/EditStudyForm";

const EditStudyPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;
  const study = await getStudy(id);

  return <EditStudyForm study={study} />;
};

export default EditStudyPage;
