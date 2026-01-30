'use server'

import { updateTag } from 'next/cache';

import { insertRequestGuide } from "@/lib/db/guide";
import { isEmailAllowed } from "@/lib/db/blacklist";
import { sendGuide } from "@/lib/email/guide";
import CACHE_TAGS from '@/lib/db/cache-tags';

import { isValidDomain } from "@/lib/form/domain-checker";
import { getValidEmail } from "@/lib/form/validators";



export async function request(formData: FormData): Promise<void>
{
    const email = getValidEmail(formData);

    const isAllowed = await isEmailAllowed(email);
    if (!isAllowed) return;

    const isDomainValid = await isValidDomain(email.split("@")[1]);
    if (!isDomainValid) return;

    await Promise.all([
        insertRequestGuide(email),
        sendGuide(email)
    ]);

    updateTag(CACHE_TAGS.guideStats);
}