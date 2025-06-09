import LandingContentCards from "@/features/landing/components/LandingContentCards";
import LandingContentHeader from "@/features/landing/components/LandingContentHeader";
import LandingLoginToast from "@/features/landing/components/LandingLoginToast";
import Pagination from "@/shared/components/molecules/Pagination";

import { GetStudiesRequest } from "@/features/landing/types/landing.api";
import {
  getCategories,
  getHotStudies,
  getStudies,
} from "@/features/landing/services/landing.service";

interface HomeProps {
  searchParams: Promise<GetStudiesRequest>;
}

export default async function Home({ searchParams }: HomeProps) {
  const studiesRequest = await searchParams;
  const { page: currentPage } = studiesRequest;
  const categoriesData = await getCategories();
  const studiesData = await getStudies(studiesRequest);
  const hotStudiesData = await getHotStudies();

  return (
    <div className="flex flex-col gap-10 ">
      <LandingLoginToast />
      <LandingContentHeader categories={categoriesData} />
      <LandingContentCards
        studiesData={studiesData}
        hotStudiesData={hotStudiesData}
      />
      <div className="flex justify-center">
        <Pagination
          activePage={Number(currentPage || 1)}
          totalPage={studiesData.totalPages}
          scrollIntoViewID="landing-content-cards"
        />
      </div>
    </div>
  );
}
