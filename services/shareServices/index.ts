import json from "@/lib/json";
import prisma from "@/lib/prisma";
import { fetchData, formatApiData } from "@/lib/utils";
import { NextResponse } from "next/server";

export const getLatestAndMonthShareValue = async (
  year: string,
  month: string,
  symbol: string,
  type?: string
) => {
  try {
    const userSelectedShare = await prisma.sharesData.findMany({
      where: {
        symbol: symbol,
        // date: {
        //   gte: '2016-01-31 05:00:00',
        //   lte: '2016-01-01 05:00:00',
        // },
        date: {
          gte: new Date(`${year}-${month}-01T00:00:00Z`),
          lte: new Date(`${year}-${month}-31T23:59:59Z`),
        },
      },
      orderBy: {
        close: "asc",
      },
      take: 1,
    });

    const latestShare = await prisma.sharesData.findMany({
      where: {
        symbol: symbol,
      },
      orderBy: {
        date: "desc",
      },
      take: 1,
    });

    if (latestShare.length === 0 || userSelectedShare.length === 0) {
      return NextResponse.json({
        status: 404,
        success: false,
        message: "no record found. please select another month or year",
        data: {
          latestShare: json(latestShare[0]),
          userSelectedShare: json(userSelectedShare[0]),
        },
      });
    }

    return NextResponse.json({
      status: 200,
      success: true,
      message: "Shares fetched successfully",
      data: {
        latestShare: json(latestShare[0]),
        userSelectedShare: json(userSelectedShare[0]),
      },
    });
  } catch (error) {
    console.log("Error in getLatestAndMonthShareValue ===> ", error);
    return NextResponse.json({
      status: 500,
      success: false,
      message: "Internal server error",
    });
  }
};
