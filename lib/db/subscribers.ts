import { sql } from '@/lib/db/client';


export async function addSubscriber(email: string): Promise<boolean>
{
    const result = await sql `
        INSERT INTO subscribers (email)
        VALUES (${email})
        ON CONFLICT (email)
        DO UPDATE SET unsubscribed = false
        WHERE subscribers.unsubscribed = true
        RETURNING email;
    `;

    return result.length === 1;
}