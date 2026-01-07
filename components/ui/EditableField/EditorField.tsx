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
        setIsSaving(true);

        try {
            const response = await (newsletter.id
                ? updateDraft(newsletter.id, field, value)
                : postDraft(newsletter, field, value));

            if (!response.ok)
                throw new Error();

            const data = await response.json();
            router.replace(`/admin/newsletter/${data.slug}`);

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
                    disabled={isSaving}
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