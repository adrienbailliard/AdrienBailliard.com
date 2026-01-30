'use server'

import { updateTag } from 'next/cache';

import CACHE_TAGS from '@/lib/db/cache-tags';
import { isEmailAllowed } from "@/lib/db/blacklist";
import { sendMessage } from "@/lib/email/messages";
import { insertMessage } from "@/lib/db/messages";

import { isValidDomain } from "@/lib/form/domain-checker";
import { getValidContactData } from "@/lib/form/validators";



export async function contact(formData: FormData): Promise<void>
{
    const validData = getValidContactData(formData);

    const isAllowed = await isEmailAllowed(validData.email);
    if (!isAllowed) return; 

    const isDomainValid = await isValidDomain(validData.email.split("@")[1]);
    if (!isDomainValid) return;

    await Promise.all([
        insertMessage(validData),
        sendMessage(validData)
    ]);

    updateTag(CACHE_TAGS.messagesStats);
    updateTag(CACHE_TAGS.messages);
}