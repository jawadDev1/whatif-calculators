"use server";

import { getLatestAndMonthShareValue } from "@/services/shareServices";

export const GET_LATEST_AND_MONTH_SHARE = async (
  year: string,
  month: string,
  symbol: string,
  type?: string
) => {
  const res = await getLatestAndMonthShareValue(
    year,
    month,
    symbol,
    type
  );

  return await res.json();
};
