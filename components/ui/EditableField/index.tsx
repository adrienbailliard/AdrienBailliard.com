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
}


export default function EditableField({ children, newsletter, field, variant }: EditableFieldProps)
{
    const [isEditing, setIsEditing] = useState(false);

    return (
        <div className="flex flex-col gap-1.5">
            {
                isEditing
                ? <EditorField
                    setIsEditing={setIsEditing}
                    newsletter={newsletter}
                    field={field}
                    variant={variant}
                />
                : <DisplayField setIsEditing={setIsEditing}>
                    { children }
                </DisplayField>
            }
        </div>
    );
}