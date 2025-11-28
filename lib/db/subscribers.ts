import { sql } from '@/lib/db/client';
import { SubscriberStats } from '@/lib/types';
import { WEEK_IN_MS, STATS_PERCENTAGE_PRECISION } from '@/lib/constants';


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


export async function getSubscriberStats(): Promise<SubscriberStats>
{
  const result = await sql `
    SELECT 
      COUNT(*) as total_subscribers,
      COUNT(*) FILTER (WHERE created_at > (EXTRACT(epoch FROM now()) * 1000 - ${WEEK_IN_MS})) as weekly_subscribers,
      ROUND(100.0 * COUNT(*) FILTER (WHERE unsubscribed = true) / NULLIF(COUNT(*), 0), ${STATS_PERCENTAGE_PRECISION}) as unsubscribe_rate
    FROM subscribers
  ` as SubscriberStats[];
  
  return result[0];
}