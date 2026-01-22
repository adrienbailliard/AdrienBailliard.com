import { useCallback, useTransition } from "react";
import TextareaAutosize from 'react-textarea-autosize';

import { isRedirectError } from "next/dist/client/components/redirect-error";
import { useNewsletterEditor } from '@/contexts/newsletterEditor';

import { InsertNewsletterParam } from "@/lib/types";
import { createDraft, updateDraft } from "@/lib/actions/newsletter";



type EditorFieldProps = {
    field: keyof InsertNewsletterParam;
    setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
    setHasError: React.Dispatch<React.SetStateAction<boolean>>;
    value: string;
    setValue: React.Dispatch<React.SetStateAction<string>>;
    variant: "light" | "dark";
}


export default function EditorField({ field, setIsEditing, setHasError, variant, value, setValue }: EditorFieldProps)
{
    const { selectEditor, optimisticNewsletter, updateOptimisticNewsletter } = useNewsletterEditor();
    const [ , startTransition ] = useTransition();
    const [ , setSelectedEditor ] = selectEditor;

    const trimmedValue = value.trim();
    const isToSave = trimmedValue.length !== 0 && optimisticNewsletter[field] !== trimmedValue;


    const handleCancellation = () => {
        setIsEditing(false);
        setSelectedEditor(null);
    }

    
    const handleSave = () => {
        setIsEditing(false);

        if (!navigator.onLine)
            return setHasError(true);

        setHasError(false);
        startTransition(async () => {
            updateOptimisticNewsletter({ field, value: trimmedValue });

            try {
                "id" in optimisticNewsletter
                    ? await updateDraft({ id: optimisticNewsletter.id, [field]: trimmedValue })
                    : await createDraft({ ...optimisticNewsletter, [field]: trimmedValue });

                setSelectedEditor(null);
            }
            catch (error) {
                if (!isRedirectError(error))
                    setHasError(true);
            }
        });
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
                    onClick={handleCancellation}
                >
                    Annuler
                </button>
                <button
                    onClick={handleSave}
                    className={ `${isToSave ? "text-primary" : `text-${variant}-muted-fg`} font-medium` }
                    disabled={!isToSave}
                >
                    Valider
                </button>
            </div>
            <TextareaAutosize
                ref={ autoFocusAtEnd }
                aria-label={ `Modifier le champ ${field}` }
                className="resize-none mt-2 w-full"
                value={value}
                onChange={(e) => setValue(e.target.value)}
            />
        </>
    );
}