"use client";
import useSWR from 'swr';

import { useAuth } from '@/contexts/authentification';
import { MessageActionsProvider } from '@/contexts/messageActions';
import { Message } from '@/lib/types';

import Header from "@/components/messages/Header";
import MessageCard from "@/components/messages/MessageCard";
import MessageSkeletonCard from "@/components/messages/SkeletonCard";


const fetcher = (url: string) =>
    fetch(url).then(r => r.json());



export default function Messages()
{
    const { isAdmin } = useAuth();
    const { data, mutate } = useSWR<Message[]>(isAdmin ? `/api/messages` : null, fetcher);

    if (!isAdmin)
        return null;

    const safeData = Array.isArray(data) ? data : null;


    return (
        <section className="text-light-fg bg-dark-bg">
            <div className='overflow-x-hidden'>
                <MessageActionsProvider data={safeData} mutate={mutate}>
                    <Header/>
                    {
                        safeData
                        ? safeData.map((message, i) =>
                            <MessageCard message={message} key={message.id}/>)
                        : [...Array(3)].map((_, i) =>
                            <MessageSkeletonCard key={i}/>)
                    }
                </MessageActionsProvider>
            </div>
        </section>
    );
}