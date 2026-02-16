import { useState } from "react";
import TextareaAutosize from 'react-textarea-autosize';

import { useNewsletterEditor } from '@/contexts/newsletterEditor';
import { fixTypography } from "@/lib/utils";
import { InsertNewsletterParam } from "@/lib/types";



type EditorFieldProps = {
    field: keyof InsertNewsletterParam;
    setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
    handleSave: (newValue: string) => Promise<void>;
    variant: "light" | "dark";
}


export default function EditorField({ field, setIsEditing, handleSave, variant }: EditorFieldProps)
{
    const { closeEditor, newsletter } = useNewsletterEditor();
    const [value, setValue] = useState(newsletter[field]);

    const formattedInput = fixTypography(value.trim());
    const isToSave = formattedInput.length !== 0 && newsletter[field] !== formattedInput;


    const handleCancellation = () => {
        setIsEditing(false);
        closeEditor(field);
    }


    return (
        <>
            <div className="flex gap-7 self-end">
                <button
                    className='text-primary font-medium'
                    onClick={handleCancellation}
                >
                    Annuler
                </button>
                <button
                    onClick={() => handleSave(formattedInput)}
                    className={ `${isToSave ? "text-primary" : `text-${variant}-muted-fg`} font-medium` }
                    disabled={!isToSave}
                >
                    Valider
                </button>
            </div>
            <TextareaAutosize
                aria-label={ `Modifier le champ ${field}` }
                value={value}
                onChange={(e) => setValue(e.target.value)}
            />
        </>
    );
}