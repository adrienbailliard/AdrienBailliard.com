"use client"

import { useState, useTransition } from 'react';

import { resubscribe, unsubscribe } from "@/lib/actions/subscribers";
import Button from "@/components/ui/Button";



type SubscriptionToggleProps = {
  jwt: string;
  isSubscribed: boolean;
};


export default function SubscriptionToggle({ jwt, isSubscribed }: SubscriptionToggleProps)
{
    const [hasError, setHasError] = useState(false);
    const [isPending, startTransition] = useTransition();


    const handleClick = () =>
        startTransition(async () => {
            try {
                isSubscribed
                    ? await unsubscribe(jwt)
                    : await resubscribe(jwt);

                setHasError(false);
            }
            catch {
                setHasError(true);
            }
        });


    return (
        <Button
            variant={ hasError && !isPending ? "dark-error" : "dark-primary" }
            onClick={handleClick}
            disabled={isPending}
        >
            { isPending
                ? isSubscribed
                    ? "Désabonnement..."
                    : "Réabonnement..."
                : hasError
                    ? "Réessayer"
                    : isSubscribed
                        ? "Se Désabonner"
                        : "Se Réabonner" }
        </Button>
    );
}