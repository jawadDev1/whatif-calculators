import { cn } from "@/lib/utils";
import React from "react";

export interface Props {
  children: React.ReactNode | string;
  className?: string;
}

const Heading = ({ children, className }: Props) => {
  return (
    <h1
      className={cn("md:text-3xl text-xl text-gray-950 font-[900]", className)}
    >
      {children}
    </h1>
  );
};

export default Heading;
