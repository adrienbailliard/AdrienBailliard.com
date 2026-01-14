import { sql } from "@/lib/db/client";
import { unstable_cache } from 'next/cache';
import { DOMAIN_CACHE_TTL_DAYS, domainStatus } from "@/lib/constants";



export const getDomainStatus = unstable_cache(
  async (domain: string): Promise<domainStatus | undefined> => {
    const result = await sql`
      SELECT status
      FROM domains
      WHERE domain = ${domain}
        AND checked_at > now() - make_interval(days => ${DOMAIN_CACHE_TTL_DAYS})
    ` as [{ status: domainStatus }];

    return result[0]?.status;
  },
  ['domain-validation'],
  { revalidate: 86400 }
);



export async function upsertDomain(domain: string, status: number): Promise<void>
{
  await sql`
    INSERT INTO domains (domain, status)
    VALUES (${domain}, ${status})
    ON CONFLICT (domain)
    DO UPDATE SET
      status = EXCLUDED.status,
      checked_at = now()
  `;
}