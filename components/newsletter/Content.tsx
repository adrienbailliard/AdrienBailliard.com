import { remark } from 'remark';
import html from 'remark-html';

import { formatPublicDate } from "@/lib/utils";


type NewsletterContentProps = {
  title: string;
  content: string;
  date: Date;
};


export default async function Content({ title, content, date }: NewsletterContentProps)
{
    const processedContent = await remark()
        .use(html)
        .process(content);

    return (
        <>
            <section className="bg-dark-bg text-light-fg">
                <div className="text-center max-w-4xl">
                    <h1 className="mb-5">{ title }</h1>
                    <time>
                        { formatPublicDate(date) }
                    </time>
                </div>
            </section>

            <article className="bg-light-bg text-dark-fg">
                <div
                    className="max-w-4xl"
                    dangerouslySetInnerHTML={{ __html: processedContent.toString() }}
                />
            </article>
        </>
    );
}