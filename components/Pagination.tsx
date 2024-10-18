"use client";
import React from "react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";

const PaginationComponent = ({
  page,
  totalPages,
}: {
  page: number;
  totalPages: number;
}) => {
  const router = useRouter();
  const pathname = usePathname();

  const handlePagination = (type: string) => {
    if (type === "next") {
      router.replace(`${pathname}?page=${page + 1}`);
    } else {
      router.replace(`${pathname}?page=${page - 1}`);
    }
  };

  return (
    <div>
      <Pagination className="my-8">
        <PaginationContent>
          <PaginationItem
            onClick={() => handlePagination("prev")}
            className={cn("cursor-pointer", { hidden: page == 1 })}
          >
            <PaginationPrevious />
          </PaginationItem>

          <PaginationItem>
            <PaginationLink href={`?page=${page}`}>{page}</PaginationLink>
          </PaginationItem>

          <PaginationItem
            onClick={() => handlePagination("next")}
            className={cn("cursor-pointer", { hidden: page == totalPages })}
          >
            <PaginationNext />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default PaginationComponent;
