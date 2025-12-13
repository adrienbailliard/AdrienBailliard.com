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
    <div>{ newsletter.content }</div>
  );
}