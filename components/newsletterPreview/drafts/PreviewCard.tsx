import Link from "next/link";
import newsletterConfig from "@/config/newsletter";

import { formatAdminDate } from '@/lib/utils';
import { SerializedNewsletterPreview } from "@/lib/types";
import { NEWSLETTER_ROUTE, ADMIN_ROUTE } from "@/lib/constants";



type DraftCardProps = {
    draft: SerializedNewsletterPreview;
}


export default function DraftCard({ draft }: DraftCardProps)
{
    return (
        <Link href={`${ADMIN_ROUTE}${NEWSLETTER_ROUTE}/${draft.slug}`}>
            <div className="card-list">
                <p className="card-title">
                    { newsletterConfig.slogan }{ draft.title }
                </p>
                <time>
                    { formatAdminDate(draft.scheduled_for || draft.updated_at, draft.scheduled_for !== null) }
                </time>
                <p className="card-container">
                    { draft.excerpt }
                </p>
            </div>
        </Link>
    );
}