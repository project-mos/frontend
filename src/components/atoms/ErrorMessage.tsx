import React, { ReactNode } from "react";
import Typography from "./Typography";

interface ErrorMessageProps {
  children: ReactNode;
}
const ErrorMessage = ({ children }: ErrorMessageProps) => {
  return (
    <Typography.P1 className="mb-[-25px] mt-[-20px] text-[13px] text-mos-coral-500">
      {children}
    </Typography.P1>
  );
};

export default ErrorMessage;
