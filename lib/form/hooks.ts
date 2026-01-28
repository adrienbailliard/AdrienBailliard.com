import { useState, useTransition } from "react";



export function useFormAction(action: (formData: FormData) => Promise<void>)
{
    const [isPending, startTransition] = useTransition();
    const [isSubmit, setIsSubmit] = useState<null | boolean>(null);

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        startTransition(async () => {
            const formData = new FormData(e.currentTarget);

            try {
                await action(formData);
                setIsSubmit(true);
            }
            catch {
                setIsSubmit(false);
            }
        });
    };

    return [isSubmit, setIsSubmit, onSubmit, isPending] as const;
}