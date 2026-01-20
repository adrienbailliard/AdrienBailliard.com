export async function handleSubmit(
    event: React.FormEvent<HTMLFormElement>,
    action: (formData: FormData) => Promise<void>,
    setIsSubmitted: (state: boolean) => void,
    setHasError: (state: boolean) => void
): Promise<void>
{
    event.preventDefault();

    if (!navigator.onLine)
        return setHasError(true);
    
    const formData = new FormData(event.currentTarget);
    const button = event.currentTarget.elements.namedItem("submitButton") as HTMLButtonElement;

    button.textContent = "Envoi...";
    button.disabled = true;

    try {
        await action(formData);
        setIsSubmitted(true);
    }
    catch {
        setHasError(true);
    }
}