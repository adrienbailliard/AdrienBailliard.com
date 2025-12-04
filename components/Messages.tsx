"use client";

import useSWR from 'swr';
import { useState, useEffect } from "react";

import { useAuth } from '@/context/authentification';
import { formatDate } from '@/lib/utils';
import { Message } from '@/lib/types';

import Check from "@/components/icons/check";
import Dustbin from "@/components/icons/dustbin";
import Read from "@/components/icons/read";
import Unread from "@/components/icons/unread";


const fetcher = (url: string) => fetch(url).then(r => r.json());

type MessageCardProps = {
    message: Message;
    now: Date;
    inSelectionMode: boolean;
    selectAll: boolean;
}



function MessageCard({ message, now, inSelectionMode, selectAll }: MessageCardProps)
{
    const [expanded, setExpanded] = useState(false);
    const [selected, setSelected] = useState(false);

    useEffect(() => inSelectionMode ? setExpanded(false) : setSelected(false), [inSelectionMode]);
    useEffect(() => setSelected(selectAll), [selectAll]);


    const handleMessageClick = async () =>
    {
        if (inSelectionMode)
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
        <div
            className={ `message-card cursor-pointer duration-300 before:duration-300 overflow-hidden relative
                before:w-4 before:h-4 before:bg-transparent before:absolute before:top-1/2 before:-translate-y-1/2
                before:border before:border-dark-muted-text before:-left-12.5 [:hover,:active]:before:border-light-fg
                ${ inSelectionMode && `pl-12.5 before:left-0 ${ selected && "before:border-light-fg" }` }
            ` }
            onClick={ handleMessageClick }
        >
            { selected && <Check className='w-2.5 absolute left-0.75 top-1/2 -translate-y-1/2'/> }
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


    const [inSelectionMode, setInSelectionMode] = useState(false);
    const [selectAll, setSelectAll] = useState(false);

    const { data } = useSWR<Message[]>(`/api/messages`, fetcher);
    const now = new Date();

    const messages = Array.isArray(data)
        ? data.map((message, i) =>
            <MessageCard message={message} now={now} key={i} selectAll={selectAll} inSelectionMode={inSelectionMode}/>)
        : [...Array(4)].map((_, i) => <MessageSkeletonCard key={i}/>);


    return (
        <section className="text-light-fg bg-dark-bg pb-0">
            <div>
                <div className='flex justify-between h-6 md:h-7.5'>
                    { !inSelectionMode &&
                        <h5>{ messages.length === 0 ? "Aucun Message" : "Messages" }</h5> }
                    { Array.isArray(data) && data.length > 0 && (
                        <>
                            { inSelectionMode && (
                                <button
                                    className='text-primary font-medium'
                                    onClick={ () => setSelectAll(!selectAll) }
                                >
                                    Tout sélectionner
                                </button>
                            )}
                            <button
                                className='text-primary font-medium'
                                onClick={ () => {
                                    setInSelectionMode(!inSelectionMode);
                                    setSelectAll(false);
                                }}
                            >
                                { inSelectionMode ? "Annuler" : "Sélectionner" }
                            </button>
                        </>
                    )}
                </div>
                <div className='divide-y divide-dark-muted-text pt-5'>
                    { messages }
                </div>
            </div>
        </section>
    );
}