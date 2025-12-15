"use client"
import { useState } from 'react';

import { publishDraft, deleteDraft } from "@/lib/actions/newsletter";
import Button from "@/components/ui/Button";


type NewsletterDraftActionsProps = {
    id: number;
    slug: string;
};


export default function NewsletterDraftActions({ id, slug }: NewsletterDraftActionsProps)
{
    const [ isPublishPending, setIsPublishPending ] = useState(false);
    const [ isDeletePending, setIsDeletePending ] = useState(false);

    const handlePublish = () => {
        publishDraft(id, slug);
        setIsPublishPending(!isPublishPending);
    };

    const handleDelete = () => {
        deleteDraft(id, slug);
        setIsDeletePending(!isDeletePending);
    };


    return (
        <section className="bg-dark-bg text-light-fg">
            <div className="flex gap-7 justify-center flex-wrap">
                <Button
                    variant="light-primary"
                    className='button-compact py-0'
                >
                    Modifier
                </Button>
                <Button
                    variant="light-primary"
                    onClick={handleDelete}
                    disabled={isDeletePending}
                    className='button-compact py-0'
                >
                    { isDeletePending ? "Suppression..." : "Supprimer" }
                </Button>
                <Button
                    variant="dark-primary"
                    onClick={handlePublish}
                    disabled={isPublishPending}
                    className='button-compact py-0'
                >
                    { isPublishPending ? "Publication..." : "Publier" }
                </Button>
            </div>
        </section>
    );
}