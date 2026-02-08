import { cache } from 'react';
import { Metadata } from 'next';
import { notFound } from "next/navigation";
import Script from "next/script";

import { remark } from 'remark';
import html from 'remark-html';

import NewsletterSignup from "@/components/newsletter/Signup";
import NewsletterView, { NewsletterTitle } from "@/components/newsletter/View";

import newsletterConfig from "@/config/newsletter";

import { getMetadata } from "@/lib/seo/metadata";
import { getJsonLd } from "@/lib/seo/jsonld";
import { getPublishedNewsletterBySlug } from "@/lib/db/newsletters";
import { NEWSLETTER_ROUTE } from "@/lib/constants";



export const dynamic = 'force-static';


type Parameters = Promise<{ slug: string }>;



const getNewsletterData = cache(
  async (slug: string) => {
    const newsletter = await getPublishedNewsletterBySlug(slug);

    if (!newsletter)
      notFound();

    return {
      newsletter,
      seo: {
        pathname: `${NEWSLETTER_ROUTE}/${slug}`,
        title: newsletterConfig.slogan + newsletter.title,
        description: newsletter.excerpt,
        publishedAt: newsletter.published_at
      }
    };
  }
);



export async function generateMetadata({ params }: { params: Parameters }): Promise<Metadata>
{
  const { slug } = await params;
  const { seo } = await getNewsletterData(slug);

  return getMetadata(seo);
}



export default async function NewsletterPage({ params }: { params: Parameters })
{
  const { slug } = await params;
  const { newsletter, seo } = await getNewsletterData(slug);

  const jsonLd = getJsonLd(seo);
  const processedContent = await remark()
    .use(html)
    .process(newsletter.content);


  return (
    <main className="bg-light-bg grid grid-rows-[1fr_auto]">
      <Script id="jsonld" type="application/ld+json" strategy="beforeInteractive" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}/>

      <NewsletterView
        title={
          <NewsletterTitle value={ newsletter.title } />
        }
        content={
          <div dangerouslySetInnerHTML={{ __html: processedContent.toString() }} />
        }
        date={newsletter.published_at!}
      />
      
      <NewsletterSignup />
    </main>
  );
}