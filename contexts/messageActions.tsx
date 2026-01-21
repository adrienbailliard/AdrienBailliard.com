"use client";

import { KeyedMutator } from 'swr';
import { createContext, useState } from "react";

import { deleteMessages, toggleReadStatus } from "@/components/messages/action";
import { createHook } from "@/contexts/utils";
import { Message } from '@/lib/types';



type MessageActionsContextType = {
  selection: [boolean, React.Dispatch<React.SetStateAction<boolean>>];
  selected: [Set<number>, React.Dispatch<React.SetStateAction<Set<number>>>];
  data: Message[] | null;
  onDelete: () => Promise<void>;
  onToggleRead: (isRead: boolean, specificIds?: Set<number>) => Promise<void>;
}


type MessageActionsProviderProps = {
  children: React.ReactNode;
  data: Message[] | null;
  mutate: KeyedMutator<Message[]>;
}


const MessageActionsContext = createContext<MessageActionsContextType | null>(null);



export function MessageActionsProvider({ children, data, mutate }: MessageActionsProviderProps)
{
  const selection = useState(false);
  const selected = useState(new Set<number>());

  const [ selectedIds, setSelectedIds ] = selected;
  const safeData = data ?? [];


  const onDelete = async () => {
    deleteMessages(safeData, selectedIds, mutate);
    setSelectedIds(new Set());
  };

  const onToggleRead = async (isRead: boolean, ids: Set<number> = selectedIds) =>
    toggleReadStatus(safeData, ids, isRead, mutate);


  return (
    <MessageActionsContext.Provider
      value={{ selection, selected, data, onDelete, onToggleRead }}
    >
      {children}
    </MessageActionsContext.Provider>
  );
}



export const useMessageActions = createHook(MessageActionsContext, "MessageActionsContext");