import React, { ReactNode } from "react";
import Typography from "./Typography";

interface ErrorMessageProps {
  children: ReactNode;
}
const ErrorMessage = ({ children }: ErrorMessageProps) => {
  return (
    <Typography.P1 className="text-mos-coral-500">{children}</Typography.P1>
  );
};

export default ErrorMessage;
