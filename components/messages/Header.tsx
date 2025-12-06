import { useEffect } from "react";
import { KeyedMutator } from 'swr';

import { Selector, supportSelector } from "@/components/messages/Selector";
import { useMessageActions } from '@/context/messageActions';
import { Message } from '@/lib/types';

import Dustbin from "@/components/icons/dustbin";
import Read from "@/components/icons/read";
import Unread from "@/components/icons/unread";
import { useState } from "react";


type HeaderProps = {
    data: Array<Message> | null;
    mutateMessages: KeyedMutator<Message[]>;
}


export default function Header({ data, mutateMessages }: HeaderProps)
{
    const [ isReadAction, setIsReadAction ] = useState(false);
    const { selection, selected } = useMessageActions();
    const [ inSelection, setInSelection ] = selection;
    const [ selectedIds, setSelectedIds ] = selected;

    const safeData = data ?? [];


    useEffect(() => {
        const selectedMessages = safeData.filter(message => selectedIds.has(message.id));
        const allRead = selectedMessages.every(message => message.is_read);

        setIsReadAction(!allRead);
    }, [selectedIds, safeData]);


    const handleDelete = () => {
        const newData = safeData.filter(msg => !selectedIds.has(msg.id));
        mutateMessages(newData, { revalidate: false });
        setSelectedIds(new Set());

        fetch(`/api/messages/delete`, {
            method: 'POST',
            body: JSON.stringify({ ids: Array.from(selectedIds) })
        });
    };

    const handleReadToggle = () => {
        const newData = safeData.map(msg => selectedIds.has(msg.id) ? { ...msg, is_read: isReadAction } : msg);
        mutateMessages(newData, { revalidate: false });

        fetch(`/api/messages/type`, {
            method: 'POST',
            body: JSON.stringify({ ids: Array.from(selectedIds), areRead: isReadAction })
        });
    };


    const toggleSelectionMode = () => {
        setInSelection(!inSelection);
        setSelectedIds(new Set());
    };

    const toggleSelectAll = () =>
        setSelectedIds(selectedIds.size === safeData.length ? new Set() : new Set(safeData.map(msg => msg.id)));


    if (!data)
        return (<h5 className="mb-5">Messages</h5>);

    if (data.length === 0)
        return (<h5>Aucun Message</h5>);


    return (
        <div className={ `flex justify-between h-6 md:h-7.5 mb-5 ${ supportSelector(inSelection) }` }>
            {
                inSelection && selectedIds.size > 0
                ? (
                    <div className={ `flex gap-3 items-center justify-between text-light-fg
                        [&>button]:min-h-10.5 [&>button]:min-w-10.5 *:[&_svg]:h-4.5 *:[&_svg]:m-auto
                    `}>
                        <button
                            onClick={ handleDelete }
                            aria-label="Supprimer les messages"
                        >
                            <Dustbin />
                        </button>
                        <button
                            onClick={ handleReadToggle }
                            aria-label={`Marquer comme ${ isReadAction ? "lu" : "non lu" }`}
                        >
                            { isReadAction ? <Read /> : <Unread /> }
                        </button>
                    </div>
                )
                : <h5>Messages</h5>
            }
            <Selector
                onClick={ toggleSelectAll }
                isSelected={ selectedIds.size === data.length }
                highlightCheckBox={true}
                ariaLabel={ "Tout sélectionner" }
                inSelection={inSelection}
            />
            <button
                className='text-primary font-medium'
                onClick={ toggleSelectionMode }
            >
                { inSelection ? "Annuler" : "Sélectionner" }
            </button>
        </div>
    );
}