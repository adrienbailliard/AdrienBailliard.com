'use server';
import { after } from 'next/server'
import { updateTag } from 'next/cache';

import CACHE_TAGS from '@/lib/db/cache-tags';
import { isValidDomain } from "@/lib/form/domain-checker";
import { sendMessage } from "@/lib/email/messages";
import { insertMessage } from "@/lib/db/messages";
import { getValidContactData } from "@/lib/form/validators";



export async function contact(formData: FormData): Promise<void>
{
    const validData = getValidContactData(formData);

    after(async () =>
    {
        const result = await isValidDomain(validData.email.split("@")[1]);

        if (!result)
            throw new Error("Invalid domain");

        await insertMessage(validData);
        updateTag(CACHE_TAGS.messagesStats);
        updateTag(CACHE_TAGS.messages);

        await sendMessage(validData);
    });
}