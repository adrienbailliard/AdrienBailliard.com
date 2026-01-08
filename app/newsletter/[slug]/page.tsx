import { notFound } from "next/navigation";

import NewsletterSignup from "@/components/newsletter/Signup";
import NewsletterContent from "@/components/newsletter/Content";
import { getPublishedNewsletterBySlug } from "@/lib/db/newsletters";


export const dynamic = 'force-static';


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