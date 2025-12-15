import { getMetadata } from "@/lib/seo/metadata";
import { getJsonLd } from "@/lib/seo/jsonld";

import Script from "next/script";
import Link from "next/link";

import Image from "next/image";
import Logo from "@/components/icons/logo";


const pathname = "/a-propos";

export const metadata = getMetadata(pathname);


export default function About()
{
  const jsonLd = getJsonLd(pathname);

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
              { "Trop de projets d'automatisation échouent. J'écris pour partager ce qui fonctionne vraiment." }
            </p>
          </div>
          <ul className="text-dark-muted-text shrink-0">
            <li className="bullet-list">
              { "Fondateur d'Auto Monday" }
            </li>
            <li className="bullet-list">
              70 000€ générés
            </li>
            <li className="bullet-list">
              250 000 vues en 1 mois
            </li>
            <li className="bullet-list">
              { "5 ans d'automatisation" }
            </li>
          </ul>
        </div>
        <Logo className="h-[28%] sm:h-[42%] top-[25%] sm:top-1/2 -left-7 -translate-y-1/2 absolute text-dark-fg/5"/>
      </section>

      <section className="bg-dark-bg text-dark-fg">
        <div className="flex items-center max-sm:flex-col max-sm:gap-10">
          <Image
            src="/assets/illustrations/about.png"
            alt="Montagne - Adrien Bailliard"
            width={512}
            height={512}
            className="illustrations max-sm:m-auto sm:ml-auto sm:w-[38%]"
            preload={true}
          />
          <figure className="rounded-lg bg-light-bg sm:w-[60%] max-w-4xl p-4 md:p-6 lg:p-8 xl:p-10 sm:absolute">
            <blockquote>
              { "« L'excellence n'est pas un acte, mais une habitude. »" }
            </blockquote>
            <figcaption className="text-right">
              Aristote
            </figcaption>
          </figure>
        </div>
      </section>

      <section className="bg-dark-bg text-light-fg pt-0">
        <div className="max-w-4xl mx-auto text-pretty">
          <h2>
            { "J'ai choisi la performance." }
          </h2>
          <p>
            { "1. À 15 ans, je découvre le développement web. Très vite, je veux aller plus loin et créer des systèmes qui travaillent à ma place." }
          </p>
          <p>
            { "2. À 17 ans, j'ai créé un robot de trading générant jusqu'à 15 000 €/mois en autonomie. J'en dévoile les coulisses dans " }
            <Link href="/le-systeme-d-elite">
              { "Le Système d'Élite" }
            </Link>
            { "." }
          </p>
          <p>
            { "3. À l'école 42, j'affine ce qui fait un système performant : fiabilité, optimisation et scalabilité." }
          </p>
          <p>
            { "4. Mon chien Thatcher (Texas de Tara des Hauts Lilas) est titré Champion dans 3 pays. La réussite ne tombe pas du ciel, et se construit avec méthode." }
          </p>
          <p>
            { "5. Le scoutisme m'a appris le leadership et l'organisation. Les meilleures organisations fonctionnent même lorsque le chef s'absente." }
          </p>
          <p>
            { "6. Chaque été, dans les Alpes à Briançon, je suis éducateur bénévole. Là-haut, j'apprends que les méthodes les plus puissantes sont celles qui servent les autres." }
          </p>
          <p>
            { "7. " }
            <Link href="/newsletter">
              Auto Monday
            </Link>
            { " est né d'une ambition : libérer le temps des ambitieux grâce à des systèmes qui accélèrent leur croissance." }
          </p>
        </div>
      </section>
    </main>
  );
}
