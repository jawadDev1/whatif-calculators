import { cn } from "@/lib/utils";
import React from "react";

export interface Props {
  children: React.ReactNode | string;
  className?: string;
}

const SubHeading = ({ children, className }: Props) => {
  return (
    <p
      className={cn(
        "text-center my-4 text-sm md:text-[16px] md:leading-6",
        className
      )}
    >
      {children}
    </p>
  );
};

export default SubHeading;
