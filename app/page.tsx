import { getMetadata } from "@/lib/seo/metadata";
import { getJsonLd } from "@/lib/seo/jsonld";

import Script from "next/script";
import Image from "next/image";

import Newsletter from "@/components/icons/newsletter";
import Consultation from "@/components/icons/consultation";
import Guide from "@/components/icons/guide";
import Logo from "@/components/icons/logo";

import Form from '@/components/ui/BaseForm';
import BottomLine from '@/components/ui/BottomLine';
import Link from "@/components/ui/Link";
import ServicePreview from "@/components/ui/ServicePreview";
import Newsletters from "@/components/newsletter/Newsletters";


const pathname = "/";

export const metadata = getMetadata(pathname);


export default function Home()
{
  const jsonLd = getJsonLd(pathname);

  return (
    <main className="bg-light-bg">
      <Script id="jsonld" type="application/ld+json" strategy="beforeInteractive" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}/>
      
      <section className="hero relative">
        <div>
          <h1 className="max-sm:max-w-md max-md:max-w-xl max-[860px]:max-w-2xl">
            Automatise comme le Top 1%
          </h1>
          <p className="max-w-sm md:max-w-md">
            Auto Monday - Les systèmes qui libèrent ton temps, chaque lundi dans ta boîte mail.
          </p>
          <Form className="max-w-2xl">
              Reçois la Newsletter
          </Form>
          <p className="font-display text-light-muted-text text-sm md:text-base">
            { "Découvre comment mes systèmes ont généré " }
            <span className="text-primary font-bold">
              +70 000€
            </span>
              { " automatiquement." }
          </p>
          <BottomLine />
        </div>
      </section>

      <section className="bg-light-bg text-dark-fg">
        <div className="flex items-center lg:justify-between max-lg:flex-col-reverse max-md:gap-12 gap-16 lg:gap-20 xl:gap-30 2xl:gap-40">
          <div className="basis-1/2">
            <h2>
              Hello, je suis Adrien Bailliard.
            </h2>
            <p>
              { "La plupart des gens pensent que l'automatisation, c'est faire toujours plus. En réalité, c'est "}
              <strong>créer des systèmes qui libèrent ton temps</strong>
              {" et te permettent de te concentrer sur l'essentiel." }
            </p>
            <p>
              { "J'ai donc créé Auto Monday, une newsletter qui t'enseigne des systèmes concrets pour automatiser intelligemment." }
            </p>
            <p>
              { "En parallèle, je conçois des systèmes complexes comme mon market maker sur le XRP Ledger, classé "}
              <strong>Top 1% mondial</strong>
              { " et ayant déjà généré jusqu'à 15 000 €/mois." }
            </p>
            <div className="flex items-center justify-between">
              <Link href="/a-propos/" variant="button-primary">
                { "Lis Mon Histoire" }
              </Link>
              <Logo className="h-12 md:h-13"/>
            </div>
          </div>
          <div className="basis-1/2">
              <Image
                src="/assets/illustrations/home.png"
                alt="Adrien Bailliard"
                width={600}
                height={607}
                className="illustrations"
                preload={true}
              />
          </div>
        </div>
      </section>

      <section className="bg-dark-bg text-light-fg text-center">
        <div className="w-full">
          <h2>
            { "3 Manières Dont Je Peux T'Aider" }
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 md:gap-17">
            <ServicePreview
              Icon={Newsletter}
              title="Newsletter"
              paragraph="Chaque lundi, des systèmes concrets pour automatiser intelligemment."
              href="/newsletter/"
              cta="Reçois la Newsletter"
            />
            <ServicePreview
              Icon={Guide}
              title="Le Système d'Élite"
              paragraph="Les secrets derrière les systèmes les plus performants, enfin accessibles."
              href="/le-systeme-d-elite/"
              cta="Télécharge le Guide PDF"
            />
            <ServicePreview
              Icon={Consultation}
              title="Consultation"
              paragraph="Un accompagnement 1:1 pour créer des systèmes sur mesure."
              href="/consultation/"
              cta="Réserve ton Appel"
              className="max-lg:col-span-full"
            />
          </div>
        </div>
      </section>

      <section className="bg-light-bg text-dark-fg">
        <div>
          <Newsletters title="Newsletters Récentes" data={
            [
              {
                title: "Automatiser Sans Complexité",
                paragraph: "Des systèmes élégants qui travaillent pour toi, afin de gagner du temps sans ajouter de friction.",
                href: "/newsletter/",
                date: "Première édition en préparation"
              }
            ]
          }/>
          <div className="text-center mt-10 md:mt-12 lg:mt-14">
            <Link
              href="/newsletter/"
              variant="button-primary"
            >
              { "Explore Les Éditions" }
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}