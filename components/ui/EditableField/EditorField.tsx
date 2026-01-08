"use client";
import { useState } from "react";
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
    
    const [isSaving, setIsSaving] = useState(false);
    const [value, setValue] = useState(newsletter[field]);


    const handleSave = async () =>
    {
        if (newsletter[field] === value.trim())
        {
            setIsEditing(false);
            return ;
        }

        setIsSaving(true);

        try {
            const response = await (newsletter.id
                ? updateDraft(newsletter, field, value)
                : postDraft(newsletter, field, value));

            if (!response.ok)
                throw new Error();

            const data = await response.json();

            !newsletter.slug || newsletter.slug !== data.slug
                ? router.replace(`/admin/newsletter/${data.slug}`)
                : router.refresh();

            setIsEditing(false);
        }
        finally {
            setIsSaving(false);
        }
    };


    return (
        <>
            <div className="flex gap-7">
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