'use server'

import { updateTag } from 'next/cache';

import { insertRequestGuide } from "@/lib/db/guide";
import CACHE_TAGS from '@/lib/db/cache-tags';

import { verifyEmail } from "@/lib/services/verification";
import { getValidEmail } from "@/lib/form/validators";

import { sendGuide } from "@/lib/email/guide";



export async function request(formData: FormData): Promise<void>
{
    const email = getValidEmail(formData);

    if (!await verifyEmail(email))
        return;

    await Promise.all([
        insertRequestGuide(email),
        sendGuide(email)
    ]);

    updateTag(CACHE_TAGS.guideStats);
}