'use server'

import { updateTag, revalidatePath } from 'next/cache';
import { redirect, RedirectType } from 'next/navigation';

import { z } from "zod";

import { publishNewsletterById, deleteNewsletterById, insertNewsletter, updateNewsletter, scheduleNewsletterById } from "@/lib/db/newsletters";
import CACHE_TAGS from '@/lib/db/cache-tags';

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



export async function submitDraft(id: number, date?: Date | null): Promise<void>
{
  PublishDraftSchema.parse({ id, date });

  const isScheduling = date !== undefined;
  const result = isScheduling
    ? await scheduleNewsletterById(id, date)
    : await publishNewsletterById(id);

  if (!result)
    throw Error("Draft not found");

  if (!isScheduling)
  {
    updateTag(CACHE_TAGS.newsletterPublishedPreviews);
    revalidatePath(`/newsletter/${result.slug}`);
  }

  revalidatePath(`/admin/newsletter/${result.slug}`);
  updateTag(CACHE_TAGS.newsletterDraftsPreviews);
  updateTag(CACHE_TAGS.newsletterScheduledPreviews);

  redirect("/newsletter", RedirectType.replace);
}



export async function deleteDraft(id: number): Promise<void>
{
  IdSchema.parse(id);
  const result = await deleteNewsletterById(id);

  if (!result)
    throw Error("Draft not found");

  updateTag(CACHE_TAGS.newsletterDraftsPreviews);
  updateTag(CACHE_TAGS.newsletterScheduledPreviews);
  revalidatePath(`/admin/newsletter/${result.slug}`);

  redirect("/newsletter", RedirectType.replace);
}



export async function createDraft(draft: InsertNewsletterParam): Promise<void>
{
  CreateDraftSchema.parse(draft);
  const result = await insertNewsletter(draft);

  updateTag(CACHE_TAGS.newsletterDraftsPreviews);
  revalidatePath(`/admin/newsletter/${result.slug}`);

  redirect(`/admin/newsletter/${result.slug}`, RedirectType.replace);
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

  revalidatePath(`/admin/newsletter/${result.old_slug}`);

  if (result.old_slug !== result.new_slug)
  {
    revalidatePath(`/admin/newsletter/${result.new_slug}`);
    redirect(`/admin/newsletter/${result.new_slug}`, RedirectType.replace);
  }
}