import { sql } from '@/lib/db/client';
import { SubscriberStats, StatResponse } from '@/lib/types';
import { formatPercentage, adaptLabel } from '@/lib/utils';
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


export async function getSubscriberStats(): Promise<Array<StatResponse>>
{
  const result = await sql `
    SELECT 
      COUNT(*) as total_subscribers,
      COUNT(*) FILTER (WHERE created_at > (EXTRACT(epoch FROM now()) * 1000 - ${WEEK_IN_MS})) as weekly_subscribers,
      ROUND(100.0 * COUNT(*) FILTER (WHERE unsubscribed = true) / NULLIF(COUNT(*), 0), ${STATS_PERCENTAGE_PRECISION}) as unsubscribe_rate
    FROM subscribers
  ` as SubscriberStats[];
  
  const stats = result[0];


  return [
    { value: stats.total_subscribers, label:
      adaptLabel(stats.total_subscribers, { singular: 'Abonné total', plural: 'Abonnés totaux' })
    },
    { value: stats.weekly_subscribers, label:
      adaptLabel(stats.weekly_subscribers, { singular: 'Abonné cette semaine', plural: 'Abonnés cette semaine' })
    },
    { value: formatPercentage(stats.unsubscribe_rate), label: 'Taux de désinscription' }
  ];
}