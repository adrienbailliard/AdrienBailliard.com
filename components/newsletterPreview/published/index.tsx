import Link from "@/components/ui/Link";

import { PreviewCard } from "./PreviewCard";
import { PublishedNewsletterPreview } from "@/lib/types";


type NewslettersProps = {
    title: string;
    data: Array<PublishedNewsletterPreview>;
    cta?: boolean;
}


export default function Newsletters({ title, data, cta }: NewslettersProps)
{
    return (
        <section className="bg-light-bg text-dark-fg">
            <div>
                <h2 className="text-center">
                    { title }
                </h2>
                <div className="flex max-lg:flex-col lg:grid grid-cols-2 max-w-6xl mx-auto gap-10 md:gap-12 lg:gap-16">
                    {
                        data.map((preview, index) =>
                            <PreviewCard key={index} preview={preview} />)
                    }
                </div>
                {
                    cta && (
                        <div className="text-center mt-10 md:mt-12 lg:mt-14">
                            <Link href="/newsletter" variant="button-primary">
                                { "Explore Les Éditions" }
                            </Link>
                        </div>
                    )
                }
            </div>
        </section> 
    );
}