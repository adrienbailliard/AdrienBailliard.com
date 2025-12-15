import NewsletterContent from "@/components/NewsletterContent";
import Button from "@/components/ui/Button";
import Divider from "@/components/Divider";

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
      <section className="bg-dark-bg text-light-fg">
        <div className="flex gap-7 justify-center flex-wrap">
          <Button variant="light-primary">Modifier</Button>
          <Button variant="light-primary">Supprimer</Button>
          <Button variant="dark-primary">Publier</Button>
        </div>
      </section>

      <section className="bg-dark-bg pt-0 text-center text-light-muted-text">
        <div className="max-w-4xl">
          <p>{ newsletter.excerpt }</p>
        </div>
      </section>

      <Divider variant="light"/>

      <NewsletterContent
        title={newsletter.title}
        content={newsletter.content}
        date={newsletter.updated_at}
      />
    </main>
  );
}