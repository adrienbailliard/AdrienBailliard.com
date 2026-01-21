import { useContext, Context } from "react";


export function createHook<T>(ReactContext: Context<T>, name: string): () => NonNullable<T>
{
    return () => {
        const context = useContext(ReactContext);

        if (!context)
            throw new Error(`${name} used outside of its provider`);

        return context;
    }
}