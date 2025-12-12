import Link from "next/link";

import { formatAdminDate } from '@/lib/utils';
import { NewsletterDraftPreview } from "@/lib/types";


type DraftCardProps = {
    draft: NewsletterDraftPreview;
    now: Date;
}


export default function DraftCard({ draft, now }: DraftCardProps)
{
    return (
        <Link href={`/newsletter/${draft.slug}`}>
            <div className="card-list">
                <div className="card-title">
                    { draft.title }
                </div>
                <time>
                    { formatAdminDate(draft.updated_at, now) }
                </time>
                <p className="card-container">
                    { draft.excerpt }
                </p>
            </div>
        </Link>
    );
}