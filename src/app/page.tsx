import LandingContentCards from "@/widget/landing/ui/LandingContentCards";
import LandingContentHeader from "@/widget/landing/ui/LandingContentHeader";
import LandingLoginToast from "@/widget/landing/ui/LandingLoginToast";
import Pagination from "@/shared/components/molecules/Pagination";

import { getCategories } from "@/entities/study/category/api/category.api";
import {
  getHotStudies,
  getStudies,
} from "@/entities/study/studies/api/studies.api";
import { GetStudiesRequest } from "@/entities/study/studies/api/studies.api.type";

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
