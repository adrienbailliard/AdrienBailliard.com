"use client";

import { useState } from "react";

import { useNewsletterEditor } from '@/contexts/newsletterEditor';
import { InsertNewsletterParam } from "@/lib/types";

import DisplayField from "./DisplayField";
import EditorField from "./EditorField";



type EditableFieldProps = {
    children: React.ReactNode;
    field: keyof InsertNewsletterParam;
    variant: "light" | "dark";
}


export default function EditableField({ children, field, variant }: EditableFieldProps)
{
    const { optimisticNewsletter } = useNewsletterEditor();
    const [value, setValue] = useState(optimisticNewsletter[field]);
    const [isEditing, setIsEditing] = useState(false);
    const [hasError, setHasError] = useState(false);


    return (
        <div className="flex flex-col gap-1.5">
            {
                isEditing
                ? <EditorField
                    setIsEditing={setIsEditing}
                    field={field}
                    variant={variant}
                    setHasError={setHasError}
                    value={value}
                    setValue={setValue}
                />
                : <DisplayField
                    setIsEditing={setIsEditing}
                    field={field}
                    variant={variant}
                    hasError={hasError}
                >
                    { children }
                </DisplayField>
            }
        </div>
    );
}