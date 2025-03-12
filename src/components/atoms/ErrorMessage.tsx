import React, { ReactNode } from "react";
import Typography from "./Typography";

interface ErrorMessageProps {
  children: ReactNode;
}
const ErrorMessage = ({ children }: ErrorMessageProps) => {
  return children !== "" ? (
    <Typography.P1 className="mb-[-25px] mt-[-20px] text-[13px] text-mos-coral-500">
      {children}
    </Typography.P1>
  ) : (
    <div className="h-[13px]"></div>
  );
};

export default ErrorMessage;
