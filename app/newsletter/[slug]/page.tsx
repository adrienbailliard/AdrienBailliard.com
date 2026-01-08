import { notFound } from "next/navigation";
import Script from "next/script";
import { Metadata } from 'next';

import NewsletterSignup from "@/components/newsletter/Signup";
import NewsletterContent from "@/components/newsletter/Content";

import { metadata } from "@/app/not-found";
import { getMetadata } from "@/lib/seo/metadata";
import { getJsonLd } from "@/lib/seo/jsonld";
import { getPublishedNewsletterBySlug } from "@/lib/db/newsletters";



export const dynamic = 'force-static';


export async function generateMetadata({ params }: NewsletterPageProps): Promise<Metadata>
{
  const { slug } = await params;
  const newsletter = await getPublishedNewsletterBySlug(slug);

  return newsletter
    ? getMetadata({
      pathname: `/newsletter/${slug}`,
      title: newsletter.title,
      description: newsletter.excerpt
    })
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


  const jsonLd = getJsonLd({
    pathname: `/newsletter/${slug}`,
    title: newsletter.title,
    description: newsletter.excerpt
  });


  return (
    <main className="bg-light-bg grid grid-rows-[1fr_auto]">
      <Script id="jsonld" type="application/ld+json" strategy="beforeInteractive" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}/>

      <NewsletterContent
        newsletter={ newsletter }
        date={newsletter.published_at!}
      />
      <NewsletterSignup />
    </main>
  );
}