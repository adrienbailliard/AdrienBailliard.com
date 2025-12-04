"use client";
import { createContext, useContext, useState } from "react";


type MessageActionsContextType = {
  selection: [boolean, React.Dispatch<React.SetStateAction<boolean>>];
  selectAll: [boolean, React.Dispatch<React.SetStateAction<boolean>>];
  read: [boolean, React.Dispatch<React.SetStateAction<boolean>>];
  remove: [number, React.Dispatch<React.SetStateAction<number>>];
}

const MessageActionsContext = createContext<MessageActionsContextType | null>(null);


export function MessageActionsProvider({ children }: { children: React.ReactNode })
{
  return (
    <MessageActionsContext.Provider value={{
      selection: useState(false),
      selectAll: useState(false),
      read: useState(false),
      remove: useState(0)
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