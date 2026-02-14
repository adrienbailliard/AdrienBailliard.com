import { unstable_cache } from 'next/cache';

import { sql } from '@/lib/db/client';
import CACHE_TAGS from '@/lib/db/cache-tags';
import { GuideStats, StatResponse } from '@/lib/types';

import { formatPercentage, adaptLabel, formatGain } from '@/lib/utils';
import { STATS_PERCENTAGE_PRECISION } from '@/lib/constants';



export async function insertRequestGuide(email: string): Promise<void>
{
    await sql `
        INSERT INTO guide_requests (email)
        VALUES (${email})
        ON CONFLICT (email)
        DO UPDATE SET request_count = guide_requests.request_count + 1
    `;
}



export const getGuideStats = unstable_cache(
  async (): Promise<Array<StatResponse>> => {
    const [ stats ] = await sql `
      SELECT 
        COUNT(*) as total_contacts,
        COUNT(*) FILTER (WHERE created_at > now() - INTERVAL '7 days') as weekly_contacts,
        ROUND(100.0 * COUNT(*) FILTER (WHERE request_count > 1) / NULLIF(COUNT(*), 0), ${STATS_PERCENTAGE_PRECISION}) as retries_rate
      FROM guide_requests
    ` as GuideStats[];

    return [
      { value: stats.total_contacts, label:
        adaptLabel(stats.total_contacts, { singular: 'Contact total', plural: 'Contacts totaux' })
      },
      { value: formatGain(stats.weekly_contacts), label: 
        adaptLabel(stats.weekly_contacts, {singular: 'Contact cette semaine', plural: 'Contacts cette semaine' })
      },
      { value: formatPercentage(stats.retries_rate), label: 'Taux de relance' }
    ];
  },
  [ CACHE_TAGS.guideStats ],
  {
    tags: [ CACHE_TAGS.guideStats ],
    revalidate: 3600
  }
);