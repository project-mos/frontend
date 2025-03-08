import { cn } from "@/lib/utils";
import { useFormContext } from "react-hook-form";

interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  className?: string;
  name: string;
}

const Textarea = ({ className, name, ...props }: TextareaProps) => {
  const { register } = useFormContext();

  return (
    <textarea
      {...register(name)}
      className={cn(
        "h-[90px] w-full rounded-lg border border-mos-gray-100 p-[10px] text-[14px] text-mos-gray-700 placeholder:text-mos-gray-300 focus:border-mos-main-500 focus:outline-none focus:ring-mos-main-500",
        className
      )}
      {...props}
    />
  );
};

export default Textarea;
