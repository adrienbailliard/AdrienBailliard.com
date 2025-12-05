"use client";
import { createContext, useContext, useState } from "react";


type MessageActionsContextType = {
  selection: [boolean, React.Dispatch<React.SetStateAction<boolean>>];
  selected: [Set<number>, React.Dispatch<React.SetStateAction<Set<number>>>];
}

const MessageActionsContext = createContext<MessageActionsContextType | null>(null);


export function MessageActionsProvider({ children }: { children: React.ReactNode })
{
  return (
    <MessageActionsContext.Provider value={{
      selection: useState(false),
      selected: useState(new Set())
    }}>
      {children}
    </MessageActionsContext.Provider>
  );
}


export function useMessageActions(): MessageActionsContextType 
{
  const context = useContext(MessageActionsContext);
  if (!context)
    throw new Error("MessageActionsContext used outside an MessageActionsProvider");

  return context;
}