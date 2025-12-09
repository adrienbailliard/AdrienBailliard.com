import { getMetadata } from "@/lib/seo/metadata";
import { getJsonLd } from "@/lib/seo/jsonld";

import Script from "next/script";

import Form from '@/components/ui/BaseForm';
import PublishedNewsletters from "@/components/newsletter/published";
import NewsletterDrafts from "@/components/newsletter/drafts";
import AutoMonday from "@/components/icons/autoMonday";
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

      <section className="bg-dark-bg text-light-fg">
        <div className="flex max-lg:flex-col items-center lg:justify-between gap-10 lg:gap-20">
          <div className="max-lg:text-center">
            <h1>
              <AutoMonday className="max-lg:w-full h-17.5 max-lg:m-auto max-sm:h-12.5 max-md:h-15"/>
            </h1>
            <p className="max-w-xl">
              { "Les systèmes qui libèrent ton temps. Chaque lundi, une clé pour automatiser comme le Top 1%." }
            </p>
          </div>
          <Form
            className="max-w-md max-sm:w-full sm:min-w-0"
          >
            { "Rejoins" }
          </Form>
        </div>
      </section>

      <PublishedNewsletters
        title="Toutes les Éditions"
        data={[
          {
            title: "Automatiser Sans Complexité",
            paragraph: "Des systèmes élégants qui travaillent pour toi, afin de gagner du temps sans ajouter de friction.",
            href: "/newsletter/",
            date: "Première édition en préparation"
          }
        ]}
      />
    </main>
  );
}
