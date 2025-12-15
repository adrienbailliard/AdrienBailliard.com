import NewsletterContent from "@/components/NewsletterContent";
import Divider from "@/components/Divider";
import NewsletterDraftActions from "@/components/NewsletterDraftActions";

import { getNewsletterDraftsSlugs, getNewsletterDraftBySlug } from "@/lib/db/newsletters";


type NewsletterPageProps = {
  params: Promise<{ slug: string }>;
};


export const dynamicParams = false;

export async function generateStaticParams()
{
  return getNewsletterDraftsSlugs();
}


export default async function NewsletterPage({ params }: NewsletterPageProps)
{
  const { slug } = await params;
  const newsletter = (await getNewsletterDraftBySlug(slug))!;


  return (
    <main className="bg-light-bg">
      <NewsletterDraftActions id={newsletter.id} slug={slug} />

      <section className="bg-dark-bg pt-0 text-center text-light-muted-text">
        <div className="max-w-4xl">
          <p>{ newsletter.excerpt }</p>
        </div>
      </section>

      <Divider variant="light"/>

      <NewsletterContent
        title={ newsletter.title }
        content={ newsletter.content }
        date={ new Date() }
      />
    </main>
  );
}