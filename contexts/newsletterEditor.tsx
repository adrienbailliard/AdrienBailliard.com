"use client";

import { useState, createContext } from "react";

import { createHook } from "@/contexts/utils";
import { Newsletter, InsertNewsletterParam } from "@/lib/types";



type NewsletterEditorContextType = {
  selectedEditors: Set<string>;
  openEditor: (field: string) => void,
  closeEditor: (field: string) => void,
  newsletter: Newsletter | InsertNewsletterParam;
  setNewsletter: React.Dispatch<React.SetStateAction<Newsletter | InsertNewsletterParam>>;
}


type NewsletterEditorProviderProps = {
  children: React.ReactNode;
  initialNewsletter: Newsletter | InsertNewsletterParam;
}


const NewsletterEditorContext = createContext<NewsletterEditorContextType | null>(null);


export function NewsletterEditorProvider({ children, initialNewsletter }: NewsletterEditorProviderProps)
{
  const [selectedEditors, setSelectedEditors] = useState<Set<string>>(new Set());
  const [newsletter, setNewsletter] = useState(initialNewsletter);

  const openEditor = (field: string) => setSelectedEditors(prev => new Set(prev).add(field));
  const closeEditor = (field: string) => setSelectedEditors(prev => {
    const next = new Set(prev);
    next.delete(field);
    return next;
  });


  return (
    <NewsletterEditorContext.Provider
      value={{ selectedEditors, openEditor, closeEditor, newsletter, setNewsletter }}
    >
      {children}
    </NewsletterEditorContext.Provider>
  );
}



export const useNewsletterEditor = createHook(NewsletterEditorContext, "NewsletterEditorContext");