import { notFound } from "next/navigation";
import Script from "next/script";
import { Metadata } from 'next';

import { remark } from 'remark';
import html from 'remark-html';

import NewsletterSignup from "@/components/newsletter/Signup";
import NewsletterView, { NewsletterTitle } from "@/components/newsletter/View";

import { metadata } from "@/app/not-found";
import { getMetadata } from "@/lib/seo/metadata";
import { getJsonLd } from "@/lib/seo/jsonld";
import { getPublishedNewsletterBySlug } from "@/lib/db/newsletters";

import { NEWSLETTER_ROUTE } from "@/lib/constants";



export const dynamic = 'force-static';


export async function generateMetadata({ params }: NewsletterPageProps): Promise<Metadata>
{
  const { slug } = await params;
  const newsletter = await getPublishedNewsletterBySlug(slug);

  return newsletter
    ? getMetadata({
      pathname: `${NEWSLETTER_ROUTE}/${slug}`,
      title: newsletter.title,
      description: newsletter.excerpt,
      publishedAt: newsletter.published_at
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


  const articlePage = {
    pathname: `${NEWSLETTER_ROUTE}/${slug}`,
    title: newsletter.title,
    description: newsletter.excerpt,
    publishedAt: newsletter.published_at
  };

  const jsonLd = getJsonLd(articlePage);
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