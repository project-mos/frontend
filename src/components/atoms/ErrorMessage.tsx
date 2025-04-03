import { ReactNode } from "react";
import Typography from "./Typography";

interface ErrorMessageProps {
  children: ReactNode;
}
const ErrorMessage = ({ children }: ErrorMessageProps) => {
  return (
    <Typography.P1 className="mb-[-24px] text-[12px] text-mos-coral-500">
      {children}
    </Typography.P1>
  );
};

export default ErrorMessage;
