import { cache } from 'react';
import { Metadata } from 'next';
import { notFound } from "next/navigation";

import { NewsletterEditorProvider } from '@/contexts/newsletterEditor';
import NewsletterEditor from "@/components/newsletter/Editor";

import newsletterConfig from "@/config/newsletter";

import { getUtilityMetadata } from "@/lib/seo/metadata";
import { DRAFT_CREATION_SLUG } from "@/lib/constants";
import { getNewsletterDraftBySlug } from "@/lib/db/newsletters";



export const dynamic = 'force-static';


type Parameters = Promise<{ slug: string }>;



const getNewsletter = cache(
  async (slug: string) => {
    const newsletter = slug === DRAFT_CREATION_SLUG
      ? { excerpt: "Description courte", title: newsletterConfig.defaultDraftTitle, content: "Écris ton contenu..." }
      : await getNewsletterDraftBySlug(slug);

    if (!newsletter)
      notFound();

    return newsletter;
  });



export async function generateMetadata({ params }: { params: Parameters }): Promise<Metadata>
{
  const { slug } = await params;
  const newsletter = await getNewsletter(slug);

  return getUtilityMetadata(newsletterConfig.slogan + newsletter.title);
}



export default async function NewsletterPage({ params }: { params: Parameters })
{
  const { slug } = await params;
  const newsletter = await getNewsletter(slug);

  return (
    <main className="bg-light-bg">
      <NewsletterEditorProvider initialNewsletter={newsletter}>
        <NewsletterEditor/>
      </NewsletterEditorProvider>
    </main>
  );
}