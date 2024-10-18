    import { cn } from "@/lib/utils";
    import React from "react";

    export interface Props {
    children: React.ReactNode | string;
    className?: string;
    }

    const SubHeading = ({ children, className }: Props) => {
    return (
        <h2
        className={cn(
            "md:text-2xl my-2 text-[17px] text-gray-950 font-[600]",
            className
        )}
        >
        {children}
        </h2>
    );
    };

    export default SubHeading;
