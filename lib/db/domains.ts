import { sql } from "@/lib/db/client";
import { DomainData } from "@/lib/types";
import { DOMAIN_CACHE_TTL_MS } from "@/lib/constants";


export async function getDomainData(domain: string): Promise<DomainData | null>
{
  const result = await sql`
    SELECT domain, status, checked_at
    FROM domains
    WHERE domain = ${domain} AND checked_at > now() - INTERVAL '${DOMAIN_CACHE_TTL_MS} milliseconds'
  ` as DomainData[];

  return result[0] ?? null;
}


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