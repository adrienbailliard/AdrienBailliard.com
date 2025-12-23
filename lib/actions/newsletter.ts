'use server';
import { after } from 'next/server';
import { updateTag, revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

import { z } from "zod";

import { isValidDomain } from "@/lib/form/domain-checker";
import { getValidEmail } from "@/lib/form/validators";

import { publishNewsletterById, deleteNewsletterById } from "@/lib/db/newsletters";
import { addSubscriber } from "@/lib/db/subscribers";

import { sendConfirmation } from "@/lib/email/newsletter";
import { sendAdminLoginLink } from "@/lib/email/admin";



const DraftActionSchema = z.object({
  id: z.number().min(1),
  slug: z.string().min(1)
});



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



export async function publishDraft(id: number, slug: string)
{
  const validData = DraftActionSchema.parse({ id, slug });

  await publishNewsletterById(validData.id);

  updateTag("published-newsletter-previews");
  updateTag("newsletter-drafts-previews");
  updateTag("published-newsletter-slugs");
  revalidatePath(`/admin/newsletter/${validData.slug}`);

  redirect("/newsletter");
}



export async function deleteDraft(id: number, slug: string)
{
  const validData = DraftActionSchema.parse({ id, slug });

  await deleteNewsletterById(validData.id);

  updateTag("newsletter-drafts-previews");
  revalidatePath(`/admin/newsletter/${validData.slug}`);
  redirect("/newsletter");
}