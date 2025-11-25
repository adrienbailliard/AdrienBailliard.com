import { MetadataRoute } from "next";
import site from "@/config/site";
import pageMapping from "@/config/pageMapping";


export default function sitemap(): MetadataRoute.Sitemap
{
  const result: MetadataRoute.Sitemap = [];

  for (const [key] of pageMapping)
    result.push({ url: site.url + key });

  return result;
}