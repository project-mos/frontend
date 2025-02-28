import { MockStudiesApiResult } from "@/app/mock/api/studies";
import Card from "@/components/atoms/Card";
import StudyDescriptionCard from "@/features/studies/components/StudyDescriptionCard";
import React from "react";

const page = () => {
  return (
    <>
      <StudyDescriptionCard data={MockStudiesApiResult} />
      <Card className="col-span-4 flex flex-col h-20 "></Card>
    </>
  );
};

export default page;
