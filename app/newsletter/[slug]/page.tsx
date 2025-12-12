import { getNewsletterBySlug } from "@/lib/db/newsletters";
import { notFound } from "next/navigation";


type NewsletterPageProps = {
  params: Promise<{ slug: string }>;
};


export default async function NewsletterPage({ params }: NewsletterPageProps)
{
  const { slug } = await params;
  const newsletter = await getNewsletterBySlug(slug);

  if (!newsletter)
    notFound();


  return (
    <></>
  );
}