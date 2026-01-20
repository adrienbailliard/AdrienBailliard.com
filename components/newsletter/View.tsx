import { remark } from 'remark';
import html from 'remark-html';

import { formatPublicDate } from "@/lib/utils";



export function NewsletterTitle({ value }: { value: string })
{
    return <h1>{ value }</h1>;
};



export async function NewsletterContentServer({ value }: { value: string })
{
    const processedContent = await remark()
        .use(html)
        .process(value);

    return <div dangerouslySetInnerHTML={{ __html: processedContent.toString() }} />;
};



type ViewProps = {
  title: React.ReactNode;
  content: React.ReactNode;
  date: Date;
};


export default function View({ title, content, date }: ViewProps)
{
    return (
        <>
            <section className="bg-dark-bg text-light-fg">
                <div className="text-center max-w-4xl">
                    { title }
                    <time className='block mt-5'>
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