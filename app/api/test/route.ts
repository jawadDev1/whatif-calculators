import prisma from "@/lib/prisma";
import { sendMail } from "@/lib/sendMail";
import { getShareDailyData } from "@/lib/utils";
import { Share } from "@/types";

import { NextResponse } from "next/server";

import { Client } from "@upstash/qstash";

const client = new Client({
  token: process.env.Q_STASH_TOKEN!,
});

export const dynamic = "force-dynamic"; // static by default, unless reading the request

export const revalidate = 0;

export async function GET(request: Request) {
  try {
    const res = await client.publishJSON({
      url: `https://whatif-calculators.vercel.app/api/update-shares-data`,
      method: "GET",
    });
    console.log("REs=================++> ", { res });
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
