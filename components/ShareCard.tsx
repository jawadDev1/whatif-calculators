import { ShareListType } from "@/types";
import React from "react";
import Content from "./ui/Content";
import Link from "next/link";

interface Props {
  share: ShareListType;
}

const ShareCard = ({ share }: Props) => {
  return (
    <Link
      href={encodeURI(
        `/investment-calculator/shares/${share.slug}-investment-calculator`
      )}
      className="hover:scale-105 min-h-fit transition-all flex items-center justify-center duration-200 ease-out shadow-lg cursor-pointer rounded-md px-3 py-1"
    >
      <Content className="">{share.name}</Content>
    </Link>
  );
};

export default ShareCard;
