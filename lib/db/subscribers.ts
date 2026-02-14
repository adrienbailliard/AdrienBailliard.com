import { unstable_cache } from 'next/cache';

import { sql } from '@/lib/db/client';
import CACHE_TAGS from '@/lib/db/cache-tags';

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



export const isSubscribed = (email: string) =>
  unstable_cache(
    async (): Promise<boolean> => {
      const result = await sql `
        SELECT unsubscribed FROM subscribers
        WHERE email = ${email}
      `;

      return result.length === 0
        ? false
        : !result[0].unsubscribed;
    },
    [ CACHE_TAGS.isSubscribed, email ],
    { tags: [ `${CACHE_TAGS.isSubscribed}-${email}` ] }
  )();



export const getActiveSubscribers = unstable_cache(
    async (): Promise<Array<string>> => {
      const result = await sql `
        SELECT email FROM subscribers
        WHERE unsubscribed = false
      `;

      return result.map(data => data.email);
    },
    [ "get-active-subscribers" ],
    { tags: [ CACHE_TAGS.subscribers ] }
  );



export async function unsubscribe(emails: Array<string>): Promise<void>
{
    await sql `
        UPDATE subscribers
        SET unsubscribed = true
        WHERE email = ANY(${emails})
    `;
}



export const getSubscribersStats = unstable_cache(
  async (): Promise<Array<StatResponse>> => {
    const [ stats ] = await sql `
      SELECT 
        COUNT(*) FILTER (WHERE unsubscribed = false) as total_subscribers,
        COUNT(*) FILTER (WHERE created_at > now() - INTERVAL '7 days' AND unsubscribed = false) as weekly_subscribers,
        ROUND(100.0 * COUNT(*) FILTER (WHERE unsubscribed = true) / NULLIF(COUNT(*), 0), ${STATS_PERCENTAGE_PRECISION}) as unsubscribe_rate
      FROM subscribers
    ` as SubscribersStats[];

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
  [ "subscribers-stats" ],
  {
    tags: [ CACHE_TAGS.subscribers ],
    revalidate: 3600
  }
);