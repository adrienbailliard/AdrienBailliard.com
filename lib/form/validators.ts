import { domainStatus, EMAIL_PATTERN, MAX_FECTH_EMAIL_RETRY, FECTH_EMAIL_DELAY } from "@/lib/constants";
import { getDomainStatus, upsertDomain } from "@/lib/db/domains";
import fieldMaxLengths from "@/config/fieldMaxLengths";


const emailRegex = new RegExp("^" + EMAIL_PATTERN);

async function isValidEmail(email: string): Promise<boolean>
{
    if (!emailRegex.test(email))
        return false;

    const domain = email.split("@")[1];
    let status = await getDomainStatus(domain);

    if (status)
        return status === domainStatus.VALID;

    const request = await fetchEmailWithRetry(email);

    const result = await request.json();
    status = result.disposable === true || result.mx_record === null
        ? domainStatus.INVALID
        : domainStatus.VALID;

    upsertDomain(domain, status);
    return status === domainStatus.VALID;
}


async function fetchEmailWithRetry(email: string): Promise<Response>
{
    const url = `https://api.emailable.com/v1/verify?email=${email}&api_key=${process.env.EMAILABLE_API_KEY}`;
    let i = 0;
    let request = await fetch(url);

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


export async function getValidEmail(formData: FormData): Promise<string | null>
{
    const raw = formData.get('email');
    const str = getValidString(raw, fieldMaxLengths.email);

    if (!str)
        return null;

    const email = str.toLowerCase();
    return await isValidEmail(email) ? email : null;
}


export function getValidString(value: unknown, maxLength: number): string | null
{
    if (typeof value !== "string")
        return null;

    const str = value.trim().replace(/\r/g, '');
    return str.length > 0 && str.length <= maxLength ? str : null;
}