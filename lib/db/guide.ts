import { sql } from '@/lib/db/client';
import { GuideStats } from '@/lib/types';
import { WEEK_IN_MS } from '@/lib/constants';


export async function insertRequestGuide(email: string): Promise<void>
{
    await sql `
        INSERT INTO guide_requests (email)
        VALUES (${email})
        ON CONFLICT (email)
        DO UPDATE SET request_count = guide_requests.request_count + 1
    `;
}


export async function getGuideStats(): Promise<GuideStats>
{
  const result = await sql `
    SELECT 
      COUNT(*) as total_emails,
      COUNT(*) FILTER (WHERE created_at > (EXTRACT(epoch FROM now()) * 1000 - ${WEEK_IN_MS})) as weekly_emails,
      ROUND(100.0 * COUNT(*) FILTER (WHERE request_count > 1) / NULLIF(COUNT(*), 0), 2) as retries,
      MAX(request_count) as max_requests
    FROM guide_requests
  ` as GuideStats[];
  
  return result[0];
}