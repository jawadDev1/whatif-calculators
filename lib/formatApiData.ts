import { Share } from "@/types";

export const formatApiData = (data: {
  [key: string]: { [key: string]: string | number }[];
}) => {
  const all_data: Share[] = Object.keys(data).map((share) => {
    return {
      symbol: share.toUpperCase().replace("-USD", ""),
      date: new Date(data[share][0].Date),
      open: Number(data[share][0].Open),
      high: Number(data[share][0].High),
      low: Number(data[share][0].Low),
      close: Number(data[share][0].Close),
      volume: Number(data[share][0].Volume),
    };
  });

  return all_data;
};
