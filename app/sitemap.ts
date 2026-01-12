import { MetadataRoute } from "next";

import site from "@/config/site";
import pages from "@/config/navigation";

import { getPublishedNewsletterPreviews } from "@/lib/db/newsletters";



export default async function sitemap(): Promise<MetadataRoute.Sitemap>
{
  const newsletterPreview = await getPublishedNewsletterPreviews();
  const result: MetadataRoute.Sitemap = new Array(pages.size + newsletterPreview.length);
  let i = 0;


  for (const [key] of pages)
    result[i++] = { url: site.url + key };


  for (const newsletter of newsletterPreview)
    result[i++] = {
      url: `${site.url}/newsletter/${newsletter.slug}`,
      lastModified: newsletter.updated_at
    };


  return result;
}