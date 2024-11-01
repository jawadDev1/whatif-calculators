import { ShareListType } from "@/types";

export  const generateSymbolsString = (
  sharesList: {
    name: string;
    symbol: string;
    type: string | null;
  }[]
) => {
  let symbolsString = "";

  sharesList.forEach((share) => {
    if (share.type === "crypto") {
      symbolsString += ` ${share.symbol}-USD`;
    } else {
      symbolsString += ` ${share.symbol}`;
    }
  });

  return symbolsString.trim();
};
