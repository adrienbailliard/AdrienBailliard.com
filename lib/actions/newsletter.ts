'use server';
import { after } from 'next/server';
import { updateTag, revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

import { z } from "zod";

import { isValidDomain } from "@/lib/form/domain-checker";
import { getValidEmail } from "@/lib/form/validators";

import { publishNewsletterById, deleteNewsletterById, insertNewsletter, updateNewsletter } from "@/lib/db/newsletters";
import { addSubscriber } from "@/lib/db/subscribers";
import { isEmailAllowed } from "@/lib/db/blacklist";
import CACHE_TAGS from '@/lib/db/cache-tags';

import { sendConfirmation } from "@/lib/email/newsletter";
import { sendAdminLoginLink } from "@/lib/email/admin";

import { InsertNewsletterParam, UpdateNewsletterParam } from "@/lib/types";



const IdSchema = z.number().min(1);


const CreateDraftSchema = z.object({
  title: z.string().trim().min(1),
  content: z.string().trim().min(1),
  excerpt: z.string().trim().min(1)
});


const UpdateDraftSchema = CreateDraftSchema.partial().extend({ id: IdSchema })
  .refine(data => data.title || data.content || data.excerpt);



export async function subscribe(formData: FormData): Promise<void>
{
  const email = getValidEmail(formData);

  after(async () =>
  {
    const isAllowed = await isEmailAllowed(email);
    if (!isAllowed) return; 

    const isDomainValid = await isValidDomain(email.split("@")[1]);
    if (!isDomainValid) return;

    if (email === process.env.EMAIL_RECEIVER!)
      await sendAdminLoginLink();

    else if (await addSubscriber(email))
    {
      updateTag(CACHE_TAGS.subscribersStats);
      await sendConfirmation(email);
    }
  });
}



export async function publishDraft(id: number): Promise<void>
{
  const validId = IdSchema.parse(id);
  const result = await publishNewsletterById(validId);

  if (!result) return;

  updateTag(CACHE_TAGS.newsletterPublished);
  updateTag(CACHE_TAGS.newsletterDrafts);
  updateTag(CACHE_TAGS.newsletterScheduled);

  revalidatePath(`/admin/newsletter/${result.slug}`);
  revalidatePath(`/newsletter/${result.slug}`);

  redirect("/newsletter");
}



export async function deleteDraft(id: number): Promise<void>
{
  const validId = IdSchema.parse(id);
  const result = await deleteNewsletterById(validId);

  if (!result) return;

  updateTag(CACHE_TAGS.newsletterDrafts);
  updateTag(CACHE_TAGS.newsletterScheduled);
  revalidatePath(`/admin/newsletter/${result.slug}`);

  redirect("/newsletter");
}



export async function createDraft(draft: InsertNewsletterParam): Promise<void>
{
  const validData = CreateDraftSchema.parse(draft);
  const result = await insertNewsletter(validData);

  updateTag(CACHE_TAGS.newsletterDrafts);
  revalidatePath(`/admin/newsletter/${result.slug}`);

  redirect(`/admin/newsletter/${result.slug}`);
}



export async function updateDraft(draft: UpdateNewsletterParam): Promise<void>
{
  const validData = UpdateDraftSchema.parse(draft);
  const result = await updateNewsletter(validData);

  if (!result) return;

  if (!validData.content)
  {
    updateTag(CACHE_TAGS.newsletterDrafts);
    updateTag(CACHE_TAGS.newsletterScheduled);
  }

  revalidatePath(`/admin/newsletter/${result.old_slug}`);

  if (result.old_slug !== result.new_slug)
  {
    revalidatePath(`/admin/newsletter/${result.new_slug}`);
    redirect(`/admin/newsletter/${result.new_slug}`);
  }
}