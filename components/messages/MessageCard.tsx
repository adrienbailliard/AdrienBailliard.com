import { useState, useEffect } from "react";

import { useMessageActions } from '@/context/messageActions';
import { Selector, supportSelector } from "@/components/messages/Selector";
import { formatDate } from '@/lib/utils';
import { Message } from '@/lib/types';


type MessageCardProps = {
    message: Message;
    now: Date;
}


export default function MessageCard({ message, now }: MessageCardProps)
{
    const { selection, selectAll } = useMessageActions();
    const [ inSelection ] = selection;
    const [ isAllSelected ] = selectAll;
    const [ isExpanded, setIsExpanded ] = useState(false);
    const [ isSelected, setIsSelected ] = useState(false);

    useEffect(() => inSelection ? setIsExpanded(false) : setIsSelected(false), [inSelection]);
    useEffect(() => setIsSelected(isAllSelected), [isAllSelected]);


    const handleMessageClick = async () =>
    {
        setIsExpanded(!isExpanded);
        if (!message.is_read) {
            message.is_read = true;
            await fetch(`/api/messages/${message.id}/read`, { method: 'POST' });
        }
    };


    return (
        <div className={ supportSelector(inSelection) }>
            <Selector
                setIsSelected={setIsSelected}
                isSelected={isSelected}
            />
            <div
                className={ `message-card cursor-pointer` }
                onClick={ handleMessageClick }
            >
                <div
                    className={ !message.is_read
                        ? `relative before:w-2 before:h-2 before:bg-primary before:rounded-full
                            before:absolute before:-left-5 before:top-1/2 before:-translate-y-1/2
                        ` : ""
                    }
                >
                    <div className="text-lg font-medium line-clamp-1 break-all">
                        { `${message.first_name} ${message.last_name}` }
                    </div>
                </div>
                <time className='text-light-muted-text ml-auto mt-0.5'>
                    { formatDate(message.created_at, now) }
                </time>
                <p className="text-base line-clamp-2 sm:line-clamp-1 col-span-full text-light-muted-text">
                    <span className='text-light-fg'>{ message.category }</span>
                    { !isExpanded && ` - ${ message.content }` }
                </p>
                { isExpanded && (
                    <p className="text-base text-light-muted-text col-span-full whitespace-pre-wrap">
                        { message.content }
                    </p>
                )}
            </div>
        </div>
    );
}