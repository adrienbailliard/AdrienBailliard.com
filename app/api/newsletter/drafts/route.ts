import { z } from 'zod';
import { revalidatePath, revalidateTag } from 'next/cache';
import { getNewsletterDraftsPreviews, insertNewsletter, updateNewsletter } from '@/lib/db/newsletters';



const InsertDraftSchema = z.object({
  title: z.string().trim().min(1),
  content: z.string().trim().min(1),
  excerpt: z.string().trim().min(1)
});


const UpdateDraftSchema = z.object(
  {
    id: z.number().min(1),
    slug: z.string().min(1),
    title: z.string().trim().min(1).optional(),
    content: z.string().trim().min(1).optional(),
    excerpt: z.string().trim().min(1).optional()
  }
).refine(data => data.title || data.content || data.excerpt);



export async function GET()
{
  const drafts = await getNewsletterDraftsPreviews();
  return Response.json(drafts);
}



export async function POST(request: Request)
{
  const body = await request.json();
  const validData = InsertDraftSchema.parse(body.draft);

  const response = await insertNewsletter(validData);
  revalidateTag("newsletter-drafts-previews", { expire: 0 });

  return Response.json(response, { status: 201 });
}



export async function PATCH(request: Request)
{
  const body = await request.json();
  const validData = UpdateDraftSchema.parse(body.draft);

  const response = await updateNewsletter(validData);

  if (!response)
    return Response.json({ error: "Draft not found" }, { status: 404 });

  if (!validData.content)
    revalidateTag("newsletter-drafts-previews", { expire: 0 });

  revalidatePath(`/admin/newsletter/${validData.slug}`);
  return Response.json(response);
}