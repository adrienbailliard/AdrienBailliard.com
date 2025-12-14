import { getMetadata } from "@/lib/seo/metadata";
import { getJsonLd } from "@/lib/seo/jsonld";

import Script from "next/script";

import PublishedNewsletters from "@/components/newsletterPreview/published";
import NewsletterDrafts from "@/components/newsletterPreview/drafts";
import NewsletterSignup from "@/components/NewsletterSignup";
import Stats from "@/components/Stats";
import Divider from "@/components/Divider";


const pathname = "/newsletter";
export const metadata = getMetadata(pathname);


export default function Newsletter()
{
  const jsonLd = getJsonLd(pathname);

  return (
    <main className="bg-light-bg">
      <Script id="jsonld" type="application/ld+json" strategy="beforeInteractive" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}/>

      <Stats type="newsletter"/>
      <Divider variant="light" adminOnly={true}/>
      <NewsletterDrafts />
      
      <NewsletterSignup />
      <PublishedNewsletters title="Toutes les Éditions" />
    </main>
  );
}
