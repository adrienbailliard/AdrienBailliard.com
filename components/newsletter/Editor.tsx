"use client"

import Markdown from 'react-markdown';

import { useNewsletterEditor } from '@/contexts/newsletterEditor';

import EditableField from "@/components/ui/EditableField";
import Divider from "@/components/ui/Divider";
import NewsletterView, { NewsletterTitle } from "@/components/newsletter/View";
import NewsletterDraftActions from "@/components/newsletter/DraftActions";



export default function Editor()
{
    const { newsletter } = useNewsletterEditor();

    return (
        <>
            <NewsletterDraftActions/>
            <Divider variant="light"/>

            <section className="bg-dark-bg text-center text-light-muted-fg">
                <div className="max-w-4xl">
                    <EditableField
                        field="excerpt"
                        variant="dark"
                    >
                        <p>{ newsletter.excerpt }</p>
                    </EditableField>
                </div>
            </section>

            <NewsletterView
                title={
                    <EditableField
                        field="title"
                        variant="dark"
                    >
                        <NewsletterTitle value={ newsletter.title } />
                    </EditableField>
                }
                content={
                    <EditableField
                        field="content"
                        variant="light"
                    >
                        <Markdown>{ newsletter.content }</Markdown>
                    </EditableField>
                }
                date={ new Date() }
            />
        </>
    );
}