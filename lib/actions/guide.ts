'use server';
import { after } from 'next/server';
import { updateTag } from 'next/cache';

import { insertRequestGuide } from "@/lib/db/guide";
import { sendGuide } from "@/lib/email/guide";
import CACHE_TAGS from '@/lib/db/cache-tags';

import { isValidDomain } from "@/lib/form/domain-checker";
import { getValidEmail } from "@/lib/form/validators";



export async function request(formData: FormData): Promise<void>
{
    const email = getValidEmail(formData);

    after(async () =>
    {
        const result = await isValidDomain(email.split("@")[1]);

        if (!result)
            throw new Error("Invalid domain");

        await insertRequestGuide(email);
        updateTag(CACHE_TAGS.guideStats);
        
        await sendGuide(email);
    });
}