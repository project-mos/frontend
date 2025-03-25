import { cn } from "@/lib/utils";

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  className?: string;
  name: string;
}

const Textarea = ({ className, ...props }: TextareaProps) => {
  return (
    <textarea
      className={cn(
        "h-[90px] w-full rounded-lg border border-mos-gray-100 p-[10px] text-[14px] text-mos-gray-700 placeholder:text-mos-gray-500 focus:border-mos-main-500 focus:outline-none focus:ring-mos-main-500",
        className
      )}
      {...props}
    />
  );
};

export default Textarea;
