import NewsletterSignup from "@/components/newsletter/Signup";
import NewsletterContent from "@/components/newsletter/Content";

import { getPublishedNewsletterSlugs, getNewsletterBySlug } from "@/lib/db/newsletters";


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
    <main className="bg-light-bg grid grid-rows-[1fr_auto]">
      <NewsletterContent
        title={newsletter.title}
        content={newsletter.content}
        date={newsletter.published_at!}
      />
      <NewsletterSignup />
    </main>
  );
}