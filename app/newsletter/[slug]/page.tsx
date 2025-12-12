import NotFound from "@/app/not-found";
import { getNewsletterBySlug } from "@/lib/db/newsletters";


type NewsletterPageProps = {
  params: Promise<{ slug: string }>;
};


export default async function NewsletterPage({ params }: NewsletterPageProps)
{
  const { slug } = await params;
  const newsletter = await getNewsletterBySlug(slug);

  if (!newsletter)
    return <NotFound />;


  return (
    <></>
  );
}