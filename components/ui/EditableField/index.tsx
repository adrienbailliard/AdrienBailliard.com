"use client";

import { useState } from "react";
import DisplayField from "./DisplayField";
import EditorField from "./EditorField";
import { EditorNewsletterParam, InsertNewsletterParam } from "@/lib/types";



type EditableFieldProps = {
    children: React.ReactNode;
    newsletter: EditorNewsletterParam;
    field: keyof InsertNewsletterParam;
    variant: "light" | "dark";
    selectedEditor: string | null;
    setSelectedEditor: (value: string | null) => void;
}


export default function EditableField({ children, newsletter, field, variant, selectedEditor, setSelectedEditor }: EditableFieldProps)
{
    const [isEditing, setIsEditing] = useState(false);

    const onEdit = (value: boolean) => {
        setIsEditing(value);
        setSelectedEditor(value ? field : null);
    };


    return (
        <div className="flex flex-col gap-1.5">
            {
                isEditing
                ? <EditorField
                    onEdit={onEdit}
                    newsletter={newsletter}
                    field={field}
                    variant={variant}
                />
                : <DisplayField
                    onEdit={onEdit}
                    isDisabled={selectedEditor !== null}
                    variant={variant}
                >
                    { children }
                </DisplayField>
            }
        </div>
    );
}