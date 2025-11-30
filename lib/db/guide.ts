import { sql } from '@/lib/db/client';
import { GuideStats, StatResponse } from '@/lib/types';
import { formatPercentage, adaptLabel, formatGain } from '@/lib/utils';
import { WEEK_IN_MS, STATS_PERCENTAGE_PRECISION } from '@/lib/constants';


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
      COUNT(*) as total_emails,
      COUNT(*) FILTER (WHERE created_at > (EXTRACT(epoch FROM now()) * 1000 - ${WEEK_IN_MS})) as weekly_emails,
      ROUND(100.0 * COUNT(*) FILTER (WHERE request_count > 1) / NULLIF(COUNT(*), 0), ${STATS_PERCENTAGE_PRECISION}) as retries
    FROM guide_requests
  ` as GuideStats[];

  const stats = result[0];


  return [
    { value: stats.total_emails, label:
      adaptLabel(stats.total_emails, { singular: 'Email total', plural: 'Emails totaux' })
    },
    { value: formatGain(stats.weekly_emails), label: 
      adaptLabel(stats.weekly_emails, {singular: 'Email cette semaine', plural: 'Emails cette semaine' })
    },
    { value: formatPercentage(stats.retries), label: 'Taux de relance' }
  ];
}