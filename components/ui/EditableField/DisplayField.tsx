import { useNewsletterEditor } from '@/contexts/newsletterEditor';
import { InsertNewsletterParam } from "@/lib/types";



type DisplayFieldProps = {
  children: React.ReactNode;
  field: keyof InsertNewsletterParam;
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
  handleSave: (newValue?: string) => Promise<void>;
  hasError: boolean;
}


export default function DisplayField({ children, setIsEditing, field, hasError, handleSave }: DisplayFieldProps)
{
    const { selectedEditors, openEditor } = useNewsletterEditor();
    const inSavingState = selectedEditors.has(field) && !hasError;

    const handleClick = () => {
        if (hasError)
            handleSave();
        else {
            setIsEditing(true);
            openEditor(field);
        }
    };


    return (
        <>
            <button
                className={ `${ hasError
                    ? "text-error"
                    : "text-primary"} font-medium self-end` }
                onClick={handleClick}
                disabled={inSavingState}
            >
                { inSavingState
                    ? "Validation..."
                    : hasError
                        ? "Renvoyer"
                        : "Modifier" }
            </button>
            <div>{ children }</div>
        </>
    );
}