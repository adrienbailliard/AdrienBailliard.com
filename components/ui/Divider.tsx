"use client";

import { useAuth } from '@/context/authentification';


type DividerProps = {
    variant: "light" | "dark";
    adminOnly?: boolean;
}


export default function Divider({ variant, adminOnly }: DividerProps)
{
    const oppositeColor = variant === "dark" ? "light" : "dark";
    const { isAdmin } = useAuth();

    if (!isAdmin && adminOnly)
        return null;


    return (
        <div className={`bg-${oppositeColor}-bg`}>
            <div className={ `bg-${variant}-muted-fg h-px` }></div>
        </div>
    );
}