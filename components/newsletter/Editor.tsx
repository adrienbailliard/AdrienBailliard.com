"use client"

import Markdown from 'react-markdown'
import { useState } from "react";

import EditableField from "@/components/ui/EditableField";
import NewsletterView, { NewsletterTitle } from "@/components/newsletter/View";

import { Newsletter, InsertNewsletterParam } from "@/lib/types";



type EditorProps = {
  newsletter: Newsletter | InsertNewsletterParam;
};


export default function Editor({ newsletter }: EditorProps)
{
    const [selectedEditor, setSelectedEditor] = useState<string | null>(null);


    return (
        <>
            <section className="bg-dark-bg text-center text-light-muted-fg">
                <div className="max-w-4xl">
                    <EditableField
                        newsletter={ newsletter }
                        field="excerpt"
                        variant="dark"
                        selectedEditor={selectedEditor}
                        setSelectedEditor={setSelectedEditor}
                    >
                        <p>{ newsletter.excerpt }</p>
                    </EditableField>
                </div>
            </section>
        
            <NewsletterView
                title={
                    <EditableField
                        newsletter={ newsletter }
                        field="title"
                        variant="dark"
                        selectedEditor={selectedEditor}
                        setSelectedEditor={setSelectedEditor}
                    >
                        <NewsletterTitle value={ newsletter.title } />
                    </EditableField>
                }
                content={
                    <EditableField
                        newsletter={ newsletter }
                        field="content"
                        variant="light"
                        selectedEditor={selectedEditor}
                        setSelectedEditor={setSelectedEditor}
                    >
                        <Markdown>{ newsletter.content }</Markdown>
                    </EditableField>
                }
                date={ new Date() }
            />
        </>
    );
}