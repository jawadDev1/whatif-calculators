import { getAllShares } from "@/services/sharelistServices";
import { ShareListType } from "@/types";

function escapeXml(unsafe: string) {
  return unsafe.replace(/[&<>"']/g, function (match) {
    switch (match) {
      case "&":
        return "&amp;";
      case "<":
        return "&lt;";
      case ">":
        return "&gt;";
      case '"':
        return "&quot;";
      case "'":
        return "&apos;";
      default:
        return match;
    }
  });
}

export default async function sitemap(): Promise<
  {
    url: string;
    lastModified: Date;
    changeFrequency: string;
    priority: number;
  }[]
> {
  const res = await getAllShares();
  const result = await res.json();
  const shares: ShareListType[] = JSON.parse(result.data.shares);

  return [
    {
      url: "https://whatifcalculators.com/investment-calculator",
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 1,
    },
    {
      url: `https://whatifcalculators.com/investment-calculator/result`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `https://whatifcalculators.com/investment-calculator/shares`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    ...shares.map((share) => ({
      url: `https://whatifcalculators.com/investment-calculator/shares/${escapeXml(share.slug.toString())}-investment-calculator`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    })),
  ];
}
