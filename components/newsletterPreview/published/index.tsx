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
    const previews = await getPublishedNewsletterPreviews(limit);

    if (previews.length === 0)
    {
        previews.push({
            slug: "en-cours",
            title: "Découvrir l'Inédit",
            excerpt: "Notre newsletter arrive bientôt ! Préparez-vous à accéder aux stratégies exclusives du Top 1%.",
            published_at: new Date()
        });
    }


    return (
        <section className="bg-light-bg text-dark-fg">
            <div>
                <h2 className="text-center">
                    { title }
                </h2>
                <div className="flex max-lg:flex-col lg:grid grid-cols-2 max-w-6xl mx-auto gap-10 md:gap-12 lg:gap-16">
                    { previews.map((preview, index) => <PreviewCard key={index} preview={preview} />) }
                </div>
                { cta && <Cta />}
            </div>
        </section>
    );
}