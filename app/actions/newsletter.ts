'use server';

import { after } from 'next/server'

import { getValidEmail } from "@/lib/form/validators";
import { addSubscriber } from "@/lib/db/subscribers";
import { sendConfirmation } from "@/lib/email/newsletter";
import { sendAdminLoginLink } from "@/lib/email/admin";


export async function subscribe(formData: FormData): Promise<void>
{
    after(async () =>
    {
        const email = await getValidEmail(formData);

        if (!email)
            throw new Error("Invalid email");

        if (email == process.env.EMAIL_RECEIVER!)
            await sendAdminLoginLink();

        else if (await addSubscriber(email))
            await sendConfirmation(email);
    });
}