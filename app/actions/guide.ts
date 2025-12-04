'use server';

import { after } from 'next/server';

import { getValidEmail } from "@/lib/form/validators";
import { insertRequestGuide } from "@/lib/db/guide";
import { sendGuide } from "@/lib/email/guide";


export async function request(formData: FormData): Promise<void>
{
    after(async () =>
    {
        const email = await getValidEmail(formData);

        if (!email)
            throw new Error("Invalid email");

        await insertRequestGuide(email);
        await sendGuide(email);
    });
}