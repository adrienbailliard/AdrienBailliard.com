import { sql } from "@/lib/db/client";
import { unstable_cache } from 'next/cache';

import CACHE_TAGS from '@/lib/db/cache-tags';



export async function blacklistEmails(emails: Array<string>): Promise<void>
{
    await sql`
        INSERT INTO email_blacklist (email)
        SELECT unnest(${emails}::text[])
        ON CONFLICT (email) DO NOTHING
    `;
}



export const isEmailAllowed = (email: string) =>
    unstable_cache(
        async (): Promise<boolean> => {
            const result = await sql`
                SELECT 1
                FROM email_blacklist
                WHERE email = ${email}
            `;

            return result.length === 0;
        },
        [ CACHE_TAGS.emailAllowed, email ],
        { tags: [ `${CACHE_TAGS.emailAllowed}-${email}` ] }
    )();