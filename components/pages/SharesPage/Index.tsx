import ShareCard from "@/components/ShareCard";

import { getSharesList } from "@/services/sharelistServices";
import { ShareListType } from "@/types";

import PaginationComponent from "@/components/Pagination";

import { getTotalPages } from "@/services/sharelistServices";
import Link from "next/link";
import { ChevronRightIcon } from "@radix-ui/react-icons";

import SubHeading from "@/components/ui/SubHeading";
import Heading from "@/components/ui/Heading";

const SharesPage = async ({ page }: { page: number }) => {
  const res = await getSharesList(page || 1);
  const response = await res.json();

  const shares: ShareListType[] = JSON.parse(response.data.shares);

  const res2 = await getTotalPages();
  const response2 = await res2.json();
  const totalPages = Math.ceil(response2.data.totalPages);

  return (
    <>
      <div className="py-8 md:px-8 px-5 md:w-[70%] mx-auto ">
        <div className="flex items-center justify-start">
          <Link
            href={"/investment-calculator"}
            className="md:text-lg text-sm hover:font-bold"
          >
            Home
          </Link>
          <ChevronRightIcon className="md:w-5 w-4 h-4 md:h-6" />

          <Link href={"#"} className="md:text-lg text-sm ">
            Shares
          </Link>
        </div>
        <Heading className="text-center md:mb-2 mb-1">
          List of share calculators
        </Heading>
        <SubHeading className="text-center md:mb-9 mb-5">
          The comprehensive list of calculators for shares, crypto and gold
        </SubHeading>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 px-3 gap-4 md:gap-9 min-h-[65vh]">
          {shares.length > 0 &&
            shares.map((share, i) => <ShareCard key={i} share={share} />)}
        </div>

        <PaginationComponent totalPages={totalPages} page={page} />
      </div>
    </>
  );
};

export default SharesPage;
