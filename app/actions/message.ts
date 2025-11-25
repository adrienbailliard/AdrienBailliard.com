'use server';

import { after } from 'next/server'

import { getValidEmail, isValidString, normalizeString } from "@/lib/form/validators";
import { sendMessage } from "@/lib/email/messages";
import { MessageInput } from "@/lib/types";
import fieldMaxLengths from "@/config/fieldMaxLengths";


export async function contact(formData: FormData): Promise<void>
{
    after(async () =>
    {
        const email = await getValidEmail(formData);

        if (!email)
            return;

        const data: Partial<MessageInput> = { email };
        const fields: Array<keyof Omit<MessageInput, "email">> =
            ["firstName", "lastName", "company", "category", "message"];


        for (const field of fields)
        {
            const rawValue = formData.get(field);

            if (isValidString(rawValue, fieldMaxLengths[field]))
                data[field] = normalizeString(rawValue as string);
            else
                return;
        }

        await sendMessage(data as MessageInput);
    });
}