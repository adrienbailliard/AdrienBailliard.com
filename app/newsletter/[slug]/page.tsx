import { notFound } from "next/navigation";
import { Metadata } from 'next';

import NewsletterSignup from "@/components/newsletter/Signup";
import NewsletterContent from "@/components/newsletter/Content";

import { metadata } from "@/app/not-found";
import { getMetadata } from "@/lib/seo/metadata";
import { getPublishedNewsletterBySlug } from "@/lib/db/newsletters";


export const dynamic = 'force-static';


export async function generateMetadata({ params }: NewsletterPageProps): Promise<Metadata>
{
  const { slug } = await params;
  const newsletter = await getPublishedNewsletterBySlug(slug);

  return newsletter
    ? getMetadata(`/newsletter/${slug}`)
    : metadata;
}



type NewsletterPageProps = {
  params: Promise<{ slug: string }>;
};



export default async function NewsletterPage({ params }: NewsletterPageProps)
{
  const { slug } = await params;
  const newsletter = await getPublishedNewsletterBySlug(slug);

  if (!newsletter)
    notFound();


  return (
    <main className="bg-light-bg grid grid-rows-[1fr_auto]">
      <NewsletterContent
        newsletter={ newsletter }
        date={newsletter.published_at!}
      />
      <NewsletterSignup />
    </main>
  );
}