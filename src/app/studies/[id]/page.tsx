import Button from "@/components/atoms/Button";
import Card from "@/components/atoms/Card";
import Grid from "@/components/atoms/Grid";
import ShareCard from "@/features/studies-detail/components/ShareCard";
import StudyLeaderCard from "@/features/studies-detail/components/StudyLeaderCard";
import React from "react";

const page = () => {
  return (
    <>
      <Card className="col-span-8 min-h-screen"></Card>
      <Grid className="col-span-4 flex flex-col gap-5">
        <StudyLeaderCard />
        <ShareCard />
      </Grid>
    </>
  );
};

export default page;
