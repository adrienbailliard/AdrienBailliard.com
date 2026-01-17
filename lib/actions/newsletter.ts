'use server';
import { after } from 'next/server';
import { updateTag, revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

import { z } from "zod";

import { isValidDomain } from "@/lib/form/domain-checker";
import { getValidEmail } from "@/lib/form/validators";

import { publishNewsletterById, deleteNewsletterById, insertNewsletter, updateNewsletter, scheduleNewsletterById } from "@/lib/db/newsletters";
import { addSubscriber } from "@/lib/db/subscribers";
import { isEmailAllowed } from "@/lib/db/blacklist";
import CACHE_TAGS from '@/lib/db/cache-tags';

import { sendConfirmation } from "@/lib/email/newsletter";
import { sendAdminLoginLink } from "@/lib/email/admin";

import { InsertNewsletterParam, UpdateNewsletterParam } from "@/lib/types";



const IdSchema = z.number().min(1);

const PublishDraftSchema = z.object({
  date: z.date().optional().nullable()
}).extend({ id: IdSchema });


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



export async function submitDraft(id: number, date?: Date | null): Promise<void>
{
  PublishDraftSchema.parse({ id, date });

  const isScheduling = date !== undefined;
  const result = isScheduling
    ? await scheduleNewsletterById(id, date)
    : await publishNewsletterById(id);

  if (!result)
    return;

  if (!isScheduling)
  {
    updateTag(CACHE_TAGS.newsletterPublishedPreviews);
    revalidatePath(`/newsletter/${result.slug}`);
  }

  revalidatePath(`/admin/newsletter/${result.slug}`);
  updateTag(CACHE_TAGS.newsletterDraftsPreviews);
  updateTag(CACHE_TAGS.newsletterScheduledPreviews);

  redirect("/newsletter");
}



export async function deleteDraft(id: number): Promise<void>
{
  IdSchema.parse(id);
  const result = await deleteNewsletterById(id);

  if (!result) return;

  updateTag(CACHE_TAGS.newsletterDraftsPreviews);
  updateTag(CACHE_TAGS.newsletterScheduledPreviews);
  revalidatePath(`/admin/newsletter/${result.slug}`);

  redirect("/newsletter");
}



export async function createDraft(draft: InsertNewsletterParam): Promise<void>
{
  CreateDraftSchema.parse(draft);
  const result = await insertNewsletter(draft);

  updateTag(CACHE_TAGS.newsletterDraftsPreviews);
  revalidatePath(`/admin/newsletter/${result.slug}`);

  redirect(`/admin/newsletter/${result.slug}`);
}



export async function updateDraft(draft: UpdateNewsletterParam): Promise<void>
{
  UpdateDraftSchema.parse(draft);
  const result = await updateNewsletter(draft);

  if (!result) return;

  if (!draft.content)
  {
    updateTag(CACHE_TAGS.newsletterDraftsPreviews);
    updateTag(CACHE_TAGS.newsletterScheduledPreviews);
  }

  revalidatePath(`/admin/newsletter/${result.old_slug}`);

  if (result.old_slug !== result.new_slug)
  {
    revalidatePath(`/admin/newsletter/${result.new_slug}`);
    redirect(`/admin/newsletter/${result.new_slug}`);
  }
}