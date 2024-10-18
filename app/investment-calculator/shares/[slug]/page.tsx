import React from "react";
import ShareDetailPage from "@/components/pages/ShareDetailPage/Index";
import type { Metadata } from "next";
import { getShareDetail } from "@/services/sharelistServices";
import { ShareListType } from "@/types";


type Props = {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const slug = decodeURI(
    `${params.slug.replace("-investment-calculator", "")}`
  );
  // fetch data
  const res = await getShareDetail(slug);
  const resMetadata = await res.json();

  if (!resMetadata.data.hasOwnProperty("share")) {
    return {
      title: ``,
      description: ``,
    };
  }

  const shares: ShareListType[] = JSON.parse(resMetadata.data.share ?? "");
  const share: ShareListType = shares[0];

  return {
    title: `${share.name} Investment Calculator | How much would have I made`,
    description: `See how much your investment in ${share.name} could have grown. Use the Investment Calculator to calculate how much your investments could have grown.`,
    alternates: {
      canonical: `https://whatifcalculators.com/investment-calculator/shares/${params.slug}`,
    },
  };
}

const page = ({
  params,
}: {
  params: { [key: string]: string };
  searchParams: { [key: string]: string };
}) => {
  const slug = decodeURI(
    `${params.slug.replace("-investment-calculator", "")}`
  );

  return <ShareDetailPage slug={slug} />;
};

export default page;
