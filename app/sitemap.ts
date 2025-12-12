import { MetadataRoute } from "next";
import site from "@/config/site";
import pageMapping from "@/config/pageMapping";
import { getPublishedNewsletterSlugs } from "@/lib/db/newsletters";


export default async function sitemap(): Promise<MetadataRoute.Sitemap>
{
  const newsletterSlugs = await getPublishedNewsletterSlugs();
  const result: MetadataRoute.Sitemap = new Array(pageMapping.size + newsletterSlugs.length);
  let i = 0;

  for (const [key] of pageMapping)
    result[i++] = { url: site.url + key };

  for (const { slug } of newsletterSlugs)
    result[i++] = { url: `${site.url}/newsletter/${slug}` };

  return result;
}