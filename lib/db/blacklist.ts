import { sql } from "@/lib/db/client";



export async function insertEmail(emails: Array<string>): Promise<void>
{
    await sql`
        INSERT INTO email_blacklist (email)
        SELECT unnest(${emails}::text[])
        ON CONFLICT (email) DO NOTHING
    `;
}