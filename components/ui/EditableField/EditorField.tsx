"use client";
import { useState, useCallback, useTransition } from "react";
import TextareaAutosize from 'react-textarea-autosize';

import { InsertNewsletterParam, EditorNewsletterParam } from "@/lib/types";
import { createDraft, updateDraft } from "@/lib/actions/newsletter";



type EditorFieldProps = {
    newsletter: EditorNewsletterParam;
    field: keyof InsertNewsletterParam;
    setIsEditing: (value: boolean) => void;
}


export default function EditorField({ newsletter, field, setIsEditing }: EditorFieldProps)
{
    const [isPending, startTransition] = useTransition();
    const [value, setValue] = useState(newsletter[field]);


    const handleSave = () =>
        startTransition(async () => {
            const trimmedValue = value.trim();

            if (newsletter[field] === trimmedValue)
                return setIsEditing(false);

            try {
                newsletter.id
                    ? await updateDraft({ id: newsletter.id, [field]: trimmedValue })
                    : await createDraft({ ...newsletter, [field]: trimmedValue });

                setIsEditing(false);
            }
            catch {}
        });


    const autoFocusAtEnd = useCallback((node: HTMLTextAreaElement | null) => {
        if (!node)
            return;

        const length = node.value.length;
        node.focus();
        node.setSelectionRange(length, length);
    }, []);


    return (
        <>
            <div className="flex gap-7 self-end">
                <button
                    className='text-primary font-medium'
                    onClick={ () => setIsEditing(false) }
                >
                    Annuler
                </button>
                <button
                    onClick={handleSave}
                    className='text-primary font-medium'
                    disabled={isPending || value.trim().length === 0}
                >
                    { isPending ? "Validation..." : "Valider" }
                </button>
            </div>
            <TextareaAutosize
                ref={ autoFocusAtEnd }
                aria-label={ `Modifier le champ ${field}` }
                className="resize-none mt-2 w-full"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                disabled={isPending}
            />
        </>
    );
}