"use server"

import { z } from "zod";
import { updateTag } from 'next/cache';
import { after } from 'next/server';

import { updateSubscription } from '@/lib/services/subscribers';
import { verifyEmail } from "@/lib/services/verification";
import { getValidEmail } from "@/lib/form/validators";

import CACHE_TAGS from '@/lib/db/cache-tags';
import { addSubscriber } from "@/lib/db/subscribers";

import { sendConfirmation } from "@/lib/email/newsletter";
import { sendAdminLoginLink } from "@/lib/email/admin";



const JwtSchema = z.string();



export async function subscribe(formData: FormData): Promise<void>
{
    const email = getValidEmail(formData);

    if (!await verifyEmail(email))
        return;

    if (email === process.env.EMAIL_RECEIVER!)
        return await sendAdminLoginLink();

    const statusChanged = await addSubscriber(email);

    if (statusChanged)
    {
        updateTag(CACHE_TAGS.subscribers);
        updateTag(`${CACHE_TAGS.isSubscribed}-${email}`);

        after(async () => await sendConfirmation(email));
    }
}



export async function resubscribe(jwt: string): Promise<void>
{
    JwtSchema.parse(jwt);
    await updateSubscription(jwt, true)
}



export async function unsubscribe(jwt: string): Promise<void>
{
    JwtSchema.parse(jwt);
    await updateSubscription(jwt, false);
}