import { z } from 'zod';
import { getNewsletterDraftsPreviews, insertNewsletter, updateNewsletter } from '@/lib/db/newsletters';



const InsertDraftSchema = z.object({
  title: z.string().trim().min(1),
  content: z.string().trim().min(1),
  excerpt: z.string().trim().min(1)
});


const UpdateDraftSchema = z.object(
  {
    id: z.number().min(1),
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

  const draft = await insertNewsletter(validData);
  return Response.json(draft, { status: 201 });
}



export async function PATCH(request: Request)
{
  const body = await request.json();
  const validData = UpdateDraftSchema.parse(body.draft);

  const draft = await updateNewsletter(validData);

  if (!draft)
    return Response.json({ error: "Draft not found" }, { status: 404 });

  return Response.json(draft);
}