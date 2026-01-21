import Link from "next/link";
import newsletterConfig from "@/config/newsletter";

import { SerializedNewsletterPreview, NewsletterPreview } from "@/lib/types";
import { formatPublicDate } from "@/lib/utils";



type PreviewCardProps = {
  preview: SerializedNewsletterPreview | NewsletterPreview;
}


export function PreviewCard({ preview }: PreviewCardProps)
{
    return (
        <Link href={`/newsletter/${preview.slug}`}>
            <div className="flex max-sm:flex-col sm:gap-8 lg:gap-0 lg:flex-col lg:max-w-md m-auto">
                <div className="bg-dark-bg text-light-fg h-54 sm:h-44 md:h-54 lg:h-64 rounded-md flex items-center justify-center p-8 lg:p-10 sm:basis-1/2 lg:basis-auto">
                    <h4 className="text-center uppercase">
                        <span className="font-extralight">
                            { newsletterConfig.slogan }
                        </span>
                        { preview.title }
                    </h4>
                </div>
                <div className="sm:basis-1/2 lg:basis-auto max-sm:mt-5 mt-0 lg:mt-5">
                    <p className="text-base text-dark-muted-fg">
                        { formatPublicDate(preview.published_at!) }
                    </p>
                    <h5 className="font-medium mt-2">
                        { newsletterConfig.slogan + preview.title }
                    </h5>
                    <p className="text-base mt-2">
                        { preview.excerpt }
                    </p>
                </div>
            </div>
        </Link>
    );
}