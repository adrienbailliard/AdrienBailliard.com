import NewsletterContent from "@/components/NewsletterContent";
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
      <NewsletterContent title={newsletter.title} content={newsletter.content} date={newsletter.updated_at}/>
    </main>
  );
}