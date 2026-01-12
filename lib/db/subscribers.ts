import { unstable_cache } from 'next/cache';

import { sql } from '@/lib/db/client';
import { SubscribersStats, StatResponse } from '@/lib/types';
import { formatPercentage, adaptLabel, formatGain } from '@/lib/utils';
import { STATS_PERCENTAGE_PRECISION } from '@/lib/constants';



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



export const getSubscribersStats = unstable_cache(
  async (): Promise<Array<StatResponse>> => {
    const result = await sql `
      SELECT 
        COUNT(*) as total_subscribers,
        COUNT(*) FILTER (WHERE created_at > now() - INTERVAL '7 days') as weekly_subscribers,
        ROUND(100.0 * COUNT(*) FILTER (WHERE unsubscribed = true) / NULLIF(COUNT(*), 0), ${STATS_PERCENTAGE_PRECISION}) as unsubscribe_rate
      FROM subscribers
    ` as SubscribersStats[];

    const stats = result[0];

    return [
      { value: stats.total_subscribers, label:
        adaptLabel(stats.total_subscribers, { singular: 'Abonné total', plural: 'Abonnés totaux' })
      },
      { value: formatGain(stats.weekly_subscribers), label:
        adaptLabel(stats.weekly_subscribers, { singular: 'Abonné cette semaine', plural: 'Abonnés cette semaine' })
      },
      { value: formatPercentage(stats.unsubscribe_rate), label: 'Taux de désinscription' }
    ];
  },
  ['subscribers-stats'],
  { tags: ['subscribers-stats'] }
);