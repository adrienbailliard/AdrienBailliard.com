import { markMessageAsRead } from '@/lib/db/messages';


export async function POST(
    request: Request,
    { params }: { params: Promise<{ id: string }> } 
)
{
    const { id } = await params;
    await markMessageAsRead(id);
    return Response.json({ success: true });
}