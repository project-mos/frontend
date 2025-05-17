import {
  createHotStudiesQueryOption,
  createStudiesQueryOptions,
} from "@/features/landing/services/landing.service";
import {
  GetStudiesRequest,
  GetStudiesResponse,
} from "@/shared/types/api/studies";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import React from "react";

interface LandingStudiesProps {
  studiesRequest: GetStudiesRequest;
  children: (studiesData: GetStudiesResponse) => React.ReactNode;
}

const LandingStudiesBoundary = async ({
  studiesRequest,
  children,
}: LandingStudiesProps) => {
  const queryClient = new QueryClient();

  const studiesData = await queryClient.fetchQuery(
    createStudiesQueryOptions(studiesRequest)
  );
  await queryClient.fetchQuery(createHotStudiesQueryOption());
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      {children(studiesData)}
    </HydrationBoundary>
  );
};

export default LandingStudiesBoundary;
