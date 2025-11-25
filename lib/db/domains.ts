import { sql } from "@/lib/db/client";
import { emailStatus } from "@/lib/form/constants";


type DomainData = {
  domain: string;
  status: emailStatus;
  checked_at: number;
}


export async function getDomainData(domain: string): Promise<DomainData | null>
{
  const result = await sql`
    SELECT domain, status, checked_at
    FROM domains
    WHERE domain = ${domain}
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
      checked_at = floor((EXTRACT(epoch FROM now()) * 1000))
  `;
}