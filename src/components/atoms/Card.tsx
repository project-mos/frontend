import { cn } from "@/lib/utils";
import React, { HTMLAttributes } from "react";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
}

const Card = ({ className, children, ...props }: CardProps) => {
  return (
    <div
      className={cn(
        "flex flex-col box-border p-4 border-[1px] rounded-md border-mos-white-gray-300 shadow-md",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

const Header = ({ className, children, ...props }: CardProps) => {
  return (
    <div className={cn("flex", className)} {...props}>
      {children}
    </div>
  );
};

const Content = ({ className, children, ...props }: CardProps) => {
  return (
    <div className={cn("flex flex-col", className)} {...props}>
      {children}
    </div>
  );
};

const Footer = ({ className, children, ...props }: CardProps) => {
  return (
    <div className={cn("flex", className)} {...props}>
      {children}
    </div>
  );
};

// Card 컴포넌트에 서브 컴포넌트 추가
Card.Header = Header;
Card.Content = Content;
Card.Footer = Footer;

export default Card;
