import { updateSubscription } from '@/lib/services/subscribers';
import authConfig from "@/config/auth";



export async function POST(request: Request)
{
    const { searchParams } = new URL(request.url);
    const jwt = searchParams.get(authConfig.cookie.name);

    if (!jwt)
        throw Error("JWT not found");

    await updateSubscription(jwt, false);

    return Response.json({ success: true });
}