import Script from "next/script";
import Link from "next/link";
import Image from "next/image";

import site from "@/config/site";
import Logo from "@/components/icons/logo";

import { getMetadata } from "@/lib/seo/metadata";
import { getJsonLd } from "@/lib/seo/jsonld";

import { StaticPage } from "@/lib/types";
import { NEWSLETTER_ROUTE } from "@/lib/constants";



const page: StaticPage = {
  pathname: "/a-propos",
  title: "À Propos",
  description: "Fondateur d'Auto Monday, Adrien Bailliard automatise la croissance pour libérer ton temps. Découvre son histoire."
};


export const metadata = getMetadata(page);



export default function About()
{
  const jsonLd = getJsonLd(page);

  return (
    <main className="bg-dark-bg">
      <Script id="jsonld" type="application/ld+json" strategy="beforeInteractive" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}/>

      <section id="intro" className="text-dark-fg bg-light-bg relative overflow-hidden">
        <div className="flex max-sm:flex-col sm:justify-between sm:items-center gap-10 sm:gap-14 md:gap-20">
          <div>
            <h1>
              Je suis Adrien Bailliard
            </h1>
            <p className="max-w-xl">
              { "Trop de projets d'automatisation échouent. J'écris pour partager ce qui fonctionne réellement." }
            </p>
          </div>
          <ul className="text-dark-muted-fg shrink-0">
            <li>
              { "Fondateur d'Auto Monday" }
            </li>
            <li>
              70&nbsp;000€ générés
            </li>
            <li>
              280&nbsp;000 impressions
            </li>
            <li>
              { "Systèmes critiques" }
            </li>
          </ul>
        </div>
        <Logo className="h-[28%] sm:h-[42%] top-[25%] sm:top-1/2 -left-7 -translate-y-1/2 absolute text-dark-fg/5"/>
      </section>

      <section className="bg-dark-bg text-dark-fg">
        <div className="flex items-center max-sm:flex-col max-sm:gap-10">
          <Image
            src={ `${site.illustrationsFolder}about.png` }
            alt="Montagne - Adrien Bailliard"
            width={512}
            height={512}
            className="illustrations max-sm:m-auto sm:ml-auto sm:w-[38%]"
            preload={true}
          />
          <figure className="rounded-lg bg-light-bg sm:w-[60%] max-w-235 p-4 md:p-6 lg:p-8 xl:p-10 sm:absolute">
            <blockquote>
              { "«\u00A0On ne s'élève pas au niveau de ses objectifs. On retombe au niveau de ses systèmes.\u00A0»" }
            </blockquote>
          </figure>
        </div>
      </section>

      <section className="bg-dark-bg text-light-fg pt-0">
        <div className="max-w-4xl mx-auto text-pretty">
          <h2>
            { "La méthode doit l'emporter." }
          </h2>
          <p>
            { "1. J'ai commencé le développement web à 15 ans. Ce plaisir du concret m'a poussé à construire des systèmes de plus en plus complexes." }
          </p>
          <p>
            { "2. À 17 ans, j'ai lancé un market maker sur le XRP Ledger générant jusqu'à 15\u00A0000€/mois en autonomie. Je détaille ces protocoles dans " }
            <Link href="/le-systeme-d-elite">
              { "Le Système d'Élite" }
            </Link>
            { "." }
          </p>
          <p>
            { "3. À l'école 42, j'ai appris que coder n'est qu'un prérequis. La vraie valeur se trouve dans la rencontre et la transmission." }
          </p>
          <p>
            { "4. Mon chien Thatcher est titré Champion dans 3 pays. Mais ce n'est pas de la chance\u00A0: face à la complexité, la méthode est la seule réponse." }
          </p>
          <p>
            { "5. Le scoutisme m'a appris le leadership. Une organisation n'est efficace que si elle continue de tourner lorsque le responsable s'absente." }
          </p>
          <p>
            { "6. Chaque été, je pars dans les Alpes à Briançon comme éducateur bénévole. Là-bas, je me rappelle que la technologie n'est qu'un outil pour servir des projets humains." }
          </p>
          <p>
            { "7. J'ai lancé " }
            <Link href={NEWSLETTER_ROUTE}>
              Auto Monday
            </Link>
            { " pour partager l'automatisation intelligente, qui libère le temps et stabilise la croissance." }
          </p>
        </div>
      </section>
    </main>
  );
}