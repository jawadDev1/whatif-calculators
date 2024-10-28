import prisma from "@/lib/prisma";
import { sendMail } from "@/lib/sendMail";
import { getShareDailyData } from "@/lib/utils";
import { Share } from "@/types";

import { NextResponse } from "next/server";

export const dynamic = "force-dynamic"; // static by default, unless reading the request

export const revalidate = 0;

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
        symbol: true,
        type: true,
      },
    });

    let sharesData: Share[] = [];

    for (let i = 0; i < sharesList.length; i++) {
      const symbol: string =
        sharesList[i].type == "crypto"
          ? `${sharesList[i].symbol}-USD`
          : sharesList[i].symbol;

      const data: { data?: Share; success: boolean } = await getShareDailyData(
        symbol
      );

      if (data.success) {
        sharesData.push(data.data!);
      }
    }

    await prisma.sharesData.createMany({
      data: sharesData,
    });

    console.log(
      "Shares data updated Successfully ==============================> ",
      new Date()
    );

    await sendMail({
      jobName: "update-shares-data",
      timestamp: new Date().toString(),
      success: true,
      sharesList: sharesData,
    });

    sharesData = [];

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
