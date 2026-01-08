import { remark } from 'remark';
import html from 'remark-html';

import EditableField from "@/components/ui/EditableField";
import { formatPublicDate } from "@/lib/utils";
import { EditorNewsletterParam, InsertNewsletterParam } from "@/lib/types";



type NewsletterContentProps = {
  newsletter: EditorNewsletterParam;
  date: Date;
  isEditable?: boolean;
};



export default async function Content({ newsletter, date, isEditable = false }: NewsletterContentProps)
{
    const processedContent = await remark()
        .use(html)
        .process(newsletter.content);


    const renderEditable = (field: keyof InsertNewsletterParam, content: React.ReactNode) => {
        if (!isEditable)
            return content;

        return (
            <EditableField newsletter={newsletter} field={field}>
                {content}
            </EditableField>
        );
    };


    return (
        <>
            <section className="bg-dark-bg text-light-fg">
                <div className="text-center max-w-4xl">
                    {
                        renderEditable("title",
                            <h1>{ newsletter.title }</h1>)
                    }
                    <time className='block mt-5'>
                        { formatPublicDate(date) }
                    </time>
                </div>
            </section>

            <article className="bg-light-bg text-dark-fg">
                <div className="max-w-4xl">
                    {
                        renderEditable("content",
                            <div dangerouslySetInnerHTML={{ __html: processedContent.toString() }} />)
                    }
                </div>
            </article>
        </>
    );
}