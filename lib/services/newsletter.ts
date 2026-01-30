import { getActiveSubscribers } from "@/lib/db/subscribers";
import { sendEdition } from "@/lib/email/newsletter";

import { Newsletter } from "@/lib/types";
import { BATCH_SIZE } from "@/lib/constants";



export async function sendNewsletterEmails(newsletter: Newsletter): Promise<void>
{
    const emails = await getActiveSubscribers();
    const promises = new Array();

    for (let i = 0; i < emails.length; i += BATCH_SIZE)
    {
        const batch = emails.slice(i, i + BATCH_SIZE);
        promises.push(sendEdition(batch, newsletter));
    }

    await Promise.all(promises);
}