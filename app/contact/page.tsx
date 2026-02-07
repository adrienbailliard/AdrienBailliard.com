import { getMetadata } from "@/lib/seo/metadata";
import { getJsonLd } from "@/lib/seo/jsonld";

import Script from "next/script";

import ContactForm from "@/components/ContactForm";
import Messages from "@/components/messages";
import Stats from "@/components/Stats";
import Plane from "@/components/icons/plane";
import Divider from "@/components/ui/Divider";

import { StaticPage } from "@/lib/types";



const page: StaticPage = {
  pathname: "/contact",
  title: "Contact",
  description: "Contacte Adrien Bailliard à propos d'automatisation, de systèmes performants et d'opportunités de collaboration."
};


export const metadata = getMetadata(page);



export default function Contact()
{
  const jsonLd = getJsonLd(page);

  return (
    <main className="bg-light-bg">
      <Script id="jsonld" type="application/ld+json" strategy="beforeInteractive" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}/>
      
      <Stats type="messages"/>
      <Divider variant="light" adminOnly={true}/>
      <Messages />

      <section className="bg-dark-bg text-light-fg">
        <div className="flex max-sm:gap-10 max-sm:text-center max-sm:flex-col-reverse sm:justify-between items-center gap-14">
          <div className="max-w-2xl">
            <h1>
              Parlons Business
            </h1>
            <p>
              { "Présente-moi ton projet ou tes besoins. Je lis chaque message avec attention et j'y réponds personnellement." }
            </p>
          </div>
          <Plane className="shrink-0 w-37.5 max-sm:w-25 max-md:w-30 text-primary"/>
        </div>
      </section>

      <section className="bg-light-bg">
        <div>
          <ContactForm/>
        </div>
      </section>
    </main>
  );
}
