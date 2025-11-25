import { sql } from '@/lib/db/client';


export async function insertRequestGuide(email: string): Promise<void>
{
    await sql `
        INSERT INTO guide_requests (email)
        VALUES (${email})
        ON CONFLICT (email)
        DO UPDATE SET request_count = guide_requests.request_count + 1
    `;
}