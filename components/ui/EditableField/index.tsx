"use client";

import { useState } from "react";

import DisplayField from "./DisplayField";
import EditorField from "./EditorField";

import { useNewsletterEditor } from '@/contexts/newsletterEditor';
import { InsertNewsletterParam } from "@/lib/types";



type EditableFieldProps = {
    children: React.ReactNode;
    field: keyof InsertNewsletterParam;
    variant: "light" | "dark";
}


export default function EditableField({ children, field, variant }: EditableFieldProps)
{
    const { closeEditor, newsletter, setNewsletter } = useNewsletterEditor();
    const [isEditing, setIsEditing] = useState(false);
    const [hasError, setHasError] = useState(false);


    const handleSave = async (newValue?: string) => {
        const valueToSave = newValue ? newValue : newsletter[field];

        setIsEditing(false);
        setHasError(false);
        setNewsletter({ ...newsletter, [field]: valueToSave });

        try {
            const { method, argument } = "id" in newsletter
                ? { method: "PATCH", argument: { id: newsletter.id, [field]: valueToSave } }
                : { method: "POST", argument: { ...newsletter, [field]: valueToSave } };

            const response = await fetch("/api/newsletter/drafts", {
                method,
                body: JSON.stringify(argument)
            });

            if (!response.ok)
                throw new Error(`Request failed`);

            const result = await response.json();
            
            if (result.newsletter)
                setNewsletter(result.newsletter);
            
            window.history.replaceState(null, "", result.newPath);
            closeEditor(field);
        }
        catch {
            setHasError(true);
        }
    };


    return (
        <div className="flex flex-col gap-2">
            { isEditing
                ? <EditorField
                    setIsEditing={setIsEditing}
                    field={field}
                    variant={variant}
                    handleSave={handleSave}
                />
                : <DisplayField
                    setIsEditing={setIsEditing}
                    field={field}
                    hasError={hasError}
                    handleSave={handleSave}
                >
                    { children }
                </DisplayField>
            }
        </div>
    );
}