import LandingContentCards from "@/features/landing/components/LandingContentCards";
import LandingContentHeader from "@/features/landing/components/LandingContentHeader";
import LandingLoginToast from "@/features/landing/components/LandingLoginToast";
import Pagination from "@/shared/components/molecules/Pagination";

import LandingStudiesBoundary from "@/features/landing/components/LandingStudiesBoundary";
import { GetCategories } from "@/features/landing/services/landing.service";
import { GetStudiesRequest } from "@/features/landing/types/landing.api";

interface HomeProps {
  searchParams: Promise<GetStudiesRequest>;
}

export default async function Home({ searchParams }: HomeProps) {
  const studiesRequest = await searchParams;
  const { page: currentPage } = studiesRequest;
  const categoriesData = await GetCategories();

  return (
    <div className="flex flex-col gap-10 ">
      <LandingLoginToast />
      <LandingContentHeader categories={categoriesData} />
      <LandingStudiesBoundary studiesRequest={studiesRequest}>
        {(studiesData) => {
          return (
            <>
              <LandingContentCards searchParams={studiesRequest} />
              <div className="flex justify-center">
                <Pagination
                  activePage={Number(currentPage || 1)}
                  totalPage={studiesData.totalPages}
                  scrollIntoViewID="landing-content-cards"
                />
              </div>
            </>
          );
        }}
      </LandingStudiesBoundary>
    </div>
  );
}
