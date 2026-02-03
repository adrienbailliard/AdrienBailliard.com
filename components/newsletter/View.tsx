import { formatPublicDate } from "@/lib/utils";
import newsletterConfig from "@/config/newsletter";



export function NewsletterTitle({ value }: { value: string })
{
    return <h2>{ newsletterConfig.slogan }{ value }</h2>;
};



type ViewProps = {
  title: React.ReactNode;
  content: React.ReactNode;
  date: Date | string;
};


export default function View({ title, content, date }: ViewProps)
{
    return (
        <>
            <section className="bg-dark-bg text-light-fg">
                <div className="text-center max-w-4xl">
                    { title }
                    <time className='block mt-7'>
                        { formatPublicDate(date) }
                    </time>
                </div>
            </section>

            <article className="bg-light-bg text-dark-fg">
                <div className="max-w-4xl">
                    { content }
                </div>
            </article>
        </>
    );
}