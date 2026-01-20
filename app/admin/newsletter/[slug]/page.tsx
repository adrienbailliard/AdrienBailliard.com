import { notFound } from "next/navigation";
import { Metadata } from 'next';

import Divider from "@/components/ui/Divider";
import NewsletterDraftActions from "@/components/newsletter/DraftActions";
import NewsletterEditor from "@/components/newsletter/Editor";

import { metadata } from "@/app/not-found";
import { getMinimalMetadata } from "@/lib/seo/metadata";
import { DRAFT_CREATION_SLUG } from "@/lib/constants";
import { getNewsletterDraftBySlug } from "@/lib/db/newsletters";



export const dynamic = 'force-static';


export async function generateMetadata({ params }: NewsletterPageProps): Promise<Metadata>
{
  const { slug } = await params;

  const newsletter = slug === DRAFT_CREATION_SLUG
    ? { title: "Nouveau Brouillon" }
    : await getNewsletterDraftBySlug(slug);

  return newsletter
    ? getMinimalMetadata(newsletter.title)
    : metadata;
}



type NewsletterPageProps = {
  params: Promise<{ slug: string }>;
};


export default async function NewsletterPage({ params }: NewsletterPageProps)
{
  const { slug } = await params;

  const newsletter = slug === DRAFT_CREATION_SLUG
    ? { excerpt: "Description courte", title: "Titre", content: "Écris ton contenu..." }
    : await getNewsletterDraftBySlug(slug);

  if (!newsletter)
    notFound();


  return (
    <main className="bg-light-bg">
      {
        "id" in newsletter && (
          <>
            <NewsletterDraftActions
              id={newsletter.id}
              scheduledFor={newsletter.scheduled_for}
            />
            <Divider variant="light"/>
          </>
        )
      }

      <NewsletterEditor newsletter={newsletter} />
    </main>
  );
}