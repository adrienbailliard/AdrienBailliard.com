import NewsletterContent from "@/components/newsletter/Content";
import Divider from "@/components/ui/Divider";
import NewsletterDraftActions from "@/components/newsletter/DraftActions";

import { getNewsletterBySlug } from "@/lib/db/newsletters";



type NewsletterPageProps = {
  params: Promise<{ slug: string }>;
};


export const generateStaticParams = async () => [];



export default async function NewsletterPage({ params }: NewsletterPageProps)
{
  const { slug } = await params;
  const newsletter = await getNewsletterBySlug(slug) || {
    excerpt: "Description courte",
    title: "Titre",
    content: "Écris ton contenu..."
  };


  return (
    <main className="bg-light-bg">
      {
        "id" in newsletter && (
          <>
            <NewsletterDraftActions id={newsletter.id} />
            <Divider variant="light"/>
          </>
        )
      }

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