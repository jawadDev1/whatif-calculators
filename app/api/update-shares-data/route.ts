import prisma from "@/lib/prisma";
import { sendMail } from "@/lib/sendMail";
import { getShareDailyData } from "@/lib/utils";
import { Share } from "@/types";

import { NextResponse } from "next/server";

import { Client } from "@upstash/qstash";
import { generateSymbolsString } from "@/lib/generateSymbolsString";
import { formatApiData } from "@/lib/formatApiData";

const client = new Client({
  token: process.env.Q_STASH_TOKEN!,
});

export const dynamic = "force-dynamic"; // static by default, unless reading the request

export const revalidate = 0;

const updateShares = async () => {
  const sharesList = await prisma.topSharesList.findMany({
    select: {
      symbol: true,
      type: true,
    },
  });

  let sharesData: Share[] = [];

  for (let i = 0; i < 1; i++) {
    console.log("Runned =================> ");
    const symbol: string =
      sharesList[i].type == "crypto"
        ? `${sharesList[i].symbol}-USD`
        : sharesList[i].symbol;

    const data: { data?: Share; success: boolean } = await getShareDailyData(
      symbol
    );
    const res = await client.publishJSON({
      url: `${process.env.SHARE_DATA_API_URL}/stock/daily/${symbol}`,
      body: {
        id: symbol,
      },
    });
    // const result = await res.json();
    console.log("Response ========> ", { res });
    // if (data.success) {
    //   sharesData.push(data.data!);
    // }
  }

  // await prisma.sharesData.createMany({
  //   data: sharesData,
  // });

  console.log(
    "Shares data updated Successfully ==============================> ",
    sharesData
    // new Date()
  );

  // await sendMail({
  //   jobName: "update-shares-data",
  //   timestamp: new Date().toString(),
  //   success: true,
  //   sharesList: sharesData,
  // });

  sharesData = [];

  // console.log(
  //   "Shares data updated Successfully ==============================> ",
  //   sharesData,
  //   new Date()
  // );
};

export async function GET(request: Request) {
  const authHeader = request.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return new Response("Unauthorized", {
      status: 401,
    });
  }

  try {
    const sharesList = await prisma.topSharesList.findMany({
      select: {
        name: true,
        symbol: true,
        type: true,
      },
    });

    const symbolsString = generateSymbolsString(sharesList);

    const body = { ticker: symbolsString.trim() };

    const res = await fetch(`${process.env.SHARE_DATA_API_URL}/stock/all`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const result = await res.json();

    const sharesData: Share[] = formatApiData(result["data"]);

    await prisma.sharesData.createMany({
      data: sharesData,
    });

    await sendMail({
      jobName: "update-shares-data",
      timestamp: new Date().toString(),
      success: true,
      sharesList: sharesList,
    });

    console.log(
      "Shares data updated Successfully ==============================> ",
      new Date()
    );

    return NextResponse.json({
      status: 200,
      message: "Share data updated successfully",
    });
  } catch (error) {
    console.log("Error in update-shares-data ====> ", error);

    await sendMail({
      jobName: "update-shares-data",
      timestamp: new Date().toString(),
      success: false,
      sharesList: [],
      error: error as Error,
    });

    return NextResponse.json({ status: 500, message: "Internal server error" });
  }
}
