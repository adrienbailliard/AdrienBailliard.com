import { sql } from "@/lib/db/client";
import { unstable_cache } from 'next/cache';
import { DOMAIN_CACHE_TTL_DAYS } from "@/lib/constants";



export const getDomainValidity = unstable_cache(
  async (domain: string): Promise<boolean | undefined> => {
    const [ domainValidity ] = await sql`
      SELECT is_valid
      FROM domains
      WHERE domain = ${domain}
        AND checked_at > now() - make_interval(days => ${DOMAIN_CACHE_TTL_DAYS})
    `;

    return domainValidity?.is_valid;
  },
  ['domain-validation'],
  { revalidate: 86400 }
);



export async function upsertDomain(domain: string, isValid: boolean): Promise<void>
{
  await sql`
    INSERT INTO domains (domain, is_valid)
    VALUES (${domain}, ${isValid})
    ON CONFLICT (domain)
    DO UPDATE SET
      is_valid = EXCLUDED.is_valid,
      checked_at = now()
  `;
}