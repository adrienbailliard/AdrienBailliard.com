import { sql } from '@/lib/db/client';
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


export async function getGuideStats(): Promise<Array<StatResponse>>
{
  const result = await sql `
    SELECT 
      COUNT(*) as total_contacts,
      COUNT(*) FILTER (WHERE created_at > now() - INTERVAL '7 days') as weekly_contacts,
      ROUND(100.0 * COUNT(*) FILTER (WHERE request_count > 1) / NULLIF(COUNT(*), 0), ${STATS_PERCENTAGE_PRECISION}) as retries_rate
    FROM guide_requests
  ` as GuideStats[];

  const stats = result[0];


  return [
    { value: stats.total_contacts, label:
      adaptLabel(stats.total_contacts, { singular: 'Contact total', plural: 'Contacts totaux' })
    },
    { value: formatGain(stats.weekly_contacts), label: 
      adaptLabel(stats.weekly_contacts, {singular: 'Contact cette semaine', plural: 'Contacts cette semaine' })
    },
    { value: formatPercentage(stats.retries_rate), label: 'Taux de relance' }
  ];
}