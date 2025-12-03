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
    const [selected, setSelected] = useState(false);

    useEffect(() => {
        if (inSelection)
            setExpanded(false);
        else
            setSelected(false);
    }, [inSelection]);


    const handleMessageClick = async () =>
    {
        if (inSelection)
            setSelected(!selected);
        else
        {
            setExpanded(!expanded);
            if (!message.is_read) {
                message.is_read = true;
                await fetch(`/api/messages/${message.id}/read`, { method: 'POST' });
            }
        }
    };


    return (
        <div className='message-card-border [:hover,:active]:border-y-light-muted-text [&:hover+&,&:active+&]:border-t-light-muted-text'>
            <div
                className={ `message-card cursor-pointer duration-300 before:duration-300 overflow-hidden relative
                    before:w-4 before:h-4 before:bg-transparent before:absolute before:top-1/2 before:-translate-y-1/2
                    before:border before:border-light-muted-text before:-left-12.5 before:text-sm
                    ${ inSelection && `pl-12.5 before:left-0 ${ selected && "duration-initial before:content-['✓'] before:flex before:items-center before:justify-center" }` }
                ` }
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
                <p className="text-base line-clamp-2 col-span-full text-light-muted-text">
                    <span className='text-light-fg'>{ message.category }</span>
                    { !expanded && ` - ${ message.content }` }
                </p>
                { expanded && (
                    <p className="text-base text-light-muted-text col-span-full whitespace-pre-wrap">
                        { message.content }
                    </p>
                )}
            </div>
        </div>
        
    );
}


function MessageSkeletonCard()
{
    return (
        <div className='message-card message-card-border animate-pulse items-center gap-y-2'>
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
    const { data } = useSWR<Message[]>(`/api/messages`, fetcher);
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
                    { Array.isArray(data) && data.length > 0 && (
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