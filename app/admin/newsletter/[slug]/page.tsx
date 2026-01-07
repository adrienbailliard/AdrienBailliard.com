import { notFound } from "next/navigation";

import NewsletterContent from "@/components/newsletter/Content";
import Divider from "@/components/ui/Divider";
import NewsletterDraftActions from "@/components/newsletter/DraftActions";
import EditableField from "@/components/ui/EditableField";

import { DRAFT_CREATION_SLUG } from "@/lib/constants";
import { getNewsletterDraftBySlug } from "@/lib/db/newsletters";



type NewsletterPageProps = {
  params: Promise<{ slug: string }>;
};


export const generateStaticParams = async () => [];



export default async function NewsletterPage({ params }: NewsletterPageProps)
{
  const { slug } = await params;

  const newsletter = slug === DRAFT_CREATION_SLUG
    ? { excerpt: "Description courte", title: "Titre", content: "Écris ton contenu..." }
    : await getNewsletterDraftBySlug(slug);

  if (!newsletter)
    notFound();


  return (
    <main className="bg-light-bg">
      {
        "id" in newsletter && (
          <>
            <NewsletterDraftActions id={newsletter.id} slug={newsletter.slug} />
            <Divider variant="light"/>
          </>
        )
      }

      <section className="bg-dark-bg text-center text-light-muted-text">
        <div className="max-w-4xl">
          <EditableField
            newsletter={ newsletter }
            field="excerpt"
          >
            <p>{ newsletter.excerpt }</p>
          </EditableField>
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