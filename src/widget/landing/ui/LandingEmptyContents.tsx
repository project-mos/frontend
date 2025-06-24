import Typography from "@/shared/components/atoms/Typography";

const LandingEmptyContents = ({ content }: { content: string }) => {
  return (
    <div className="col-span-4 flex h-80 w-full items-center justify-center border-none p-[15px] shadow-none">
      <Typography.Head2 className="text-mos-gray-700">
        {content}
      </Typography.Head2>
    </div>
  );
};

export default LandingEmptyContents;
