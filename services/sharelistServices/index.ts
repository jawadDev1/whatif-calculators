import json from "@/lib/json";
import prisma from "@/lib/prisma";
import { ShareListRes } from "@/types";
import { NextResponse } from "next/server";

export const getTop40Shares = async () => {
  try {
    const allShares = await prisma.topSharesList.findMany({});

    const cryptos = allShares
      .filter((share) => share.type === "crypto")
      .slice(0, 5);
    const gold = allShares.filter((share) => share.type === "gold");
    const top40Shares = allShares
      .filter((share) => share.type === "share")
      .slice(0, 34);

    return NextResponse.json({
      status: 200,
      message: "Shares fetched successfully",
      data: { top40Shares: json([...gold, ...cryptos, ...top40Shares]) },
    });
  } catch (error) {
    console.log("Error in getTop40Shares ===> ", error);
    return NextResponse.json({ status: 500, message: "Internal server error" });
  }
};

export const searchShares = async (query: string) => {
  try {
    let search = `%${query.split(" ").join(".*")}%`;
    const shares: ShareListRes[] =
      await prisma.$queryRaw`SELECT * FROM public."TopSharesList" WHERE LOWER(name) LIKE LOWER(${search}) ORDER BY volume DESC 
LIMIT 10`;

    return NextResponse.json({
      status: 200,
      message: "Shares fetched successfully",
      data: { shares: json(shares) },
    });
  } catch (error) {
    console.log("Error in searchShares ===> ", error);
    return NextResponse.json({ status: 500, message: "Internal server error" });
  }
};

export const getTop5Links = async (skipShare: string) => {
  try {
    const skip = Math.floor(Math.random() * 40);

    const top3 = await prisma.topSharesList.findMany({
      where: {
        type: "share",
        NOT: {
          symbol: {
            contains: skipShare,
          },
        },
      },
      skip: skip,
      take: 2,
    });

    const cryptoSkip = Math.floor(Math.random() * 17);
    const crypto = await prisma.topSharesList.findMany({
      where: {
        type: "crypto",
        NOT: {
          symbol: {
            contains: skipShare,
          },
        },
      },
      skip: cryptoSkip,
      take: 1,
    });

    const top2Skip = Math.floor(Math.random() * 60) + 40;

    const top2 = await prisma.topSharesList.findMany({
      where: {
        NOT: {
          symbol: {
            contains: skipShare,
          },
        },
      },
      skip: top2Skip,
      take: 2,
    });

    return NextResponse.json({
      status: 200,
      message: "Shares fetched successfully",
      data: { top5Links: json([...top3, ...crypto, ...top2]) },
    });
  } catch (error) {
    console.log("Error in getTop5Links ===> ", error);
    return NextResponse.json({ status: 500, message: "Internal server error" });
  }
};

export const getShareDetail = async (slug: string) => {
  try {
    let search = `${slug.toLocaleLowerCase()}`;
    const share: ShareListRes[] =
      await prisma.$queryRaw`SELECT * FROM public."TopSharesList" WHERE LOWER(slug)=${search} `;

    if (share.length === 0) {
      return NextResponse.json({
        success: false,
        status: 404,
        message: "Shares not found",
        data: {},
      });
    }

    return NextResponse.json({
      success: true,
      status: 200,
      message: "Shares fetched successfully",
      data: { share: json(share) },
    });
  } catch (error) {
    console.log("Error in getTop5Links ===> ", error);
    return NextResponse.json({
      success: false,
      status: 500,
      message: "Internal server error",
    });
  }
};

export const getAllShares = async () => {
  try {
    const shares = await prisma.topSharesList.findMany({});

    return NextResponse.json({
      success: true,
      status: 200,
      message: "Shares fetched successfully",
      data: { shares: json(shares) },
    });
  } catch (error) {
    console.log("Error in getAllShares ===> ", error);
    return NextResponse.json({
      success: false,
      status: 500,
      message: "Internal server error",
    });
  }
};

export const getSharesList = async (page: number) => {
  try {
    const shares = await prisma.topSharesList.findMany({
      skip: (page - 1) * 20,
      take: 20,
    });

    // const shares: ShareListRes[] = await prisma.$queryRaw`  SELECT *
    //   FROM public."TopSharesList"
    //   ORDER BY id ASC
    //   OFFSET ${(page - 1) * 20}
    //   Limit 20`;

    return NextResponse.json({
      success: true,
      status: 200,
      message: "Shares fetched successfully",
      data: { shares: json(shares) },
    });
  } catch (error) {
    console.log("Error in getSharesList ===> ", error);
    return NextResponse.json({
      success: false,
      status: 500,
      message: "Internal server error",
    });
  }
};

export const getTotalPages = async () => {
  try {
    const shares = await prisma.topSharesList.findMany({});

    const totalPages = shares.length / 20;

    return NextResponse.json({
      success: true,
      status: 200,
      message: "Total Pages fetched successfully",
      data: { totalPages },
    });
  } catch (error) {
    console.log("Error in getTotalPages ===> ", error);
    return NextResponse.json({
      success: false,
      status: 500,
      message: "Internal server error",
    });
  }
};
