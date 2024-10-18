import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { FAQ, Share, ShareListType, TmetaData, TtimeSeries } from "../types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Get the date when share was made available for public purchase
export const getShareIpoYear = (share: ShareListType) => {
  return new Date(share.ipoDate).getFullYear();
};

export const getShareIpoMonth = (share: ShareListType) => {
  return new Date(share.ipoDate).getMonth();
};

export const calculateReturns = (
  latestShareValue: number,
  shareValueAtMonth: number,
  amount: number
) => {
  return (amount / shareValueAtMonth) * latestShareValue;
};

export const formatApiData = (
  data: {
    "Meta Data": TmetaData;
    [key: string]: TmetaData | TtimeSeries;
  },
  functionType: string = "Monthly Time Series"
): Share[] => {
  const symbol = data["Meta Data"]["2. Symbol"] as unknown as string;

  const shares = Object.entries(data[functionType] as TtimeSeries).map(
    ([key, value]): Share => ({
      symbol,
      date: new Date(key),
      open: Number(value["1. open"]),
      high: Number(value["2. high"]),
      low: Number(value["3. low"]),
      close: Number(value["4. close"]),
      volume: Number(value["5. volume"]),
    })
  );

  return shares;
};

export const fetchData = async (
  symbol: string,
  apikeyType: string = "public",
  functionType: string = "TIME_SERIES_MONTHLY"
) => {
  const apiKey: string | undefined =
    apikeyType === "private"
      ? process.env.ALPHA_VANTAGE_PRIVATE_API_KEY
      : process.env.ALPHA_VANTAGE_FREE_API_KEY;

  const res = await fetch(
    `${process.env.ALPHA_VANTAGE_API_URL}/query?function=${functionType}&symbol=${symbol}&apikey=${apiKey}`,
    {
      cache: "no-cache",
    }
  );

  return await res.json();
};

// Replace the {{ShareName}} and other values with the actual share name
export const replaceShareNameInFaqs = (
  faqs: FAQ[],
  replaceValues: { shareName: string; year: string }
) => {
  const diff = new Date().getFullYear() - Number(replaceValues.year);
  const randomYear = Math.floor(Math.random() * diff);

  const correction: { [key: string]: string } = {
    "{{ShareName}}": replaceValues.shareName,
    "{{NumberOfYears}}": String(randomYear),
    "{{Year}}": replaceValues.year,
  };

  const replacedFaqs = faqs.map((faq) => {
    let quesiton = faq.question;
    let answer = faq.answer;

    Object.keys(correction).forEach((val) => {
      quesiton = quesiton.replaceAll(val, correction[val]);
    });

    Object.keys(correction).forEach((val) => {
      answer = answer.replaceAll(val, correction[val]);
    });

    return {
      question: quesiton,
      answer: answer,
    };
  });

  return replacedFaqs;
};

// Get Shares Data
export const getShareDailyData = async (symbol: string) => {
  const res = await fetch(
    `${process.env.SHARE_DATA_API_URL}/stock/daily/${symbol}`,
    {
      cache: "no-cache",
    }
  );
  const result = await res.json();

  if (!result.success) {
    return {
      success: false,
    };
  }

  const share = result.data;

  const data = {
    symbol: symbol.toUpperCase().replace("-USD", ""),
    date: new Date(share.Date),
    open: share.Open,
    high: share.High,
    low: share.Low,
    close: share.Close,
    volume: share.Volume,
  };

  return { data, success: true };
};
