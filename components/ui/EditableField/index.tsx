"use client";

import { useState } from "react";
import DisplayField from "./DisplayField";
import EditorField from "./EditorField";
import { InsertNewsletterParam } from "@/lib/types";



type EditableFieldProps = {
    children: React.ReactNode;
    field: keyof InsertNewsletterParam;
    variant: "light" | "dark";
}


export default function EditableField({ children, field, variant }: EditableFieldProps)
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