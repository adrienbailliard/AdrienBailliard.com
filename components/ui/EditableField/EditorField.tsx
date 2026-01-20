import { useState, useCallback, useTransition } from "react";
import TextareaAutosize from 'react-textarea-autosize';

import { InsertNewsletterParam, EditorNewsletterParam } from "@/lib/types";
import { createDraft, updateDraft } from "@/lib/actions/newsletter";



type EditorFieldProps = {
    newsletter: EditorNewsletterParam;
    field: keyof InsertNewsletterParam;
    onEdit: (value: boolean) => void;
    variant: "light" | "dark";
}


export default function EditorField({ newsletter, field, onEdit, variant }: EditorFieldProps)
{
    const [isPending, startTransition] = useTransition();
    const [value, setValue] = useState(newsletter[field]);

    const trimmedValue = value.trim();
    const isToSave = trimmedValue.length !== 0 && newsletter[field] !== trimmedValue;


    const handleSave = () =>
        startTransition(async () => {
            try {
                newsletter.id
                    ? await updateDraft({ id: newsletter.id, [field]: trimmedValue })
                    : await createDraft({ ...newsletter, [field]: trimmedValue });

                newsletter[field] = trimmedValue;
                onEdit(false);
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
                    onClick={ () => onEdit(false) }
                >
                    Annuler
                </button>
                <button
                    onClick={handleSave}
                    className={ `${isToSave ? "text-primary" : `text-${variant}-muted-text`} font-medium` }
                    disabled={isPending || !isToSave}
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