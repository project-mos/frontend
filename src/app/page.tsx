import LandingContentCards from "@/features/landing/components/LandingContentCards";
import Pagination from "@/shared/components/molecules/Pagination";

import LandingContentHeader from "@/features/landing/components/LandingContentHeader";
import LandingLoginToast from "@/features/landing/components/LandingLoginToast";

import { GetStudiesRequest } from "@/shared/types/api/studies";

import LandingStudiesBoundary from "@/features/landing/components/LandingStudiesBoundary";

interface HomeProps {
  searchParams: Promise<GetStudiesRequest>;
}

export default async function Home({ searchParams }: HomeProps) {
  const studiesRequest = await searchParams;
  const { page: currentPage } = studiesRequest;

  return (
    <div className="flex flex-col gap-10 ">
      <LandingLoginToast />
      <LandingContentHeader />
      <LandingStudiesBoundary studiesRequest={studiesRequest}>
        {(studiesData) => {
          return (
            <>
              <LandingContentCards searchParams={studiesRequest} />
              <div className="flex justify-center">
                <Pagination
                  activePage={Number(currentPage || 1)}
                  totalPage={studiesData.totalPages}
                />
              </div>
            </>
          );
        }}
      </LandingStudiesBoundary>
    </div>
  );
}
