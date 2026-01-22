import { useNewsletterEditor } from '@/contexts/newsletterEditor';
import { InsertNewsletterParam } from "@/lib/types";



type DisplayFieldProps = {
  children: React.ReactNode;
  field: keyof InsertNewsletterParam;
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
  variant: "light" | "dark";
  hasError: boolean;
}


export default function DisplayField({ children, setIsEditing, field, variant, hasError }: DisplayFieldProps)
{
    const { selectEditor } = useNewsletterEditor();
    const [ selectedEditor, setSelectedEditor ] = selectEditor;

    const inSavingState = selectedEditor === field && !hasError;
    const isDisabled = selectedEditor !== null && selectedEditor !== field;

    const handleEdit = () => {
        setIsEditing(true);
        setSelectedEditor(field);
    };


    return (
        <>
            <button
                className={ `${isDisabled
                    ? `text-${variant}-muted-fg`
                    : hasError
                        ? "text-error"
                        : "text-primary"} font-medium self-end` }
                onClick={handleEdit}
                disabled={isDisabled || inSavingState}
            >
                { inSavingState
                    ? "Validation..."
                    : hasError
                        ? "Renvoyer"
                        : "Modifier" }
            </button>
            { children }
        </>
    );
}