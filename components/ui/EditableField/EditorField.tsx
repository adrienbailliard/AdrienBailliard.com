"use client";
import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";

import { InsertNewsletterParam, EditorNewsletterParam } from "@/lib/types";
import { postDraft, updateDraft } from "./action";



type EditorFieldProps = {
    newsletter: EditorNewsletterParam;
    field: keyof InsertNewsletterParam;
    setIsEditing: (value: boolean) => void;
}



export default function EditorField({ newsletter, field, setIsEditing }: EditorFieldProps)
{
    const router = useRouter();
    const [, startTransition] = useTransition();

    const [isSaving, setIsSaving] = useState(false);
    const [value, setValue] = useState(newsletter[field]);


    const handleSave = async () => {
        if (newsletter[field] === value.trim())
        {
            setIsEditing(false);
            return ;
        }

        try {
            setIsSaving(true);

            const response = await (newsletter.id
                ? updateDraft(newsletter, field, value)
                : postDraft(newsletter, field, value));

            if (!response.ok)
                throw new Error();

            const data = await response.json();

            startTransition(() => {
                newsletter.slug !== data.slug
                    ? router.replace(`/admin/newsletter/${data.slug}`, { scroll: false })
                    : router.refresh();

                setIsEditing(false);
            });
        }

        catch {
            setIsSaving(false);
        }
    };


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
                autoFocus
                className="field-sizing-content mt-2 w-full"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                disabled={isSaving}
            />
        </>
    );
}