import NewsletterContent from "@/components/newsletter/Content";
import Divider from "@/components/ui/Divider";
import NewsletterDraftActions from "@/components/newsletter/DraftActions";

import { getNewsletterDraftsSlugs, getNewsletterBySlug } from "@/lib/db/newsletters";


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
  const newsletter = (await getNewsletterBySlug(slug))!;


  return (
    <main className="bg-light-bg">
      <NewsletterDraftActions id={newsletter.id} slug={slug} />
      <Divider variant="light"/>

      <section className="bg-dark-bg text-center text-light-muted-text">
        <div className="max-w-4xl">
          <p>{ newsletter.excerpt }</p>
        </div>
      </section>

      <NewsletterContent
        title={ newsletter.title }
        content={ newsletter.content }
        date={ new Date() }
      />
    </main>
  );
}