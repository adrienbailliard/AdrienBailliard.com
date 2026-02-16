import { z } from "zod";
import { revalidateTag } from 'next/cache';

import { getNewsletterDraftsPreviews, insertNewsletter, updateNewsletter } from '@/lib/db/newsletters';
import CACHE_TAGS from '@/lib/db/cache-tags';
import { NEWSLETTER_ROUTE, ADMIN_ROUTE } from "@/lib/constants";



const CreateDraftSchema = z.object({
  title: z.string().trim().min(1),
  content: z.string().trim().min(1),
  excerpt: z.string().trim().min(1)
});


const UpdateDraftSchema = CreateDraftSchema.partial().extend({
  id: z.number().min(1)
})
  .refine(data => data.title || data.content || data.excerpt);



export async function GET()
{
  const drafts = await getNewsletterDraftsPreviews();
  return Response.json(drafts);
}



export async function POST(request: Request)
{
  const body = await request.json();
  const draft = CreateDraftSchema.parse(body);

  const newsletter = await insertNewsletter(draft);

  revalidateTag(CACHE_TAGS.newsletterDraftsPreviews, { expire: 0 });
  revalidateTag(`${CACHE_TAGS.newsletter}-${newsletter.slug}-false`, { expire: 0 });

  return Response.json({ newsletter, newPath: `${ADMIN_ROUTE}${NEWSLETTER_ROUTE}/${newsletter.slug}` });
}



export async function PATCH(request: Request)
{
  const body = await request.json();
  const draft = UpdateDraftSchema.parse(body);

  let newPath = null;
  const result = await updateNewsletter(draft);

  if (!result)
    throw Error("Draft not found");

  revalidateTag(CACHE_TAGS.newsletterDraftsPreviews, { expire: 0 });
  revalidateTag(CACHE_TAGS.newsletterScheduledPreviews, { expire: 0 });
  revalidateTag(`${CACHE_TAGS.newsletter}-${result.old_slug}-false`, { expire: 0 });

  if (result.old_slug !== result.new_slug)
  {
    revalidateTag(`${CACHE_TAGS.newsletter}-${result.new_slug}-false`, { expire: 0 });
    newPath = `${ADMIN_ROUTE}${NEWSLETTER_ROUTE}/${result.new_slug}`;
  }

  return Response.json({ newPath });
}