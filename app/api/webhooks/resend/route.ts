import { resend } from "@/lib/email/client";
import { insertEmail } from "@/lib/db/blacklist";



export async function POST(req: Request)
{
    const payload = await req.text();

    const result: any = resend.webhooks.verify({
      payload,
      headers: {
        id: req.headers.get('svix-id')!,
        timestamp: req.headers.get('svix-timestamp')!,
        signature: req.headers.get('svix-signature')!
      },
      webhookSecret: process.env.RESEND_WEBHOOK_SECRET!,
    });

    await insertEmail(result.data.to);

    return Response.json({ success: true });
}