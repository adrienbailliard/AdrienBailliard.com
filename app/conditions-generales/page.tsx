import { getMetadata } from "@/lib/seo/metadata";
import { getJsonLd } from "@/lib/seo/jsonld";

import Script from "next/script";
import { PageSEO } from "@/lib/types";



const page: PageSEO = {
  pathname: "/conditions-generales",
  title: "Conditions Générales",
  description: "Consulte les conditions générales d'utilisation et la politique de confidentialité du site d'Adrien Bailliard."
};


export const metadata = getMetadata(page);



export default function GeneralTerms()
{
  const jsonLd = getJsonLd(page);

  return (
    <main className="bg-light-bg">
      <Script id="jsonld" type="application/ld+json" strategy="beforeInteractive" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}/>

      <section id="terms" className="bg-light-bg text-dark-fg">
        <div className="max-w-4xl">
          <div className="text-center mb-12 md:mb-16">
            <h2>
              Conditions Générales
            </h2>
            <p>
              { "Dernière mise à jour le 29 octobre 2025." }
            </p>
          </div>
          <h4>
            Accord Sur Nos Conditions Légales
          </h4>
          <p>
            { "Veuillez lire attentivement les présentes Conditions d'Utilisation (« Conditions », « Conditions d'Utilisation ») avant d'utiliser adrienbailliard.com (le « Service ») exploité par Adrien Bailliard (« nous », « notre » ou « nos »)." }
          </p>
          <p>
            { "Votre accès et votre utilisation du Service sont conditionnés par votre acceptation et votre respect de ces Conditions. Ces Conditions s'appliquent à tous les visiteurs, utilisateurs et autres personnes qui accèdent ou utilisent le Service." }
          </p>
          <p>
            { "En accédant ou en utilisant le Service, vous acceptez d'être lié par ces Conditions. Si vous êtes en désaccord avec une partie quelconque des Conditions, vous ne pouvez pas accéder au Service." }
          </p>
          <h4>
            Propriété Intellectuelle
          </h4>
          <p>
            { "Le Service ainsi que son contenu original, ses fonctionnalités et caractéristiques resteront la propriété exclusive d'Adrien Bailliard et de ses concédants." }
          </p>
          <h4>
            { "Liens Vers d'Autres Sites Web" }
          </h4>
          <p>
            { "Notre Service peut contenir des liens vers des sites web ou services tiers qui ne sont pas détenus ou contrôlés par Adrien Bailliard." }
          </p>
          <p>
            { "Adrien Bailliard n'a aucun contrôle sur le contenu, les politiques de confidentialité ou les pratiques de tout site ou service tiers, et n'assume aucune responsabilité à cet égard. Vous reconnaissez et acceptez en outre qu'Adrien Bailliard ne pourra être tenue responsable, directement ou indirectement, de tout dommage ou perte causé ou supposé être causé par ou en lien avec l'utilisation ou la confiance accordée à tout contenu, bien ou service disponible sur ou via de tels sites ou services." }
          </p>
          <p>
            { "Nous vous recommandons vivement de lire les conditions générales et politiques de confidentialité de tout site ou service tiers que vous visitez." }
          </p>
          <h4>
            Résiliation
          </h4>
          <p>
            { "Nous pouvons résilier ou suspendre l'accès à notre Service immédiatement, sans préavis ni responsabilité, pour quelque raison que ce soit, y compris, sans s'y limiter, en cas de violation des présentes Conditions." }
          </p>
          <p>
            { "Toutes les dispositions des Conditions qui, de par leur nature, doivent survivre à une résiliation survivront, notamment les dispositions relatives à la propriété, aux exclusions de garantie, à l'indemnisation et aux limitations de responsabilité." }
          </p>
          <h4>
            Exclusion de Garantie
          </h4>
          <p>
            { "Votre utilisation du Service se fait à vos seuls risques. Le Service est fourni « EN L'ÉTAT » et « TEL QUE DISPONIBLE ». Le Service est fourni sans garantie d'aucune sorte, expresse ou implicite, notamment, mais sans s'y limiter, les garanties implicites de qualité marchande, d'adaptation à un usage particulier, d'absence de contrefaçon ou de bon fonctionnement." }
          </p>
          <h4>
            Politique de Confidentialité
          </h4>
          <p>
            { "Adrien Bailliard s'engage à ce que la collecte et le traitement de vos données, effectués à partir du portail adrienbailliard.com, soient conformes au règlement général sur la protection des données (RGPD) et à la loi Informatique et Libertés." }
          </p>
          <p>
            { "Vous disposez d'un droit d'accès, de rectification, d'effacement, de limitation et d'opposition sur vos données. Pour exercer ce droit, veuillez envoyer un courrier au mail figurant dans la section « Contact »." }
          </p>
          <h4>
            Droit Applicable
          </h4>
          <p>
            { "Les présentes Conditions sont régies et interprétées conformément au droit français, sans tenir compte des dispositions concernant les conflits de lois." }
          </p>
          <p>
            { "Le fait que nous ne fassions pas valoir un droit ou une disposition des Conditions ne saurait constituer une renonciation à ce droit. Si une disposition des Conditions est jugée invalide ou inapplicable par un tribunal, les autres dispositions resteront en vigueur. Les présentes Conditions constituent l'intégralité de l'accord entre nous concernant notre Service et remplacent tout accord antérieur à ce sujet." }
          </p>
          <h4>
            Modifications
          </h4>
          <p>
            { "Nous nous réservons le droit de modifier ou de remplacer ces Conditions à tout moment et à notre seule discrétion. Nous ne fournirons pas de notification individuelle des modifications, mais lorsque nous mettrons à jour ces Conditions d'Utilisation, nous mettrons à jour la date indiquée dans cette section." }
          </p>
          <p>
            { "En continuant d'accéder ou d'utiliser notre Service après l'entrée en vigueur de ces modifications, vous acceptez d'être lié par les nouvelles Conditions. Si vous n'acceptez pas les nouvelles Conditions, veuillez cesser d'utiliser le Service." }
          </p>
          <h4>
            Contact
          </h4>
          <p>
            { "Si vous avez des questions concernant ces Conditions, veuillez nous contacter : contact@adrienbailliard.com." }
          </p>
        </div>
      </section>
    </main>
  );
}
