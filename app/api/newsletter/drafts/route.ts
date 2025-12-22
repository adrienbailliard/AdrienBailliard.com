import { z } from 'zod';
import { getNewsletterDraftsPreviews, insertNewsletter, updateNewsletter } from '@/lib/db/newsletters';


const InsertDraftSchema = z.object({
  title: z.string().min(1),
  content: z.string().min(1),
  excerpt: z.string().min(1)
});

const UpdateDraftSchema = z.object({
  id: z.number(),
  title: z.string().min(1).optional(),
  content: z.string().min(1).optional(),
  excerpt: z.string().min(1).optional()
});


export async function GET()
{
  const drafts = await getNewsletterDraftsPreviews();
  return Response.json(drafts);
}


export async function POST(request: Request)
{
  const body = await request.json();
  const result = InsertDraftSchema.safeParse(body.draft);

  if (!result.success)
    return Response.json({ error: "Invalid data" }, { status: 400 });

  const draft = await insertNewsletter(result.data);
  return Response.json(draft, { status: 201 });
}


export async function PATCH(request: Request)
{
  const body = await request.json();
  const result = UpdateDraftSchema.safeParse(body.draft);

  if (!result.success)
    return Response.json({ error: "Invalid data" }, { status: 400 });

  
  const draft = await updateNewsletter(result.data);

  if (!draft)
    return Response.json({ error: "Draft not found" }, { status: 404 });

  return Response.json(draft);
}