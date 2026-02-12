import { getMetadata } from "@/lib/seo/metadata";
import { getJsonLd } from "@/lib/seo/jsonld";

import Script from "next/script";
import Image from "next/image";

import Cta from "@/components/Cta";
import Form from '@/components/ui/BaseForm';
import Arrow from "@/components/icons/arrow";
import Stats from "@/components/Stats";

import { StaticPage } from "@/lib/types";



const page: StaticPage = {
  pathname: "/le-systeme-d-elite",
  title: "Le Système d'Élite",
  description: "Construis ton Système d'Élite à travers les protocoles d'automatisation du Top 1%. Accède au guide dès maintenant."
};


export const metadata = getMetadata(page);



export default function TheEliteSystem()
{
  const jsonLd = getJsonLd(page);

  return (
    <main className="bg-light-bg">
      <Script id="jsonld" type="application/ld+json" strategy="beforeInteractive" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}/>

      <Stats type="guide"/>

      <section className="text-light-fg bg-dark-bg relative">
        <div className="relative max-sm:min-h-80">
          <Image
            src="/assets/illustrations/le-systeme-d-elite.png"
            alt="Guide - Le Système d'Élite"
            width={400}
            height={566}
            className="mx-auto w-full max-w-48 sm:max-w-56 md:max-w-3xs lg:max-w-2xs"
            preload={true}
          />
          <div className="absolute w-full -bottom-0 left-1/2 -translate-x-1/2 text-center max-w-2xl z-1">
            <h1>
              Les Secrets du Top 1%
            </h1>
            <a
              href="#cta"
              className="group base-link text-light-muted-fg inline-flex"
            >
              {"Crée des systèmes performants"}
              <Arrow className="base-arrow rotate-90 shrink-0 group-hover:translate-y-0.5" />
            </a>
          </div>
        </div>
        <div className="absolute z-0 bottom-0 left-0 w-full h-55 md:h-75 bg-gradient-to-t from-black from-65% to-black/0 to-100%"/>
      </section>

      <Cta
        title={ <>Construis ton <span className="italic">{ "Système d'Élite" }</span></> }
        paragraph="L'automatisation se construit méthodiquement. Obtiens les protocoles du Top 1% dès aujourd'hui."
        variant="dark"
      >
        <Form
          className="max-w-lg mx-auto"
          isForNewsletter={false}
        >
          Accède au Guide
        </Form>
      </Cta>
    </main>
  );
}
