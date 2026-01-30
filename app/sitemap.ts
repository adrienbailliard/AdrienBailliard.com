import { MetadataRoute } from "next";

import site from "@/config/site";
import pages from "@/config/navigation";

import { getPublishedNewsletterPreviews } from "@/lib/db/newsletters";
import { NEWSLETTER_ROUTE } from "@/lib/constants";



export default async function sitemap(): Promise<MetadataRoute.Sitemap>
{
  const newsletterPreview = await getPublishedNewsletterPreviews();
  const result: MetadataRoute.Sitemap = new Array(pages.size + newsletterPreview.length);
  let i = 0;


  for (const [key] of pages)
    result[i++] = { url: site.url + key };


  for (const newsletter of newsletterPreview)
    result[i++] = {
      url: `${site.url}${NEWSLETTER_ROUTE}/${newsletter.slug}`,
      lastModified: newsletter.published_at!
    };


  return result;
}