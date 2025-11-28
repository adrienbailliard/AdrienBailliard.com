import { getMetadata } from "@/lib/seo/metadata";
import { getJsonLd } from "@/lib/seo/jsonld";

import Script from "next/script";
import Image from "next/image";

import Arrow from "@/components/icons/arrow";
import Link from "@/components/ui/Link";
import CTA from "@/components/CTA";


const pathname = "/consultation";
export const metadata = getMetadata(pathname);


export default function Consultation()
{
  const jsonLd = getJsonLd(pathname);

  return (
    <main className="bg-dark-bg">
      <Script id="jsonld" type="application/ld+json" strategy="beforeInteractive" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}/>

      <section className="hero lg:relative overflow-hidden">
        <div className="w-full">
          <h1 className="lg:w-[50%] max-w-2xl max-lg:text-center max-lg:mx-auto">
            Les Systèmes du Top 1% pour Ton Business
          </h1>
          <div className="max-lg:flex max-lg:justify-between mt-9 sm:mt-12 md:mt-16 lg:mt-9 max-lg:items-center">
            <p className="max-w-2xs sm:max-w-xs md:max-w-sm lg:w-[50%] lg:max-w-2xl">
              Réserve ta consultation 1:1 pour créer des systèmes sur mesure, conçus pour libérer ton temps.
            </p>
            <Image
              src="/assets/illustrations/consultation.png"
              alt="Consultation 1:1"
              width={875}
              height={500}
              className="w-3xs sm:w-sm md:w-md lg:absolute max-sm:-mr-24 max-lg:-mr-40 lg:-right-40 lg:top-1/2 lg:-translate-y-1/2 lg:w-2xl xl:w-3xl 2xl:w-4xl"
              preload={true}
            />
          </div>
          <div className="max-lg:text-center">
            <a
              href="#cta"
              className="group base-link text-light-muted-text mt-8 md:mt-10 inline-flex"
            >
              {"Découvrir comment"}
              <Arrow className="base-arrow rotate-90 shrink-0 group-hover:translate-y-0.5" />
            </a>
          </div>
        </div>
      </section>

      <CTA
        title="Parle-Moi de Ton Projet"
        paragraph="Chaque système est conçu pour ton activité. Voyons comment libérer ton temps et affiner tes process."
        variant="light"
        className="-mt-16 md:-mt-26 lg:-mt-30"
      >
        <Link
          className="max-w-lg w-full"
          href="/contact"
          variant="button-primary"
        >
          { "Réserve Mon Audit Gratuit" }
        </Link>
      </CTA>
    </main>
  );
}
