"use client";
import { useState, useCallback } from "react";

import { InsertNewsletterParam, EditorNewsletterParam } from "@/lib/types";
import { createDraft, updateDraft } from "@/lib/actions/newsletter";



type EditorFieldProps = {
    newsletter: EditorNewsletterParam;
    field: keyof InsertNewsletterParam;
    setIsEditing: (value: boolean) => void;
}


export default function EditorField({ newsletter, field, setIsEditing }: EditorFieldProps)
{
    const [isSaving, setIsSaving] = useState(false);
    const [value, setValue] = useState(newsletter[field]);


    const handleSave = async () => {
        const trimmedValue = value.trim();

        if (newsletter[field] === trimmedValue)
        {
            setIsEditing(false);
            return ;
        }

        try {
            setIsSaving(true);

            newsletter.id
                ? await updateDraft({ id: newsletter.id, [field]: trimmedValue })
                : await createDraft({ ...newsletter, [field]: trimmedValue });

            setIsEditing(false);
        }

        catch {
            setIsSaving(false);
        }
    };


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
                    disabled={isSaving || value.trim().length === 0}
                >
                    { isSaving ? "Validation..." : "Valider" }
                </button>
            </div>
            <textarea
                ref={ autoFocusAtEnd }
                aria-label={ `Modifier le champ ${field}` }
                className="field-sizing-content mt-2 w-full"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                disabled={isSaving}
            />
        </>
    );
}