import { sql } from "@/lib/db/client";



export async function insertEmail(emails: Array<string>): Promise<void>
{
    await sql`
        INSERT INTO email_blacklist (email)
        SELECT unnest(${emails}::text[])
        ON CONFLICT (email) DO NOTHING
    `;
}



export async function isEmailAllowed(email: string): Promise<boolean>
{
    const result = await sql`
        SELECT 1
        FROM email_blacklist
        WHERE email = ${email}
    `;

    return result.length === 0;
}