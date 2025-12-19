'use server';

import { after } from 'next/server';

import { updateTag } from 'next/cache';
import { redirect } from 'next/navigation';

import { publishNewsletterById, deleteNewsletterById } from "@/lib/db/newsletters";
import { getValidEmail } from "@/lib/form/validators";
import { addSubscriber } from "@/lib/db/subscribers";
import { sendConfirmation } from "@/lib/email/newsletter";
import { sendAdminLoginLink } from "@/lib/email/admin";



export async function subscribe(formData: FormData): Promise<void>
{
    after(async () =>
    {
        const email = await getValidEmail(formData);

        if (!email)
            throw new Error("Invalid email");

        if (email == process.env.EMAIL_RECEIVER!)
            await sendAdminLoginLink();

        else if (await addSubscriber(email))
            await sendConfirmation(email);
    });
}


export async function publishDraft(id: number, slug: string)
{
  await publishNewsletterById(id);

  updateTag("published-newsletter-previews");
  updateTag("published-newsletter-slugs");
  updateTag("newsletter-drafts-slugs");

  redirect("/newsletter");
}


export async function deleteDraft(id: number)
{
  await deleteNewsletterById(id);

  updateTag("newsletter-drafts-slugs");
  redirect("/newsletter");
}