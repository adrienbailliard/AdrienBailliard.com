import { useState } from "react";

import { useMessageActions } from '@/context/messageActions';
import { Selector, supportSelector } from "@/components/messages/Selector";
import { formatAdminDate } from '@/lib/utils';
import { Message } from '@/lib/types';



type MessageCardProps = {
    message: Message;
}



export default function MessageCard({ message }: MessageCardProps)
{
    const [ isExpanded, setIsExpanded ] = useState(false);
    const { selection, selected, onToggleRead } = useMessageActions();
    const [ selectedIds, setSelectedIds ] = selected;
    const [ inSelection ] = selection;


    const handleExpandMessage = () =>
    {
        setIsExpanded(prev => !prev);

        if (!message.is_read)
            onToggleRead(true, new Set([ message.id ]));
    };


    const toggleSelectMessage = (isSelected: boolean) =>
    {
        setSelectedIds(prev => {
            const newSet = new Set(prev);
            isSelected ? newSet.delete(message.id) : newSet.add(message.id);
            return newSet;
        });
    };

    
    const handleMessageClick = () => inSelection
        ? toggleSelectMessage(selectedIds.has(message.id)) : handleExpandMessage();


    return (
        <div
            className={ `card-list cursor-pointer group ${supportSelector(inSelection)} ${!message.is_read && "pl-5"}`}
            onClick={ handleMessageClick }
        >
            <Selector
                isSelected={ selectedIds.has(message.id) }
                ariaLabel={ "Sélectionner" }
                inSelection={inSelection}
            />
            <div
                className={ !message.is_read
                    ? `relative before:w-2 before:h-2 before:bg-primary before:rounded-full
                        before:absolute before:-left-5 before:top-1/2 before:-translate-y-1/2
                    ` : ""
                }
            >
                <div className="card-title">
                    { `${message.first_name} ${message.last_name}` }
                </div>
            </div>
            <time>
                { formatAdminDate(message.created_at) }
            </time>
            <p className="card-container">
                <span className='text-light-fg'>{ message.category }</span>
                { !isExpanded && ` - ${ message.content }` }
            </p>
            { isExpanded && (
                <p className="text-base text-light-muted-text col-span-full whitespace-pre-wrap">
                    { message.content }
                </p>
            )}
        </div>
    );
}