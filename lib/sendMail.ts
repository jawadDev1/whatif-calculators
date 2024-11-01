import { Share, ShareListType } from "@/types";
import nodemailer from "nodemailer";

interface Params {
  jobName: string;
  timestamp: string;
  success: boolean;
  error?: Error;
  sharesList: {
    name: string;
    symbol: string;
    type: string | null;
  }[];
}

export const sendMail = async ({
  jobName,
  timestamp,
  success,
  error,
  sharesList,
}: Params) => {
  const transport = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASS,
    },
  });

  try {
    const info = await transport.sendMail({
      from: "whatifcalc28@gmail.com",
      to: "darkjoker0t@gmail.com",
      // to: "himathew206@gmail.com",
      subject: success
        ? `✅ Cron Job Success: ${jobName} Completed Successfully`
        : `🚨 Cron Job Failure Alert: ${jobName} Failed`,
      html: `
        <p>Hi</p>
        <p>This is an alert to notify you that the scheduled cron job <strong>${jobName}</strong> ${
        success ? "has completed successfully" : "has failed"
      } .</p>
        <h3>Job Details:</h3>
        <ul>
          <li><strong>Job Name:</strong> ${jobName}</li>
          <li><strong>Execution Time:</strong> ${timestamp}</li>
          <li><strong>Server/Environment:</strong> Production</li>
        </ul>
        
          <h3>${
            success
              ? "Updated Shares:"
              : "Failed to update all shares. something went wrong"
          }</h3>
        <ul>
        ${sharesList?.map((share) => `<li>${share.name} (${share.symbol})</li>`).join("")} 
       ${
         success
           ? ""
           : ` </ul>
            <h3>Error Details:</h3>
        <ul>
          <li><strong>Error Message:</strong> ${error?.message}</li>
          <li><strong>Error Stack:</strong></li>
          <pre>${error?.stack}</pre>
        </ul>`
       }
        
        
        
      `,
    });

    console.log("Message sent: %s", info.messageId);
  } catch (err) {
    console.error("Failed to send email:", err);

    return;
  }
};
