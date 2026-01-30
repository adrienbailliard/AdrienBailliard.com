import { revalidateTag } from 'next/cache';
import CACHE_TAGS from '@/lib/db/cache-tags';

import { resend } from "@/lib/email/client";
import { blacklistEmails } from "@/lib/db/blacklist";
import { unsubscribe } from "@/lib/db/subscribers";



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
      webhookSecret: process.env.RESEND_WEBHOOK_SECRET!
    });


    if (result.type === 'email.complained' || result.type === 'email.bounced')
    {
      const emails = result.data.to;

      await Promise.all([
          blacklistEmails(emails),
          unsubscribe(emails)
      ]);

      revalidateTag(CACHE_TAGS.subscribersStats, { expire: 0 });

      for (const email of emails)
      {
        revalidateTag(`${CACHE_TAGS.emailAllowed}-${email}`, { expire: 0 });
        revalidateTag(`${CACHE_TAGS.isSubscribed}-${email}`, { expire: 0 });
      }
    }


    return Response.json({ success: true });
}