"use client"

import { useState } from 'react';

import { resubscribe } from "@/lib/actions/newsletter";
import Button from "@/components/ui/Button";

import authConfig from "@/config/auth";



type SubscriptionToggleProps = {
  jwt: string;
  initialIsSubscribed: boolean;
};


export default function SubscriptionToggle({ jwt, initialIsSubscribed }: SubscriptionToggleProps)
{
    const [isSubscribed, setIsSubscribed] = useState(initialIsSubscribed);
    const [ isPending, setIsPending ] = useState(false);
    const [ hasError, setHasError ] = useState(false);

    const handleClick = async () => {
        setIsPending(true);

        try {
            isSubscribed
                ? await fetch(`/api/newsletter/unsubscribe?${authConfig.cookie.name}=${jwt}`, { method: "POST" })
                : await resubscribe(jwt);

            setHasError(false);
            setIsSubscribed(prev => !prev);
        }
        catch {
            setHasError(true);
        }

        setIsPending(false);
    };


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