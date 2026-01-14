import { getPublishedNewsletterPreviews } from "@/lib/db/newsletters";
import { PreviewCard } from "./PreviewCard";
import { Cta } from "./Cta";



type NewslettersProps = {
    title: string;
    cta?: boolean;
    limit?: number;
}


export default async function Newsletters({ title, cta, limit }: NewslettersProps)
{
    const previews = (await getPublishedNewsletterPreviews())
        .slice(0, limit);

    return (
        <section className="bg-light-bg text-dark-fg">
            <div>
                <h2 className="text-center">
                    { title }
                </h2>
                { previews.length === 0
                    ? <p className="text-dark-muted-text text-center">
                        { "La première édition arrive dans les prochains jours." }
                    </p>
                    : (
                        <div className="flex max-lg:flex-col lg:grid grid-cols-2 max-w-6xl mx-auto gap-10 md:gap-12 lg:gap-16">
                            { previews.map((preview) =>
                                <PreviewCard key={preview.slug} preview={preview} />) }
                        </div>
                    )
                }
                { cta && <Cta />}
            </div>
        </section>
    );
}