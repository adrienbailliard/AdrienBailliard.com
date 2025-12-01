import { getLastMessages } from '@/lib/db/messages';
import { DATA_REVALIDATE } from '@/lib/constants';


export async function GET()
{
    const messages = await getLastMessages();

    return Response.json(messages, {
        headers: {
            'Cache-Control': 'public, s-maxage=' + DATA_REVALIDATE
        }
    });
}