'use server'

import { updateTag, revalidatePath } from 'next/cache';
import { redirect, RedirectType } from 'next/navigation';

import { z } from "zod";

import { sendNewsletterEmails } from "@/lib/services/newsletter";
import { publishNewsletterById, deleteNewsletterById, insertNewsletter, updateNewsletter, scheduleNewsletterById } from "@/lib/db/newsletters";
import CACHE_TAGS from '@/lib/db/cache-tags';

import { InsertNewsletterParam, UpdateNewsletterParam } from "@/lib/types";
import { NEWSLETTER_ROUTE, ADMIN_ROUTE } from "@/lib/constants";



const IdSchema = z.number().min(1);

const ScheduleDraftSchema = z.object({
  date: z.date().nullable()
}).extend({ id: IdSchema });


const CreateDraftSchema = z.object({
  title: z.string().trim().min(1),
  content: z.string().trim().min(1),
  excerpt: z.string().trim().min(1)
});


const UpdateDraftSchema = CreateDraftSchema.partial().extend({ id: IdSchema })
  .refine(data => data.title || data.content || data.excerpt);



export async function scheduleDraft(id: number, date: Date | null): Promise<void>
{
  ScheduleDraftSchema.parse({ id, date });
  const result = await scheduleNewsletterById(id, date)

  if (!result)
    throw Error("Draft not found");

  revalidatePath(`${ADMIN_ROUTE}${NEWSLETTER_ROUTE}/${result.slug}`);
  updateTag(CACHE_TAGS.newsletterDraftsPreviews);
  updateTag(CACHE_TAGS.newsletterScheduledPreviews);

  redirect(NEWSLETTER_ROUTE, RedirectType.replace);
}



export async function publishDraft(id: number): Promise<void>
{
  IdSchema.parse(id);
  const result = await publishNewsletterById(id);

  if (!result)
    throw Error("Draft not found");

  revalidatePath(`${ADMIN_ROUTE}${NEWSLETTER_ROUTE}/${result.slug}`);
  revalidatePath(`${NEWSLETTER_ROUTE}/${result.slug}`);
  updateTag(CACHE_TAGS.newsletterPublishedPreviews);
  updateTag(CACHE_TAGS.newsletterDraftsPreviews);
  updateTag(CACHE_TAGS.newsletterScheduledPreviews);

  await sendNewsletterEmails(result);

  redirect(NEWSLETTER_ROUTE, RedirectType.replace);
}



export async function deleteDraft(id: number): Promise<void>
{
  IdSchema.parse(id);
  const result = await deleteNewsletterById(id);

  if (!result)
    throw Error("Draft not found");

  updateTag(CACHE_TAGS.newsletterDraftsPreviews);
  updateTag(CACHE_TAGS.newsletterScheduledPreviews);
  revalidatePath(`${ADMIN_ROUTE}${NEWSLETTER_ROUTE}/${result.slug}`);

  redirect(NEWSLETTER_ROUTE, RedirectType.replace);
}



export async function createDraft(draft: InsertNewsletterParam): Promise<void>
{
  CreateDraftSchema.parse(draft);
  const result = await insertNewsletter(draft);

  updateTag(CACHE_TAGS.newsletterDraftsPreviews);
  revalidatePath(`${ADMIN_ROUTE}${NEWSLETTER_ROUTE}/${result.slug}`);

  redirect(`${ADMIN_ROUTE}${NEWSLETTER_ROUTE}/${result.slug}`, RedirectType.replace);
}



export async function updateDraft(draft: UpdateNewsletterParam): Promise<void>
{
  UpdateDraftSchema.parse(draft);
  const result = await updateNewsletter(draft);

  if (!result)
    throw Error("Draft not found");

  if (!draft.content)
  {
    updateTag(CACHE_TAGS.newsletterDraftsPreviews);
    updateTag(CACHE_TAGS.newsletterScheduledPreviews);
  }

  revalidatePath(`${ADMIN_ROUTE}${NEWSLETTER_ROUTE}/${result.old_slug}`);

  if (result.old_slug !== result.new_slug)
  {
    revalidatePath(`${ADMIN_ROUTE}${NEWSLETTER_ROUTE}/${result.new_slug}`);
    redirect(`${ADMIN_ROUTE}${NEWSLETTER_ROUTE}/${result.new_slug}`, RedirectType.replace);
  }
}