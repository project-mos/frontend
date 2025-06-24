import StudyCategoryFilterButton from "@/features/study/study-filter/ui/StudyFilterButton";
import StudyFilterDropdown from "@/features/study/study-filter/ui/StudyFilterDropdown";
import StudyLikeFilterButton from "@/features/study/study-filter/ui/StudyLikeFilterButton";
import StudyBanner from "@/features/study/studies/ui/StudyBanner";
import { LandingContentHeaderProps } from "@/widget/landing/ui/landing.ui.types";

const LandingContentHeader = ({ categories }: LandingContentHeaderProps) => {
  return (
    <div>
      {/* Banner */}
      <StudyBanner />
      <div className="box-border flex size-full flex-col gap-3 py-6">
        {/* Buttons */}
        <StudyCategoryFilterButton categories={categories} />
        {/* Selects */}
        <div className="flex w-full flex-wrap items-center justify-center gap-2 ">
          <StudyFilterDropdown type="meet" />
          <StudyFilterDropdown type="recruitment" />
          <StudyLikeFilterButton />
        </div>
      </div>
    </div>
  );
};

export default LandingContentHeader;
