import Link from "next/link";
import NewsletterSignup from "@/components/NewsletterSignup";

import { getPublishedNewsletterSlugs, getNewsletterBySlug } from "@/lib/db/newsletters";
import { formatPublicDate } from "@/lib/utils";


type NewsletterPageProps = {
  params: Promise<{ slug: string }>;
};


export const dynamicParams = false;

export async function generateStaticParams()
{
  return getPublishedNewsletterSlugs();
}


export default async function NewsletterPage({ params }: NewsletterPageProps)
{
  const { slug } = await params;
  const newsletter = (await getNewsletterBySlug(slug))!;

  return (
    <main className="bg-light-bg">
      <section className="bg-dark-bg text-light-fg">
          <div className="text-center">
            <h1 className="mb-5">Savoir Quand Automatiser</h1>
            <time>
              { formatPublicDate(newsletter.published_at!) }
            </time>
          </div>
      </section>

      <article className="bg-light-bg text-dark-fg">
          <div className="max-w-4xl">
            <p>
              { "Bienvenue dans "}
              <Link href="/" className="p-link">Auto Monday</Link>
              { ", ton guide hebdomadaire pour maîtriser l'automatisation et ton temps." }
            </p>
            <h3>LE DÉFI</h3>
            <h3>LA STRATÉGIE</h3>
            <h3>L'EXÉCUTION</h3>
          </div>
      </article>

      <NewsletterSignup />
    </main>
  );
}