"use client";

import { useState, useOptimistic, createContext } from "react";

import { createHook } from "@/contexts/utils";
import { Newsletter, InsertNewsletterParam } from "@/lib/types";



type UpdateOptimisticNewsletterType = {
  field: keyof InsertNewsletterParam;
  value: string;
}


type NewsletterEditorContextType = {
  selectEditor: [string | null, React.Dispatch<React.SetStateAction<string | null>>];
  optimisticNewsletter: Newsletter | InsertNewsletterParam;
  updateOptimisticNewsletter: (data: UpdateOptimisticNewsletterType) => void;
}


type NewsletterEditorProviderProps = {
  children: React.ReactNode;
  newsletter: Newsletter | InsertNewsletterParam;
}


const NewsletterEditorContext = createContext<NewsletterEditorContextType | null>(null);


export function NewsletterEditorProvider({ children, newsletter }: NewsletterEditorProviderProps)
{
  const selectEditor = useState<string | null>(null);

  const [optimisticNewsletter, updateOptimisticNewsletter] = useOptimistic(
    newsletter,
    (currentNewsletter, { field, value }: UpdateOptimisticNewsletterType) => ({
        ...currentNewsletter,
        [field]: value
    })
  );

  return (
    <NewsletterEditorContext.Provider
      value={{ selectEditor, optimisticNewsletter, updateOptimisticNewsletter }}
    >
      {children}
    </NewsletterEditorContext.Provider>
  );
}



export const useNewsletterEditor = createHook(NewsletterEditorContext, "NewsletterEditorContext");