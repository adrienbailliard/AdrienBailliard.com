import { emailStatus, EMAIL_PATTERN, MAX_FECTH_EMAIL_RETRY, FECTH_EMAIL_DELAY } from "@/lib/constants";
import { getDomainData, upsertDomain } from "@/lib/db/domains";
import fieldMaxLengths from "@/config/fieldMaxLengths";


const emailRegex = new RegExp("^" + EMAIL_PATTERN);

async function isValidEmail(email: string): Promise<boolean>
{
    if (!emailRegex.test(email))
        return false;

    const domain = email.split("@")[1];
    const domainData = await getDomainData(domain);

    if (domainData)
        return domainData.status === emailStatus.VALID;

    const request = await fetchEmailWithRetry(email);

    const result = await request.json();
    const status = result.disposable === true || result.mx_record === null
        ? emailStatus.INVALID
        : emailStatus.VALID;

    upsertDomain(domain, status);
    return status === emailStatus.VALID;
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

    if (!isValidString(raw, fieldMaxLengths.email))
        return null;

    const email = normalizeString(raw as string, true);
    const valid = await isValidEmail(email);

    return valid ? email : null;
}


export function isValidString(str: unknown, maxLength: number): boolean
{
    return typeof str === "string" && str.length > 0 && str.length <= maxLength;
}


export function normalizeString(str: string, isEmail: boolean = false): string
{
    if (isEmail)
        str = str.toLowerCase();

    return str.trim();
}