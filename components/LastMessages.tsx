"use client";

import useSWR from 'swr';
import { useState } from "react";
import { useAuth } from '@/context/authentification';
import { formatDate } from '@/lib/utils';
import { Message } from '@/lib/types';


const fetcher = (url: string) => fetch(url).then(r => r.json());

type StatCardProps = {
    message: Message;
    now: Date;
}



function MessageCard({ message, now }: StatCardProps)
{
    const [expanded, setExpanded] = useState(false);

    const markAsReadIfNeeded = async () => {
        if (!message.is_read)
        {
            message.is_read = true;
            await fetch(`/api/messages/${message.id}/read`, { method: 'POST' });
        }
    };

    const handleMessageClick = async () => {
        setExpanded(!expanded);
        await markAsReadIfNeeded();
    };


    return (
        <div
            className='message-card cursor-pointer relative px-3'
            onClick={ handleMessageClick }
        >
            <div
                className={ `line-clamp-1 
                    ${
                        !message.is_read && `before:absolute before:-left-4 sm:before:-left-5 before:top-1/2 before:-translate-y-1/2
                        before:w-2 before:h-2 before:bg-primary before:rounded-full`
                    }`
                }
            >
                { `${message.first_name} ${message.last_name}` }
            </div>
            <div className='text-light-muted-text'>
                <p className="line-clamp-1 wrap-anywhere">
                    <span className="text-light-fg">
                        { message.category }
                    </span>
                    { !expanded && ` - ${ message.content }` }
                </p>
                {
                    expanded && (
                        <p className='whitespace-pre-wrap'>
                            { message.content }
                        </p>
                    )
                }
            </div>
            <time className='text-light-muted-text text-sm ml-auto mt-1'>
                { formatDate(message.created_at, now) }
            </time>
        </div>
    );
}


function MessageSkeletonCard()
{
    return (
        <div className='message-card animate-pulse items-center'>
            <div className='rounded-lg w-25 h-4 bg-light-fg'></div>
            <div className='text-light-muted-text flex items-center whitespace-pre'>
                <div className='rounded-lg w-18 h-4 bg-light-fg'></div>
                { " - " }
                <div className='bg-light-muted-text rounded-lg w-full max-w-175 h-4'></div>
            </div>
            <div className='bg-light-muted-text rounded-lg w-8.5 h-3.5 ml-auto'></div>
        </div>
    );
}


export default function LastMessages()
{
    const { isAdmin } = useAuth();

    if (!isAdmin)
        return null;


    const { data } = useSWR<Message[]>(`/api/messages/last`, fetcher);
    const now = new Date();

    const messages = Array.isArray(data)
        ? data.map((message, i) => <MessageCard message={message} now={now} key={i}/>)
        : [...Array(4)].map((_, i) => <MessageSkeletonCard key={i}/>);


    return (
        <section className="text-light-fg bg-dark-bg pb-0">
            <div className='inset-border contact'>
                <h5>
                    Derniers Messages
                </h5>
                { messages }
            </div>
        </section>
    );
}