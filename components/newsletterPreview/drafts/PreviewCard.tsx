import Link from "next/link";

import { formatAdminDate } from '@/lib/utils';
import { SerializedNewsletterPreview } from "@/lib/types";



type DraftCardProps = {
    draft: SerializedNewsletterPreview;
}


export default function DraftCard({ draft }: DraftCardProps)
{
    return (
        <Link href={`/admin/newsletter/${draft.slug}`}>
            <div className="card-list">
                <div className="card-title">
                    { draft.title }
                </div>
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