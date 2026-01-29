import { updateTag } from 'next/cache';

import CACHE_TAGS from '@/lib/db/cache-tags';
import { getDomainValidity, upsertDomain } from "@/lib/db/domains";



export async function isValidDomain(domain: string): Promise<boolean>
{
    let isValid = await getDomainValidity(domain);

    if (isValid !== undefined)
        return isValid;

    const request = await fetch(`https://api.emailable.com/v1/verify?email=@@${domain}&api_key=${process.env.EMAILABLE_API_KEY}`);

    if (request.status !== 200)
        throw Error(`Unexpected status from Emailable API: ${request.status}`);

    const { disposable, mx_record } = await request.json();
    isValid = disposable === false && mx_record !== null;

    await upsertDomain(domain, isValid);
    updateTag(`${CACHE_TAGS.domainValidity}-${domain}`);

    return isValid;
}