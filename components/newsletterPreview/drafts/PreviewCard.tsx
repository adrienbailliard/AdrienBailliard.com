import Link from "next/link";

import { formatDate } from '@/lib/utils';
import { NewsletterDraftPreview } from "@/lib/types";


type DraftCardProps = {
    draft: NewsletterDraftPreview;
    now: Date;
}


export default function DraftCard({ draft, now }: DraftCardProps)
{
    return (
        <Link href={`/newsletter/${draft.slug}`} className="flex items-center">
            <div className="newsletter-card-list-icon text-dark-fg font-bold text-xs flex items-center justify-center">
                { draft.title.charAt(0) }
            </div>
            <div className="card-list flex-1">
                <div className="card-title">
                    { draft.title }
                </div>
                <time>
                    { formatDate(draft.updated_at, now) }
                </time>
                <p className="card-container">
                    { draft.excerpt }
                </p>
            </div>
        </Link>
    );
}