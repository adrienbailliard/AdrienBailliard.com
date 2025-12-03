"use client";

import useSWR from 'swr';
import { useState, useEffect } from "react";
import { useAuth } from '@/context/authentification';
import { formatDate } from '@/lib/utils';
import { Message } from '@/lib/types';


const fetcher = (url: string) => fetch(url).then(r => r.json());

type MessageCardProps = {
    message: Message;
    now: Date;
    inSelection: boolean;
}



function MessageCard({ message, now, inSelection }: MessageCardProps)
{
    const [expanded, setExpanded] = useState(false);

    useEffect(() => {
        if (inSelection)
            setExpanded(false);
    }, [inSelection]);


    const handleMessageClick = async () =>
    {
        setExpanded(!inSelection && !expanded);
        if (!message.is_read) {
            message.is_read = true;
            await fetch(`/api/messages/${message.id}/read`, { method: 'POST' });
        }
    };


    return (
        <div
            className={ `message-card cursor-pointer relative [:hover,:active]:border-light-muted-text [&:hover+&,&:active+&]:border-t-light-muted-text
                ${ !message.is_read && !inSelection && `before:w-2 before:h-2 before:bg-primary before:rounded-full
                    before:absolute before:-left-3.5 sm:before:-left-4 before:top-1/2 before:-translate-y-1/2
                ` }
            ` }
            onClick={ handleMessageClick }
        >
            <div className="truncate text-lg font-medium">
                { `${message.first_name} ${message.last_name}` }
            </div>
            <time className='text-light-muted-text ml-auto mt-0.5'>
                { formatDate(message.created_at, now) }
            </time>
            <p className="text-base line-clamp-2 break-all col-span-full text-light-muted-text">
                <span className='text-light-fg'>{ message.category }</span>
                { !expanded && ` - ${ message.content }` }
            </p>
            { expanded && (
                 <p className="text-base text-light-muted-text col-span-full whitespace-pre-wrap">
                    { message.content }
                </p>
            )}
        </div>
    );
}


function MessageSkeletonCard()
{
    return (
        <div className='message-card animate-pulse items-center gap-y-2'>
            <div className='rounded-lg w-25 h-4.5 bg-light-fg'></div>
            <div className='bg-light-muted-text rounded-lg w-8.5 h-4 ml-auto'></div>
            <div className='text-light-muted-text flex items-center whitespace-pre col-span-full'>
                <div className='rounded-lg w-18 h-4 bg-light-fg'></div>
                { " - " }
                <div className='bg-light-muted-text rounded-lg w-full max-w-175 h-4'></div>
            </div>
        </div>
    );
}


export default function LastMessages()
{
    const { isAdmin } = useAuth();

    if (!isAdmin)
        return null;


    const [inSelection, setInSelection] = useState(false);
    const { data } = useSWR<Message[]>(`/api/messages/last`, fetcher);
    const now = new Date();

    const messages = Array.isArray(data)
        ? data.map((message, i) => <MessageCard message={message} now={now} key={i} inSelection={inSelection}/>)
        : [...Array(4)].map((_, i) => <MessageSkeletonCard key={i}/>);


    return (
        <section className="text-light-fg bg-dark-bg pb-0">
            <div>
                <div className='flex justify-between'>
                    <h5>
                        { messages.length === 0 ? "Aucun Message" : "Messages" }
                    </h5>
                    { messages.length > 0 && (
                        <button
                            className='text-primary font-medium'
                            onClick={ () => setInSelection(!inSelection) }
                        >
                            { inSelection ? "Annuler" : "Sélectionner" }
                        </button>
                    )}
                </div>
                <div>
                    { messages }
                </div>
            </div>
        </section>
    );
}