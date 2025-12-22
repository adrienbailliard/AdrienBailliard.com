import { domainStatus, MAX_FECTH_EMAIL_RETRY, FECTH_EMAIL_DELAY } from "@/lib/constants";
import { getDomainStatus, upsertDomain } from "@/lib/db/domains";



export async function isValidDomain(domain: string): Promise<boolean>
{
    let status = await getDomainStatus(domain);

    if (status)
        return status === domainStatus.VALID;

    const request = await fetchEmailWithRetry(`check@${domain}`);
    const result = await request.json();

    status = result.disposable === true || result.mx_record === null
        ? domainStatus.INVALID
        : domainStatus.VALID;

    await upsertDomain(domain, status);
    return status === domainStatus.VALID;
}


async function fetchEmailWithRetry(email: string): Promise<Response>
{
    const url = `https://api.emailable.com/v1/verify?email=${email}&api_key=${process.env.EMAILABLE_API_KEY}`;
    let request = await fetch(url), i = 0;

    while (request.status === 249 && i < MAX_FECTH_EMAIL_RETRY)
    {
        await new Promise(resolve => setTimeout(resolve, FECTH_EMAIL_DELAY));
        request = await fetch(url);
        i++;
    }

    if (request.status !== 200)
        throw new Error(`Email API error: ${request.status}`);

    return request;
}