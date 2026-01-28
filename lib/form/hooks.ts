import { useState, useActionState, startTransition } from "react";



export function useFormAction(action: (formData: FormData) => Promise<void>)
{
    const [isReset, setIsReset] = useState(false);
    const [rawState, formAction, isPending] = useActionState(
        async (prevState: null | boolean, formData: FormData) => {
            setIsReset(false);

            try {
                await action(formData);
                return true;
            }
            catch {
                return false;
            }
        },
        null
    );

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        startTransition(() => {
            const formData = new FormData(e.currentTarget);
            formAction(formData);
        });
    };

    return [isReset ? null : rawState, onSubmit, isPending, setIsReset] as const;
}