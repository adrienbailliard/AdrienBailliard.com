import { getMetadata } from "@/lib/seo/metadata";
import { getJsonLd } from "@/lib/seo/jsonld";

import Script from "next/script";
import Image from "next/image";

import Arrow from "@/components/icons/arrow";
import Link from "@/components/ui/Link";
import Cta from "@/components/Cta";

import { StaticPage } from "@/lib/types";



const page: StaticPage = {
  pathname: "/consultation",
  title: "Consultation",
  description: "Réserve une consultation 1:1 avec Adrien Bailliard pour bâtir les systèmes qui automatiseront ta croissance."
};


export const metadata = getMetadata(page);



export default function Consultation()
{
  const jsonLd = getJsonLd(page);

  return (
    <main className="bg-dark-bg">
      <Script id="jsonld" type="application/ld+json" strategy="beforeInteractive" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}/>

      <section className="hero lg:relative overflow-hidden">
        <div className="w-full">
          <h1 className="lg:w-[50%] max-w-2xl max-lg:text-center max-lg:mx-auto">
            Les Systèmes du Top 1% pour ton Business
          </h1>
          <div className="max-lg:flex max-lg:justify-between mt-9 sm:mt-12 md:mt-16 lg:mt-9 max-lg:items-center">
            <p className="max-w-2xs sm:max-w-xs md:max-w-sm lg:w-[50%] lg:max-w-2xl">
              Réserve ta consultation 1:1 pour bâtir des systèmes qui stabiliseront ta croissance et libéreront ton temps.
            </p>
            <Image
              src="/assets/illustrations/consultation.png"
              alt="Consultation 1:1 - Adrien Bailliard"
              width={875}
              height={500}
              className="w-48 sm:w-sm md:w-md lg:absolute max-sm:-mr-16 max-lg:-mr-30 lg:-right-35 lg:top-1/2 lg:-translate-y-1/2 lg:w-2xl xl:w-3xl 2xl:w-4xl"
              preload={true}
            />
          </div>
          <div className="max-lg:text-center">
            <a
              href="#cta"
              className="group base-link text-light-muted-fg mt-8 md:mt-10 inline-flex"
            >
              {"Découvre la méthode"}
              <Arrow className="base-arrow rotate-90 shrink-0 group-hover:translate-y-0.5" />
            </a>
          </div>
        </div>
      </section>

      <Cta
        title="Bâtissons tes Systèmes"
        paragraph="Chaque architecture est pensée pour ton activité. Analysons tes process pour libérer ton temps."
        variant="light"
        className="-mt-16 md:-mt-26 lg:-mt-30"
      >
        <Link
          className="max-w-lg w-full"
          href="/contact"
          variant="light-primary"
        >
          { "Réserve mon Diagnostic" }
        </Link>
      </Cta>
    </main>
  );
}