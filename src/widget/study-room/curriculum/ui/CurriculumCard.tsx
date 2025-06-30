"use client";
import Card from "@/shared/components/atoms/Card";
import { FormProvider } from "react-hook-form";
import useCurriculumForm from "@/features/curriculum/form-curriculum/model/useCurriculumForm";
import CurriculumForm from "@/widget/study-room/curriculum/ui/CurriculumForm";

const CurriculumCard = ({ studyId }: { studyId: number }) => {
  const { methods, onSubmit } = useCurriculumForm(studyId);

  return (
    <Card className="col-span-12 h-fit min-h-[565px] gap-3 tablet:col-span-9 laptop:col-span-10">
      <FormProvider {...methods}>
        <form onSubmit={onSubmit}>
          <Card.Content>
            <CurriculumForm studyId={studyId} />
          </Card.Content>
        </form>
      </FormProvider>
    </Card>
  );
};

export default CurriculumCard;
