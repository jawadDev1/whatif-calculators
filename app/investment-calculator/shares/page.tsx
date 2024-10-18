import SharesPage from "@/components/pages/SharesPage/Index";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Check how much would have you made for shares, crypto and gold",
  description:
    "Choose from top stocks like Apple, Tesla, and more. Use our Investment Calculator to calculate the historical growth of your favorite shares.",
  alternates: {
    canonical: `https://whatifcalculators.com/investment-calculator/shares`,
  },
};

const page = ({
  searchParams,
}: {
  params: { [key: string]: string };
  searchParams: { [key: string]: string };
}) => {
  return (
    <>
      <SharesPage
        page={
          searchParams.hasOwnProperty("page") ? Number(searchParams.page) : 1
        }
      />
    </>
  );
};

export default page;
