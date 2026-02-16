'use server'

import { updateTag } from 'next/cache';
import { redirect, RedirectType } from 'next/navigation';

import { z } from "zod";

import { sendNewsletterEmails } from "@/lib/services/newsletter";
import { publishNewsletterById, deleteNewsletterById, scheduleNewsletterById } from "@/lib/db/newsletters";
import CACHE_TAGS from '@/lib/db/cache-tags';

import { NEWSLETTER_ROUTE } from "@/lib/constants";



const IdSchema = z.number().min(1);


const ScheduleDraftSchema = z.object({
  date: z.date().nullable()
}).extend({ id: IdSchema });



export async function scheduleDraft(id: number, date: Date | null): Promise<void>
{
  ScheduleDraftSchema.parse({ id, date });
  const result = await scheduleNewsletterById(id, date)

  if (!result)
    throw Error("Draft not found");

  updateTag(`${CACHE_TAGS.newsletter}-${result.slug}-false`);
  updateTag(CACHE_TAGS.newsletterDraftsPreviews);
  updateTag(CACHE_TAGS.newsletterScheduledPreviews);

  if (date)
    redirect(NEWSLETTER_ROUTE);
}



export async function publishDraft(id: number): Promise<void>
{
  IdSchema.parse(id);
  const result = await publishNewsletterById(id);

  if (!result)
    throw Error("Draft not found");

  updateTag(`${CACHE_TAGS.newsletter}-${result.slug}`);
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
  updateTag(`${CACHE_TAGS.newsletter}-${result.slug}-false`);

  redirect(NEWSLETTER_ROUTE, RedirectType.replace);
}