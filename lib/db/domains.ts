import { sql } from "@/lib/db/client";
import { unstable_cache } from 'next/cache';

import CACHE_TAGS from '@/lib/db/cache-tags';
import { DOMAIN_CACHE_TTL_DAYS } from "@/lib/constants";



export const getDomainValidity = (domain: string) =>
  unstable_cache(
    async (): Promise<boolean | undefined> => {
      const [ domainValidity ] = await sql`
        SELECT is_valid
        FROM domains
        WHERE domain = ${domain}
          AND checked_at > now() - make_interval(days => ${DOMAIN_CACHE_TTL_DAYS})
      `;

      return domainValidity?.is_valid;
    },
    [ CACHE_TAGS.domainValidity, domain ],
    {
      revalidate: 86400,
      tags: [ `${CACHE_TAGS.domainValidity}-${domain}` ]
    }
  )();



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