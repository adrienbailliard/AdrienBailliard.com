'use server'

import { updateTag } from 'next/cache';

import CACHE_TAGS from '@/lib/db/cache-tags';
import { insertMessage } from "@/lib/db/messages";

import { verifyEmail } from "@/lib/services/verification";
import { getValidContactData } from "@/lib/form/validators";

import { sendMessage } from "@/lib/email/messages";



export async function contact(formData: FormData): Promise<void>
{
    const validData = getValidContactData(formData);

    if (!await verifyEmail(validData.email))
        return;

    await Promise.all([
        insertMessage(validData),
        sendMessage(validData)
    ]);

    updateTag(CACHE_TAGS.messagesStats);
    updateTag(CACHE_TAGS.messages);
}