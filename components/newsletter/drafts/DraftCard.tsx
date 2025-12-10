import Link from "next/link";
import { NewsletterDraftPreview } from "@/lib/types";


type DraftCardProps = {
    draft: NewsletterDraftPreview;
}


export default function DraftCard({ draft }: DraftCardProps)
{
    return (
        <Link href={`/newsletter/${draft.slug}`}>
            <div className="element-list">
            </div>
        </Link>
    );
}