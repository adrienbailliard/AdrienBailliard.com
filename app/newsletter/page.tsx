import { getMetadata } from "@/lib/seo/metadata";
import { getJsonLd } from "@/lib/seo/jsonld";

import Script from "next/script";

import PublishedNewsletters from "@/components/newsletterPreview/published";
import NewsletterDrafts from "@/components/newsletterPreview/drafts";
import NewsletterSignup from "@/components/newsletter/Signup";
import Stats from "@/components/Stats";
import Divider from "@/components/ui/Divider";

import { PageSEO } from "@/lib/types";



const page: PageSEO = {
  pathname: "/newsletter",
  title: "Auto Monday",
  description: "Auto Monday est une newsletter qui partage, chaque lundi, une clé pour automatiser comme le Top 1%. Abonne-toi gratuitement."
};


export const metadata = getMetadata(page);



export default function Newsletter()
{
  const jsonLd = getJsonLd(page);

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
