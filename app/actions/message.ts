'use server';

import { after } from 'next/server'

import { getValidEmail, getValidString } from "@/lib/form/validators";
import { sendMessage } from "@/lib/email/messages";
import { insertMessage } from "@/lib/db/messages";
import { MessageInput } from "@/lib/types";
import fieldMaxLengths from "@/config/fieldMaxLengths";


export async function contact(formData: FormData): Promise<void>
{
    after(async () =>
    {
        const email = await getValidEmail(formData);

        if (!email)
            throw new Error("Email invalide");

        const data: Partial<MessageInput> = { email };
        const fields: Array<keyof Omit<MessageInput, "email">> =
            ["firstName", "lastName", "company", "category", "content"];


        for (const field of fields)
        {
            const rawValue = formData.get(field);
            const str = getValidString(rawValue, fieldMaxLengths[field]);

            if (!str)
                throw new Error(`Champ ${field} invalide`);

            data[field] = str;
        }

        await insertMessage(data as MessageInput);
        await sendMessage(data as MessageInput);
    });
}