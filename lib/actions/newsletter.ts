'use server';
import { after } from 'next/server';
import { updateTag, revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

import { z } from "zod";

import { isValidDomain } from "@/lib/form/domain-checker";
import { getValidEmail } from "@/lib/form/validators";

import { publishNewsletterById, deleteNewsletterById, insertNewsletter, updateNewsletter } from "@/lib/db/newsletters";
import { addSubscriber } from "@/lib/db/subscribers";

import { sendConfirmation } from "@/lib/email/newsletter";
import { sendAdminLoginLink } from "@/lib/email/admin";

import { InsertNewsletterParam } from "@/lib/types";



const DraftActionSchema = z.object({
  id: z.number().min(1),
  slug: z.string().min(1)
});


const CreateDraftSchema = z.object({
  title: z.string().trim().min(1),
  content: z.string().trim().min(1),
  excerpt: z.string().trim().min(1)
});


const UpdateDraftSchema = DraftActionSchema.extend(CreateDraftSchema.partial().shape)
  .refine(data => data.title || data.content || data.excerpt);



export async function subscribe(formData: FormData): Promise<void>
{
  const email = getValidEmail(formData);

  after(async () =>
  {
    const result = await isValidDomain(email.split("@")[1]);

    if (!result)
      throw new Error("Invalid domain");

    if (email === process.env.EMAIL_RECEIVER!)
      await sendAdminLoginLink();

    else if (await addSubscriber(email))
      await sendConfirmation(email);
  });
}



export async function publishDraft(id: number, slug: string): Promise<void>
{
  const validData = DraftActionSchema.parse({ id, slug });

  await publishNewsletterById(validData.id);

  updateTag("published-newsletter-previews");
  updateTag("newsletter-drafts-previews");
  updateTag("published-newsletter-slugs");

  revalidatePath(`/admin/newsletter/${validData.slug}`);
  revalidatePath(`/newsletter/${validData.slug}`);

  redirect("/newsletter");
}



export async function deleteDraft(id: number, slug: string): Promise<void>
{
  const validData = DraftActionSchema.parse({ id, slug });

  await deleteNewsletterById(validData.id);

  updateTag("newsletter-drafts-previews");
  revalidatePath(`/admin/newsletter/${validData.slug}`);

  redirect("/newsletter");
}



export async function createDraft(draft: InsertNewsletterParam): Promise<void>
{
  const validData = CreateDraftSchema.parse(draft);
  const response = await insertNewsletter(validData);

  updateTag("newsletter-drafts-previews");
  revalidatePath(`/admin/newsletter/${response.slug}`);

  redirect(`/admin/newsletter/${response.slug}`);
}



export async function updateDraft(id: number, slug: string, data: Partial<InsertNewsletterParam>): Promise<void>
{
  const validData = UpdateDraftSchema.parse({ id, slug, ...data });
  const response = await updateNewsletter(validData);

  if (!response)
    throw new Error("Draft not found");

  if (!validData.content)
    updateTag("newsletter-drafts-previews");

  revalidatePath(`/admin/newsletter/${validData.slug}`);

  if (validData.slug !== response.slug)
  {
    revalidatePath(`/admin/newsletter/${response.slug}`);
    redirect(`/admin/newsletter/${response.slug}`);
  }
}