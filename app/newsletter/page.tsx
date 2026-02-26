import { getMetadata } from "@/lib/seo/metadata";
import { getJsonLd } from "@/lib/seo/jsonld";

import Script from "next/script";

import PublishedNewsletters from "@/components/newsletterPreview/published";
import NewsletterDrafts from "@/components/newsletterPreview/drafts";
import NewsletterSignup from "@/components/newsletter/Signup";
import Stats from "@/components/Stats";
import Divider from "@/components/ui/Divider";

import { StaticPage } from "@/lib/types";
import { NEWSLETTER_ROUTE } from "@/lib/constants";



const page: StaticPage = {
  pathname: NEWSLETTER_ROUTE,
  title: "Auto Monday",
  description: "Une approche ne vaut rien sans méthode. Chaque lundi, une clé pour automatiser comme le Top\u00A01%."
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

      <NewsletterDrafts
        title={{
          hasItems: "À Venir",
          isEmpty: "Rien de Prévu"
        }}
        apiUrl="/api/newsletter/drafts/scheduled"
      />

      <NewsletterDrafts
        title={{
          hasItems: "En Cours",
          isEmpty: "Rien en Cours"
        }}
        apiUrl="/api/newsletter/drafts"
        showCreate={true}
        className="pt-0"
      />
      
      <NewsletterSignup />
      <PublishedNewsletters title="Toutes les Éditions" />
    </main>
  );
}
